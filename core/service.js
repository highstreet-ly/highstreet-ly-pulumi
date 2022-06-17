const k8s = require('@pulumi/kubernetes');
const pulumi = require('@pulumi/pulumi');
const config = new pulumi.Config('sonaticket');
const imagePullPolicy = config.require("imagePullPolicy");

const dashUI = config.require("dashUI")

exports.createService = (ns, item, settings, devNamespace, pgsql) => {
    let serviceLabels = {
        app: item.name,
        bc: item.bc,
        tier: item.hasIngress ? 'frontend' : 'backend'
    };

    const probeConfig = {
        failureThreshold: 3,
        httpGet: {
            path: '/healthz',
            port: 80,
            scheme: 'HTTP'
        },
        initialDelaySeconds: 3,
        periodSeconds: 5,
        successThreshold: 1,
        timeoutSeconds: 2
    };

    const startProbeConfig = {
        failureThreshold: 3,
        httpGet: {
            path: '/',
            port: 80,
            scheme: 'HTTP'
        },
        failureThreshold: 30,
        periodSeconds: 10
    };;


    item.extraVolumeMounts.push({
        name: 'appsettings-config-volume',
        mountPath: '/app/appsettings.json',
        subPath: 'appsettings.json'
    });

    item.extraVolumeMounts.push({
        name: 'sharedsettings-volume',
        mountPath: '/app/sharedsettings.json',
        subPath: 'sharedsettings.json'
    });

    if (item.settings) {
        item.extraVolumes.push({
            name: 'appsettings-config-volume',
            configMap: {
                name: item.settings.metadata.name
            }
        });
    }

    item.extraVolumes.push({
        name: 'sharedsettings-volume',
        configMap: {
            name: settings.sharedSettings.metadata.name
        }
    });

    let appContainer = {
        imagePullPolicy: 'Always',
        name: item.name,
        image: `${config.require('dockerImagePrepend')}/${item.containerName}:${item.containerVersion}`,
        imagePullPolicy: imagePullPolicy,
        ports: [{
            containerPort: 80
        }],
        volumeMounts: item.extraVolumeMounts,
        env: [{
            name: 'BACKEND_VERSION',
            value: item.containerVersion
        },
        {
            name: "PAYLOAD_STORAGE_CONNECTION",
            valueFrom: {
                secretKeyRef: {
                    name: "payload-secret",
                    key: "connection"
                }
            }
        },
        {
            name: "SENGRID_KEY",
            valueFrom: {
                secretKeyRef: {
                    name: "sendgrid-secret",
                    key: "token"
                }
            }
        },
        {
            name: "HOST_IP",
            valueFrom: {
                fieldRef: {
                    fieldPath: "status.hostIP",
                },
            },
        }, {
            name: "DASH_UI",
            value: dashUI
        },
        ...item.envs],

    };

    if (item.resources) {
        appContainer.resources = item.resources;
    }

    let containers = [appContainer];

    let deploymentConfig = {
        metadata: {
            name: item.name,
            namespace: ns,
            labels: serviceLabels,
        },
        spec: {
            replicas: item.replicas ? item.replicas : 1,
            strategy: {
                type: 'RollingUpdate',
                rollingUpdate: {
                    maxUnavailable: 0,
                    maxSurge: 1
                }
            },
            selector: {
                matchLabels: serviceLabels
            },
            template: {
                metadata: {
                    labels: serviceLabels,
                },
                spec: {
                    // affinity: {
                    //     nodeAffinity: {
                    //         requiredDuringSchedulingIgnoredDuringExecution: {
                    //             nodeSelectorTerms: [
                    //                 {
                    //                     matchExpressions: [
                    //                         {
                    //                             key: "role",
                    //                             operator: "NotIn",
                    //                             values: [
                    //                                 "storage-node"
                    //                             ]
                    //                         }
                    //                     ]
                    //                 }
                    //             ]
                    //         }
                    //     }
                    // },
                    containers: containers,
                    imagePullSecrets: [{
                        name: 'regcred'
                    }],
                    volumes: item.extraVolumes,
                }
            }
        }
    };

    if (item.hasLivenessProbes) {
        deploymentConfig.spec.template.spec.containers[0].livenessProbe = probeConfig;
        deploymentConfig.spec.template.spec.containers[0].readinessProbe = probeConfig;
    }

    if (item.hasStartupProbe) {
        deploymentConfig.spec.template.spec.containers[0].startupProbe = startProbeConfig;
    }

    let deployment = new k8s.apps.v1.Deployment(item.name, deploymentConfig, { dependsOn: [devNamespace, pgsql]});

    let service = new k8s.core.v1.Service(item.name, {
        metadata: {
            name: item.name,
            namespace: ns,
            annotations: {
                'pulumi.com/timeoutSeconds': '600',
            }
        },
        spec: {
            selector: serviceLabels,
            type: 'ClusterIP',
            ports: [{
                name: `${item.name}-http`,
                protocol: 'TCP',
                port: 80,
                targetPort: 80
            }]
        }
    }, {
        dependsOn: [deployment, devNamespace, pgsql]
    });

    item.service = service;

    item.createIngress(deployment);

    return { service };
}
