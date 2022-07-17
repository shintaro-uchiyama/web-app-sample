#!/bin/bash

# generate ssh key
if [ ! -e ~/.ssh/id_ed25519_docker.pub ]; then
  read -p "Please input email: " email
  if [ -z $email]; then
    echo 'email is required'
    exit 1
  fi

  ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_docker -C $email

  cat << EOS > ~/.ssh/config
Host *
     IdentityFile ~/.ssh/id_ed25519_docker
EOS
fi

# install go
git clone https://github.com/udhos/update-golang
cd update-golang
sudo ./update-golang.sh
echo 'export PATH="/usr/local/go/bin:$PATH"' >> ~/.bashrc
eval "$(cat ~/.bashrc)"

# install fzf
git clone https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
eval "$(cat ~/.bashrc)"

# install ghq
go install github.com/x-motemen/ghq@latest
git config --global ghq.root ~/.ghq
echo "alias cr='cd \$(ghq list -p | fzf --reverse)'" >> ~/.bash_aliases
source ~/.bash_aliases
echo 'export PATH="~/go/bin/:$PATH"' >> ~/.bashrc
eval "$(cat ~/.bashrc)"

# output pub key
cat ~/.ssh/id_ed25519_docker.pub

# clone web-app-sample
# ghq get git@github.com:shintaro-uchiyama/web-app-sample.git