PB = {
  Controllers: ['Master', 'User', 'RoomList'],
  Views: ['RoomList', 'Room'],
  Models: ['RoomList', 'Room'],
  modules: [''],
  firebaseUrlConstants: {
    BASE_URL: 'https://polar-bear2.firebaseio.com/',
    ROOM_LIST_PATH: 'https://polar-bear2.firebaseio.com/room_list/'
  }
 };

$('document').ready(function() {
  PB.StartApp.initialize();
} );

PB.StartApp = {
  initialize: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, this.geodefaultOps)
    } else {
      alert("Sorry, you cannot be geolocated. Please try another device or browser.")
    }
  },

  geoSuccess: function(position){
    var userPosition = position;
    var masterController = new PB.Controllers.Master(userPosition)
  },

  geoFailure: function(position) {
    alert("Sorry, we could not find you. Please allow geolocation access on your browser and/or device in order to use this application.")
  },

  geodefaultOps: {
    enableHighAccuracy: true, timeout: 1000, maximumAge: 0
  }

  // fireRoomListEvents: function() {
  //   this.bindRoomListener();
  //   this.prepareRoomListMVC();
  // },

  // bindRoomListener: function() {
  //   
  // },

  // prepareRoomListMVC: function(){

  // },

  // prepareRoomMVC: function(chatRoomUrl, roomPath){
  //   var roomDomSelectors = {
  //     room: '.room',
  //     roomTemplate: '#room-template'
  //   }
  //   var roomView = new PB.RoomView(roomDomSelectors)
  //   var room = new PB.Room(chatRoomUrl, roomPath)
  //   var roomController = new PB.RoomController(room, roomView)
  //   var roomName = {name: roomController.model.chatRoomUrl}
  //   roomController.drawRoom(roomName)

  // }
}



