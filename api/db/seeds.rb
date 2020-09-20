# メインのサンプルユーザーを1人作成する
User.create!(name: 'テストユーザー',
             email: 'test@example.com',
             password: 'foobar',
             image: 'test.png')

# # 追加のユーザーをまとめて生成する
50.times do |n|
  name  = Faker::Name.name
  email = "example-#{n + 1}@example.com"
  password = 'foobar'
  User.create!(name: name,
               email: email,
               password: password)
end

# ユーザーの一部を対象にマイクロポストを生成する
users = User.order(:created_at).take(3)
content = Faker::Lorem.sentence(word_count: 5)
users.each { |user| user.posts.create!(content: content) }

# # 以下のリレーションシップを作成する
users = User.all
user  = users.first
following = users[2..40]
followers = users[3..30]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }

# # 以下のtrendを作成する
users = User.order(:created_at).take(3)
3.times do
  content = Faker::Lorem.sentence(word_count: 3)
  users.each do |past_user|
    past_user.posts.create!(content: content, created_at: 1.day.ago)
    past_user.posts.create!(content: content, created_at: 7.day.ago)
    past_user.posts.create!(content: content, created_at: 1.month.ago)
  end
end

# # 以下のlikeを作成する
users = User.all
(1..29).each do |num|
  post = Post.find_by(id: num)
  other_users = users[0..num]
  content = Faker::Lorem.sentence(word_count: 3)
  other_users.each do |other_user|
    post.like(other_user)
    other_user.comments.create!(post_id: post.id, content: content)
  end
end
