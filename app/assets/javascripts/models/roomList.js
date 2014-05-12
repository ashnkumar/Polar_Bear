PB.Models.RoomList = function(){
  // When the model is created, it creates a ref to the room_list
  this.roomListFromFirebase = firebaseFunctions.createFirebase(PB.firebaseUrlConstants.ROOM_LIST_PATH);
  this.roomListFromFirebase.on('value', this.returnDatabase.bind(this));
}

PB.Models.RoomList.prototype = {
  returnDatabase: function(snapshot){
   this.entireDatabase = snapshot.val()
   $.event.trigger('gotFirebaseRoomsData')
  },

  getActiveRooms: function() {
  	var activeRoomObjectArray = geoParser.parseRoomsToDisplayEligibleRooms()
  	return activeRoomObjectArray
  },
}

