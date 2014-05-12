PB.MasterController = function() {

}

PB.MasterController.prototype = function() {
	
	prepareRoomList: function() {

		var roomListDomSelectors = {
			roomList: '.room_list',
			roomListTemplate: '#room-list-template'
		}

		var roomListview = new PB.RoomListView(roomListDomSelectors)

	}
}