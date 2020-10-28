class PostController < ApplicationController
  before_action :correct_user, only: :destroy
  before_action :authenticate_user!, only: %i[create destroy]

  def index
    posts = Post.all.order(created_at: :desc).page(params[:page]).per(5)
    render json: posts.to_json(include: %i[user likes bookmarks comments])
  end

  def feed
    posts = current_user.feed.page(params[:page]).per(5).to_json(include: %i[user likes bookmarks comments])
    render json: posts
  end

  def bookmark
    posts = current_user.bookmark.page(params[:page]).per(5).to_json(include: %i[user likes bookmarks comments])
    render json: posts
  end

  def trend
    posts = Post.create_rank(params[:period]).to_json(include: %i[user likes bookmarks comments])
    render json: posts
  end

  def show
    post = Post.find_by(id: params[:id]).to_json(include: %i[user likes bookmarks comments])
    render json: post
  end

  def create
    post = current_user.posts.build(post_params)
    # render json: post
    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /post/:id
  def destroy
    post = Post.find_by(id: params[:id])
    if post.destroy
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:content, :image)
  end

  def correct_user
    post = current_user.posts.find_by(id: params[:id])
    render json: { status: 'SUCCESS', message: 'Not correct User' } if post.nil?
  end
end
