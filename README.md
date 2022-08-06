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

### IDE の設定

IDE は Visual Studio Code の利用を想定  
まずは[Visual Studio Code](https://code.visualstudio.com/)をインストール

#### ワークスペース起動

1. File -> Open Workspace from File...で、本リポジトリの`web-app-sample.code-workspace`を選択
1. extentions で@recommended 入力して全てインストール

### アプリケーション起動

```zsh
cd src
make init
```

### アクセス

ブラウザで以下アクセスすると対象ページを閲覧できます  
`http://docker-vm.local:3000/`
