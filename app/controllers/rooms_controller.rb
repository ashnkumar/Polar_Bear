class RoomsController < ApplicationController
  def index

  end

  def show
    render :show, layout: false
  end

  def room_list
    render :show, layout: false
  end

  def landing
    render :landing, layout: false
  end

  def map
    render :map, layout: false
  end

  def test
    render :test, layout: false # for map testing, delete
  end

  def map2
    render :map2, layout: false # for map testing, delete
  end
end

