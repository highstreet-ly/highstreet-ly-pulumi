const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");


module.exports = function (ns) {
    return new k8s.core.v1.ConfigMap('appsettings-hs-feeds', {
        metadata: {
            namespace: ns,
        },
        data: {
            "appsettings.json": JSON.stringify({})
        }
    });
}
