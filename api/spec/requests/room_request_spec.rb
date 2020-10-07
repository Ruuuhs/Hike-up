require 'rails_helper'

RSpec.describe 'Rooms', type: :request do
  describe 'create: POST /room' do
    before do
      @auth_tokens, @user_id = sign_in_id
    end

    it '200が返ってきたか確認する' do
      post '/room', params: { user_id: @user_id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'roomレコードが1増える' do
      expect { post '/room', params: { user_id: @user_id }, headers: @auth_tokens }.to change(Room, :count).by(1)
    end
  end
end
