const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const operatorPort = config.require("operatorPort");
const dashboardPort = config.require("dashboardPort");
const uiImagePostpend = config.require("uiImagePostpend");
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {

    var cors = []

    if (uiImagePostpend === "-test") {
        cors =[
            `https://ops.${domain}.${domainTld}${operatorPort}`,
            `https://ops.${domain}.${domainTld}:4204`,
        ];
    }else{
        cors = [
            `https://ops.${domain}.${domainTld}${operatorPort}`,
        ];
    }

    return new k8s.core.v1.ConfigMap('appsettings-operator-bff', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ExternalUrl": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.operator.api",
                    "ClientSecret":  idsSecret,
                    "Port": 4432,
                    "Audience": "sonatribe.operator.api",
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CorsOptions":{
                    "UseCors": true,
                    "Urls": cors
                },
                "HasIdentityIntegration": true,
                "IdentityKey": "SonatribeOperatorBff",
                "Application": {
                    "Port": 8095,
                    "UseSsl": false
                }
            })
        }
    }, {
        dependsOn: [devNamespace]
    });
}
