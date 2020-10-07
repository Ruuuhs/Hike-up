class CommentController < ApplicationController
  before_action :authenticate_user!, only: %i[create]

  def show
    comment = Comment.where(post_id: params[:id]).to_json(include: %i[user])
    render json: comment
  end

  def create
    comment = current_user.comments.build(comment_params)
    # render json: post
    if comment.save
      render json: comment.to_json(include: %i[user])
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.permit(:content, :post_id)
  end
end
