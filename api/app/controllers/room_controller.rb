class RoomController < ApplicationController
  before_action :authenticate_user!

  def create
    room = Room.create
    Entry.create(room_id: room.id, user_id: current_user.id)
    Entry.create(room_params.merge(room_id: room.id))
    room = Room.find_by(id: room.id).to_json(include: %i[messages entries users])
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

  private

  def room_params
    params.permit(:user_id)
  end
end
