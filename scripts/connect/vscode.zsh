#!/bin/zsh

multipassIP=`multipass list | awk '{print $3}' | tail -n 1`

if [ -z ${multipassIP} ]; then
  echo "multipass instance not found"
  exit 1
fi

if grep 'Host multipass-docker' ~/.ssh/config; then
  echo "host multipass-docker already exist"
  exit 1
fi

cat << EOS >> ~/.ssh/config

Host multipass-docker
  User ubuntu
  HostName ${multipassIP}
  IdentityFile ~/.ssh/id_ed25519
EOS