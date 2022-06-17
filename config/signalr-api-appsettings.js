const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const dashboardPort = config.require("dashboardPort");
const ticketsUiPort = config.require("ticketsUiPort");
const k8s = require('@pulumi/kubernetes');
const stripeApiKey = config.require("stripeApiKey")
const stripeWhSecret = config.require("stripeWhSecret")
const idsSecret = config.require("idsSecret");
const uiImagePostpend = config.require("uiImagePostpend");
const operatorPort = config.require("operatorPort");

module.exports = function (ns, devNamespace) {

    var cors = []

    if (uiImagePostpend === "-test" || uiImagePostpend === "-wayne") {
        cors =[
            `https://dashboard.${domain}.${domainTld}${dashboardPort}`,
            `https://shop.${domain}.${domainTld}${ticketsUiPort}`,
            `https://ops.${domain}.${domainTld}${operatorPort}`,
        ];
    }else{
        cors = [
            `https://dashboard.${domain}.${domainTld}${dashboardPort}`,
            `https://shop.${domain}.${domainTld}${ticketsUiPort}`,
            `https://ops.${domain}.${domainTld}${operatorPort}`,
        ];
    }


    return new k8s.core.v1.ConfigMap('signalr-api-appsettings', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({
                "Cloudinary": {
                    "CloudName": "made-software",
                    "ApiKey": "xxxxxx",
                    "ApiSecret": "xxxxxx"
                },
                "Stripe":{
                    "WebHookSecret": stripeWhSecret,
                    "ApiKey": stripeApiKey,
                },
                "Application": {
                    "Port": 80,
                    "UseSsl": false,
                },
                "CorsOptions":{
                    "UseCors": true,
                    "Urls": cors
                },
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.signalr.api",
                    "ClientSecret":  idsSecret,
                    "Audience": "sonatribe.signalr.api",
                    "Authority": `https://ids.${domain}.${domainTld}`
                },
                "CloudStorage": {
                    "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=xxxxxx;AccountKey=xxxxxx;EndpointSuffix=core.windows.net",
                    "RootContainerName": "tickets"
                }
            })
        }
    }, {
        dependsOn: [devNamespace]
    });
}

