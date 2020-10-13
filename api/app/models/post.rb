class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }

  def like(user)
    likes.create(user_id: user.id)
  end

  def unlike(user)
    likes.find_by(user_id: user.id).destroy
  end

  def like?(user)
    likes.where(user_id: user.id).exists?
  end

  def bookmark(user)
    bookmarks.create(user_id: user.id)
  end

  def unbookmark(user)
    bookmarks.find_by(user_id: user.id).destroy
  end

  def bookmark?(user)
    bookmarks.where(user_id: user.id).exists?
  end

  def self.create_rank(period)
    case period
    when 'daily'
      time = 1.day
    when 'weekly'
      time = 7.day
    when 'monthly'
      time = 1.month
    when 'all'
      time = 120.month
    end

    post_within_period = Post.where(created_at: (Time.now - time)..(Time.now)).pluck(:id)
    like_rank = Like.where(post_id: post_within_period).group(:post_id).order('count(post_id) desc')

    Post.find(like_rank.limit(20).pluck(:post_id))
  end
end
