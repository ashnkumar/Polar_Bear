PB.Controllers.RoomList = function(model, view){
  this.model = model
  this.view = view
}

PB.Controllers.RoomList.prototype = {
  bindListeners: function(){

    $(document).on('gotFirebaseRoomsData', this.summonRooms.bind(this) )
    $('.room-list').on("click", ".individual_room", this.handleUserRoomAssignment.bind(this))
    $(document).on('gotLocations', this.updateGeoLocation.bind(this))
    $('body').on("click", '#create_room', function() {
      this.createChatRoom(firebaseHelper.createRoom())
    }.bind(this))
  },
  updateGeoLocation: function(e, eventData) {
    var firebaseUrl = ROOM_LIST_PATH + eventData.roomName + '/location'
    var objects = []
    for(var i in eventData.userLocation) {
      objects.push(eventData.userLocation[i])
    }
    var centroid = geolocationOperations.getCentroid(objects)
    firebaseHelper.updateFireBase(firebaseUrl, { latitude: centroid.latitude, longitude: centroid.longitude })
  },
  summonRooms: function(){
    var activeRooms = geoparseHelper.parseRoomsToDisplayEligibleRooms()

    this.view.drawRoomList(activeRooms)
  },
  getInfoFromChatroom: function(roomPath){
    firebaseHelper.getFirebaseUserLocations(roomPath)
  },
  createChatRoom: function(roomPath){
    this.sendUserToChatroom(roomPath)
  },
  sendUserToChatroom: function(roomPath){
    var firebaseRoomUrl = BASE_URL + roomPath
    $.event.trigger("readyToMakeRoom", roomPath)
  },

  sendInfoToChatRoom: function(roomPath) {
    // if(Object.userLocations.keys < 3) {
      firebaseHelper.createFirebaseUserLocations({
        roomPath: roomPath
      })
    // }
  },

  handleUserRoomAssignment: function() {
    var $room = $(event.target)
    var chatroom = $room.data('id')
    var test = this.objectToArray(Object.userLocations)
    if(test.length < 3){
      this.sendInfoToChatRoom(chatroom);
      this.getInfoFromChatroom(chatroom);
    }
    this.sendUserToChatroom(chatroom)
  },
  objectToArray: function(object){
    var collection = []
    for(var i in object){
      collection.push(i)
    }
    return collection
  }
}


PB.Models.RoomList = function(name){
  new CustomEvent('gotFirebaseRoomsData')
  this.roomListFromFirebase = firebaseHelper.createFireBase(ROOM_LIST_PATH);
  this.roomListFromFirebase.on('value', this.returnDatabase.bind(this));
}

PB.Models.RoomList.prototype = {
  returnDatabase: function( snapshot ){
   this.database = snapshot.val()
   $.event.trigger('gotFirebaseRoomsData')
  },

  returnRooms: function( fireBaseRoomsData){
    var roomNames = Object.keys(fireBaseRoomsData)
    var roomArray = []
    for(var i = 0; i < roomNames.length; i++){

      roomArray.push({name: roomNames[i], userCount: userCount})
      console.log(roomNames[i]+': '+userCount)
    }
    return roomArray
  }
}



PB.Views.RoomList = function(domSelectors){
  this.roomList = domSelectors["roomList"]
  this.roomListTemplate = domSelectors["room-list-template"]
}

PB.Views.RoomList.prototype = {
  drawRoomList: function(roomList){
     var rooms = {rooms: roomList}
     $.ajax({
      type: 'get',
      url: '/room_list',
      dataType: "text"
     }).done(function(data){
       var template = Handlebars.compile(data);
       $(".room-list").html(template(rooms))
       $(".other_stuff").html("")

     })
  }
}







