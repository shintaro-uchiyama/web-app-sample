# 概要

React で記載された SPA

## 環境構築

### node 管理ツール（fnm）

node の管理ツールとして[fnm](https://github.com/Schniz/fnm)を使用する事で  
プロジェクト内で同一の node, npm package version を利用

以下コマンドを実行することで必要なツールがインストールされます

```sh
make install-node
```

### package の更新

コンテナ内の`node_modules`は  
ホスト側の`node_modules`と同期されていないため  
`npm ci`や`npm install some-package`をする際は  
ホスト・コンテナ双方で実行してください

Docker の Base image に準じた依存関係を使用する目的のために  
上記手段を選択しました

VSCode を Remote Containers で Docker に接続させる選択肢も考えましたが  
docker の image を最小にして、軽量な開発環境を実現したいので使用をしておりません
