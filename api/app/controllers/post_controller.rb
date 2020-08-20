class PostController < ApplicationController
  # before_action :correct_user,   only: :destroy
  before_action :authenticate_user!
  # before_action :authenticate_user!, only: %i[create destroy]

  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    @post = Post.find_by(id: params[:id])
    render json: @post
  end

  def create
    @post = current_user.posts.build(post_params)
    # @post.image.attach(params[:post][:image])
    if @post.save
      render json: @post
    else
      render
    end
  end

  # DELETE /post/:id
  def destroy
    @post = Post.find_by(id: params[:id])
    if @post.destroy
      head :no_content, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :image)
  end

  # def correct_user
  #   @micropost = current_user.microposts.find_by(id: params[:id])
  #   redirect_to root_url if @micropost.nil?
  # end
end
