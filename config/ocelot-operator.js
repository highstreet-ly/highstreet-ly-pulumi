const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');
const { ordersRead, ordersWrite } = require("./routes/orders")
const { eventInstanceRead } = require("./routes/event-instances")
const { eventSeriesRead } = require("./routes/event-series")
const { eventOrganiserRead } = require("./routes/event-organisers")
const { usersRead } = require("./routes/users")
const { signalr } = require("./routes/signalr")

module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('ocelot-operator', {
        metadata: {
            namespace: ns,
        },
        data: {
            "ocelot.json": JSON.stringify(
                {
                    "Routes": [
                        ...ordersRead(),
                        ...ordersWrite(),
                        ...eventInstanceRead(),
                        ...eventSeriesRead(),
                        ...eventOrganiserRead(),
                        ...usersRead(),
                        ...signalr()
                    ],
                    "GlobalConfiguration": {
                        "BaseUrl": `https://api.ops.${domain}.${domainTld}`,
                        "UpstreamHeaderTransform": {
                            "Client": "Dash"
                        }
                    }
                })
        }
    }, {
        dependsOn: [devNamespace]
    });
}
