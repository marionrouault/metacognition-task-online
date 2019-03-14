	function randperm(maxValue){ // this function is equivalent to a shuffle
    // first generate number sequence
    var permArray = new Array(maxValue);
    for(var i = 0 ; i < maxValue; i++){
       permArray[i] = i;
    }
    // draw out of the number sequence
    for (var b = (maxValue - 1); b >= 0; --b){
       var randPos = Math.round(b * Math.random());
       var tmpStore = permArray[b];
       permArray[b] = permArray[randPos];
       permArray[randPos] = tmpStore;
    }
    return permArray;
	}