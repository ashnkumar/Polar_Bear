var randomHelpers = (function(){
	var getObjectSize = function(givenObject) {
		var size = 0, key;
		for (key in givenObject) {
			if (givenObject.hasOwnProperty(key)) size++;
		}
		return size;
	}

	var makeRandomRoomName = function() {
	  var randomRoomName = Faker.Name.firstName() + Math.floor((Math.random() * 10) + 1);
    return randomRoomName
	}

	return {
		getObjectSize: getObjectSize,
		makeRandomRoomName: makeRandomRoomName
	}
}())