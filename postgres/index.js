const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");

const ns = config.require('namespace');

module.exports = function (devNamespace) {

    var initDbConfigMap = new k8s.core.v1.ConfigMap('postgres', {
        metadata: {
            namespace: devNamespace.metadata.name,
        },
        timeout: 600,
        data: {
            "init.sql": `
                CREATE USER stUser WITH ENCRYPTED PASSWORD 'Sonatribe2020';
                CREATE USER sonaticket WITH ENCRYPTED PASSWORD 'Sonatribe2020';
                CREATE DATABASE ${domain}_${domainTld}_ids with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_payments with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_ticket_management with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_ticket_reservations with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_permissions with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_vault with owner sonaticket;
                CREATE DATABASE ${domain}_${domainTld}_scheduler with owner sonaticket;
            `
        },
    }, {
        dependsOn: [devNamespace]
    });

    const initDbConfigMapName = initDbConfigMap.metadata.apply(m => m.name);

    var pgsqlHelm = new k8s.helm.v3.Release("pgsql-helm", {
        namespace: devNamespace.metadata.name,
        metadata: {
            namespace: devNamespace.metadata.name,
        },
        name: 'sonatribe-pgsql-postgresql',
        chart: "postgresql",
        repositoryOpts: {
            repo: "https://charts.bitnami.com/bitnami",
        },
        version: "9.8.11",
        values: {
            initdbScriptsConfigMap: initDbConfigMapName,
            postgresqlPassword: 'Sonatribe2020'
        },
        skipAwait: false,
    }, {
        depensOn: [initDbConfigMap, devNamespace]
    })

    return  pgsqlHelm
}