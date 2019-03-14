function stimdeviset_fa1(type)

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
	
//MAKING THE SET STIMULUS DEVIATIONS

		//the stim deviation
		pracstimdevi = [47,50,53,56,59,62,65,68,71,74];
		pracnumDots = shuffle(pracstimdevi);
				
		//the stim position
		pracpos = shuffle([1,2,1,2,1,2,1,2,1,2]);

				
				
return pracnumDots;
return pracpos;

	}

else if (type == 'trial')

{

	// we balance left/right for the 2 blocks but not with difficulty level:
	trialstimpos= [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]; //38 elements
	trialpos1 = shuffle(trialstimpos);
	trialpos2 = shuffle(trialstimpos);
	trialpos3 = shuffle(trialstimpos);


//the stim deviation from 1 dot to 76 dots:
trialstimdevi1et2 = shuffle(Array.apply(null, Array(76)).map(function (_, w) {return w+1;})); //array of 1 to 76 which will be split into 2 parts

trialstimdevi1 = trialstimdevi1et2.slice(0,38);

trialstimdevi2 = trialstimdevi1et2.slice(38);

trialstimdevi3 = shuffle([2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76]);//array of length 38

		

// six outputs, all having 38 elements which is our number of trials per block:
return trialstimdevi1;
return trialstimdevi2;
return trialstimdevi3;

return trialpos1;
return trialpos2;
return trialpos3;

}

}
