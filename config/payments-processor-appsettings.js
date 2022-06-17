const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');
const stripeApiKey = config.require("stripeApiKey")
const stripeWhSecret = config.require("stripeWhSecret")
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('payments-processor-appsettings', {
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
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "Audience": "sonatribe.payment.processor",
                    "ClientId": "sonatribe.payment.processor",
                    "ClientSecret":  idsSecret,
                    "Port": 4432,
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

