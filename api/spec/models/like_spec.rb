require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:post) { FactoryBot.create(:post) }
  before do
    @like = post.likes.build(user_id: user.id)
  end

  subject { @like }

  it { should respond_to(:user_id) }
  it { should respond_to(:post_id) }
  it { should respond_to(:user) }
  it { should respond_to(:post) }

  it { should be_valid }

  describe 'ユーザーIDがない時' do
    before { @like.user_id = nil }
    it { should_not be_valid }
  end

  describe 'ポストIDがない時' do
    before { @like.post_id = nil }
    it { should_not be_valid }
  end
end
