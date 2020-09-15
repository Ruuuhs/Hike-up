class UserController < ApplicationController
  before_action :authenticate_user!, only: %i[current following followers]

  # GET /users
  def index
    users = User.all
    render json: users
  end

  # GET /users/1
  def show
    user = User.find_by(id: params[:id])
    render json: user
  end

  def current
    render json: current_user.to_json(include: %i[active_relationships])
  end

  def personal
    user = User.find_by(id: params[:id])
    posts = user.posts.all.order(created_at: :desc).to_json(include: %i[user likes bookmarks])
    following = user.following
    followers = user.followers
    render json: { posts: posts, user: user, following: following, followers: followers }
  end

  def following
    user  = User.find(params[:id])
    users = user.following
    render json: users
  end

  def followers
    user  = User.find(params[:id])
    users = user.followers
    render json: users
  end
end
