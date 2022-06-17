const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")
const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const backendVersion = config.require('sonaticket-backend-reservations-version')

module.exports = function ( settings) {
    return {
        replicas: 1,
        name: 'sonatribe-ticketreservations-processor',
        containerName: 'reservationsprocessor',
        bc: 'reservations',
        containerVersion: backendVersion,
        settings: settings.ticketReservationsProcessorSttings,
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
