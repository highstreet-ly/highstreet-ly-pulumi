const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")
const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const backendVersion = config.require('sonaticket-backend-bff-version')

module.exports = function ( settings, ingressGenerator) {

    return {
        replicas: defaultApiReplica,
        name: 'sonaticket-tickets-bff',
        bc: 'bff',
        containerName: 'bff',
        containerVersion: backendVersion,
        settings: settings.ticketsBffSettings,
        hasIngress: true,
        usesVault: true,
        createIngress: function (deployment) {
            ingressGenerator.createIngress('api.shop.', 'sonaticket-tickets-bff', 80,[
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
                name: settings.ticketsBffOcelot.metadata.name
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
    }
}
