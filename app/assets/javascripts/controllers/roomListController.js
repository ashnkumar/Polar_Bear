PB.Controllers.RoomList = function(model, view, masterController){
  this.model = model
  this.view = view
  this.masterController = masterController

}

PB.Controllers.RoomList.prototype = {
  bindListeners: function(){
  	// We don't want to try to get rooms until we know we got the data
  	// back from Firebase, so we make a custom event listener and tell the
  	// roomListModel to summon those rooms
  	new CustomEvent('gotFirebaseRoomsData')
    $(document).on('gotFirebaseRoomsData', this.summonRooms.bind(this))

    
    // When a user clicks on the 'create room' button, we tell the Master controller that
    // it is time to create a room

    $('body').on("click", '#create_room', function() {
      this.masterController.createNewChatRoom()
    }.bind(this))





    // When a user clicks on a specific room, we parse out that room and
    // send it to the Master Controller
    // $('.room-list').on("click", ".individual_room", this.handleUserRoomAssignment.bind(this))

    // $(document).on('gotLocations', this.updateGeoLocation.bind(this))

  },

  summonRooms: function(){
  	// Asks the model to get the list of active rooms
    var activeRooms = this.model.getActiveRooms()

    // Tells the view to draw the rooms using that room list
    this.view.drawRoomList(activeRooms)
  },

  // updateGeoLocation: function(e, eventData) {
  //   var firebaseUrl = ROOM_LIST_PATH + eventData.roomName + '/location'
  //   var objects = []
  //   for(var i in eventData.userLocation) {
  //     objects.push(eventData.userLocation[i])
  //   }
  //   var centroid = geolocationOperations.getCentroid(objects)
  //   firebaseHelper.updateFireBase(firebaseUrl, { latitude: centroid.latitude, longitude: centroid.longitude })
  // },

  // getInfoFromChatroom: function(roomPath){
  //   firebaseHelper.getFirebaseUserLocations(roomPath)
  // },
  // createChatRoom: function(roomPath){
  //   this.sendUserToChatroom(roomPath)
  // },
  // sendUserToChatroom: function(roomPath){
  //   var firebaseRoomUrl = BASE_URL + roomPath
  //   $.event.trigger("readyToMakeRoom", roomPath)
  // },

  // sendInfoToChatRoom: function(roomPath) {
  //   // if(Object.userLocations.keys < 3) {
  //     firebaseHelper.createFirebaseUserLocations({
  //       roomPath: roomPath
  //     })
  //   // }
  // },

  // handleUserRoomAssignment: function() {
  //   var $room = $(event.target)
  //   var chatroom = $room.data('id')
  //   var test = this.objectToArray(Object.userLocations)
  //   if(test.length < 3){
  //     this.sendInfoToChatRoom(chatroom);
  //     this.getInfoFromChatroom(chatroom);
  //   }
  //   this.sendUserToChatroom(chatroom)
  // },
  // objectToArray: function(object){
  //   var collection = []
  //   for(var i in object){
  //     collection.push(i)
  //   }
  //   return collection
  // }
}
