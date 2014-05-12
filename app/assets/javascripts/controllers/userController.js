PB.Controllers.User = function(userPosition, masterController) {
	this.userPosition = userPosition
	this.masterController = masterController
}

PB.Controllers.User.prototype = {
	makeUserInformation: function() {
		self.userInfo = { userToken: randomHelpers.createUserToken(),
											userLatitude: this.userPosition.coords.latitude,
											userLongitude: this.userPosition.coords.longitude }
		
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
	},

	addUserLocationToNewRoom: function(roomName) {
		var userLocationsUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/user_locations'
		var userLocationsFirebase = firebaseFunctions.createFirebase(userLocationsUrl)
		userLocationsFirebase.push({latitude: self.userInfo.userLatitude, longitude: self.userInfo.userLongitude})
	},

	addUserLocationToRoom: function(roomName) {
		var userLocationsUrl = PB.firebaseUrlConstants.ROOM_LIST_PATH + roomName + '/user_locations'
		var userLocationsFirebase = firebaseFunctions.createFirebase(userLocationsUrl)
		var currentUserLocations = firebaseFunctions.getFirebaseValue(userLocationsFirebase)

		var roomStatus = this.masterController.returnRoomStatus(roomName)

		if(roomStatus === 'false') {
			var numberOfCurrentUserLocations = randomHelpers.getObjectSize(currentUserLocations)
			if(numberOfCurrentUserLocations === 2) {
				userLocationsFirebase.push({latitude: self.userInfo.userLatitude, longitude: self.userInfo.userLongitude})
				var lockedLocation = this.masterController.getCentroid(roomName)
				this.masterController.setRoomToLocked(roomName, lockedLocation)
			} else {
				userLocationsFirebase.push({latitude: self.userInfo.userLatitude, longitude: self.userInfo.userLongitude})
			}
		}
	}
}
