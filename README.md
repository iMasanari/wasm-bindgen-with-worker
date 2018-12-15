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

#### webpackでのデメリット

- エントリーポイントを2つ用意しなければならない（worker-loader + wasmのバグ）
  - [Cannot import wasm in web workers #7647](https://github.com/webpack/webpack/issues/7647)
- 中間ファイル生成（Rust→wasm）が面倒で、ビルドタスクがごちゃごちゃになる

#### parcelでのデメリット

- ライブリロードされない
- Rust側からJavaScriptのコードが呼び出せない？（要検証）
- Worker読み込み完了後〜wasm読み込み完了の間に処理が書けない
- Tree Shaking（`--experimental-scope-hoisting`オプション）でエラー
