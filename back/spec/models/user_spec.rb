require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = User.new(name: 'Example User', email: 'user@example.com',
                     password: 'foobar', password_confirmation: 'foobar')
  end
  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:email) }
  it { should respond_to(:password_confirmation) }
  # it { should respond_to(:remember_token) }
  # it { should respond_to(:authenticate) }
  # it { should respond_to(:admin) }
  # it { should respond_to(:microposts) }
  # it { should respond_to(:feed) }
  # it { should respond_to(:active_relationships) }
  # it { should respond_to(:passive_relationships) }
  # it { should respond_to(:following) }
  # it { should respond_to(:followers) }
  # it { should respond_to(:following?) }
  # it { should respond_to(:follow) }
  # it { should respond_to(:unfollow) }

  it { should be_valid }
  # it { should_not be_admin }

  # describe "admin属性を'true'に設定した状態'" do
  #   before do
  #     @user.save!
  #     @user.toggle!(:admin)
  #   end

  #   it { should be_admin }
  # end

  describe '名前が空白' do
    before { @user.name = ' ' }
    it { should_not be_valid }
  end

  describe '名前が長すぎる' do
    before { @user.name = 'a' * 31 }
    it { should_not be_valid }
  end

  describe 'emailが空白' do
    before { @user.email = ' ' }
    it { should_not be_valid }
  end

  describe 'emailが長すぎる' do
    before { @user.email = 'a' * 244 + '@example.com' }
    it { should_not be_valid }
  end

  describe 'emailが無効である' do
    it 'should be invalid' do
      addresses = %w[user@foo,com user_at_foo.org example.user@foo.
                     foo@bar_baz.com foo@bar+baz.com]
      addresses.each do |invalid_address|
        @user.email = invalid_address
        expect(@user).not_to be_valid
      end
    end
  end

  describe 'emailが有効である' do
    it 'should be valid' do
      addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
      addresses.each do |valid_address|
        @user.email = valid_address
        expect(@user).to be_valid
      end
    end
  end

  describe 'emailの一意性' do
    before do
      user_with_same_email = @user.dup
      user_with_same_email.email = @user.email.upcase
      user_with_same_email.save
    end
    it { should_not be_valid }
  end

  describe 'パスワードが空白' do
    before { @user.password = ' ' * 6 }
    it { should_not be_valid }
  end

  describe 'パスワードが短すぎる' do
    before { @user.password = 'a' * 5 }
    it { should_not be_valid }
  end

  # user登録の時は有効化の後に記憶トークンを保存する為コメントアウト
  # describe "remember token" do
  #   before { @user.save }
  #   it { expect(@user.remember_token).not_to be_blank }
  # end
end
