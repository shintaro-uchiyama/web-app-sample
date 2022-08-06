# 概要

React で記載された SPA

# 環境構築

## node 管理ツール

node の管理ツールとして[fnm](https://github.com/Schniz/fnm)をインストール  
これによりプロジェクト内で同一の node, npm package version を利用できます

1. 実行環境に応じて[fnm をインストール](https://github.com/Schniz/fnm#installation)
1. 実行環境に応じて[Shell のセットアップ](https://github.com/Schniz/fnm#installation)

以下の通りコマンド実行

```sh
$ cat .node-version
17.5.0
$ fnm install
Installing Node v16.14.0 (x64)
$ fnm use
Using Node v16.14.0
$ node -v
v16.14.0
```

## package の更新

手間ですが以下２点実施ください

1. ホスト環境で以下コマンド実施
   1. `npm install package`を実行
   1. VSCode で依存を理解するため
1. docker 環境に package 反映するために以下コマンド実行
   1. `docker compose up -d --build`

docker の image を最小にしたいので Remote Containers は使用せず  
ホストとコンテナ環境の程よい調和を目指します
