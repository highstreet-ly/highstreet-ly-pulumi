const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const backendVersion = config.require('sonaticket-backend-bff-version')

module.exports = function (settings, ingressGenerator) {

    return {
        replicas: defaultApiReplica,
        name: 'sonaticket-dev-bff',
        bc: 'bff',
        containerName: 'bff',
        containerVersion: backendVersion,
        settings: settings.devBffSettings,
        hasIngress: true,
        usesVault: true,
        createIngress: function (deployment) {
            ingressGenerator.createIngress('api.dev.', 'sonaticket-dev-bff', 80)
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
                name: settings.devBffOcelot.metadata.name
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
