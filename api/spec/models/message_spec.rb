require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:user) { FactoryBot.create(:user) }
  before do
    room = Room.create
    @message = user.messages.build(room_id: room.id, content: 'test content')
  end

  subject { @message }

  it { should respond_to(:user_id) }
  it { should respond_to(:room_id) }
  it { should respond_to(:content) }
  it { should respond_to(:user) }
  it { should respond_to(:room) }

  it { should be_valid }

  describe 'ユーザーIDがない時' do
    before { @message.user_id = nil }
    it { should_not be_valid }
  end

  describe 'コンテンツが空白の時' do
    before { @message.content = ' ' }
    it { should_not be_valid }
  end

  describe 'コンテンツが141字以上の時' do
    before { @message.content = 'a' * 141 }
    it { should_not be_valid }
  end

  describe 'message associations' do
    before do
      @user = User.create(name: 'Example User', email: 'user@example.com',
                          password: 'foobar', password_confirmation: 'foobar')
      @room = Room.create
      @message = user.messages.build(room_id: @room.id)
    end

    it 'ユーザーを破棄するとmessageも破棄' do
      messages = @user.messages.to_a
      @user.destroy
      expect(messages).to be_empty
      messages.each do |message|
        expect(message.where(id: message.id)).to be_empty
      end
    end

    it 'roomを破棄するとmessageも破棄' do
      messages = @room.messages.to_a
      @room.destroy
      expect(messages).to be_empty
      messages.each do |message|
        expect(message.where(id: message.id)).to be_empty
      end
    end
  end
end
