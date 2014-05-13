PB.Controllers.Room = function(model, view, masterController){
  this.model = model
  this.view = view
  this.masterController = masterController
}

PB.Controllers.Room.prototype = {
	bindCustomListener: function(roomName, userColor, userIcon) {
		$(document).on('ajax-back', this.bindFirebaseListeners(roomName, userColor, userIcon)).bind(this)
	},

  bindFirebaseListeners: function(roomName, userColor, userIcon) {
   	$('.button').remove()
   	$(document).bind('keypress',pressed);
   	var self = this;
   	function pressed(e){
      if (e.keyCode == 13) {
        var text = $("#messageInput").val();
        firebaseFunctions.pushToFirebase(roomName, text, userColor, userIcon);
        $("#messageInput").val('');
      }
    }
    this.view.bindChatWindowButtons(roomName, userColor, userIcon)
   },

  makeRoom: function(roomName, newRoom) {
    this.model.makeFirebaseRoom(roomName, newRoom)
    this.masterController.setUserPresence(roomName)
    

    if(newRoom) {
      this.masterController.addUserLocationToNewRoom(roomName)
      this.setInitialRoomStatus(roomName)
    } else {
      this.masterController.addUserLocationToRoom(roomName)
    }

    var userIcon = this.masterController.setUserIcon(roomName)
    var userColor = this.masterController.setUserColor(roomName)

    this.bindCustomListener(roomName, userColor, userIcon)
    this.view.drawChatroom(roomName, userColor, userIcon)
  },

  setInitialRoomStatus: function(roomName) {
    var roomStatusUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/status'
    var roomStatusFirebase = firebaseFunctions.createFirebase(roomStatusUrl)
    roomStatusFirebase.set({locked: 'false'})
  },

  returnRoomStatus: function(roomName) {
    var roomStatusUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/status'
    var roomStatusFirebase = firebaseFunctions.createFirebase(roomStatusUrl)
    var roomStatus = firebaseFunctions.getFirebaseValue(roomStatusFirebase)

    return roomStatus.locked
  },

  setRoomToLocked: function(roomName) {
    var roomStatusUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/status'
    var roomStatusFirebase = firebaseFunctions.createFirebase(roomStatusUrl)
    roomStatusFirebase.set({locked: 'true'})
  },

  getCentroid: function(roomName) {
    var userLocationsUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/user_locations'
    var userLocationsFirebase = firebaseFunctions.createFirebase(userLocationsUrl)
    var currentUserLocations = firebaseFunctions.getFirebaseValue(userLocationsFirebase)

    userLocationArray = []
    for(var i in currentUserLocations) {
      userLocationArray.push(currentUserLocations[i])
    }

    return geolocationOperations.getCentroid(userLocationArray)
  },

  // lockRoomPositionWithCentroid: function(roomName, lockedLocation) {
  //   this.model.setLockedRoomLocation(roomName, lockedLocation)
  //   var roomRadius = geolocationOperations.getNewRadius
  // }

}
