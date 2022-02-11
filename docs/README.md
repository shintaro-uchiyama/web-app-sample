# 概要

開発に関する資料を格納したディレクトリ

# 資料の閲覧方法

## ブラウザ

main branch に push すると  
以下 GitHub Pages に反映されます
https://shintaro-uchiyama.github.io/web-app-sample/

## 静的ファイルの出力

`make generate-html`を実行すれば  
`output/html`ディレクトリにドキュメント参照のための html ファイル群が出力されます

# 資料作成方法

基本的には md を書くだけで良いが  
一部工夫が必要な点を明記

## UML について

シーケンス図やクラス図などを記載する場合は  
xxx.template.md の拡張子ファイル内で[mermaid](https://mermaid-js.github.io/mermaid/#/)記法で作成すると  
GithubActions で画像生成、その画像を参照した md ファイルの出力まで行われます

`make generate-mermaid-image`で手動生成することも可能です
