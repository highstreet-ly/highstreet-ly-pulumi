const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const backendVersion = config.require('sonaticket-backend-reservations-version')

module.exports = function ( settings) {

    let idsDomain = `ids.${domain}.${domainTld}`
    let ns = `${domain}-${domainTld}`

    return {
        replicas: defaultApiReplica,
        name: 'sonatribe-ticketreservations-api',
        bc: 'reservations',
        containerName: 'reservationsapi',
        containerVersion: backendVersion,
        settings: settings.ticketReservationsApiAppSettings,
        hasIngress: false,
        usesVault: true,
        createIngress: function (deployment) { },
        hasLivenessProbes: true,
        hasStartupProbe: true,
        extraVolumes: [{
            name: 'sonaticket-ids-cert-secret',
            secret: {
                secretName: `ids-secret`
            }
        }],
        extraVolumeMounts: [{
            name: 'sonaticket-ids-cert-secret',
            mountPath: '/etc/ssl/sonaticket-certs',
            readOnly: true
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
        }],
        tags: [
            "assignments",
            "draft-orders",
            "my-orders",
            "priced-orders",
            "health",
            `ns:${ns}`,
            `version:${backendVersion}`
        ],
        //upstreams: `sonaticket-ids-${ns}:80,sonatribe-payments-api-${ns}:80,sonatribe-permissions-api-${ns}:80,sonatribe-ticketmanagement-api-${ns}:80`,
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
