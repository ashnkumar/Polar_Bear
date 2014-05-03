BASE_URL = 'https://luminous-fire-2873.firebaseio.com/'
$('document').ready(function(){
  PolarBear.initialize()
});

PolarBear = {
  initialize: function(){
    //This needs to be called right when the user fires up the app and accepts geolocation:
    this.prepareUsersMVC()
  },

  prepareUsersMVC: function(){
    var userView = new UserView()
    var user = new User()
    var userController = new UserController(user, userView)
  }
}
