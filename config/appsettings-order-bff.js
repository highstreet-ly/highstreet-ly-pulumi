const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const ordersUiPort = config.require("ordersUiPort");
const k8s = require('@pulumi/kubernetes');
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('appsettings-order-bff', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.api",
                    "ClientSecret":  idsSecret,
                    "Audience": "sonatribe.api",
                    "Port": 80,
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CorsOptions":{
                    "UseCors": true,
                    "Urls": [
                        `https://orders.${domain}.${domainTld}${ordersUiPort}`
                    ]
                },
                "IdentityKey": "SonatribeFrontendBff",
                "HasIdentityIntegration": true,
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

