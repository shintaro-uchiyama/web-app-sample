#!/bin/zsh

if ! multipass list | grep docker-vm; then
  multipass launch --name docker-vm --cpus 4 --mem 8G --disk 20G --cloud-init cloud-config-arm64.yaml 20.04
  multipass mount /Users docker-vm:/Users
  multipass mount /private/tmp docker-vm:/tmp
fi

if ! docker context ls | grep docker-vm; then
  docker context create docker-vm --docker "host=tcp://$(multipass info docker-vm --format json | jq -r '.info["docker-vm"].ipv4[0]'):2375"
  docker context use docker-vm
else
  docker context update docker-vm --docker "host=tcp://$(multipass info docker-vm --format json | jq -r '.info["docker-vm"].ipv4[0]'):2375"
fi

