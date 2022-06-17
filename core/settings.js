'use strict';
const k8s = require('@pulumi/kubernetes');
const fs = require('fs');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");

class Settings {
    generate(ns, devNamespace) {
        this.sharedSettings = require('../config/sharedsettings')(ns, devNamespace);
        this.signalrApiSttings = require('../config/signalr-api-appsettings')(ns, devNamespace);
        this.idsettings = require('../config/appsettings-ids')(ns, devNamespace);
        this.devBffSettings = require('../config/appsettings-dev-bff')(ns, devNamespace);
        this.devBffOcelot = require('../config/ocelot-dev')(ns, devNamespace);
        this.operatorBffSettings = require('../config/appsettings-operator-bff')(ns, devNamespace);
        this.operatorBffOcelot = require('../config/ocelot-operator')(ns, devNamespace);
        this.uiBffSettings = require('../config/appsettings-ui-bff')(ns, devNamespace);
        this.uiBffOcelot = require('../config/ocelot-main-ui')(ns, devNamespace);
        this.ticketsBffSettings = require('../config/appsettings-tickets-bff')(ns, devNamespace);
        this.ticketsBffOcelot = require('../config/ocelot-tickets')(ns, devNamespace);
        this.widgetBffSettings = require('../config/appsettings-widget-bff')(ns, devNamespace);
        this.widgetBffOcelot = require('../config/ocelot-widget')(ns, devNamespace);
        this.dashBffSettings = require('../config/appsettings-dash-bff')(ns, devNamespace);
        this.dashBffOcelot = require('../config/ocelot-dash')(ns, devNamespace);
        this.paymentsApiSttings = require('../config/payments-api-appsettings')(ns, devNamespace);
        this.paymentsProcessorSttings = require('../config/payments-processor-appsettings')(ns, devNamespace);
        this.permissionsApiAppSettings = require('../config/permissions-api-appsettings')(ns, devNamespace);
        this.permissionsProcessorSttings = require('../config/permissions-processor-appsettings')(ns, devNamespace);
        this.schedulerAppSettings = require('../config/scheduler-appsettings')(ns, devNamespace);
        this.ticketManagementProcessorSttings = require('../config/ticketmanagement-processor-appsettings')(ns, devNamespace);
        this.ticketManagementApiAppSettings = require('../config/ticketmanagement-api-appsettings')(ns, devNamespace);
        this.ticketReservationsProcessorSttings = require('../config/ticketreservations-processor-appsettings')(ns, devNamespace);
        this.ticketReservationsApiAppSettings = require('../config/ticketreservations-api-appsettings')(ns, devNamespace);
        this.facebookFeedSettings = require('../config/appsettings-hs-feeds')(ns);
    }
}

module.exports = Settings;