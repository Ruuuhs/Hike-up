require 'rails_helper'

RSpec.describe Bookmark, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:post) { FactoryBot.create(:post) }
  before do
    @bookmark = post.bookmarks.build(user_id: user.id)
  end

  subject { @bookmark }

  it { should respond_to(:user_id) }
  it { should respond_to(:post_id) }
  it { should respond_to(:user) }
  it { should respond_to(:post) }

  it { should be_valid }

  describe 'ユーザーIDがない時' do
    before { @bookmark.user_id = nil }
    it { should_not be_valid }
  end

  describe 'ポストIDがない時' do
    before { @bookmark.post_id = nil }
    it { should_not be_valid }
  end
end
