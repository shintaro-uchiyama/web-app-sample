#!/bin/zsh

dockerVMIP=$(multipass info docker-vm --format json | jq -r '.info["docker-vm"].ipv4[0]')
docker context update docker-vm --docker "host=ssh://ubuntu@docker-vm.local"
if grep docker-vm.local /etc/hosts; then
    sudo sed -i "" -E "s/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]\ docker-vm.local/${dockerVMIP} docker-vm.local/g" /etc/hosts
    echo "update docker-vm.local ip"
else
    echo "${dockerVMIP} docker-vm.local" | sudo tee -a /etc/hosts
    echo "add docker-vm.local ip"
fi
