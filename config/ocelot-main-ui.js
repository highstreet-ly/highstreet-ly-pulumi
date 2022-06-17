const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const dashboardPort = config.require("dashboardPort");
const k8s = require('@pulumi/kubernetes');
const { ordersRead } = require("./routes/orders")
const { eventInstanceRead } = require("./routes/event-instances")
const { eventSeriesRead } = require("./routes/event-series")
const { eventOrganiserRead } = require("./routes/event-organisers")
const { usersRead, usersWrite } = require("./routes/users")
const { signalr } = require("./routes/signalr")
const { businessTypesRead } = require("./routes/business-types")

module.exports = function (ns, devNamespace){
  return new k8s.core.v1.ConfigMap('ocelot-main-ui', {
    metadata: {
      namespace: ns,
    },
    data: {
      "ocelot.json": JSON.stringify({
        "Routes": [
          ...ordersRead(),
          ...eventInstanceRead(),
          ...eventSeriesRead(),
          ...eventOrganiserRead(),
          ...usersRead(),
          ...usersWrite(),
          ...signalr(),
          ...businessTypesRead()
        ],
        "GlobalConfiguration": {
          "BaseUrl": `https://api.${domain}.${domainTld}`,
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

