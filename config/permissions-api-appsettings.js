const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');
const idsSecret = config.require("idsSecret");
const stripeApiKey = config.require("stripeApiKey")
const stripeWhSecret = config.require("stripeWhSecret")

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('permissions-api-appsettings', {
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
                "Application": {
                    "Port": 80,
                    "UseSsl": false,
                },
                "Stripe":{
                    "WebHookSecret": stripeWhSecret,
                    "ApiKey": stripeApiKey,
                },
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe.permissions.api",
                    "ClientSecret":  idsSecret,
                    "Audience": "sonatribe.permissions.api",
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

