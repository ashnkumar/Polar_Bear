var basicHelper = (function() {
	
	var _makeRandomRoomName = function(){
    var randomName = Faker.Name.firstName() + Math.floor((Math.random() * 10) + 1);
    return randomName
  }

  return {
  	makeRandomRoomName: _makeRandomRoomName
  }

})()