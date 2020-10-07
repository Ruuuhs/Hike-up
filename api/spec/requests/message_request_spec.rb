require 'rails_helper'

RSpec.describe 'Messages', type: :request do
  describe 'create: POST /message' do
    before do
      @auth_tokens = log_in
      @room = Room.create
      @params = { room_id: @room.id, content: 'test message' }
    end

    let(:post_message) { post '/message', params: @params, headers: @auth_tokens }

    it '200が返ってきたか確認する' do
      post_message
      expect(response.status).to eq(200)
    end

    it 'messageレコードが1増える' do
      expect { post_message }.to change(Message, :count).by(1)
    end
  end
end
