var firebaseFunctions = (function() {
  var _createFirebase = function(firebaseUrl) {
    var newFirebase = new Firebase(firebaseUrl)
    return newFirebase
  }

  var _getFirebaseValue = function(firebaseObject) {
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


  


  // var _pushToFirebase = function(firebaseUrl, userMessage, room){
  //   var self = this;
  //   var chatRoom = new Firebase(firebaseUrl)
  //   chatRoom.push({userIcon: self.userIcon, message: userMessage, color: room.color})
  // }

  // var _bindChatWindowButtons = function(firebaseServer, room) {
  //   console.log(room.color)
  //   var chatRoom = firebaseServer
  //   chatRoom.limit(10).on('child_added', function (snapshot) {
  //     var message = snapshot.val();
  //     $('<div class="elevencol '+message.color+'">').html('<i class="fa fa-'+message.userIcon+' fa-2x"></i>'+message.message).fadeIn().appendTo($('#messagesDiv'));
  //     $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  //   })
  // }
  // // testin this function. add it to a basicHelper module?
  // Object.size = function(obj) {
  //     var size = 0, key;
  //     for (key in obj) {
  //         if (obj.hasOwnProperty(key)) size++;
  //     }
  //     return size;
  // };

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

  var _setUserToRoom = function(chatRoomUrl, roomPath){

    // Adds the user to the 'present users' list
    var userPresenceListUrl = ROOM_LIST_PATH + roomPath + '/presentUsers'
    var userPresenceFirebase = firebaseHelper.createFireBase(userPresenceListUrl)
    var justPushed = userPresenceFirebase.push({user_token: userFactory.getUserValue('userToken')})

    // Sets the user to be deleted from the 'presence' list when he disconnects
    var userId = justPushed.name()
    var userToDelete = new Firebase(userPresenceListUrl + '/' + userId)
    userToDelete.onDisconnect().remove()

    // Retrieves list of available user icons, comes in as a hash
    var availableIconsUrl = ROOM_LIST_PATH + roomPath + '/available_icons'
    var availableIconsFirebase = new Firebase(availableIconsUrl)
    var availableIconsHash = _getFirebaseValue(availableIconsFirebase)

    // Picks a random key from the hash
    var numberOfAvailableIcons = Object.size(availableIconsHash)
    var randomIndexInHash = Math.floor(Math.random() * (numberOfAvailableIcons)+1);
    var identifiedKeyInHash = 'user' + randomIndexInHash
    var iconForUser = availableIconsHash[identifiedKeyInHash]
    this.userIcon = iconForUser

    // Identify the key in the hash and make a firebase reference to it
    var usersKeyUrl = availableIconsUrl + '/' + identifiedKeyInHash
    var usersKeyFirebase = new Firebase(usersKeyUrl)

    // Delete that element from the hash since the user is chatting
    usersKeyFirebase.remove()

    // When he disconnects, add it back to the hash
    usersKeyFirebase.onDisconnect().set(iconForUser)
  }

  var _getUserCount = function(roomName){

  }

  return {
    createFirebase: _createFirebase,
    getFirebaseValue: _getFirebaseValue,
    getUserCount: _getUserCount
    // createRoom: _createRoom,
    // pushToFirebase: _pushToFirebase,
    // updateFireBase: _updateFireBase,
    // bindChatWindowButtons: _bindChatWindowButtons,
    // setUserToRoom: _setUserToRoom,
    // createFirebaseUserLocations: _createFirebaseUserLocations,
    // getFirebaseUserLocations: _getFirebaseUserLocations,
  }
}())
