class RoomController < ApplicationController
  before_action :authenticate_user!

  def create
    room = Room.create
    Entry.create(room_id: room.id, user_id: current_user.id)
    Entry.create(params.require(:entry).permit(:user_id, :room_id).merge(room_id: room.id))
    render json: room
  end

  def show
    room = Room.find(params[:id])
    if Entry.where(user_id: current_user.id, room_id: room.id).present?
      messages = room.messages
      render json: messages
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def index
    rooms = current_user.rooms.to_json(include: %i[messages entries users])
    render json: [rooms: rooms, current_user: current_user]
  end
end
