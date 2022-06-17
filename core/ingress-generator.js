'use strict';
const k8s = require('@pulumi/kubernetes');
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");

const domainTld = config.require("domainTld");
const issuer = config.require('issuer');
const namespace = config.require("namespace");
const serverIp = config.require('serverIp');
const digitalocean = require("@pulumi/digitalocean");

require('./global');

let topDomain

class IngressGenerator {

    createDns() {

        topDomain = new digitalocean.Domain(`${domain}.${domainTld}`, {
            name: `${domain}.${domainTld}`,
            ipAddress: serverIp,
            ttl: 60
        });

        new digitalocean.DnsRecord(`aspmx.l.google.com.`, {
            domain: topDomain.name,
            type: "MX",
            name: `@`,
            value: "aspmx.l.google.com.",
            priority: 1,
            ttl: 60
        }, {
            dependsOn: [topDomain]
        });

        dns.store.push(`aspmx.l.google.com.`);

        new digitalocean.DnsRecord(`alt1.aspmx.l.google.com.`, {
            domain: topDomain.name,
            type: "MX",
            name: `@`,
            value: "alt1.aspmx.l.google.com.",
            priority: 1,
            ttl: 60
        }, {
            dependsOn: [topDomain]
        });

        dns.store.push(`alt1.aspmx.l.google.com.`);

        new digitalocean.DnsRecord(`alt2.aspmx.l.google.com.`, {
            domain: topDomain.name,
            type: "MX",
            name: `@`,
            value: "alt2.aspmx.l.google.com.",
            priority: 5,
            ttl: 60
        }, {
            dependsOn: [topDomain]
        });

        dns.store.push(`alt2.aspmx.l.google.com.`);

        new digitalocean.DnsRecord(`alt3.aspmx.l.google.com.`, {
            domain: topDomain.name,
            type: "MX",
            name: `@`,
            value: "alt3.aspmx.l.google.com.",
            priority: 10,
            ttl: 60
        }, {
            dependsOn: [topDomain]
        });

        dns.store.push(`alt3.aspmx.l.google.com.`);

        return topDomain;
    }

    createSystemIngresses(topDomain) {

        // this.createIngress('kibana.', 'app-kibana-kb-http', 5601, null, namespace);
        //  this.createIngress('rmq-admin.', 'sonatribe-rabbitmq', 15672, null, namespace);
        // this.createIngress('consul.', 'hashicorp-consul-consul-ui', 80, null, 'hashicorp-consul');
        // this.createIngress('consul-lan.', 'hashicorp-consul-consul-ui', 8301, null, 'hashicorp-consul');
        // this.createIngress('consul-wan.', 'hashicorp-consul-consul-ui', 8302, null, 'hashicorp-consul');

        // the rook helm creates it's own ingress for now
        // new digitalocean.DnsRecord(`rook-ceph.${domain}.${domainTld}`, {
        //     domain: `${domain}.${domainTld}`,
        //     type: "CNAME",
        //     name: 'rook-ceph',
        //     value: "@",
        //     ttl: 60
        // }, {
        //     dependsOn: [topDomain]
        // });

        // blog is external
        new digitalocean.DnsRecord("blog", {
            domain: `${domain}.${domainTld}`,
            type: "A",
            value: "109.74.195.84",
            ttl: 60,
            name: "blog"
        }, {
            dependsOn: [topDomain]
        });

        new digitalocean.DnsRecord("process", {
            domain: `${domain}.${domainTld}`,
            type: "A",
            value: "109.74.195.84",
            ttl: 60,
            name: "process"
        }, {
            dependsOn: [topDomain]
        });


        // new digitalocean.DnsRecord("SPF", {
        //     domain: `${domain}.${domainTld}`,
        //     type: "TXT",
        //     value: `v=spf1 mx include:sendgrid.net ?all`,
        //     ttl: 60,
        //     // name: "v=spf1 mx include:sendgrid.net ?all"
        // }, {
        //     dependsOn: [topDomain]
        // });

        // dns.store.push(`rook-ceph.${domain}.${domainTld}`);
    }

    getDns() {
        return dns.store;
    }

    createIngress(subDomain, servicename, serviceport, extrapaths, ingressNs) {

        let renderdDomain = `${subDomain}${domain}.${domainTld}`;

        if (subDomain) {
            new digitalocean.DnsRecord(`${subDomain}${domain}.${domainTld}`, {
                domain: `${domain}.${domainTld}`,
                type: "CNAME",
                name: subDomain.slice(0, -1),
                value: "@",
                ttl: 60
            }, {
                dependsOn: [topDomain]
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

        // annotations["nginx.ingress.kubernetes.io/proxy-buffering"] = 'on';
        // annotations["nginx.ingress.kubernetes.io/configuration-snippet"] = `proxy_cache static-cache;
        // proxy_cache_valid 404 10m;
        // proxy_cache_use_stale error timeout updating http_404 http_500 http_502 http_503 http_504;
        // proxy_cache_bypass $http_x_purge;
        // add_header X-Cache-Status $upstream_cache_status;`;


        //if (wss) {
        // annotations["nginx.ingress.kubernetes.io/proxy-read-timeout"] = 3600;
        // annotations["nginx.ingress.kubernetes.io/proxy-send-timeout"] = 3600;
        // }

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

module.exports = IngressGenerator;