describe('RoomList Controller', function() {
  BASE_URL = 'https://luminous-fire-2873.firebaseio.com/'
  var model = 'stub model';
  var view = 'stub view'
  var roomListController = new RoomListController(model, view)

  it ('should be possible to make a RoomList Controller', function() {
    expect(roomListController).toBeDefined();
  });

  it ('should be instantiated with a model', function() {
    expect(roomListController.model).toEqual('stub model')
  });

  it ('should be instantiated with a view', function() {
    expect(roomListController.view).toEqual('stub view')
  });
})

describe('RoomList Model', function() {
  var roomList = new RoomList()
  var spy;

  xit ('should return the right database', function() {
  });

  it ('should trigger the gotData event after the database is returned', function() {
    spy = spyOn(this.Component, 'gotData')
  });

})


















// }

  // // var roomListDomSelectors = {
  // //   roomList: '.room-list',
  // //   roomListTemplate: '#room-list-template'
  // // }
  // // var roomListView = new RoomListView(roomListDomSelectors)
  // // var roomList = new RoomList()
  // // var roomListController = new RoomListController(roomList, roomListView)


  // it("should access data from Firebase", function(){
  //   // var dataRef = new Firebase(BASE_URL)
  //   // console.log(dataRef)
  //   // // dataRef.on('value', function(snapshot) {
  //   // //   var firebaseDatabase = snapshot.val()
  //   // // }
  //   // expect(dataRef).not.toBe(null)

  // });

  // it("should return the rooms in Firebase", function(){
  //   // var rooms = roomList.returnRooms( database )
  //   // expect(rooms).toEqual( [{name:'room1'}, {name:'room2'}, {name:'skippers'}] )
  // });
