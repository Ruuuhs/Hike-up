class PostController < ApplicationController
  before_action :correct_user,   only: :destroy
  before_action :authenticate_user!, only: %i[create destroy]

  def index
    posts = Post.all.order(created_at: :desc).to_json(include: [:user])
    render json: posts
  end

  def show
    post = Post.find_by(id: params[:id]).to_json(include: [:user])
    render json: post
  end

  def parsonal
    user = User.find_by(id: params[:id])
    posts = user.posts.all.order(created_at: :desc).to_json(include: [:user])
    render json: posts
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
    head :no_content, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :image)
  end

  def correct_user
    post = current_user.posts.find_by(id: params[:id])
    render json: { status: 'SUCCESS', message: 'Not correct User' } if post.nil?
  end
end
