#!/bin/zsh

# launch multipass
if ! multipass list | grep docker; then
  multipass launch --name docker --cpus 4 --mem 8G --disk 20G --cloud-init cloud-config-arm64.yaml 20.04
  multipass mount /Users docker:/Users
  multipass mount /private/tmp docker:/tmp
fi

# create docker context
# DOCKER_VM_IP=$(multipass info docker --format json | jq -r '.info["docker"].ipv4[0]')
# if ! docker context ls | grep docker; then
#   docker context create docker --docker "host=tcp://${DOCKER_VM_IP}:2375"
#   docker context use docker
# else
#   docker context update docker --docker "host=tcp://${DOCKER_VM_IP}:2375"
# fi

# update /etc/hosts
# HOSTS="docker.local"
# HOSTS_ENTRY="$DOCKER_VM_IP $HOSTS"
# if grep -Fq "$HOSTS" /etc/hosts > /dev/null; then
#     sudo sed -i '.bk' "s/.*$HOSTS$/$HOSTS_ENTRY/" /etc/hosts
#     echo "/etc/hosts is updated"
# else
#     echo "$HOSTS_ENTRY" | sudo tee -a /etc/hosts
#     echo "/etc/hosts is added"
# fi