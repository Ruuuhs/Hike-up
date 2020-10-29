require 'rails_helper'
require 'pp'

RSpec.describe 'Relationships', type: :request do
  before { @auth_tokens, @user_id = sign_in_id }

  let(:create_relationship) { post '/relationship', params: { followed_id: @user_id }, headers: @auth_tokens }

  describe 'create: POST /relationship' do
    it '200が返ってきたか確認する' do
      create_relationship
      expect(response.status).to eq(200)
    end

    it 'likeレコードが1増える' do
      expect { create_relationship }.to change(Relationship, :count).by(1)
    end
  end

  describe 'destroy: DELETE /relationship/:id' do
    before do
      @other_user = FactoryBot.create(:user)
      @relationship = Relationship.create(followed_id: @other_user.id, follower_id: @user_id)
    end

    it '200が返ってきたか確認する' do
      delete "/relationship/#{@other_user.id}", headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'likeレコードが1減る' do
      expect { delete "/relationship/#{@other_user.id}", headers: @auth_tokens }.to change(Relationship, :count).by(-1)
    end
  end
end
