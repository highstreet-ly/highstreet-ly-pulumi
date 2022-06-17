const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")
const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const platformFeesPence = config.require('platformFeesPence')
const backendVersion = config.require('sonaticket-backend-management-version')

module.exports = function ( settings) {
    let ns = `${domain}-${domainTld}`

    return {
        replicas: defaultApiReplica,
        name: 'sonatribe-ticketmanagement-api',
        bc: 'management',
        containerName: 'managementapi',
        containerVersion: backendVersion,
        settings: settings.ticketManagementApiAppSettings,
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
        }, {
            name: 'PLATFORM_FEE_PENCE',
            value: `${platformFeesPence}`
        }],
        tags: [
            "dashboard-stats",
            "event-instances",
            "event-organisers",
            "event-series",
            "images",
            "orders",
            "register-interest",
            "search",
            "tickets",
            "ticket-type-configurations",
            "ticket-types",
            `ns:${ns}`,
            `version:${backendVersion}`
        ],
        //upstreams: `sonaticket-ids-${ns}:80,sonatribe-payments-api-${ns}:80,sonatribe-permissions-api-${ns}:80,sonatribe-ticketreservations-api-${ns}:80`,
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