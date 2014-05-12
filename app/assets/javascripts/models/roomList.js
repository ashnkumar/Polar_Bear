PB.Models.RoomList = function(){
  // When the model is created, it creates a ref to the room_list
  this.roomListFromFirebase = firebaseFunctions.createFireBase(PB.firebaseUrlConstants.ROOM_LIST_PATH);
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

  // returnRooms: function( fireBaseRoomsData){
  //   var roomNames = Object.keys(fireBaseRoomsData)
  //   var roomArray = []
  //   for(var i = 0; i < roomNames.length; i++){

  //     roomArray.push({name: roomNames[i], userCount: userCount})
  //     console.log(roomNames[i]+': '+userCount)
  //   }
 
  //   return roomArray
  // }
}

