PB.Controllers.Room = function(model, view, masterController){
  this.model = model
  this.view = view
  this.masterController = masterController
}

PB.Controllers.Room.prototype = {
	bindCustomListener: function(roomName, userColor, userIcon) {
		$(document).on('ajax-back', this.bindFirebaseListeners(roomName, userColor, userIcon)).bind(this)
	},

  // We need to bind the room message input box with this event listener
  bindFirebaseListeners: function(roomName, userColor, userIcon) {
   	$('.button').remove()
   	$(document).bind('keypress',pressed);
   	var self = this;
   	function pressed(e){
      if (e.keyCode == 13) {
        var text = $("#messageInput").val();
        firebaseFunctions.pushToFirebase(roomName, text, userColor, userIcon);
        $("#messageInput").val('');
      }
    }
    this.view.bindChatWindowButtons(roomName, userColor, userIcon)
   },

	makeNewRoom: function() {
	 	var roomName = randomHelpers.makeRandomRoomName()
	 	this.model.createNewFirebaseRoom(roomName)
	 	this.masterController.setUserPresence(roomName)

	 	var userIcon = this.masterController.setUserIcon(roomName)
	 	var userColor = this.masterController.setUserColor(roomName)

	 	this.bindCustomListener(roomName, userColor, userIcon)
	 	this.view.drawChatroom(roomName, userColor, userIcon)
	}
}
