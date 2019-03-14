function stimdeviset(type)

{

		//CODE TO SHUFFLE ARRAY
		function shuffle(array)
		{		
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}

		return array;
		}


		//CODE TO REPLICATE ARRAY
		function repeatArray(arr, count) {

		var ln = arr.length;
		var b = [];

		for(i=0; i<count; i++) {

		b.push(arr[i%ln]);

		}

		return b;

		}		




if (type == 'prac')
	
	{
	
		//the stim position
		pracstimpos= [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]; //26 elements
		
		pracpos = shuffle(pracstimpos);
	
return pracpos;

	}

else if (type == 'trial')

{

		trialstimpos= [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]; // 36 elements
			
		trialpos = shuffle(trialstimpos);

return trialpos;

}

}
