// PB.RoomController = function(model, view){
//   this.model = model
//   this.view = view
// }

// PB.RoomController.prototype = {
//   drawRoom: function(roomName){
//     this.view.drawChatRoom(roomName);
//     $(document).on('ajax-back', this.bindMessageListeners.bind(this) )
//   },
//   bindMessageListeners: function(){
//     $('.button').remove()
//    $(document).bind('keypress',pressed);
//    var self = this;
//    function pressed(e){
//       if (e.keyCode == 13){
//         var text = $("#messageInput").val();
//         firebaseHelper.pushToFirebase(self.model.chatRoomUrl, text, self.model);
//         $("#messageInput").val('');
//        }
//    };
//    this.model.randomizeColor()
//    firebaseHelper.bindChatWindowButtons(this.model.firebaseServer, this.model)
//   }


// }
