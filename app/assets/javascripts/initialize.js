// The PB global namespace holds all the components, including
// the base URL for the firebase back-end server
// The ROOM_LIST_PATH references the room_list folder within the main root Firebase server. This
// holds the names of the rooms, their locations, present users and available icons. This way, we
// only have to query this specific reference instead of downloading the entire Firebase server
// everytime we want to get a list of rooms or present users in one particular room

PB = {
  Controllers: ['MasterController'],
  views: [''],
  models: [''],
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
    // We immediately check the geolocation of the user, as this
    // is the crux of our application
    if(navigator.geolocation) {
      // If we can get geolocation through HTML5, we perform the appropriate action based on a successful
      // location, unsuccessful location, and a default operation (per HTML5 geolocation documentation)
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, this.geodefaultOps)
    } else {
      alert("Sorry, you cannot be geolocated. Please try another device or browser.")
    }
  },

  geoSuccess: function(position){
    // On success, we initialize a MasteController with the user's
    // position
    var userPosition = position;

    masterController = new PB.Controllers.MasterController(userPosition)

    debugger
    // _createUserInfo(position.coords.latitude, position.coords.longitude)
    
    // PolarBear.fireRoomListEvents()
  },

  geoFailure: function(position) {
    alert("Sorry, we could not find you. Please allow geolocation access on your browser and/or device in order to use this application.")
  },

  geodefaultOps: {
    // Per HTML5 documentation
    enableHighAccuracy: true, timeout: 1000, maximumAge: 0
  }

  // fireRoomListEvents: function() {
  //   this.bindRoomListener();
  //   this.prepareRoomListMVC();
  // },

  // bindRoomListener: function() {
  //   var self = this;

  //   new CustomEvent('readyToMakeRoom', {'chatRoomUrl': ''})
  //   $(document).on('readyToMakeRoom', function(event, roomPath) {
  //     var chatRoomUrl = BASE_URL + roomPath
  //     self.prepareRoomMVC(chatRoomUrl, roomPath)
  //   })
  // },

  // prepareRoomListMVC: function(){
  //   var roomListDomSelectors = {
  //     roomList: '.room-list',
  //     roomListTemplate: '#room-list-template'
  //   }
  //   var roomListView = new PB.RoomListView(roomListDomSelectors)
  //   var roomList = new PB.RoomList()
  //   var roomListController = new PB.RoomListController(roomList, roomListView)
  //   roomListController.listeners()
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



