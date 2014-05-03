var ChatRoomApp = {};

function ChatRoomApp.ChatRoom(chatRoomUrl, position){
  this.url = chatRoomUrl;
  this.geoLocation = position;
  this.numberUsers = 0;
  this.status = "inactive";
}

ChatRoomApp.ChatRoom.prototype = {
  updateStatus: function(chatRoomStatus){
    this.status = chatRoomStatus;
  },
  addNumUsers: function(){
    this.numberUsers++;
  },
  decreaseNumUsers: function(){
    this.numberUsers--;
  }

}

function ChatRoomApp.View(selectors){
  this.selectors = selectors;
}

ChatRoomApp.View.prototype = {
  showUserMessage: function(userName, message){
    $(".user-Message").append($('<div/>')).append(userName).append(message)
  //  $(selectors.userMessageContainer).append($('<div/>')).append(userName).append(message) //
  }
}


function ChatRoomApp.Controller(chatRoomView){
  this.view = chatRoomView;
  this.chatRoom = null;
}

ChatRoomApp.Controller.prototype = {
  createChatRoom: function(chatRoomUrl, chatroomPosition){
    this.chatRoom = new ChatRoomApp.ChatRoom(chatRoomUrl, chatroomPosition);
  },
  updateMessage: function(username, message) {
    this.view.showUserMessage(username, message);
  }
}

function ChatRoomApp.Binder(selectors, controller) {
  this.selectors = selectors;
  this.controller = controller;
}

ChatRoomApp.Binder.prototype = {
  bind: function() {
    var self = this;
    $(this.selectors.startButton).on('click', function() {
      self.controller.doSomething();
    });
  }
}


$(document).ready(function(){

  var selectors = {
    userMessageContainer: ".user-Message" //document.ready
  };
  var newChatRoomView = new ChatRoomApp.View(selectors);
  var newChatRoomController = new ChatRoomApp.Controller(newChatRoomView);
  new ChatRoomApp.Binder(selectors, controller).bind();
  newChatRoomController.createChatRoom('https://luminous-fire-2873.firebaseio.com/room1', position);


});



//       var chatRoomModel = function(){
//          this.baseUrl = 'https://luminous-fire-2873.firebaseio.com/room'
//          this.roomPath = $(location).attr('pathname').split('/').pop();
//           this.chatRoomUrl = this.baseUrl + this.roomPath
//           this.firebaseServer = new Firebase(this.chatRoomUrl)
//           this.users = []
//       }

// }
//   chatRoomView = function(){

//   }

//   function chatRoom(){
//   this.chatRoomView = new chatRoomView()
//   this.chatRoomModel = new chatRoomModel()