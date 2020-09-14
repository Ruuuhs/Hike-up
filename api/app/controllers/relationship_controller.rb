class RelationshipController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    render json: user
  end

  def destroy
    user = User.find_by(id: params[:id])
    current_user.unfollow(user)
    render json: user
  end
end
