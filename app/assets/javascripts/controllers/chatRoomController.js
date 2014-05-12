PB.Controllers.Room = function(model, view, masterController){
  this.model = model
  this.view = view
  this.masterController = masterController
}

PB.Controllers.Room.prototype = {
  // drawRoom: function(roomName){
  //   this.view.drawChatRoom(roomName);
  //   $(document).on('ajax-back', this.bindMessageListeners.bind(this) )
  // },
  // bindMessageListeners: function(){
  //  $('.button').remove()
  //  $(document).bind('keypress',pressed);
  //  var self = this;
  //  function pressed(e){
  //     if (e.keyCode == 13){
  //       var text = $("#messageInput").val();
  //       firebaseHelper.pushToFirebase(self.model.chatRoomUrl, text, self.model);
  //       $("#messageInput").val('');
  //      }
  //  };
  //  this.model.randomizeColor()
  //  firebaseHelper.bindChatWindowButtons(this.model.firebaseServer, this.model)
  // },

  // We need to bind the room message input box with this event listener
  bindListeners: function() {
   	$('.button').remove()
   	$(document).bind('keypress',pressed);
   	var self = this;
   	function pressed(e){
      if (e.keyCode == 13) {
        var text = $("#messageInput").val();
        // firebaseHelper.pushToFirebase(self.model.chatRoomUrl, text, self.model);
        console.log(text)
        $("#messageInput").val('');
      }
    }
   },

	makeNewRoom: function() {
	 	var roomName = randomHelpers.makeRandomRoomName()
	 	this.model.createNewFirebaseRoom(roomName)
	 	this.masterController.setUserPresence(roomName)

	 	var userIcon = this.masterController.setUserIcon(roomName)
	 	var userColor = this.masterController.setUserColor(roomName)
	 	debugger
	 	this.view.drawRoom(roomName, userColor, userIcon)
	}
}
