// var userFactory = (function(){
//   //'this' is Window
//   self = this;

  var _createUserInfo = function(userLatitude, userLongitude){
    self.userValue = { userToken: _createUserToken(),
                       userLatitude: userLatitude,
                       userLongitude: userLongitude }
  }

//   var _getUserValue = function(valueToFind) {
//     var value = self.userValue[valueToFind]
//     return value
//   }

//   var _createUserToken = function(possible){
//     
//   }

//   return {
//     success: _success,
//     failure: _failure,
//     defaultOps: _defaultOps,
//     getUserValue: _getUserValue

//   }

// }())