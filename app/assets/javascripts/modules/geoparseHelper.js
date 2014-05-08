var geoparseHelper = (function(){
	var _parseRoomsToDisplayEligibleRooms = function() {
    var roomListFirebaseObject = firebaseHelper.createFireBase(ROOM_LIST_PATH)
    var roomListJson = firebaseHelper.getFirebaseValue(roomListFirebaseObject)
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
      var distance = geoHelper.calculateDistance(cookieFactory.getValue("user-Latitude"), cookieFactory.getValue("user-Longitude"), roomObject["roomLatitude"], roomObject["roomLongitude"])
      distance = distance + ''
      distance = distance.substring(0,7) + ' miles'
      return distance
  }

  var _roomIsEligible = function(roomObject) {
    console.log(roomObject)
    var userLocation = [cookieFactory.getValue('user-Latitude'), cookieFactory.getValue('user-Longitude')]
    var roomLocation = [roomObject['roomLatitude'], roomObject['roomLongitude']]
    var roomRadius = [roomObject['roomRadius']]
    return geoHelper.inRange(userLocation, roomLocation, roomRadius)
  }

  var _getRoomLocations = function(roomNames) {
    var roomLocationArray = []
    for (var i = 0; i < roomNames.length; i++){
      var roomLatitude = _getRoomLatitude(roomNames[i])
      var roomLongitude = _getRoomLongitude(roomNames[i])
      var roomRadius = _getRoomRadius(roomNames[i])
      var userCount = firebaseHelper.getUserCount(roomNames[i])

      roomLocationArray.push({name: roomNames[i], roomLatitude: roomLatitude, roomLongitude: roomLongitude, roomRadius: roomRadius, userCount: userCount})
    }

    return roomLocationArray
  }

  var _getRoomLatitude = function(roomName) {
    var roomLatitudeUrl = ROOM_LIST_PATH + roomName + '/location/latitude'
    var roomLatitudeFirebase = firebaseHelper.createFireBase(roomLatitudeUrl)
    var latitude = firebaseHelper.getFirebaseValue(roomLatitudeFirebase)

    return latitude
  }

  var _getRoomLongitude = function(roomName) {
    var roomLongitudeUrl = ROOM_LIST_PATH + roomName + '/location/longitude'
    var roomLongitudeFirebase = firebaseHelper.createFireBase(roomLongitudeUrl)
    var longitude = firebaseHelper.getFirebaseValue(roomLongitudeFirebase)

    return longitude
  }

    var _getRoomRadius = function(roomName) {
    var roomRadiusUrl = ROOM_LIST_PATH + roomName + '/location/radius'
    var roomRadiusFirebase = firebaseHelper.createFireBase(roomRadiusUrl)
    var radius = firebaseHelper.getFirebaseValue(roomRadiusFirebase)

    return radius
  }

  return {
    parseRoomsToDisplayEligibleRooms: _parseRoomsToDisplayEligibleRooms,
    getEligibleRooms: _getEligibleRooms,
    getRoomLongitude: _getRoomLongitude,
    getRoomLatitude: _getRoomLatitude,
    getRoomRadius: _getRoomRadius,
    getRoomLocations: _getRoomLocations,
    roomIsEligible: _roomIsEligible,
    distanceFromRoom: _distanceFromRoom
  }

}())
