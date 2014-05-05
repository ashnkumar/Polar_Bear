var cookieFactory =(function(){

  var _createUserToken = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  var _createDate = function(days){
    var days = days || 100
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    return expires
  }


  var _createCookie = function(userLatitude, userLongitude, days){
    var userToken = _createUserToken();
    var date = _createDate(days);
    var cookieString = "user-token=" + userToken + ":user-Latitude=" + userLatitude + ":user-Longitude=" + userLongitude + date + "; path=/" ;
    document.cookie = cookieString
}

  var _getValue = function(name){
    var value = ":"+ document.cookie;
    var parts = value.split(name + "=");
    return parts[1].split(':').shift()
  }

  return {
    createToken: _createUserToken,
    createCookie: _createCookie,
    getValue: _getValue
  }
}())







