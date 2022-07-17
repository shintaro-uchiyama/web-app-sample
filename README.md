# 概要

web アプリケーションの遊び場

## 前提条件

Mac M1 想定

## 環境構築

### Multipass を起動｜ Mac

Docker Desktop を使わずに Docker 利用したいので  
Multipass で ubuntu 環境を作成し、そこでアプリケーション開発を行う  
以下コマンドで一通り設定実施

```zsh
make launch

# 以降は以下コマンドでMultipass接続できます
make connect
```

### GitHub 操作関連で必要なツールの導入｜ Multipass

前項のコマンドで初期設定に必要なスクリプトファイルが転送された状態で  
Multipassのubuntuに接続された状態となるので  
以下コマンドを実行してGitやDockerなど各種ツールをインストールする

```bash
bash install-tools.bash
source ~/.bashrc
```

### GitHub へ公開鍵の登録｜ Multipass

前項で出力された公開鍵を GitHub に登録  
以下コマンドで`You've successfully authenticated`が出たら OK!

```bash
ssh -T git@github.com
```

### ターミナル環境の拡充｜ Multipass

GitHub で管理している dotfiles を用いて各種設定

```bash
ghq get git@github.com:shintaro-uchiyama/dotfiles.git
cd .ghq/github.com/shintaro-uchiyama/dotfiles/ubuntu
make setup-bash
source ~/.bashrc
```

### 本リポジトリの clone ｜ Multipass

```bash
ghq get git@github.com:shintaro-uchiyama/web-app-sample.git
```

### IDE の設定｜ Mac

IDE は Visual Studio Code の利用を想定  
まずは[Visual Studio Code](https://code.visualstudio.com/)をインストール

#### Remote SSH 設定｜ Mac

以下コマンド実行して Remote SSH 接続のための設定ファイル生成

```bash
make create-remote-ssh
```

VSCode SideMenu の Remote Explore ボタンを押下  
`multipass-docker`にフォーカスで表示されるプラスウィンドウ押下して接続

#### ワークスペース起動

1. File -> Add Folder to Workspace...で本リポジトリディレクトリを追加
1. Save Workspace as... でローカルマシンの適当な場所に workspace を保存
1. extentions で@recommended 入力して全てインストール
