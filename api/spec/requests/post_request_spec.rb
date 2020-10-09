require 'rails_helper'

RSpec.describe 'Posts', type: :request do
  before { @auth_tokens = log_in }

  describe 'index: GET /post' do
    before do
      FactoryBot.create_list(:post, 10)
      get '/post'
      @json = JSON.parse(response.body)
    end

    it '200が返ってきたか確認する' do
      expect(response.status).to eq(200)
    end

    it '正しい数のデータが返されたか確認する' do
      expect(@json.length).to eq(10)
    end
  end

  describe 'show: GET /post/:id' do
    before do
      @params = FactoryBot.attributes_for(:post)
      post '/post', params: @params, headers: @auth_tokens
      @json = JSON.parse(response.body)
      get "/post/#{@json['id']}"
      @json_show = JSON.parse(response.body)
    end

    it '200が返ってきたか確認する' do
      expect(response.status).to eq(200)
    end

    it '正しいデータが返されたか確認する' do
      expect(@json_show['content']).to eq @params[:content]
    end
  end

  describe 'create: POST /post' do
    before do
      @params = FactoryBot.attributes_for(:post)
    end

    it '200が返ってきたか確認する' do
      post '/post', params: @params, headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'postレコードが1増える' do
      expect { post '/post', params: @params, headers: @auth_tokens }.to change(Post, :count).by(1)
    end
  end

  describe 'destroy: DELETE /post' do
    before do
      @params = FactoryBot.attributes_for(:post)
      post '/post', params: @params, headers: @auth_tokens
      @json = JSON.parse(response.body)
    end

    it '200が返ってきたか確認する' do
      delete "/post/#{@json['id']}", headers: @auth_tokens
      expect(response.status).to eq(200)
    end

    it 'postレコードが1減る' do
      expect { delete "/post/#{@json['id']}", headers: @auth_tokens }.to change(Post, :count).by(-1)
    end
  end
end
