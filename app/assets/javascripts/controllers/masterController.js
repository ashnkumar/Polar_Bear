PB.Controllers.Master = function(userPosition) {
	
	this.userPosition = userPosition
	this.userController = new PB.Controllers.User(this.userPosition)
	this.sendUserInformation()
	this.prepareExistingRoomListener()
	this.prepareRoomList()
}

PB.Controllers.Master.prototype = {

	sendUserInformation: function() {
		this.userController.makeUserInformation()
	},

	setUserIcon: function(roomName) {
		var userIcon = this.userController.setUserIcon(roomName)
		return userIcon;
	},

	setUserColor: function(roomName) {
		var userColor = this.userController.setUserColor()
		return userColor;
	},

	setUserPresence: function(roomName) {
		this.userController.setUserPresence(roomName)
	},

	prepareExistingRoomListener: function() {
		var self = this;
    new CustomEvent('readyToMakeRoom', {'chatRoomUrl': ''})
    
    $(document).on('readyToMakeRoom', function(event, roomName) {
      self.prepareChatroom(roomName)
    })
	},

	prepareRoomList: function() {
		var roomListDomSelectors = {
  		roomList: '.room-list',
  	  roomListTemplate: '#room-list-template'
  	}
  
  	var roomListView = new PB.Views.RoomList(roomListDomSelectors)
  	var roomList = new PB.Models.RoomList()
  	var roomListController = new PB.Controllers.RoomList(roomList, roomListView, this)
  	
  	roomListController.bindListeners()
	},
	
	createNewChatRoom: function() {
		var roomName = randomHelpers.makeRandomRoomName()
		var newRoom = true
		this.prepareChatroom(roomName, newRoom)
	},

	prepareChatroom: function(roomName, newRoom) {
		var chatroomDomSelectors = {
			room: '.room',
      roomTemplate: '#room-template'
		}

		var chatroomView = new PB.Views.Room(chatroomDomSelectors)
		var chatroom = new PB.Models.Room()
		var chatroomController = new PB.Controllers.Room(chatroom, chatroomView, this)

		chatroomController.makeRoom(roomName, newRoom)
	}

}