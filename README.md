# Hike up

スポーツの画像、動画投稿サイトです。<br >
スポーツ中の画像や練習中の動画を共有するサイトです。 <br >
<img width="700" alt="スクリーンショット 2020-05-07 0 06 18" src="https://user-images.githubusercontent.com/51771217/110198889-f4ac6680-7e98-11eb-934b-0231632515b9.png">
<img width="350" src= "https://user-images.githubusercontent.com/51771217/110199122-22de7600-7e9a-11eb-8d24-ef2abf3e9dad.png">　<img width="342" src= "https://user-images.githubusercontent.com/51771217/110199164-620cc700-7e9a-11eb-951b-a4d102c6d5e7.png">

# URL

https://hike-up.work/login <br >
ゲストユーザーログインボタンから、メールアドレスとパスワードを入力せずにログインできます。

# 特に見ていただきたい点

- インフラ面
  - Docker を使い ECR(FARGATE)/ECR で本番環境をサーバーレスで運用している。
  - CircleCI を使い、CI／CD パイプラインを構築している。
  - AWS を使い、ALB を通す事で SSL 通信を行っている。
- バックエンド面
  - データベースの正規化を意識したテーブル設計を行なっている。
  - devise を使用したログイン認証を実装している。
- フロントエンド面
  - React.js を採用し、SPA 化している。
  - マテリアルデザインを意識し、こだわりを持って UI をデザインしている。
- その他
  - チーム開発を意識し、Github flow に従った開発手法を取り入れている点。

# AWS 構成図

<img width="995" alt="スクリーンショット 2020-05-07 11 14 01" src="https://user-images.githubusercontent.com/51771217/110199325-3f2ee280-7e9b-11eb-87e8-0b3b941277c2.png">

# 使用技術

- フロントエンド
  - React.js :
- バックエンド
  - Ruby : 2.6.6
  - Ruby on Rails : 6.0.3.4
- データベース
  - MySQL : 5.7
- インフラ
  - AWS(ECS(Fargate)、ECR、RDS,S3、ALB、Route53、IAM、ACM、SystemManager）
- その他
  - Docker/Doker-compose
  - CircleCI：2.1（CI/CD)

# 機能一覧

- ユーザー登録、ログイン機能(devise)
- 投稿機能
  - 画像投稿（AWS の S3 へ保存)
- いいね機能
  - ランキング機能
- コメント機能
- フォロー機能
  ー DM 機能
- ページネーション機能
  - 無限スクロール
