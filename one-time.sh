#!/bin/bash

#nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source ~/.bashrc
nvm install node


#kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

#pulumi 
curl -fsSL https://get.pulumi.com | sh

#azure
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

#cert manager plugin
curl -L -o kubectl-cert-manager.tar.gz https://github.com/jetstack/cert-manager/releases/latest/download/kubectl-cert_manager-linux-amd64.tar.gz
tar xzf kubectl-cert-manager.tar.gz
sudo mv kubectl-cert_manager /usr/local/bin

#ngrok 
sudo apt-get update
sudo apt-get install -y unzip wget jq
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
sudo mv ./ngrok /usr/bin/ngrok

#stripe 
curl -L -o stripe_1.7.3_linux_x86_64.tar.gz  https://github.com/stripe/stripe-cli/releases/download/v1.7.3/stripe_1.7.3_linux_x86_64.tar.gz
tar xzf stripe_1.7.3_linux_x86_64.tar.gz
sudo mv ./stripe /usr/local/bin/stripe

#setup
npm i -g yarn
yarn

