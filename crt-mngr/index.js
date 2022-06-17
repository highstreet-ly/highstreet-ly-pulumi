const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const aRecord = config.require("aRecord");
const domainTld = config.require("domainTld");
const crds = require('./crds/nodejs')
const ns = config.require('namespace');
const issuer = config.require('issuer')
const certManagerNamespace = config.require('certManagerNamespace')

module.exports = function (devNamespace, ns) {

    var secret = new k8s.core.v1.Secret(`cloudflare-api-token-secret-${ns}`, {
        metadata: {
            namespace: ns,
            name: `cloudflare-api-token-secret-${ns}`
        },
        type: 'Opaque',
        stringData: { 'api-token': 'mObwe4eqgX84LZwQ8AMz53nmJVkS7kd7PY8reWds' }
    })

    const stagingIssuer = new crds.certmanager.v1.Issuer(`cf-staging-${ns}`, {
        metadata: {
            namespace: ns,
            name: `cf-staging-${ns}`,
        },
        spec: {
            acme: {
                server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
                email: ' wayne@highstreet.ly',
                privateKeySecretRef: {
                    name: 'cf-staging-acme-private-key',
                },
                solvers: [{
                    dns01: {
                        cloudflare: {
                            email: 'wayne@highstreet.ly',
                            apiTokenSecretRef: {
                                name:  `cloudflare-api-token-secret-${ns}`,
                                key: 'api-token',
                            }
                        }
                    },
                }],
            }
        },
    });

    const prodIssuer = new crds.certmanager.v1.Issuer(`cf-prod-${ns}`, {
        metadata: {
            namespace: ns,
            name: `cf-prod-${ns}`,
        },
        spec: {
            acme: {
                server: 'https://acme-v02.api.letsencrypt.org/directory',
                email: ' wayne@highstreet.ly',
                privateKeySecretRef: {
                    name: 'cf-prod-acme-private-key',
                },
                solvers: [{
                    dns01: {
                        cloudflare: {
                            email: 'wayne@highstreet.ly',
                            apiTokenSecretRef: {
                                name: `cloudflare-api-token-secret-${ns}`,
                                key: 'api-token',
                            }
                        }
                    },
                }],
            }
        },
    });

    const certificate = new crds.certmanager.v1.Certificate('ids-secret', {
        metadata: { namespace: ns },
        spec: {
            secretName: 'ids-secret',
            dnsNames: [`jwt.ids.${aRecord}.${domainTld}`],
            issuerRef: {
                name: issuer,
                kind: 'Issuer',
                group: 'cert-manager.io'
            },
            usages: [
                'digital signature',
                'key encipherment'
            ]
        },
    });

}