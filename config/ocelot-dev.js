const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');


const { imagesPost, imagesGet } = require("./routes/images")
const { usersRead, usersWrite } = require("./routes/users")
const { paymentsRead, paymentsWrite } = require("./routes/payments")
const { dashboardStatsRead } = require("./routes/dashboard-stats")
const { eventOrganiserRead, eventOrganiserWrite } = require("./routes/event-organisers")
const { eventSeriesRead, eventSeriesUploadFiles, eventSeriesWrite } = require("./routes/event-series")
const { eventInstanceRead, eventInstanceWrite, eventInstanceUploadFiles, eventInstanceUsage } = require("./routes/event-instances")
const { ticketTypeConfigurationsRead, ticketTypeConfigurationsWrite } = require('./routes/ticket-type-configurations')
const { ordersRead, ordersWrite } = require("./routes/orders")
const { signalr } = require("./routes/signalr")
const { rolesRead, rolesWrite } = require("./routes/roles")
const { claimsRead, claimsWrite } = require("./routes/claims")
const { ticketTypesRead, ticketTypesWrite } = require('./routes/ticket-types')
const { pricedOrdersRead, pricedOrdersWrite } = require("./routes/priced-orders")
const { draftOrdersRead, draftOrdersWrite } = require("./routes/draft-orders")

const { plansRead, plansWrite } = require("./routes/plans")
const { featuresRead, featuresWrite } = require("./routes/features")
const { addOnsRead, addOnsWrite } = require("./routes/add-ons")
const { subscriptionsRead, subscriptionsWrite } = require("./routes/subscriptions")


module.exports = function (ns, devNamespace) {
    return new k8s.core.v1.ConfigMap('ocelot-dev', {
        metadata: {
            namespace: ns,
        },
        data: {
            "ocelot.json": JSON.stringify(
                {
                    "Routes": [
                        ...imagesPost(),
                        ...imagesGet(),
                        ...usersRead(),
                        ...usersWrite(),
                        ...signalr(),
                        ...paymentsRead(),
                        ...paymentsWrite(),
                        ...eventOrganiserRead(),
                        ...eventOrganiserWrite(),
                        ...dashboardStatsRead(),
                        ...eventSeriesUploadFiles(),
                        ...eventSeriesWrite(),
                        ...eventSeriesRead(),
                        ...eventInstanceRead(),
                        ...eventInstanceWrite(),
                        ...eventInstanceUploadFiles(),
                        ...eventInstanceUsage(),
                        ...ticketTypeConfigurationsRead(),
                        ...ticketTypeConfigurationsWrite(),
                        ...ordersRead(),
                        ...ordersWrite(),
                        ...rolesRead(),
                        ...rolesWrite(),
                        ...claimsRead(),
                        ...claimsWrite(),
                        ...ticketTypesRead(),
                        ...ticketTypesWrite(),
                        ...pricedOrdersWrite(),
                        ...pricedOrdersRead(),
                        ...draftOrdersRead(),
                        ...draftOrdersWrite(),
                        ...plansRead(),
                        ...plansWrite(),
                        ...addOnsRead(),
                        ...addOnsWrite(),
                        ...featuresRead(),
                        ...featuresWrite(),
                        ...subscriptionsRead(), 
                        ...subscriptionsWrite()

                    ],
                    "GlobalConfiguration": {
                        "BaseUrl": `https://api.dashboard.${domain}.${domainTld}`,
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
