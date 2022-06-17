const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const dashboardPort = config.require("dashboardPort");
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {

    return new k8s.core.v1.ConfigMap('appsettings-dev-bff', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ExternalUrl": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.dashboard.api",
                    "ClientSecret":  idsSecret,
                    "Port": 4432,
                    "Audience": "sonatribe.dashboard.api",
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CorsOptions":{
                    "UseCors": false,
                    "Urls": [
                        `https://dashboard.${domain}.${domainTld}${dashboardPort}`
                    ]
                },
                "HasIdentityIntegration": true,
                "IdentityKey": "SonatribeDashboardBff",
                "Application": {
                    "Port": 80,
                    "UseSsl": false
                }
            })
        }
    }, {
        dependsOn: [devNamespace]
    });
}
