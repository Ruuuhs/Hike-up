# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  #  ,:trackable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  def bookmark
    bookmark_ids = "SELECT post_id FROM bookmarks
                    WHERE user_id = :user_id"
    Post.where("id IN (#{bookmark_ids})", user_id: id).order(created_at: :desc)
  end
end
