require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { FactoryBot.create(:user) }
  before { @post = user.posts.build(content: 'Lorem ipsum') }

  subject { @post }

  it { should respond_to(:content) }
  it { should respond_to(:user_id) }
  it { should respond_to(:user) }

  it { should be_valid }

  describe 'ユーザーIDがない時' do
    before { @post.user_id = nil }
    it { should_not be_valid }
  end

  describe 'コンテンツが空白の時' do
    before { @post.content = ' ' }
    it { should_not be_valid }
  end

  describe 'コンテンツが141字以上の時' do
    before { @post.content = 'a' * 141 }
    it { should_not be_valid }
  end

  # describe '' do
  #   before {}
  #   it {}
  # end

  describe 'post associations' do
    before do
      @user = User.create(name: 'Example User', email: 'user@example.com',
                          password: 'foobar', password_confirmation: 'foobar')
    end
    let!(:older_post) do
      FactoryBot.create(:post, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_post) do
      FactoryBot.create(:post, user: @user, created_at: 1.hour.ago)
    end

    it 'ユーザーを破棄するとマイクロポストも破棄' do
      posts = @user.posts.to_a
      @user.destroy
      expect(posts).not_to be_empty
      posts.each do |post|
        expect(Post.where(id: post.id)).to be_empty
      end
    end

    # describe 'status' do
    #   let(:unfollowed_post) do
    #     FactoryBot.create(:post, user: FactoryBot.create(:user))
    #   end
    #   let(:followed_user) { FactoryBot.create(:user) }

    #   before do
    #     @user.follow(followed_user)
    #     3.times { followed_user.posts.create!(content: 'Lorem ipsum') }
    #   end

    #   it 'feedにマイクロポストがあるか' do
    #     expect(@user.feed).to include newer_post
    #     expect(@user.feed).to include older_post
    #     expect(@user.feed).to_not include unfollowed_post
    #     followed_user.posts.each do |post|
    #       expect(@user.feed).to include(post)
    #     end
    #   end
    # end
  end
end
