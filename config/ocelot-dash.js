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
const { ticketTypesRead, ticketTypesWrite } = require('./routes/ticket-types')
const { ordersRead, ordersWrite } = require("./routes/orders")
const { signalr } = require("./routes/signalr")
const { rolesRead, rolesWrite } = require("./routes/roles")
const { claimsRead, claimsWrite } = require("./routes/claims")
const { plansRead, plansWrite } = require("./routes/plans")
const { addOnsRead, addOnsWrite } = require("./routes/add-ons")
const { subscriptionsRead, subscriptionsWrite } = require("./routes/subscriptions")
const { featuresRead, featuresWrite } = require("./routes/features")
const { productCategoryWrite, productCategoryRead } = require("./routes/product-categories")
const { chargesRead, chargesWrite } = require("./routes/charges")
const {refundsRead, refundsWrite} = require('./routes/refunds')
const { businessTypesRead, businessTypesWrite } = require("./routes/business-types")
const {businessTypeFeatureTemplatesRead, businessTypeFeatureTemplatesWrite} = require('./routes/business-type-feature-templates')
const { logsReadManagement } = require("./routes/logs-read-management")
const { logsReadPayments } = require("./routes/logs-read-payments")
const { logsReadPermissions } = require("./routes/logs-read-permissions")
const { logsReadReservations } = require("./routes/logs-read-reservations")
const {revenueAllTimeRead, revenueByDayRead} = require('./routes/stats')
const { hsFeedRead } = require("./routes/hs-feed")
 
module.exports = function (ns, devNamespace) {

    return new k8s.core.v1.ConfigMap('ocelot-dash', {
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
                        ...plansRead(),
                        ...plansWrite(),
                        ...addOnsRead(),
                        ...addOnsWrite(),
                        ...subscriptionsRead(),
                        ...subscriptionsWrite(),
                        ...featuresRead(),
                        ...featuresWrite(),
                        ...ticketTypesRead(),
                        ...productCategoryWrite(),
                        ...productCategoryRead(),
                        ...chargesRead(),
                        ...chargesWrite(),
                        ...businessTypesRead(),
                        ...businessTypesWrite(),
                        ...logsReadManagement(),
                        ...logsReadPayments(),
                        ...logsReadPermissions(),
                        ...logsReadReservations(),
                        ...businessTypeFeatureTemplatesRead(),
                        ...businessTypeFeatureTemplatesWrite(),
                        ...refundsRead(),
                        ...refundsWrite(),
                        ...revenueAllTimeRead(),
                        ...revenueByDayRead(),
                        ...hsFeedRead()
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
