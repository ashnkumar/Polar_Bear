class RoomsController < ApplicationController

  def index
    render :index
  end

  def room_list
    render :index, layout: false
  end

  def landing
    render :landing, layout: false
  end
end

