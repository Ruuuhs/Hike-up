require 'rails_helper'
require 'pp'

RSpec.describe 'Bookmarks', type: :request do
  before { @auth_tokens, @user_id = sign_in_id }

  describe 'create: POST /bookmark' do
    before do
      @post = FactoryBot.create(:post, user_id: @user_id)
    end

    let(:create_bookmark) { post '/bookmark', params: { post_id: @post.id }, headers: @auth_tokens }
    it '200が返ってきたか確認する' do
      create_bookmark
      expect(response.status).to eq(200)
    end

    it 'bookmarkレコードが1増える' do
      expect { create_bookmark }.to change(Bookmark, :count).by(1)
    end
  end

  describe 'destroy: DELETE /bookmark/:id' do
    before do
      @post = FactoryBot.create(:post, user_id: @user_id)
      @bookmark = FactoryBot.create(:bookmark, user_id: @user_id, post_id: @post.id)
    end

    it '200が返ってきたか確認する' do
      delete "/bookmark/#{@bookmark.id}", headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'bookmarkレコードが1減る' do
      expect { delete "/bookmark/#{@bookmark.id}", headers: @auth_tokens }.to change(Bookmark, :count).by(-1)
    end
  end
end
