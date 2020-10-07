require 'rails_helper'

RSpec.describe 'Likes', type: :request do
  before { @auth_tokens, @user_id = sign_in_id }

  describe 'create: POST /like' do
    before do
      @post = FactoryBot.create(:post, user_id: @user_id)
    end

    it '200が返ってきたか確認する' do
      post '/like', params: { post_id: @post.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'likeレコードが1増える' do
      expect { post '/like', params: { post_id: @post.id }, headers: @auth_tokens }.to change(Like, :count).by(1)
    end
  end

  describe 'destroy: DELETE /like/:id' do
    before do
      @post = FactoryBot.create(:post, user_id: @user_id)
      @like = FactoryBot.create(:like, user_id: @user_id, post_id: @post.id)
    end

    it '200が返ってきたか確認する' do
      delete "/like/#{@like.id}", headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'likeレコードが1減る' do
      expect { delete "/like/#{@like.id}", headers: @auth_tokens }.to change(Like, :count).by(-1)
    end
  end
end
