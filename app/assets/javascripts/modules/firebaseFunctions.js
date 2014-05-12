var firebaseFunctions = (function() {
  var createFirebase = function(firebaseUrl) {
    var newFirebase = new Firebase(firebaseUrl)
    return newFirebase
  }

  var getFirebaseValue = function(firebaseObject) {
    var val;
    firebaseObject.on('value', function(snapshot) {
      val = snapshot.val()
    })
    return val
  }

  // var _updateFireBase = function(firebaseUrl, options) {
  //   var firebaseRoom = new Firebase(firebaseUrl)
  //   firebaseRoom.set({latitude: options.latitude, longitude: options.longitude})
  // }


  var pushToFirebase = function(roomName, userMessage, userColor, userIcon){
    var chatroomUrl = PB.firebaseUrlConstants.BASE_URL + roomName
    var chatroomFirebase = createFirebase(chatroomUrl)

    chatroomFirebase.push({userIcon: userIcon, message: userMessage, color: userColor})
  }

  // var _createFirebaseUserLocations = function(fbInfo) {

  //   var userLat = userFactory.getUserValue('userLatitude')
  //   var userLong = userFactory.getUserValue('userLongitude')
  //   var userLatLong = { latitude: userLat, longitude: userLong }

  //   var fireBasePath = BASE_URL + '/room_list/' + fbInfo.roomPath + "/user_locations"
  //   var userLocation = new Firebase( fireBasePath )
  //   userLocation.push(userLatLong)
  // }

  // var _getFirebaseUserLocations = function(room) {
  //   var fireBasePath = BASE_URL + '/room_list/' + room + "/user_locations"
  //   var usersLocation = new Firebase( fireBasePath )
  //   usersLocation.on('value', function(snapshot){
  //     $.event.trigger( 'gotLocations' , { userLocation: snapshot.val(), roomName: room } )
  //     Object.userLocations = snapshot.val()
  //   })
  // }

  return {
    createFirebase: createFirebase,
    getFirebaseValue: getFirebaseValue,
    pushToFirebase: pushToFirebase,
    // updateFireBase: _updateFireBase,
    // bindChatWindowButtons: _bindChatWindowButtons,
    // setUserToRoom: _setUserToRoom,
    // createFirebaseUserLocations: _createFirebaseUserLocations,
    // getFirebaseUserLocations: _getFirebaseUserLocations,
  }
}())
