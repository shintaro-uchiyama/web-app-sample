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

# install necessary packages
## remove file to avoid apt error
sudo mv /etc/apt/sources.list.d/docker.list /tmp/docker.list.bk

sudo apt update
sudo apt install \
  make \
  peco \
  python3-pip \
  neovim \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# install docker and docker-compose

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# output pub key to register github
cat ~/.ssh/id_ed25519_docker.pub
