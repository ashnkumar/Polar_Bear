class HomepagesController < ApplicationController
  def index
    puts "$$$$$$$$$ RENDERING LANDING #$$$$$$$$$$$$"
    render :landing
  end
end