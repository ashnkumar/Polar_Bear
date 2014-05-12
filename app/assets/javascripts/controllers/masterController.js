PB.Controllers.Master = function(userPosition) {
	
	this.userPosition = userPosition
	
	// As soon as it is initialized, the Master sends the user's location
	// to the userController for processing
	this.sendUserInformation()

	// When initialized, we make a custom event to let us know when the
	// user has clicked a room, so we can start making it
	this.makeRoomListener()

	// We then make the RoomListMVC
	this.prepareRoomList()
}

PB.Controllers.Master.prototype = {

	sendUserInformation: function() {
		// The Master controller gives the user info to the userController, and
		// tells it to create the userInformation that will be passed around the entire app
		var userController = new PB.Controllers.User(this.userPosition)
		userController.makeUserInformation()
	},

	makeRoomListener: function() {
		var self = this;
    new CustomEvent('readyToMakeRoom', {'chatRoomUrl': ''})
    
    $(document).on('readyToMakeRoom', function(event, roomPath) {
      var chatRoomUrl = BASE_URL + roomPath
      self.prepareRoom(chatRoomUrl, roomPath)
    })
	},

	prepareRoomList: function() {
		var roomListDomSelectors = {
  		roomList: '.room-list',
  	  roomListTemplate: '#room-list-template'
  	}

  	var roomListView = new PB.Views.RoomList(roomListDomSelectors)
  	var roomList = new PB.Models.RoomList()
  	var roomListController = new PB.Controllers.RoomList(roomList, roomListView)
  	
  	roomListController.bindListeners()
	}
	
	// prepareRoomList: function() {

	// 	// var roomListDomSelectors = {
	// 	// 	roomList: '.room_list',
	// 	// 	roomListTemplate: '#room-list-template'
	// 	// }

	// 	// var roomListview = new PB.RoomListView(roomListDomSelectors)

	// }
}