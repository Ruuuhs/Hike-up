# メインのサンプルユーザーを1人作成する
User.create!(name: 'テストユーザー',
             email: 'test@example.com',
             password: 'foobar',
             image: 'test.png')

# # 追加のユーザーをまとめて生成する
21.times do |n|
  name  = Faker::Name.name
  email = "example-#{n + 1}@example.com"
  password = 'foobar'
  User.create!(name: name,
               email: email,
               password: password)
end

# ユーザーの一部を対象にマイクロポストを生成する
users = User.order(:created_at).take(3)
7.times do
  content = Faker::Lorem.sentence(word_count: 5)
  users.each { |user| user.posts.create!(content: content) }
end

# # 以下のリレーションシップを作成する
# users = User.all
# user  = users.first
# following = users[2..50]
# followers = users[3..40]
# following.each { |followed| user.follow(followed) }
# followers.each { |follower| follower.follow(user) }

# # 以下のlikeを作成する
# (2..30).each do |num|
#   post = Micropost.find_by(id: num)
#   like_users = users[1..num]
#   like_users.each { |like_user| post.like(like_user) }
# end
