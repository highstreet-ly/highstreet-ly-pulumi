const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const ticketsUiPort = config.require("ticketsUiPort");
const k8s = require('@pulumi/kubernetes');
const uiImagePostpend = config.require("uiImagePostpend");
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {

    var cors = []

    if (uiImagePostpend === "-test") {
        cors =[
            `https://shop.${domain}.${domainTld}${ticketsUiPort}`,
            `https://shop.${domain}.${domainTld}:4203`,
        ];
    }else{
        cors = [
            `https://shop.${domain}.${domainTld}${ticketsUiPort}`,
        ];
    }

    return new k8s.core.v1.ConfigMap('appsettings-tickets-bff', {
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
                    "UseCors": false,
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

