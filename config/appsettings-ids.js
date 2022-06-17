const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const dashboardPort = config.require("dashboardPort");
const mainUiPort = config.require("mainUiPort");
const ordersUiPort = config.require("ordersUiPort");
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('appsettings-ids', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ExternalUrl": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.api",
                    "Audience": "sonatribe.api",
                    "ClientSecret":  idsSecret,
                    "Port": 4432,
                    "SkipClientAuthConfiguration": false,
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "Application": {
                    "Port": 80,
                    "UseSsl": false,
                    "Cors": [
                        `https://dashboard.${domain}.${domainTld}${dashboardPort}`,
                        `https://dashboard.${domain}.${domainTld}:4201`,
                        `https://ops.${domain}.${domainTld}:4204`,
                        `https://ops.${domain}.${domainTld}`,
                        `https://${domain}.${domainTld}${mainUiPort}`,
                        `https://orders.${domain}.${domainTld}${ordersUiPort}`
                    ]
                },
                "CorsOptions": {
                    "UseCors": true,
                    "Urls": [
                        `https://dashboard.${domain}.${domainTld}${dashboardPort}`,
                        `https://dashboard.${domain}.${domainTld}:4201`,
                        `https://ops.${domain}.${domainTld}:4204`,
                        `https://ops.${domain}.${domainTld}`,
                        `https://${domain}.${domainTld}${mainUiPort}`,
                        `https://orders.${domain}.${domainTld}${ordersUiPort}`
                    ]
                }
            })
        }
    }, {
        dependsOn: [devNamespace]
    });
}



