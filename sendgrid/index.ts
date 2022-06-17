
import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
const config = new pulumi.Config("sonaticket");

export class SendGridInit{
    init(ns: string){
        var secret = new k8s.core.v1.Secret("sendgrid-secret", {
            metadata: {
                namespace: ns,
                name: "sendgrid-secret"
            },
            stringData: {
                "token": config.require('sendGridKey')
            }
        })
    }
}