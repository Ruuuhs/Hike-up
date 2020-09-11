class UserController < ApplicationController
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
    render json: current_user
  end
end
