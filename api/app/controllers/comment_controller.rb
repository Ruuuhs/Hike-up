class CommentController < ApplicationController
  before_action :authenticate_user!, only: %i[create]

  def create
    comment = current_user.comments.build(comment_params)
    # render json: post
    if comment.save
      render json: comment
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end
end
