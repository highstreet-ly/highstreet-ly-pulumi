const k8s = require('@pulumi/kubernetes');
const pulumi = require('@pulumi/pulumi');
const config = new pulumi.Config('sonaticket');
const backendVersion = config.require('sonaticket-backend-payments-version')

exports.createLogsCleaner = (ns, settings, devNamespace) => {

    new k8s.batch.v1beta1.CronJob("logs-cleaner", {
        metadata: {
            name: 'logs-cleaner',
            namespace: ns
        },
        spec: {
            schedule: "0 5 * * *",
            jobTemplate: {
                spec: {
                    template: {
                        spec: {
                            containers: [
                                {
                                    name: 'logs-cleaner',
                                    image: `${config.require('dockerImagePrepend')}/logs-cleaner:${backendVersion}`,

                                    volumeMounts: [
                                        {
                                            name: 'sharedsettings-volume',
                                            mountPath: '/app/sharedsettings.json',
                                            subPath: 'sharedsettings.json'
                                        }
                                    ]
                                }
                            ],
                            restartPolicy: "OnFailure",
                            volumes: [{
                                name: 'sharedsettings-volume',
                                configMap: {
                                    name: settings.sharedSettings.metadata.name
                                }
                            }],

                        }
                    }
                }
            },
        }
    }, {
        dependsOn: [devNamespace]
    });

}