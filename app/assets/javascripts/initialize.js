PB = {
  controllers: [''],
  views: [''],
  models: [''],
  modules: [''],
  firebaseUrlConstants: {
    BASE_URL: 'https://polar-bear2.firebaseio.com/',
    ROOM_LIST_PATH: 'https://polar-bear2.firebaseio.com/room_list/'
  }
 };

//     BASE_URL = 'https://polar-bear2.firebaseio.com/',
//     ROOM_LIST_PATH = BASE_URL + 'room_list/'
//   } = function

//   controllers = { },
//   models = { },
//   views = { },
//   modules = { },
//   
// };

// This is the base URL for the firebase back-end server

// The ROOM_LIST_PATH references the room_list folder within the main root Firebase server. This
// holds the names of the rooms, their locations, present users and available icons. This way, we
// only have to query this specific reference instead of downloading the entire Firebase server
// everytime we want to get a list of rooms or present users in one particular room

$('document').ready(function() {
  PB.StartApp.initialize();
} );

PB.StartApp = {
  initialize: function() {
    // We check the geolocation as soon as we start the app. If the user can't be located or denies
    // geolocation access from our app, they cannot use the app
    this.checkGeoLocation();
  },

  checkGeoLocation: function() {
    if(navigator.geolocation) {
      // If we can get geolocation through HTML5, we perform the appropriate action based on a successful
      // location, unsuccessful location, and a default operation (per HTML5 geolocation documentation)
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, this.geodefaultOps)
    } else {
      alert("Sorry, you cannot be geolocated. Please try another device or browser.")
    }
  },

  geoSuccess: function(position){
    // On success, we initialize a MasteController that will initially
    // contain a roomListController and userController
    var userPosition = position
    masterController = new MasterController(userPosition)

    console.log("THIS IS COOL")




    _createUserInfo(position.coords.latitude, position.coords.longitude)
    
    PolarBear.fireRoomListEvents()
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



