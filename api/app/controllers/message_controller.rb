class MessageController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    message = Message.create(message_params.merge(user_id: current_user.id))
    render json: message
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end
