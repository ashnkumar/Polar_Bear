var randomHelpers = (function(){
	var getObjectSize = function(givenObject) {
		var size = 0, key;
		for (key in givenObject) {
			if (givenObject.hasOwnProperty(key)) size++;
		}
		return size;
	}

	return {
		getObjectSize: getObjectSize
	}
}())