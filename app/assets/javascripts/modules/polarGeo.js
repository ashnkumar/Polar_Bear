var geoHelper = (function(){
  var _calculateDistance = function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    var dist = Math.acos(dist)
    var dist = dist * 180/Math.PI
    var dist = dist * 60 * 1.1515
    return dist
  }

  var _getCentroid = function(userLocations){
    var latSum = 0
    var longSum = 0
    var latFloat;
    var longFloat;
    var locationsLength = userLocations.length
    for(var i = 0; i < locationsLength; i++) {
      latFloat = parseFloat(userLocations[i].latitude)
      longFloat = parseFloat(userLocations[i].longitude)
      latSum += latFloat
      longSum += longFloat
    }
    var centroid = { latitude: latSum / locationsLength, longitude: longSum / locationsLength }
    return centroid
  }

  var _getNewRadius = function(centroid, userLocations) {
    var locationsLength = userLocations.length
    var minimumRadius = .019 // sets a minimum radius for a room
    for(var i = 0; i < locationsLength; i++) {
      userLatFloat = parseFloat(userLocations[i].latitude)
      userLongFloat = parseFloat(userLocations[i].longitude)
      centroidLatFloat = parseFloat(centroid.latitude)
      centroidLongFloat = parseFloat(centroid.longitude)
      currentDistance = geoHelper.calculateDistance(userLatFloat, userLongFloat, centroidLatFloat, centroidLongFloat)
      if (currentDistance > minimumRadius) {
        minimumRadius = currentDistance}
      }
    return minimumRadius
    }

var _inRange = function (location1, location2, roomRadius) {
    var acceptable_range = roomRadius
    var lat1 = location1[0]
    var lat2 = location2[0]
    var lon1 = location1[1]
    var lon2 = location2[1]

    var distance = _calculateDistance(lat1, lon1, lat2, lon2)

    if (distance < acceptable_range){
      return true
    } else {
      return false
    }
  }

  var _default = { enableHighAccuracy: true, timeout: 1000, maximumAge: 0}
  var _success = function(position){
      new CustomEvent("geoDataReceived")
      $.event.trigger("geoDataReceived")
      cookieFactory.createCookie(position.coords.latitude, position.coords.longitude)
  }
  var _failure = function(position){
    alert("Sorry, we couldn't find you. You need to allow geolocation to use PolarBear.")
  }

  return {
    failure: _failure,
    success: _success,
    defaultOps: _default,
    calculateDistance: _calculateDistance,
    inRange: _inRange,
    getCentroid: _getCentroid,
    getNewRadius: _getNewRadius
  }
}())
