function chatRoom(){
  this.chatRoomView = new chatRoomView()
  this.chatRoomModel = new chatRoomModel()


      var chatRoomModel = function(){
         this.baseUrl = 'https://luminous-fire-2873.firebaseio.com/room'
         this.roomPath = $(location).attr('pathname').split('/').pop();
          this.chatRoomUrl = this.baseUrl + this.roomPath
          this  ÷≥≥.firebaseServer = new Firebase(this.chatRoomUrl)
          this.users = []
      }

      chatRoomModel.prototype = {
        getUsers: function(){
          return this.users
        }
      }

  chatRoomView = function(){

  }




}