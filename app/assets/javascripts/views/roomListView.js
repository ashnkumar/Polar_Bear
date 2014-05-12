
PB.RoomListView = function(domSelectors){
  this.roomList = domSelectors["roomList"]
  this.roomListTemplate = domSelectors["room-list-template"]
}

PB.RoomListView.prototype = {
  drawRoomList: function(roomList){
     var rooms = {rooms: roomList}
     $.ajax({
      type: 'get',
      url: '/room_list',
      dataType: "text"
     }).done(function(data){
       var template = Handlebars.compile(data);
       $(".room-list").html(template(rooms))
       $(".other_stuff").html("")

     })
  }
}
