ChatRoomApp.Room = function(chatRoomUrl, roomName){
  this.chatRoomUrl = chatRoomUrl
  this.roomName = roomName
  this.firebaseServer = firebaseHelper.createFireBase(chatRoomUrl)
  this.assignUserToRoom(chatRoomUrl, roomName)
}

ChatRoomApp.Room.prototype = {
  assignUserToRoom: function(chatRoomUrl, roomName){
    firebaseHelper.setUserToRoom(chatRoomUrl, roomName)
  },


  setUpNewChatRoom: function() {
  	
  }



  
}