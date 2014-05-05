class RoomsController < ApplicationController
  def show
    render :show, layout: false
  end

  def home
    render :home
  end
end
