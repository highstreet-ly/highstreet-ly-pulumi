"use strict";
require('./core/global');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const k8s = require("@pulumi/kubernetes");
const serviceBuilder = require('./core/service');
const ServicesInstaller = require('./core/services-installer');
const storageBuilder = require('./az/storage-account');
const IngressGeneratorCloudFlare = require('./core/ingress-generator-cloud-flare');
const ingressGeneratorCloudFlare = new IngressGeneratorCloudFlare();
const Settings = require('./core/settings');
const migrations = require('./services/migrations');
const ns = config.require('namespace');
const settings = new Settings();
const inClusterDb = config.requireBoolean('inClusterDb')
const inClusterQueue = config.requireBoolean('inClusterQueue')
const servicesInstaller = new ServicesInstaller();
const {KindServices} = require('./kind-services') 
const ownsNginxConfig = config.requireBoolean('ownsNginxConfig')

const {SendGridInit} = require('./sendgrid/index')

const devNamespace = new k8s.core.v1.Namespace(ns, {
    metadata: {
        name: ns,
    },
});



const kindServices = new KindServices()

if(ownsNginxConfig){
   kindServices.patchNginx()
}


 let pgsql = null

if (inClusterDb) {
    pgsql =  require('./postgres/index')(devNamespace)
    kindServices.installKindPostgresServices(ns)
}

migrations(ns, pgsql);

if (inClusterQueue) {
    require('./rmq/index')(devNamespace)
    kindServices.installKindRmqServices(ns)
}

require('./regcred/index')(devNamespace)
require('./crt-mngr/index')(devNamespace, ns)

storageBuilder.build(ns);

new SendGridInit().init(ns)

let topDomain = ingressGeneratorCloudFlare.createDns();

settings.generate(ns, devNamespace);

ingressGeneratorCloudFlare.createSystemIngresses(topDomain);

var services = servicesInstaller.installServices(settings, ingressGeneratorCloudFlare, devNamespace);

services.forEach((item) => {
    serviceBuilder.createService(ns, item, settings, devNamespace, pgsql);
});

require('./jobs/logs-cleaner').createLogsCleaner(ns, settings, devNamespace)

module.exports = dns;