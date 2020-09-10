class LikeController < ApplicationController
  before_action :authenticate_user!, only: %i[create destroy]

  def create
    post = Post.find(params[:post_id])
    render  if post.like?(current_user)

    post.like(current_user)
    post.reload
    render json: post
  end

  def destroy
    post = Like.find(params[:id]).post
    render post unless post.like?(current_user)

    post.unlike(current_user)
    post.reload
    render json: post
  end
end
