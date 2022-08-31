# 概要

web アプリケーションの遊び場

## 前提条件

Mac M1 想定

## 環境構築

Docker Desktop を使わずに Docker 利用したいので  
Multipass で ubuntu 環境を作成し、そこでアプリケーション開発を行う

### 必要なツールのインストール

#### Multipass

[公式ページ](https://multipass.run/install)に準じて インストール  
Multipass で Docker Engine を動作させるための Ubuntu 環境構築

参考）

```zsh
$ make install-multipass
$
$ multipass version
multipass   1.10.1+mac
multipassd  1.10.1+mac
```

#### Docker

[公式ページ](https://docs.docker.com/engine/install/binaries/#install-client-binaries-on-macos)に準じて Binary をインストール  
Docker Desktop は一定条件以上で有償になっちゃったので使わない

参考）以下コマンド実行で 20.10.17 のバージョンがインストールできます

```zsh
$ make install-docker
$
$ docker version
Client:
 Version:           20.10.17
```

#### Docker Compose

[公式ページ](https://docs.docker.com/compose/install/compose-plugin/#install-the-plugin-manually)に準じて Binary をインストール

参考）以下コマンド実行で 2.8.0 のバージョンがインストールできます

```zsh
$ make install-docker-compose
$
$ docker compose version
Docker Compose version v2.8.0
```

### Multipass を起動

以下コマンドで Multipass 起動

```zsh
make launch
```

### Multipass の設定

#### dockerコマンドAlias設定

MultipassのAliasコマンド設定

```zsh
multipass alias "docker-vm:docker compose" "docker compose"
multipass alias docker-vm:docker docker
```

`~/.zshrc`に以下の通りMultipass Aliasへのパスを追加

```zsh
export PATH="$HOME/Library/Application Support/multipass/bin:$PATH"
```

zshの再読み込み  
docker composeコマンドが実行できればOK!

```zsh
$ source ~/.zshrc
$ cd src
$ docker compose ps
NAME                COMMAND             SERVICE             STATUS              PORTS
```

#### ubuntu 用のツールのインストール

以下コマンドで Multipass に接続

```zsh
multipass shell docker-vm
```

以下コマンドで ubuntu に必要なツールをインストール

```bash
bash install-tools.bash
```

#### ubuntu 開発環境構築

ubuntu 上から GitHub にアクセスするために  
前項で出力された公開鍵を GitHub に登録

そして以下コマンドを実行

```bash
ghq get git@github.com:shintaro-uchiyama/dotfiles.git
cd /home/ubuntu/.ghq/github.com/shintaro-uchiyama/dotfiles/ubuntu
make setup-bash
source ~/.bashrc
```

### IDE の設定

IDE は Visual Studio Code の利用を想定  
まずは[Visual Studio Code](https://code.visualstudio.com/)をインストール

#### Remote SSH 接続

VSCode の Remote Explorer で Multipass の ubuntu 環境に接続する

↓ こんな感じで作成した ubuntu 環境に接続できる  
`ssh -i ~/~/.ssh/id_ed25519 ubuntu@docker-vm.local -A`

時折無限ループして接続できない時あるので  
Mac上の`~/.ssh/known_hosts`の対象ホスト削除したり  
Multipass上の`~/.vscode-server/bin/`下のファイルを削除したり  
あの手この手してると接続できるようになったりする

本当は Mac 上で VSCode のファイルを読み込み使用したいが  
React, Go 共にファイル変更を検知する Hot Reload が動かないので  
やむを得ず、Remote SSH で Multipass 上の ubuntu に接続し開発を行う

Multipass の mount で Mac 上のファイル変更は ubuntu 上にも反映されているが  
Hot Reload がファイル変更を検知せず、即時反映されない...

#### ワークスペース起動

1. File -> Open Workspace from File...で、マウントされた本リポジトリの`web-app-sample.code-workspace`を選択
1. extensions で@recommended 入力して全てインストール

### アプリケーション起動

```zsh
cd src
make init
```

### アクセス

ブラウザで以下アクセスすると対象ページを閲覧できます  
`http://docker-vm.local:3000/`
