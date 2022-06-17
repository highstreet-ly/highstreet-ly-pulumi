const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");

const config = new pulumi.Config("sonaticket");
const ns = config.require('namespace');

module.exports = function (devNamespace) {

    var secret = new k8s.core.v1.Secret("regcred", {
        metadata: {
            namespace: ns,
            name: "regcred"
        },
        type: 'kubernetes.io/dockerconfigjson',
        data: {
            ".dockerconfigjson": `eyJhdXRocyI6eyJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOnsidXNlcm5hbWUiOiJzb25hdHJpYmUiLCJwYXNzd29yZCI6IldpbGxpYW1GcmFua0dlb3JnZTIwMjAiLCJlbWFpbCI6IndheW5lQHNvbmF0cmliZS5jb20iLCJhdXRoIjoiYzI5dVlYUnlhV0psT2xkcGJHeHBZVzFHY21GdWEwZGxiM0puWlRJd01qQT0ifX19`
        },
    }, {
        dependsOn: [devNamespace]
    })
}