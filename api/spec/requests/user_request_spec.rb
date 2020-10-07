require 'rails_helper'
require 'pp'

RSpec.describe 'Users', type: :request do
  describe 'create: POST /auth' do
    before do
      @params = FactoryBot.attributes_for(:user)
    end

    it '200が返ってきたか確認する' do
      post '/auth', params: @params
      expect(response.status).to eq(200)
    end

    it '正しい数のデータが返されたか確認する' do
      post '/auth', params: @params
      @json = JSON.parse(response.body)
      expect(@json['data']['name']).to eq @params[:name]
      expect(@json['data']['email']).to eq @params[:email]
    end

    it 'Userレコードが1増える' do
      expect { post '/auth', params: @params }.to change(User, :count).by(1)
    end
  end

  describe 'destroy: DELETE /auth' do
    before do
      user = FactoryBot.create(:user)
      post '/auth/sign_in/',
           params: { email: user[:email], password: 'foobar' },
           as: :json

      @auth_tokens = response.headers.slice('client', 'access-token', 'uid')
      @json = JSON.parse(response.body)
    end

    it '200が返ってきたか確認する' do
      delete '/auth', params: { id: @json['id'] }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'Userレコードが1減る' do
      expect { delete '/auth', params: { id: @json['id'] }, headers: @auth_tokens }.to change(User, :count).by(-1)
    end
  end
end
