# 概要

web アプリケーションの遊び場

## 前提条件

Mac M1 想定

## 環境構築

まずはこのリポジトリを Mac に Clone

### Multipass を起動

Docker Desktop を使わずに Docker 利用したいので  
Multipass で ubuntu 環境を作成し、そこでアプリケーション開発を行う  
以下コマンドで一通り設定実施

```zsh
make launch

# 以降は以下コマンドでMultipass接続できます
make connect
```

### GitHub 操作関連で必要なツールの導入

以下 Multipass 上での操作想定

```bash
bash build-git.bash
```

### GitHub へ公開鍵の登録

前項で出力された公開鍵を GitHub に登録  
以下コマンドで`You've successfully authenticated`が出たら OK!

```bash
ssh -T git@github.com
```

### ターミナル環境の拡充

GitHub で管理している dotfiles を用いて各種設定

```bash
ghq get git@github.com:shintaro-uchiyama/dotfiles.git
cd .ghq/github.com/shintaro-uchiyama/dotfiles/
```

### 本リポジトリの clone

```bash
ghq get git@github.com:shintaro-uchiyama/web-app-sample.git
```

```zsh
multipass transfer scripts/setup/build-git.bash docker:.
multipass shell docker
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
