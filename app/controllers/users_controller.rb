class UsersController < ApplicationController
  def index

    location1 = [36.612084,-121.516186]
    location2 = [41.380691,-92.392513]

   @distance = User.calculate_distance(location1, location2)

  end
end