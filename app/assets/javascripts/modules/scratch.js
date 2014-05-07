var _inRange = function (roomPath, location1, location2) {
    var acceptable_range = function(){
      // get value from roomPath for radius: use getFirebaseValue
    }
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


  var _updateFireBase = function(firebaseUrl, options, roomRadius) {
    var firebaseRoom = new Firebase(firebaseUrl)
    var firebaseRadiusPath = new Firebase(firebaseUrl + "/radius")
    firebaseRoom.set({latitude: options.latitude, longitude: options.longitude})
  }
    firebaseRadiusPath.set({room_radius: roomRadius})

    updateGeoLocation: function(e, eventData) {
    var firebaseUrl = ROOM_LIST_PATH + eventData.roomName + '/location'
    var objects = []
    for(var i in eventData.userLocation) {
      objects.push(eventData.userLocation[i])
    }
    var centroid = geoHelper.getCentroid(objects)
    var roomRadius = geoHelper.getNewRadius(centroid, objects)
    firebaseHelper.updateFireBase(firebaseUrl, { latitude: centroid.latitude, longitude: centroid.longitude, radius: ?? })
  },

  // create_room insert a radius of .5; then set this
    var _getNewRadius = function(centroid, userLocations) {
      var locationsLength = userLocations.length

      for(var i = 0; i < locationsLength; i++) {

      }

    }

// geoHelper.var _calculateDistance = function distance(lat1, lon1, lat2, lon2)

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
