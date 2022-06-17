const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")
const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")
const defaultApiReplica = config.requireNumber('defaultApiReplica')
const hsFeedVersion = config.require('sonaticket-hs-feeds-version')

module.exports = function ( settings) {
    let ns = `${domain}-${domainTld}`

    return {
        replicas: defaultApiReplica,
        name: 'hs-feeds',
        bc: 'management',
        containerName: 'hs-feeds',
        containerVersion: hsFeedVersion,
        settings: settings.facebookFeedSettings,
        hasIngress: false,
        usesVault: true,
        createIngress: function (deployment) { },
        hasLivenessProbes: false,
        extraVolumes: [],
        extraVolumeMounts: [],
        envs: [{
            name: 'A_RECORD',
            value: domain
        }, {
            name: 'DOMAIN_TLD',
            value: domainTld
        },],
        tags: [
            "facebook-feed",
            `ns:${ns}`,
            `version:${hsFeedVersion}`
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