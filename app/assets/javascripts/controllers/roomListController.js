PB.Controllers.RoomList = function(model, view, masterController){
  this.model = model
  this.view = view
  this.masterController = masterController

}

PB.Controllers.RoomList.prototype = {
  bindListeners: function(){
  	new CustomEvent('gotFirebaseRoomsData')
    $(document).on('gotFirebaseRoomsData', this.summonRooms.bind(this))

    $('body').on("click", '#create_room', function() {
      this.masterController.createNewChatRoom()
    }.bind(this))

    $('.room-list').on("click", ".individual_room", this.parseRoomName.bind(this))



    // $(document).on('gotLocations', this.updateGeoLocation.bind(this))

  },

  summonRooms: function(){
    var activeRooms = this.model.getActiveRooms()
    this.view.drawRoomList(activeRooms)
  },

  parseRoomName: function() {
    var $room = $(event.target)
    var roomName = $room.data('id')
    $.event.trigger("readyToMakeRoom", roomName)
    // var test = this.objectToArray(Object.userLocations)
    // if(test.length < 3){
    //   this.sendInfoToChatRoom(chatroom);
    //   this.getInfoFromChatroom(chatroom);
    // }
    // this.sendUserToChatroom(chatroom)
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
  //   
  // },

  // sendInfoToChatRoom: function(roomPath) {
  //   // if(Object.userLocations.keys < 3) {
  //     firebaseHelper.createFirebaseUserLocations({
  //       roomPath: roomPath
  //     })
  //   // }
  // },

  // objectToArray: function(object){
  //   var collection = []
  //   for(var i in object){
  //     collection.push(i)
  //   }
  //   return collection
  // }
}
