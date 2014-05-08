var cookieFactory =(function(){


  var _createUserToken = function(possible){
    var text = "";
    var possible = possible || "ABCDEFGHIJKLMNOPQRSTUVWX YZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  var _createDate = function(days){
    var days = days || 100
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = ":expires="+date.toGMTString();
    return expires
  }

  var _createCookie = function(userLatitude, userLongitude, days){
    var userToken = _createUserToken();
    var date = _createDate(days);
    var cookieString = "user-token=" + userToken + ":user-Latitude=" + userLatitude + ":user-Longitude=" + userLongitude + date + ": path=/" ;
    document.cookie = cookieString

  }

  var _getValue = function(name){
    var value = ":"+ document.cookie;
    var parts = value.split(name + "=");
    return parts[1].split(':').shift()
  }

  var _getUserLocation = function() {
    var userLat = _getValue('user-Latitude')
    var userLon = _getValue('user-Longitude')
    return { latitude: userLat, longitude: userLon }
  }

  return {
    createCookie: _createCookie,
    getValue: _getValue,
    createUserToken: _createUserToken,
    getUserLocation: _getUserLocation
  }
}())
