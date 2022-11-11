#!/bin/zsh

multipassIP=$(multipass list | awk '{print $3}' | head -n 2 | tail -n 1)

if [ -z ${multipassIP} ]; then
  echo "multipass instance not found"
  exit 1
fi

touch ~/.ssh/config

if ! grep 'Host docker-vm.local' ~/.ssh/config; then
  cat <<EOS >>~/.ssh/config
  Host docker-vm.local
    User ubuntu
    HostName docker-vm.local
    IdentityFile ~/.ssh/id_ed25519
EOS
  echo "host docker-vm.local is added"
fi

if ! grep 'AddKeysToAgent yes' ~/.ssh/config; then
  cat <<EOS >>~/.ssh/config

  Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
EOS
  echo "omit passphrase setting added"
fi
