const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');

const { imagesPost, imagesGet } = require("./routes/images")
const { usersRead, usersWrite } = require("./routes/users")
const { dashboardStatsRead } = require("./routes/dashboard-stats")
const { eventOrganiserRead, eventOrganiserWrite } = require("./routes/event-organisers")
const { eventSeriesRead, eventSeriesUploadFiles, eventSeriesWrite } = require("./routes/event-series")
const { eventInstanceRead, eventInstanceWrite, eventInstanceUploadFiles, eventInstanceUsage } = require("./routes/event-instances")
const { ticketTypeConfigurationsRead, ticketTypeConfigurationsWrite } = require('./routes/ticket-type-configurations')
const { ticketTypesRead, ticketTypesWrite } = require('./routes/ticket-types')
const { ordersRead } = require("./routes/orders")
const { draftOrdersRead, draftOrdersWrite } = require("./routes/draft-orders")
const { pricedOrdersRead, pricedOrdersWrite } = require("./routes/priced-orders")
const { signalr } = require("./routes/signalr")
const { rolesRead, rolesWrite } = require("./routes/roles")
const { claimsRead, claimsWrite } = require("./routes/claims")
const { paymentsRead, paymentsWrite } = require("./routes/payments")
const { operationsWrite } = require("./routes/operations")
const { plansRead, plansWrite } = require("./routes/plans")
const {productCategoryWrite, productCategoryRead} = require("./routes/product-categories")
const { hsFeedRead } = require("./routes/hs-feed")

module.exports = function (ns, devNamespace){
  return new k8s.core.v1.ConfigMap('ocelot-tickets', {
    metadata: {
      namespace: ns,
    },
    data: {
      "ocelot.json": JSON.stringify({
        "Routes": [
          ...imagesGet(),
          ...eventSeriesRead(),
          ...eventInstanceRead(),
          ...ticketTypesRead(),
          ...eventOrganiserRead(),
          ...draftOrdersRead(),
          ...draftOrdersWrite(),
          ...pricedOrdersWrite(),
          ...pricedOrdersRead(),
          ...paymentsRead(),
          ...paymentsWrite(),
          ...ordersRead(),
          ...operationsWrite(),
          ...plansRead(),
          ...productCategoryWrite(),
          ...productCategoryRead(),
          ...hsFeedRead()
        ],
        "GlobalConfiguration": {
          "BaseUrl": `https://api.shop.${domain}.${domainTld}`,
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

