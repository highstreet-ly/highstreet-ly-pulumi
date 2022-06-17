'use strict';
const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const issuer = config.require('issuer');
const ns = config.require("namespace");

class OperatorIngressGenerator {
    createIngress() {

        let domains = [
        //     {
        //     domain: 'sdktest.xyz',
        //     slug: 'town-shop-10-five-oaks-way'
        // }
    ]

        let annotations = {};

        annotations['kubernetes.io/ingress.class'] = 'nginx';
        annotations["nginx.org/redirect-to-https"] = 'true';
        annotations["cert-manager.io/issuer"] = issuer;
        annotations['pulumi.com/timeoutSeconds'] = '600';
        annotations['pulumi.com/timeoutSeconds'] = '600';
        

        domains.forEach(domainConfig => {
            dns.certs.push(`crt-${domainConfig.slug}`);
            annotations['nginx.ingress.kubernetes.io/configuration-snippet'] = `more_set_headers "x-sonatribe-instance-slug: ${domainConfig.slug}";`;

            let ingress = new k8s.networking.v1beta1.Ingress(`${domainConfig.slug}-ingress`, {
                metadata: {
                    namespace: ns,
                    annotations: annotations,
                },
                spec: {
                    tls: [
                        {
                            hosts: [
                                domainConfig.domain
                            ],
                            secretName: `crt-${domainConfig.slug}`
                        }
                    ],
                    rules: [{
                        host: domainConfig.domain,
                        http: {
                            paths: [{
                                backend: {
                                    serviceName: 'sonaticket-shop',
                                    servicePort: 80
                                }
                            }]
                        }
                    }]
                }
            });
        })
    }
}

module.exports = OperatorIngressGenerator;