# highstreetly-pulumi

[![Deploy all of the things](https://github.com/sonaticket/highstreetly-pulumi/actions/workflows/test.yml/badge.svg)](https://github.com/sonaticket/highstreetly-pulumi/actions/workflows/test.yml)

## Install:

All of this can be ran inside of WSL if you're on Windows - you'll need docker installed first whichever way you run this (obviously).

> Most of this is one time install - if you're on a new machine or first time spinning all of this up.

### NVM

```

nvm install node
```

### Kind:
```
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

### Pulumi:

`curl -fsSL https://get.pulumi.com | sh`

### Azure CLI:

`curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash`

### Cert manager Kubectl plugin:

```
curl -L -o kubectl-cert-manager.tar.gz https://github.com/jetstack/cert-manager/releases/latest/download/kubectl-cert_manager-linux-amd64.tar.gz
tar xzf kubectl-cert-manager.tar.gz
sudo mv kubectl-cert_manager /usr/local/bin
```

### Create the Cloudflare and AZ credentials for use - or ask wayne - but you will need the following env vars:

```
export PULUMI_CONFIG_PASSPHRASE=XXXXXXX
export ARM_CLIENT_ID="38f5fb75-424a-4586-bef5-5e73911a7b3e"
export ARM_CLIENT_SECRET="cZ27Q~9RAI8yBOrZiKolDL-c-S7XOnRo0MkRB"
export ARM_TENANT_ID="0f8497c6-6f52-4bad-85d4-6155372dba18"
export ARM_SUBSCRIPTION_ID="630a763f-84eb-445a-95a6-1d1146bbecba"
export CLOUDFLARE_API_TOKEN=lYl0Zl3KEchBsYsmOjjdvukvHhjBl_QJbM10c_SX
```

### install yarn:

```
npm i -g yarn
```

### install the node deps:

```
yarn
```

### Install ngrok:

```
sudo apt-get update
sudo apt-get install unzip wget
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
sudo mv ./ngrok /usr/bin/ngrok
ngrok
```

### Install Stripe CLI

```
curl -L -o stripe_1.7.3_linux_x86_64.tar.gz  https://github.com/stripe/stripe-cli/releases/download/v1.7.3/stripe_1.7.3_linux_x86_64.tar.gz
tar xzf stripe_1.7.3_linux_x86_64.tar.gz
sudo mv ./stripe /usr/local/bin/stripe
```

### Login to ngrok 

> so you get the sticky domain that is already configured at chargebee - ask wayne for the <YOUR_AUTHTOKEN> or sign up for your own NGrok account and create your own - this will require extra config at the chargebee side

```
ngrok authtoken <YOUR_AUTHTOKEN>
```

### Login to stripe (you will need to be added to our org if you aren't already)

```
stripe login
```

### Create the cluster:

`kind create cluster --config=kind.yml`

### Install nginx ingress into the cluster:

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml`

metal:
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.3/deploy/static/provider/baremetal/deploy.yaml`

### Install cert-manager into the cluster:

`kubectl cert-manager x install`

### Login to Pulumi

`pulumi login`

### Select your stack

`pulumi stack select ****`

## Running things

Once the stack is up you'll want to start a couple of processes so that Chargebee and Stripe can call your webhooks:


### Fire up ngrok (ensure this is running all of the time you're using your local env)

> so you get the sticky domain that is already configured at chargebee - ask wayne for the <YOUR_AUTHTOKEN> or sign up for your own NGrok account and create your own - this will require extra config at the chargebee side

```
ngrok http https://api.dashboard.highstreetly.xyz --host-header=api.dashboard.highstreetly.xyz --subdomain=hightstreetly                  
```

### Fire up stripe (ensure this is running all of the time you're using your local env)

```
stripe listen --forward-to https://api.shop.highstreetly.xyz/api/v1/webhook
```


## Working with your cluster

TODO

## From this point on you only need to do this when you need to upgrade the services in your cluster to the latest versions.

> You should have a stack file called `Pulumi.<stack name>.yaml` in the root of this project. This is where you control what gets deployed into your cluster.

### Bring up the stack

`pulumi up -y`




kubectl get secret crt-ops.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.crt"]' | tr -d '"' | base64 -d  > ssl/wayne/ops/server.crt
kubectl get secret crt-ops.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.key"]' | tr -d '"' | base64 -d  > ssl/wayne/ops/server.key

kubectl get secret crt-dashboard.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.crt"]' | tr -d '"' | base64 -d  > ssl/wayne/dashboard/server.crt
kubectl get secret crt-dashboard.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.key"]' | tr -d '"' | base64 -d  > ssl/wayne/dashboard/server.key