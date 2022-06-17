const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const env = config.require("aspNetCoreEnvironment");
const operatorVersion = config.require("sonaticket-operator-version");
const uiImagePostpend = config.require("uiImagePostpend");

module.exports = function (settings, ingressGenerator) {

    return {
        replicas: 1,
        name: 'sonaticket-operator',
        containerName: `highstreet-operator${uiImagePostpend}`,
        bc: 'ui',
        containerVersion: operatorVersion,
        hasIngress: true,
        usesVault: false,
        settings: settings.operatorBffSettings,
        createIngress: function (deployment) {
            ingressGenerator.createIngress('ops.', 'sonaticket-operator', 80, [
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