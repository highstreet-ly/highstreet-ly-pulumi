const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const env = config.require("aspNetCoreEnvironment");
const dashVersion = config.require("sonaticket-dash-version");
const uiImagePostpend = config.require("uiImagePostpend");

module.exports = function ( settings, ingressGenerator) {

    return {
        replicas: 1,
        name: 'sonaticket-dashboard',
        containerName: `highstreet-dashboard${uiImagePostpend}`,
        bc: 'ui',
        containerVersion: dashVersion,
        hasIngress: true,
        usesVault: false,
        settings: settings.dashBffSettings,
        createIngress: function (deployment) {
            ingressGenerator.createIngress('dashboard.', 'sonaticket-dashboard', 80, [
                {
                    path: ''
                },
                {
                    path: '/account/login',
                    backendService: 'sonaticket-ids'
                },
                {
                    path: '/account/logout',
                    backendService: 'sonaticket-ids'
                },
                {
                    path: '/account/resetpassword',
                    backendService: 'sonaticket-ids'
                },
                {
                    path: '/account/forgotpassword',
                    backendService: 'sonaticket-ids'
                },
                {
                    path: '/account/resendconfirmemail',
                    backendService: 'sonaticket-ids'
                }
            ]);
        },
        hasLivenessProbes: false,
        // resources: {
        //     requests: {
        //         memory: "64Mi",
        //         cpu: "50m"
        //     },
        //     limits: {
        //         memory: "256Mi",
        //         cpu: "150m"
        //     }
        // },
        extraVolumes: [],
        extraVolumeMounts: [],
        envs: [{
            name: 'ASPNETCORE_ENVIRONMENT',
            value: env
        }]
    };
}