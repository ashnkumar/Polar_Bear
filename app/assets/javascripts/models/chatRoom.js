PB.Models.Room = function(){
  // this.chatRoomUrl = chatRoomUrl
  // this.firebaseServer = firebaseHelper.createFireBase(chatRoomUrl)
  // this.assignUserToRoom(chatRoomUrl, roomPath)
}

PB.Models.Room.prototype = {
  // assignUserToRoom: function(chatRoomUrl, roomPath){
  //   firebaseHelper.setUserToRoom(chatRoomUrl, roomPath)
  // },



  createNewFirebaseRoom: function(roomName) {
    var newRoomUrl = PB.firebaseUrlConstants.BASE_URL + roomName
    var newRoomFirebase = firebaseFunctions.createFirebase(newRoomUrl)
    this.setRoomLocation(roomName)
    this.setRoomIcons(roomName)
  },

  setRoomLocation: function(roomName) {
    var roomListRoomPath = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName

    var latitudePath = firebaseFunctions.createFirebase(roomListRoomPath + '/location/latitude')
    var roomLat = self.userInfo.userLatitude;
    latitudePath.set(Number(roomLat))

    var longitudePath = firebaseFunctions.createFirebase(roomListRoomPath + '/location/longitude')
    var roomLong = self.userInfo.userLongitude;
    longitudePath.set(Number(roomLong))
  },

  setRoomIcons: function(roomName) {
    var availableIconsUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/available_icons'
    var availableIconsFirebase = firebaseFunctions.createFirebase(availableIconsUrl)

    availableIconsFirebase.set({user1: 'beer', user2: 'gavel', user3: 'glass', user4: 'bolt', user5: 'cloud', user6: 'crosshairs', user7: 'magic', user8: 'flask', user9:'flag-checkered', user10: 'globe', user11: 'fighter-jet', user12: 'money', user13: 'rocket', user14: 'smile-o', user15: 'floppy-o', user16: 'users', user17: 'puzzle-piece', user18: 'group', user19: 'cogs', user20: 'code-fork' })
  }
}