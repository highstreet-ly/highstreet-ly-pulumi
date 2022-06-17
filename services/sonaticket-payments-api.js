const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const backendVersion = config.require('sonaticket-backend-payments-version')

module.exports = function (settings) {

    let ns = `${domain}-${domainTld}`

    return {
        replicas: defaultApiReplica,
        name: 'sonatribe-payments-api',
        bc: 'payments',
        containerName: 'paymentsapi',
        containerVersion: backendVersion,
        settings: settings.paymentsApiSttings,
        hasIngress: false,
        usesVault: true,
        createIngress: function (deployment) { },
        hasLivenessProbes: true,
        hasStartupProbe: true,
        extraVolumes: [],
        extraVolumeMounts: [],
        envs: [{
            name: 'A_RECORD',
            value: domain
        }, {
            name: 'DOMAIN_TLD',
            value: domainTld
        }, {
            name: 'ASPNETCORE_ENVIRONMENT',
            value: env
        }],
        tags: [
            "payments",
            "stripe-customers",
            `ns:${ns}`,
            `version:${backendVersion}`
        ],
        //upstreams: `sonaticket-ids-${ns}:80,sonatribe-permissions-api-${ns}:80,sonatribe-ticketmanagement-api-${ns}:80,sonatribe-ticketreservations-api-${ns}:80`,
        // nodePorts:{
        //     http: 30999,
        //     https: 30998
        // }
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
    }
}
