const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const backendVersion = config.require('sonaticket-backend-permissions-version')

module.exports = function ( settings) {
    let ns = `${domain}-${domainTld}`

    return {
        replicas: 1, //token generation won't work yet on > 1 pods
        name: 'sonatribe-permissions-api',
        bc: 'permissions',
        containerName: 'permissionsapi',
        containerVersion: backendVersion,
        settings: settings.permissionsApiAppSettings,
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
            "magic-login-links",
            "permissions",
            "register",
            "roles",
            "users",
            "forgot-password",
            "reset-password",
            "claims",
            `ns:${ns}`,
            `version:${backendVersion}`
        ],
        
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