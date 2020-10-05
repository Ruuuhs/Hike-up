require 'rails_helper'

RSpec.describe Entry, type: :model do
  let(:user) { FactoryBot.create(:user) }
  before do
    room = Room.create
    @entry = user.entries.build(room_id: room.id)
  end

  subject { @entry }

  it { should respond_to(:user_id) }
  it { should respond_to(:room_id) }
  it { should respond_to(:user) }
  it { should respond_to(:room) }

  it { should be_valid }

  describe 'post associations' do
    before do
      @user = User.create(name: 'Example User', email: 'user@example.com',
                          password: 'foobar', password_confirmation: 'foobar')
      @room = Room.create
      @entry = user.entries.build(room_id: @room.id)
    end

    it 'ユーザーを破棄するとentryも破棄' do
      entries = @user.entries.to_a
      @user.destroy
      expect(entries).to be_empty
      entries.each do |entry|
        expect(Entry.where(id: entry.id)).to be_empty
      end
    end

    it 'roomを破棄するとentryも破棄' do
      entries = @room.entries.to_a
      @room.destroy
      expect(entries).to be_empty
      entries.each do |entry|
        expect(Entry.where(id: entry.id)).to be_empty
      end
    end
  end
end
