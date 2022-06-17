const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");

const domain = config.require("aRecord");
const env = config.require("aspNetCoreEnvironment");
const domainTld = config.require("domainTld");
const backendVersion = config.require('sonaticket-backend-payments-version')

module.exports = function ( settings) {
    return {
        name: 'sonatribe-payments-processor',
        containerName: 'paymentsprocessor',
        bc: 'payments',
        containerVersion: backendVersion,
        settings: settings.paymentsProcessorSttings,
        hasIngress: false,
        usesVault: true,
        createIngress: function (deployment) {},
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
        },{
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
    };
}