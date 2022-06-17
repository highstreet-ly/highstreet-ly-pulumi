import * as k8s from "@pulumi/kubernetes";

export class KindServices {

    public patchNginx() {
        new k8s.core.v1.ConfigMap("ingress-nginx-controller", {
            apiVersion: "v1",
            data: {
                "fastcgi-buffer-size": "32k",
                "fastcgi-buffers": "16 16k",
                "hsts": "false",
                "large-client-header-buffers": "8 32k",
                "map-hash-bucket-size": "128",
                "proxy-buffer-size": "256k",
                "proxy-buffering": "on",
                "proxy-buffers": "4 256k",
                "proxy-busy-buffers-size": "256k",
                "proxy-read-timeout": "3600",
                "proxy-send-timeout": "3600",
            },
            kind: "ConfigMap",
            metadata: {

                labels: {
                    "app.kubernetes.io/managed-by": "pulumi",
                },
                name: "ingress-nginx-controller",
                namespace: "ingress-nginx",
            },
        }, {
            protect: true,
        });
    }

    public installKindRmqServices(ns: string) {
        new k8s.core.v1.Service('rmq-nodeport-5672', {
            metadata: {
                name: 'rmq-nodeport-5672',
                namespace: ns
            },
            spec: {
                selector: {
                    'app.kubernetes.io/instance': 'sonatribe-rabbitmq',
                    'app.kubernetes.io/name': 'rabbitmq',
                },
                type: 'NodePort',
                ports: [{
                    name: `rmq-nodeport-5672-port`,
                    protocol: 'TCP',
                    port: 5672,
                    nodePort: 30000
                }]
            }
        });

        new k8s.core.v1.Service('rmq-nodeport-15672', {
            metadata: {
                name: 'rmq-nodeport-15672',
                namespace: ns
            },
            spec: {
                selector: {
                    'app.kubernetes.io/instance': 'sonatribe-rabbitmq',
                    'app.kubernetes.io/name': 'rabbitmq',
                },
                type: 'NodePort',
                ports: [{
                    name: `rmq-nodeport-15672-port`,
                    protocol: 'TCP',
                    port: 15672,
                    nodePort: 30001
                }]
            }
        });

    }


    public installKindPostgresServices(ns: string) {

        new k8s.core.v1.Service('postgres-nodeport-5432', {
            metadata: {
                name: 'postgres-nodeport-5432',
                namespace: ns
            },
            spec: {
                selector: {
                    'app.kubernetes.io/instance': 'sonatribe-pgsql-postgresql',
                    'app.kubernetes.io/name': 'postgresql',
                    'role': 'master'
                },
                type: 'NodePort',
                ports: [{
                    name: `postgres-nodeport-5432-port`,
                    protocol: 'TCP',
                    port: 5432,
                    nodePort: 30002
                }]
            }
        });

    }
}