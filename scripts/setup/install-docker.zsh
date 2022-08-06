#!/bin/zsh

curl -L https://download.docker.com/mac/static/stable/aarch64/docker-20.10.17.tgz -o /tmp/docker-20.10.17.tgz
cd /tmp
tar xzvf /tmp/docker-20.10.17.tgz
xattr -rc docker
sudo cp docker/docker /usr/local/bin/