require 'rails_helper'

RSpec.describe Room, type: :model do
  before { @room = Room.create }

  subject { @room }

  it { should be_valid }
end
