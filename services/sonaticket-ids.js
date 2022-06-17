const pulumi = require("@pulumi/pulumi")
const config = new pulumi.Config("sonaticket")

const domain = config.require("aRecord")
const env = config.require("aspNetCoreEnvironment")
const domainTld = config.require("domainTld")

const mainUiPort = config.require('mainUiPort')
const dashboardPort = config.require('dashboardPort')
const ordersUiPort = config.require("ordersUiPort")
const ticketsUiPort = config.require('ticketsUiPort')
const clearDownIds = config.require('clearDownIds')
const opsPort = config.require('operatorPort')
const backendVersion = config.require('sonaticket-backend-ids-version')

module.exports = function ( settings, ingressGenerator) {

    let idsDomain = `ids.${domain}.${domainTld}`;
    let ns = `${domain}-${domainTld}`

    return {
        replicas: 1,
        name: 'sonaticket-ids',
        bc: 'permissions',
        containerName: 'identityserver',
        containerVersion: backendVersion,
        settings: settings.idsettings,
        hasIngress: true,
        usesVault: true,
        createIngress: function (deployment) {
            ingressGenerator.createIngress('ids.', 'sonaticket-ids', 80, [
                {
                    path: '',
                    backendService: 'sonaticket-ids'
                }
            ]);
        },
        tags: [
            "account",
            `ns:${ns}`,
            `version:${backendVersion}`
        ],
        hasLivenessProbes: false,
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
            name: 'MAIN_UI_PORT',
            value: mainUiPort
        }, {
            name: 'DASHBOARD_UI_PORT',
            value: dashboardPort
        }, {
            name: 'OPS_UI_PORT',
            value: opsPort
        },{
            name: 'ORDERS_UI_PORT',
            value: ordersUiPort
        }, 
        {
            name: "SHOP_UI_PORT",
            value: ticketsUiPort
        }, {
            name: 'PROCESS_SLEEP_BEFORE_STARTING',
            value: '10000'
        }, {
            name: 'ASPNETCORE_ENVIRONMENT',
            value: env
        }, {
            name: 'SONATRIBE_ARGUMENTS',
            value: 'seed'
        },{
            name: 'CLEAR_DOWN_IDS',
            value: clearDownIds
        }]
    };
}
