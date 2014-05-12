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
	}
}
