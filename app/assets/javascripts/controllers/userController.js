PB.Controllers.User = function(userPosition){
	this.userPosition = userPosition
}

PB.Controllers.User.prototype = {
	makeUserInformation: function() {
		// 'self' refers to the Window. This means that the user information is saved in the window
		// and is accessible anywhere in the application by calling self.userInfo. It acts similar to a 
		// cookie in this case
		self.userInfo = { userToken: this.createUserToken(),
											userLatitude: this.userPosition.coords.latitude,
											userLongitude: this.userPosition.coords.longitude }
		
	},

	createUserToken: function() {
		var text = "";
    var possible = possible || "ABCDEFGHIJKLMNOPQRSTUVWX YZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
	},

	setUserIcon: function(roomName) {
		var availableIconsUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/available_icons'
    var availableIconsFirebase = firebaseFunctions.createFirebase(availableIconsUrl)
    var availableIconsHash = firebaseFunctions.getFirebaseValue(availableIconsFirebase)

    var randomIndex = randomHelpers.getRandomIndex(availableIconsHash)
    var identifiedKeyInHash = 'user' + randomIndex
    var iconForUser = availableIconsHash[identifiedKeyInHash]
    var userIcon = iconForUser

    var usersKeyUrl = availableIconsUrl + '/' + identifiedKeyInHash
    var usersKeyFirebase = firebaseFunctions.createFirebase(usersKeyUrl)

    usersKeyFirebase.remove()
    usersKeyFirebase.onDisconnect().set(iconForUser)

    return userIcon
	},

	setUserColor: function() {
    var colors = ["pink", "purple", "blue", "orange", "green", "moss", "brown", "dark-purple", "light-blue", "grey"]
 
    return colors[Math.floor(Math.random()*colors.length)];
  },
	
	setUserPresence: function(roomName) {
		var userPresenceListUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/presentUsers'
    var userPresenceFirebase = firebaseFunctions.createFirebase(userPresenceListUrl)
    var justPushed = userPresenceFirebase.push({user_token: self.userInfo.userToken})
    
   	this.setUserDisconnectActions(justPushed, userPresenceListUrl)
	},

	setUserDisconnectActions: function(justPushed, userPresenceListUrl) {
		var userId = justPushed.name()
    var userToDelete = firebaseFunctions.createFirebase(userPresenceListUrl + '/' + userId)
    userToDelete.onDisconnect().remove()
	}
}
