const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");

class ServicesInstaller {

    installServices(settings, ingressGenerator, devNamespace) {
        let services = [];
        services.push(require('../services/sonaticket-ids')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-ui')(settings, ingressGenerator));
        services.push(require('../services/sonaticket-dash')(settings, ingressGenerator));
        services.push(require('../services/sonaticket-shop-ui')(settings, ingressGenerator));
        services.push(require('../services/sonaticket-operator')(settings, ingressGenerator));
        services.push(require('../services/sonaticket-signalr-api')(settings))
        services.push(require('../services/sonaticket-operator-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-widget-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-dev-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-ui-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-tickets-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-dash-bff')(settings, ingressGenerator))
        services.push(require('../services/sonaticket-payments-api')(settings))
        services.push(require('../services/sonaticket-payments-processor')(settings))
        services.push(require('../services/sonaticket-permissions-api')(settings))
        services.push(require('../services/sonaticket-permissions-processor')(settings))
        services.push(require('../services/sonaticket-ticketmanagement-api')(settings))
        services.push(require('../services/sonaticket-ticketmanagement-processor')(settings))
        services.push(require('../services/sonaticket-ticketreservations-api')(settings))
        services.push(require('../services/sonaticket-ticketreservations-processor')(settings))
        services.push(require('../services/sonaticket-scheduler')(settings))
        services.push(require('../services/hs-feeds')(settings, ingressGenerator))
        return services;
    }
}

module.exports = ServicesInstaller;