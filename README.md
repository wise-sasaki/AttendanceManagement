# AttendanceManagement
勤怠管理表

# DEMO
https://main.d2pb0yxg8xy3co.amplifyapp.com/resource/html/index.html

# Features
* ローカルで勤怠データを管理できる勤怠管理アプリケーションです。
* ユーザーデータや勤怠データはサーバーにはアップロードされず、ブラウザのindexedDBに保存されます。(ブラウザキャッシュをクリアすると消えるので注意)
* データ管理
  * 「JSONデータ読込」ボタン：JSONデータをローカル読込できます。
  * 「全データJSON出力」ボタン：JSONデータをローカル保存できます。
* 勤怠データ一覧：過去の勤怠データを選択します。
* 勤怠データ：過去の勤怠データを選択します。
  * 「定時一括入力」ボタン：開始時刻、終了時刻、休憩時間に自動入力できます。
  * 「保存」ボタン：入力情報をブラウザのindexedDBに保存します。
  * 「PDF出力」ボタン：現在表示中の勤怠データをPDFでダウンロードします。レイアウトは勤怠データ専用のものになります。
* 実装詳細
  * 画面の構成で動的に変更があるのは、勤怠データ選択リストと勤怠データテーブル部分だけでそれ以外の部分は静的資材のため、ボタンやテキストボックスなどのinput要素ごとにクラスが存在して、画面起動時にすべての機能の読込を全て行っています。
  * PDF出力：PDF生成ライブラリを使用するのではなく、CSSのメディアクエリを用いてprint専用のレイアウトを設定し、ブラウザの印刷機能を利用しているだけです。
  * レスポンシブ対応：スマホ対応のために画面サイズを調整しています。
  * 作ってて思ったけど、これエクセルで良くね？ってなる。作業時間の入力が操作性悪い。コピー＆ペーストがやりづらいのはよくない。
