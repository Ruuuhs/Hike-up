require 'rails_helper'

RSpec.describe Relationship, type: :model do
  let(:follower) { FactoryBot.create(:user) }
  let(:followed) { FactoryBot.create(:user) }
  let(:relationship) { follower.active_relationships.build(followed_id: followed.id) }

  subject { relationship }

  it { should be_valid }

  describe 'follower methods' do
    it { should respond_to(:follower) }
    it { should respond_to(:followed) }
    its(:follower) { should eq follower }
    its(:followed) { should eq followed }
  end

  describe 'followed idがない時' do
    before { relationship.followed_id = nil }
    it { should_not be_valid }
  end

  describe 'follower idがない時' do
    before { relationship.follower_id = nil }
    it { should_not be_valid }
  end

  describe 'following' do
    let(:other_user) { FactoryBot.create(:user) }
    before do
      @user = User.create(name: 'Example User', email: 'user@example.com',
                          password: 'foobar', password_confirmation: 'foobar')
      @user.follow(other_user)
    end

    subject { @user }

    it { should be_following(other_user) }
    its(:following) { should include(other_user) }

    describe 'followed user' do
      subject { other_user }
      its(:followers) { should include(@user) }
    end

    describe 'and unfollowing' do
      before { @user.unfollow(other_user) }

      it { should_not be_following(other_user) }
      its(:followers) { should_not include(other_user) }
    end
  end
end
