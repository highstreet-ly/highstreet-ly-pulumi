const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const env = config.require("aspNetCoreEnvironment");
const domainTld = config.require("domainTld");
const defaultApiReplica = config.requireNumber('defaultApiReplica');
const platformFeesPence = config.require('platformFeesPence');
const backendVersion = config.require('sonaticket-backend-signalr-version')

module.exports = function (settings) {
    // NOTE: replicas needs to be 1 since the connections hash is inmem for now at least
    return {
        replicas: 1,
        name: 'sonatribe-signalr-api',
        bc: 'management',
        containerName: 'signalr',
        containerVersion: backendVersion,
        settings: settings.signalrApiSttings,
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
            name: 'PLATFORM_FEE_PENCE',
            value: `${platformFeesPence}`
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
    };
}