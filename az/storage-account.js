const pulumi = require("@pulumi/pulumi")
const azure = require("@pulumi/azure")
const k8s = require('@pulumi/kubernetes');


exports.build = (ns) => {

    var name = ns.replace(/-/g, '')

    const rg = new azure.core.ResourceGroup(`${name}`, {
        location: "West Europe",
    })

    const storage = new azure.storage.Account(`${name}`, {
        resourceGroupName: rg.name,
        location: rg.location,
        accountTier: "Standard",
        accountReplicationType: "GRS",
        allowBlobPublicAccess: false,
        tags: {
            environment: "staging",
        },
    })

    const payloadsContainer = new azure.storage.Container("payloads", {
        name: "payloads",
        storageAccountName: storage.name,
        containerAccessType: "private",
    })

    var secret = new k8s.core.v1.Secret("payload-secret", {
        metadata: {
            namespace: ns,
            name: "payload-secret"
        },
        stringData: {
            "connection": storage.primaryBlobConnectionString,
        }
    })

    return secret

}
