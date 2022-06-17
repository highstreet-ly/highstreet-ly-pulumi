const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const backendVersion = config.require('sonaticket-backend-scheduler-version')

module.exports = function ( settings) {
    return {
        name: 'sonatribe-scheduler',
        containerName: 'scheduler',
        bc: 'scheduler',
        containerVersion: backendVersion,
        settings: settings.schedulerAppSettings,
        hasIngress: false,
        usesVault: true,
        createIngress: function (deployment) {},
        hasLivenessProbes: false,
        extraVolumes: [],
        extraVolumeMounts: [],
        envs: [{
            name: 'A_RECORD',
            value: domain
        }, {
            name: 'DOMAIN_TLD',
            value: domainTld
        },{
            name: 'ASPNETCORE_ENVIRONMENT',
            value: env
        },{
            name: 'PROCESS_SLEEP_BEFORE_STARTING',
            value: '120000'
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