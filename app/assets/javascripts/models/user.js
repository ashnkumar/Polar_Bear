function User(){
  this.userPosition = this.setUserGeoLocation()
}

User.prototype = {
  setUserGeoLocation: function() {
    navigator.geolocation.getCurrentPosition(this.accessPosition.bind(this));
  },
  accessPosition: function(position) {
    this.userPosition = position;
  },
  setUserChatRoom: function() {
    //figure out firebase url of current room
  }
}


///////

function UserController(model, view) {
  this.model = model
  this.view = view
}

UserController.prototype = {
}


////////////

function UserView() {

}

UserView.prototype = {

}

