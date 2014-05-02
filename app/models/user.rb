class User < ActiveRecord::Base

  def self.calculate_distance(location1, location2)
    distance = Geocoder::Calculations.distance_between(location1, location2)
    p distance
  end

end