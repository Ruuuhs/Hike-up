class BookmarkController < ApplicationController
    before_action :authenticate_user!, only: %i[create destroy]

  def create
    post = Post.find(params[:post_id])
    render if post.bookmark?(current_user)

    post.bookmark(current_user)
    post.reload
    bookmark = post.bookmarks.find_by(user_id: current_user.id)
    render json: {post: post, bookmark: bookmark}
  end

  def destroy
    post = Bookmark.find(params[:id]).post
    render post unless post.bookmark?(current_user)

    post.unbookmark(current_user)
    post.reload
    render json: post
  end
end
