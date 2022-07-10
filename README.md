# 概要

web アプリケーション作成の遊び場

## 前提条件

Mac M1 想定

## 環境構築

まずはこのリポジトリを Mac に Clone

### Multipass を起動

Docker Desktop を使わずに Docker 利用したいので  
Multipass で ubuntu 環境を作成し、そこでアプリケーション開発を行う

```zsh
make launch
```

### Multipass に接続

```zsh
make connect
```

### KeyPair の作成

Multipass から GitHub にアクセスしたいので SSH Key pair を作成  
Github に生成された公開鍵を登録

```zsh
ssh-keygen -t ed25519 -C "{{please input your email address}}"
cat ~/.ssh/id_ed25519.pub
```

### GitHub 操作を容易にするための ghq と fzf 導入

```zsh
multipass transfer scripts/setup/build-git.bash docker:.
multipass shell docker
```

```bash
bash build-git.bash
```

```bash
# install go
git clone https://github.com/udhos/update-golang
cd update-golang
sudo ./update-golang.sh
echo 'export PATH="/usr/local/go/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# install fzf
git clone https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
source ~/.bashrc

# install ghq
go install github.com/x-motemen/ghq@latest
git config --global ghq.root ~/.ghq
echo "alias cr='cd \$(ghq list -p | fzf --reverse)'" >> ~/.bash_aliases
source ~/.bash_aliases
echo 'export PATH="~/go/bin/:$PATH"' >> ~/.bashrc
source ~/.bashrc

# clone web-app-sample
ghq get git@github.com:shintaro-uchiyama/web-app-sample.git


###
multipass transfer scripts/setup/build-git.bash docker:.

# clone web-app-sample
ghq get git@github.com:shintaro-uchiyama/web-app-sample.git
```

## IDE の設定

IDE は Visual Studio Code の利用を推奨

1. [Visual Studio Code](https://code.visualstudio.com/)をインストール
1. File -> Add Folder to Workspace...で本リポジトリディレクトリを追加
1. Save Workspace as... でローカルマシンの適当な場所に workspace を保存
1. extentions で@recommended 入力して全てインストール
