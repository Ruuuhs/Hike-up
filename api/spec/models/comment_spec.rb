require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:post) { FactoryBot.create(:post) }
  before do
    @comment = post.comments.build(user_id: user.id, post_id: post.id, content: 'test commeent.')
  end

  subject { @comment }

  it { should respond_to(:user_id) }
  it { should respond_to(:post_id) }
  it { should respond_to(:content) }
  it { should respond_to(:user) }
  it { should respond_to(:post) }

  it { should be_valid }

  describe 'ユーザーIDがない時' do
    before { @comment.user_id = nil }
    it { should_not be_valid }
  end

  describe 'ポストIDがない時' do
    before { @comment.post_id = nil }
    it { should_not be_valid }
  end

  describe 'contentがない時' do
    before { @comment.content = '  ' }
    it { should_not be_valid }
  end

  describe 'コンテンツが141字以上の時' do
    before { @comment.content = 'a' * 141 }
    it { should_not be_valid }
  end
end
