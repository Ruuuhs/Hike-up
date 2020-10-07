require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  describe 'create: POST /comment' do
    before do
      @auth_tokens, user_id = sign_in_id
      @post = FactoryBot.create(:post, user_id: user_id)
      @params = { post_id: @post.id, content: 'test comment' }
    end

    let(:create_comment) { post '/comment', params: @params, headers: @auth_tokens }

    it '200が返ってきたか確認する' do
      create_comment
      expect(response.status).to eq(200)
    end

    it 'commentレコードが1増える' do
      expect { create_comment }.to change(Comment, :count).by(1)
    end
  end
end
