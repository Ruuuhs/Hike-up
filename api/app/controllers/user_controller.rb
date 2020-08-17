class UserController < ApplicationController
  before_action :set_user, only: [:show]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
end
