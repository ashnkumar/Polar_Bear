PB.Views.Room = function (chatroomDomSelectors){
  this.room = chatroomDomSelectors["room"]
  this.roomTemplate = chatroomDomSelectors["roomTemplate"]
}

PB.Views.Room.prototype = {

  bindChatWindowButtons: function(roomName, userColor, userIcon) {
    var chatroomUrl = PB.firebaseUrlConstants.BASE_URL + roomName
    var chatroomFirebase = firebaseFunctions.createFirebase(chatroomUrl)

    chatroomFirebase.limit(10).on('child_added', function (snapshot) {
      var message = snapshot.val();
      $('<div class="elevencol '+message.color+'">').html('<i class="fa fa-'+message.userIcon+' fa-2x"></i>'+message.message).fadeIn().appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    })
  },

  drawChatroom: function(roomName, userColor, userIcon) {
       var roomName = roomName
       self = this
       $.ajax({
        type: 'get',
        url:'/chatrooms/1',
        dataType: "text"
       }).done(function(data){
          var template = Handlebars.compile(data)
          $(".room-list").html(template(roomName));
          $(".room-list").attr("class", "chatroom");
          $.event.trigger("ajax-back")
       })
  }
}