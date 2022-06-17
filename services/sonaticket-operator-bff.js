const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const env = config.require("aspNetCoreEnvironment");
const domainTld = config.require("domainTld");
const backendVersion = config.require('sonaticket-backend-bff-version')
const defaultApiReplica = config.requireNumber('defaultApiReplica');

module.exports = function (settings, ingressGenerator) {

    return {
        replicas: defaultApiReplica,
        name: 'sonaticket-ops-bff',
        containerName: 'bff',
        bc: 'bff',
        containerVersion: backendVersion,
        settings: settings.operatorBffSettings,
        hasIngress: true,
        usesVault: true,
        createIngress: function (deployment) {
            // ingressGenerator.createIngress('api.ops.', 'sonaticket-operator-bff', 80,[
            //     {
            //         path: ''
            //     },
            //     {
            //         path: '/connection',
            //         backendService: 'sonatribe-signalr-api'
            //     },
            // ], false, null, null, true)

            ingressGenerator.createIngress('api.ops.', 'sonaticket-ops-bff', 80,[
                {
                    path: ''
                },
                {
                    path: '/connection',
                    backendService: 'sonatribe-signalr-api'
                },
            ])
        },
        hasLivenessProbes: true,
        hasStartupProbe: true,
        resources: {
            requests: {
                memory: "256Mi",
                cpu: "50m"
            },
            limits: {
                memory: "1024Mi",
                cpu: "200m"
            }
        },
        extraVolumes: [{
            name: 'ocelot-config-volume',
            configMap: {
                name: settings.operatorBffOcelot.metadata.name
            }
        }],
        extraVolumeMounts: [{
            name: 'ocelot-config-volume',
            mountPath: '/app/ocelot.json',
            subPath: 'ocelot.json'
        }],
        envs: [{
            name: 'A_RECORD',
            value: domain
        }, {
            name: 'DOMAIN_TLD',
            value: domainTld
        }, {
            name: 'ASPNETCORE_ENVIRONMENT',
            value: env
        }]
    };
}
