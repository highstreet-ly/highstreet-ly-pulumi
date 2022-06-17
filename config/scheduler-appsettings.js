const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');
const idsSecret = config.require("idsSecret");

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('scheduler-appsettings', {
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
                    "Port": 8091,
                    "UseSsl": false
                },
                "IdentityServer": {
                    "Url": `https://ids.${domain}.${domainTld}`,
                    "ClientId": "sonatribe-ticketmanagement-processor",
                    "Audience": "sonatribe-ticketmanagement-processor",
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

