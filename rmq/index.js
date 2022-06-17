const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const ns = config.require('namespace');

module.exports = function (devNamespace) {


    var rmqlHelm = new k8s.helm.v3.Release("rmq-helm", {
        namespace: devNamespace.metadata.name,
        metadata: {
            namespace: devNamespace.metadata.name,
        },
        chart: "rabbitmq",
        repositoryOpts: {
            repo: "https://charts.bitnami.com/bitnami",
        },
        name: 'sonatribe-rabbitmq',
        // version: "3.9.7",
        values: {
            auth: {
                username: 'sonatribe',
                password: 'sonatribe',
            },
            plugins: "rabbitmq_management rabbitmq_peer_discovery_k8s",
            configuration: `
            ## Username and password
            default_user = sonatribe
            default_pass = sonatribe
            ## Clustering
            cluster_formation.peer_discovery_backend  = rabbit_peer_discovery_k8s
            cluster_formation.k8s.host = kubernetes.default.svc.cluster.local
            cluster_formation.node_cleanup.interval = 10
            cluster_formation.node_cleanup.only_log_warning = true
            cluster_partition_handling = autoheal
            # queue master locator
            queue_master_locator = min-masters
            # enable guest user
            loopback_users.guest = false
            `
        },
        skipAwait: false,
    }, {
        dependsOn: [devNamespace]
    })

   return rmqlHelm

}
