BASE_URL = 'https://luminous-fire-2873.firebaseio.com/'
$('document').ready(function(){
  PolarBear.initialize()
});

PolarBear = {
  initialize: function(){
    this.prepareUsersMVC()
  },

  prepareUsersMVC: function(){
    var userView = new userView()
    var user = new User()
    var userController = new UserController(user, userView)
    userController.initializeUser()
  }
}
