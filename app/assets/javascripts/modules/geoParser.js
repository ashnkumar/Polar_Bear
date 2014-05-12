var geoParser = (function(){
	var _parseRoomsToDisplayEligibleRooms = function() {
    var roomListFirebaseObject = firebaseFunctions.createFirebase(PB.firebaseUrlConstants.ROOM_LIST_PATH)
    var roomListJson = firebaseFunctions.getFirebaseValue(roomListFirebaseObject)
    var roomNames = Object.keys(roomListJson)
    var roomLocationArray = _getRoomLocations(roomNames)
    var eligibleRoomsArray = _getEligibleRooms(roomLocationArray)
    
    return eligibleRoomsArray
  }

  var _getEligibleRooms = function(roomLocationArray){
    var eligibleRoomsArray = []
    for (var i = 0; i < roomLocationArray.length; i++){
      if (_roomIsEligible(roomLocationArray[i])) {
         roomLocationArray[i]["distance"] = _distanceFromRoom(roomLocationArray[i])
        eligibleRoomsArray.push(roomLocationArray[i])
      }
    }
    return eligibleRoomsArray
  }

  var _distanceFromRoom = function(roomObject){
    
      var distanceInMiles = geolocationOperations.calculateDistance(self.userInfo.userLatitude, self.userInfo.userLongitude, roomObject["roomLatitude"], roomObject["roomLongitude"])

      var distanceInFeet = distanceInMiles / 5280

      distanceInFeet = distanceInFeet + ''
      distanceInFeet = distanceInFeet.substring(0,3) + ' feet'
      return distanceInFeet
  }

  var _roomIsEligible = function(roomObject) {
    
    var userLocation = [self.userInfo.userLatitude, self.userInfo.userLongitude]
    var roomLocation = [roomObject['roomLatitude'], roomObject['roomLongitude']]
    return geolocationOperations.inRange(userLocation, roomLocation)
  }

  var _getRoomLocations = function(roomNames) {
    var roomLocationArray = []
    for (var i = 0; i < roomNames.length; i++){
      var roomLatitude = _getRoomLatitude(roomNames[i])
      var roomLongitude = _getRoomLongitude(roomNames[i])
      var userCount = _getUserCount(roomNames[i])

      roomLocationArray.push({name: roomNames[i], roomLatitude: roomLatitude, roomLongitude: roomLongitude, userCount: userCount})
    }

    return roomLocationArray
  }

  var _getRoomLatitude = function(roomName) {
    var roomLatitudeUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/location/latitude'
    var roomLatitudeFirebase = firebaseFunctions.createFirebase(roomLatitudeUrl)
    var latitude = firebaseFunctions.getFirebaseValue(roomLatitudeFirebase)

    return latitude
  }

  var _getRoomLongitude = function(roomName) {
    var roomLongitudeUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/location/longitude'
    var roomLongitudeFirebase = firebaseFunctions.createFirebase(roomLongitudeUrl)
    var longitude = firebaseFunctions.getFirebaseValue(roomLongitudeFirebase)

    return longitude
  }

  var _getUserCount = function(roomName) {
    var userPresenceListUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/presentUsers'
    var userPresenceFirebase = firebaseFunctions.createFirebase(userPresenceListUrl)
    var userPresenceListObject = firebaseFunctions.getFirebaseValue(userPresenceFirebase)

    if (userPresenceListObject == null) {
      var userCount = 0
    } else {
      var userCount = randomHelpers.getObjectSize(userPresenceListObject)
    } 

    return userCount
  }

  return {
    parseRoomsToDisplayEligibleRooms: _parseRoomsToDisplayEligibleRooms,
    getEligibleRooms: _getEligibleRooms,
    getRoomLongitude: _getRoomLongitude,
    getRoomLatitude: _getRoomLatitude,
    getRoomLocations: _getRoomLocations,
    roomIsEligible: _roomIsEligible,
    distanceFromRoom: _distanceFromRoom
  }

}())