#!/bin/zsh

if [ ! -e ~/.ssh/id_ed25519.pub ]; then
  read "?Please input email: " email
  if [ -z $email]; then
    echo 'email is required'
    exit 1
  fi

  ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C $email
fi

if ! grep "export MULTIPASS_PUB_KEY=" ~/.zshenv; then
  echo "export MULTIPASS_PUB_KEY='$(cat ~/.ssh/id_ed25519.pub)'" >>~/.zshenv
  source ~/.zshenv
fi

envsubst <cloud-config-arm64.yaml.template >cloud-config-arm64.yaml

if ! multipass list | grep docker-vm; then
  # Launch
  multipass launch --name docker-vm --cpus 4 --mem 8G --disk 20G --cloud-init cloud-config-arm64.yaml 20.04

  # Volume mount
  multipass mount /Users docker-vm:/Users

  # Set docker host
  dockerVMIP=$(multipass info docker-vm --format json | jq -r '.info["docker-vm"].ipv4[0]')
  if grep docker-vm.local /etc/hosts; then
    sudo sed -i "" -E "s/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\ docker-vm.local$/${dockerVMIP} docker-vm.local/g" /etc/hosts
    echo "update docker-vm.local ip"
  else
    echo "${dockerVMIP} docker-vm.local" | sudo tee -a /etc/hosts
    echo "add docker-vm.local ip"
  fi

  # Copy install tool script file
  multipass transfer scripts/setup/install-tools.bash docker-vm:.
fi
