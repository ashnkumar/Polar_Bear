PB.Views.Room = function (chatroomDomSelectors){
  this.room = chatroomDomSelectors["room"]
  this.roomTemplate = chatroomDomSelectors["roomTemplate"]
}

PB.Views.Room.prototype = {
  drawChatRoom: function(roomName){
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