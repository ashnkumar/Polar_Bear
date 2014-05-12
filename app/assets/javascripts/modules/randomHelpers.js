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
    return randomRoomName;
	}
	
	var getRandomIndex = function(givenObject) {
		var objectSize = getObjectSize(givenObject)
		var randomIndexInHash = Math.floor(Math.random() * (objectSize)+1);

		return randomIndexInHash;
	}







	return {
		getObjectSize: getObjectSize,
		makeRandomRoomName: makeRandomRoomName,
		getRandomIndex: getRandomIndex
	}


}())