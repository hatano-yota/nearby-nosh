## NEARBY NOSH

### コンセプト
現在地から、近くの飲食店を探すことができる。

### 機能一覧
- 現在地取得：Geolocation APIを使用して、現在地を取得する。
- レストラン検索：ホットペッパーグルメサーチAPIを使用して、現在地周辺の飲食店を検索する。
- レストラン情報取得：ホットペッパーグルメサーチAPIを使用して、飲食店の詳細情報を取得する。

### 画面一覧
- 検索結果画面 ：検索結果の飲食店を一覧表示する。
- 店舗詳細画面 ：飲食店の詳細情報を表示する。

### こだわったポイント
Web APIへのアクセス方法は様々試行錯誤しました。

### デザイン面でこだわったポイント
Uber Eatsのサイトを参考にしながら、見やすいデザインになるよう心がけました。

### アドバイスして欲しいポイント
データ取得の要件決定（CSRにするかSSRにするかなど）、実装に試行錯誤しました。
どのように要件を決定するか、と改善すべきロジックについてアドバイスを頂きたいです。

現在地の取得に長い時間がかかる場合があります。
より良い現在地の取得方法、APIへのアクセス方法があれば教えていただきたいです。

固有の価値として、〇〇と言えばこのお店！！といった知見を蓄積して表示することを考えました。
その場合、店舗ID、〇〇の情報、評価ポイント、評価者のID、といったテーブルを作成してデータ管理する必要があると思います。
どのような設計が好ましいのか考え方や考慮すべきポイントなども教えていただきたいです。

### 自己評価
2週間あるため、良いものを作ろうとワクワクしていたが、あまり時間が取れず必須要件の実装で手一杯になってしまった。
アプリ固有の価値を付加する部分まで実装できず残念だが、最近あまり触れられていなかった、フロントエンドの実装ができ、楽しさを再確認できた。

## Vercel
https://nearby-nosh-hatano-yota.vercel.app/

## GitHub
https://github.com/hatano-yota/restaurant-searcher

## 画面設計書
https://drive.google.com/file/d/1ufXhnmlk0rsojpWDW6CekJMZvuEk-Xpp/view?usp=sharing

## 仕様書
https://docs.google.com/spreadsheets/d/1NEq27NHitvXTWj6p7XVTJ1PtqwxQEYhOBntLQbjzud8/edit?usp=sharing

## 開発環境
### 開発環境
Visual Studio Code <br />
Node.js v18.16.0                                                                                      

### 開発言語
TypeScript

### フレームワーク
Next.js 14.0.3

### Web　API
- ホットペッパーグルメサーチAPI
- Geolocation API

### ライブラリ
- eslint
- prettier
- cspell
- daisyui
- tailwindcss
- axios
- swr
- recoil

### 動作確認済みOS
macOS 14.1.1

### 動作確認済みブラウザ
Chromium 120.0.6099.71

### 開発期間
2週間

