ChatRoomApp.RoomController = function(model, view){
  this.model = model
  this.view = view
}

ChatRoomApp.RoomController.prototype = {
  drawRoom: function(roomName){
    this.view.drawChatRoom(roomName);
    $(document).on('ajax-back', this.bindMessageListeners.bind(this) )

  },

  bindMessageListeners: function(){
   self = this;
   $(document).bind('keypress',pressed);
   $(".map_button").on('click', function(){
    showMap.loadMap();
    // showMap.mapTry();
   });
   // $(document).on("mapReady", function(){
   //  console.log("we heard mapReady")
   //  google.maps.event.trigger()
   // })

   function pressed(e){
      if (e.keyCode == 13){
        var name = $('#nameInput').val();
        var text = $("#messageInput").val();

        firebaseHelper.pushToFirebase(self.model.chatRoomUrl, name, text);
        $("#messageInput").val('');
       }
   };

   firebaseHelper.bindChatWindowButtons(self.model.firebaseServer)
  }
}
