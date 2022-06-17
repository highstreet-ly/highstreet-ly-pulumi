'use strict';
const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");

const domainTld = config.require("domainTld");
const issuer = config.require('issuer');
const namespace = config.require("namespace");
const serverIp = config.require('serverIp');
const cloudflare = require("@pulumi/cloudflare");

require('./global');

let topDomain
let zne

class IngressGeneratorCloudFlare {

    createDns() {

        zne = new cloudflare.Zone(`${domain}.${domainTld}`, {
            zone: `${domain}.${domainTld}`,
        });

        topDomain = new cloudflare.Record(`${domain}.${domainTld}`, {
            zoneId: zne.id,
            name: `${domain}.${domainTld}`,
            value: serverIp,
            type: "A",
            ttl: 60,
        });

        // new cloudflare.Record(`aspmx.l.google.com`, {
        //     zoneId: zne.id,
        //     name: `aspmx.l.google.com`,
        //     value: topDomain.name,
        //     type: "MX",
        //     ttl: 60,
        // });

        // new digitalocean.DnsRecord(`aspmx.l.google.com.`, {
        //     domain: topDomain.name,
        //     type: "MX",
        //     name: `@`,
        //     value: "aspmx.l.google.com.",
        //     priority: 1,
        //     ttl: 60
        // }, {
        //     dependsOn: [topDomain]
        // });

        // dns.store.push(`aspmx.l.google.com.`);

        // new digitalocean.DnsRecord(`alt1.aspmx.l.google.com.`, {
        //     domain: topDomain.name,
        //     type: "MX",
        //     name: `@`,
        //     value: "alt1.aspmx.l.google.com.",
        //     priority: 1,
        //     ttl: 60
        // }, {
        //     dependsOn: [topDomain]
        // });

        // dns.store.push(`alt1.aspmx.l.google.com.`);

        // new digitalocean.DnsRecord(`alt2.aspmx.l.google.com.`, {
        //     domain: topDomain.name,
        //     type: "MX",
        //     name: `@`,
        //     value: "alt2.aspmx.l.google.com.",
        //     priority: 5,
        //     ttl: 60
        // }, {
        //     dependsOn: [topDomain]
        // });

        // dns.store.push(`alt2.aspmx.l.google.com.`);

        // new digitalocean.DnsRecord(`alt3.aspmx.l.google.com.`, {
        //     domain: topDomain.name,
        //     type: "MX",
        //     name: `@`,
        //     value: "alt3.aspmx.l.google.com.",
        //     priority: 10,
        //     ttl: 60
        // }, {
        //     dependsOn: [topDomain]
        // });

        // dns.store.push(`alt3.aspmx.l.google.com.`);

        // return topDomain;
    }

    createSystemIngresses(topDomain) {
        // // blog is external
        new cloudflare.Record(`blog`, {
            zoneId: zne.id,
            name: `blog`,
            value: "109.74.195.84",
            type: "A",
            ttl: 60,
        },{
            dependsOn: [topDomain, zne]
        });
        
        new cloudflare.Record(`process`, {
            zoneId: zne.id,
            name: `process`,
            value: "109.74.195.84",
            type: "A",
            ttl: 60,
        },{
            dependsOn: [topDomain, zne]
        });
    }

    getDns() {
        return dns.store;
    }

    createIngress(subDomain, servicename, serviceport, extrapaths, ingressNs) {

        let renderdDomain = `${subDomain}${domain}.${domainTld}`;

        if (subDomain) {
            new cloudflare.Record(renderdDomain, {
                zoneId: zne.id,
                name: subDomain.slice(0, -1),
                value: '@',
                type: "CNAME",
                ttl: 60,
            },{
                dependsOn: [topDomain, zne]
            });

            dns.store.push(subDomain);
        }

        let paths = [];

        if (!extrapaths) {
            paths = [
                {
                    backend: {
                        serviceName: servicename,
                        servicePort: serviceport
                    }
                }
            ];
        } else {
            extrapaths.forEach(p => {
                paths.push({
                    path: p.path,
                    backend: {
                        serviceName: p.backendService ? p.backendService : servicename,
                        servicePort: 80
                    }
                });
            });
        }

        let annotations = {};

        annotations['kubernetes.io/ingress.class'] = 'nginx';
        annotations["nginx.org/redirect-to-https"] = 'true';
        annotations["cert-manager.io/issuer"] = issuer;
        annotations['pulumi.com/timeoutSeconds'] = '600';

        dns.certs.push(`crt-${renderdDomain}`);

        let ingress = new k8s.networking.v1beta1.Ingress(`${renderdDomain}-ingress`, {
            metadata: {
                namespace: ingressNs ? ingressNs : namespace,
                annotations: annotations,
            },
            spec: {
                tls: [
                    {
                        hosts: [
                            renderdDomain
                        ],
                        secretName: `crt-${renderdDomain}`
                    }
                ],
                rules: [{
                    host: renderdDomain,
                    http: {
                        paths: paths
                    }
                }]
            }
        }, {
            dependsOn: [topDomain]
        });
    }
}

module.exports = IngressGeneratorCloudFlare;