const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const mainUiPort = config.require("mainUiPort");
const k8s = require('@pulumi/kubernetes');
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('appsettings-widget-bff', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.api",
                    "ClientSecret":  idsSecret,
                    "Port": 80,
                    "Audience": "sonatribe.api",
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CorsOptions":{
                    "UseCors": true,
                    "Urls": [
                        `https://${domain}.${domainTld}${mainUiPort}`,
                        'http://localhost:5000',
                    ]
                },
                "HasIdentityIntegration": false,
                "IdentityKey": "SonatribeFrontendBff",
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

