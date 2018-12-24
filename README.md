# wasm-bindgen-with-worker

Rustをフロントエンドで使用するための実験リポジトリ


## やりたいこと

WebAssemblyでの高速な処理を下記の条件で行いたい。

- JSON形式でやりとりできること
- 非同期処理であること


## 使用技術

- Rust
- TypeScript
- parcel-bundler


## メモ

### webpack or parcel

RustをWebWorkerから呼び出す場合、どちらのバンドラも少し工夫が必要である。
なお、parcelでは、parcel-plugin-wasm.rsプラグインを使用する

#### webpackでの課題点

- エントリーポイントを2つ用意しなければならない（worker-loader + wasmのバグ）
  - [Cannot import wasm in web workers #7647](https://github.com/webpack/webpack/issues/7647)
- 中間ファイル生成（Rust→wasm）が面倒で、ビルドタスクがごちゃごちゃになる

#### parcelでの課題点

- <s>Rust側からJavaScriptのコードが呼び出せない？（要検証）</s> 呼び出せた。
  - ただし、相対パスは`node_modules/parcel-plugin-wasm.rs/`が基準
  - Worker内での実行のため、DOM操作などはできない
- Worker読み込み完了後〜wasm読み込み完了の間に処理が書けない
- Tree Shaking（`--experimental-scope-hoisting`オプション）で実行時エラー

#### 共通の課題点
- ライブリロード
  - webpackでは、ワンテンポ遅いタイミングでページ全体のリロードがされる
    - 遅くてイライラ
  - parcelでは、一応差分更新を試みてくれる
    - Rust更新時は反映されない
    - JS更新時はworkerイベントが重複する
