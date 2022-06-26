#!/bin/zsh

# launch multipass
if ! multipass list | grep docker-vm; then
  multipass launch --name docker-vm --cpus 4 --mem 8G --disk 20G --cloud-init cloud-config-arm64.yaml 20.04
  multipass mount /Users docker-vm:/Users
  multipass mount /private/tmp docker-vm:/tmp
fi

# create docker context
DOCKER_VM_IP=$(multipass info docker-vm --format json | jq -r '.info["docker-vm"].ipv4[0]')
if ! docker context ls | grep docker-vm; then
  docker context create docker-vm --docker "host=tcp://${DOCKER_VM_IP}:2375"
  docker context use docker-vm
else
  docker context update docker-vm --docker "host=tcp://${DOCKER_VM_IP}:2375"
fi

# update /etc/hosts
HOSTS="docker-vm.local"
HOSTS_ENTRY="$DOCKER_VM_IP $HOSTS"
if grep -Fq "$HOSTS" /etc/hosts > /dev/null; then
    sudo sed -i '.bk' "s/.*$HOSTS$/$HOSTS_ENTRY/" /etc/hosts
    echo "/etc/hosts is updated"
else
    echo "$HOSTS_ENTRY" | sudo tee -a /etc/hosts
    echo "/etc/hosts is added"
fi