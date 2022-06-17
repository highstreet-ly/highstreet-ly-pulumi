const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const mainUiPort = config.require("mainUiPort");
const k8s = require('@pulumi/kubernetes');
const uiImagePostpend = config.require("uiImagePostpend");
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {

    var cors = []

    if (uiImagePostpend === "-test") {
        cors = [
            `https://${domain}.${domainTld}${mainUiPort}`,
            `https://${domain}.${domainTld}:4200`,
        ];
    }else{
        cors = [
            `https://${domain}.${domainTld}${mainUiPort}`,
        ];
    }

    return new k8s.core.v1.ConfigMap('appsettings-ui-bff', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.api",
                    "ClientSecret": idsSecret,
                    "Audience": "sonatribe.api",
                    "Port": 80,
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CorsOptions": {
                    "UseCors": true,
                    "Urls": cors
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

