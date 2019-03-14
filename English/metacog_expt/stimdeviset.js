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
	
//MAKING THE SET STIMULUS DEVIATIONS

		//the stim deviation
			//	pracstimdevi = [41,44,47,50,53,56,59,62,65,68];
			//	pracnumDots = shuffle(pracstimdevi); //SHUFFLE THE DOT ARRAY
				
		//the stim position
				pracstimpos= [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2];
				pracpos = shuffle(pracstimpos);

				
				
//return pracnumDots;//commented 2018
return pracpos;

	}

else if (type == 'trial')

{

			trialstimpos= [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2];
			trialpos1 = shuffle(trialstimpos);
			trialpos2 = shuffle(trialstimpos);
			trialpos3 = shuffle(trialstimpos);



// //the stim deviation for array 1
// trialstimdevi1 = shuffle(Array.apply(null, Array(70)).map(function (_, w) {return w+1;})); //array of 1 to 70

// //the stim position for array 1
// shuffstim1pos1 = shuffle(repeatArray([1,2],14));
// shuffstim1pos2 = shuffle(repeatArray([1,2],14));
// shuffstim1pos3 = shuffle(repeatArray([1,2],14));
// shuffstim1pos4 = shuffle(repeatArray([1,2],14));
// shuffstim1pos5 = shuffle(repeatArray([1,2],14));

// count11=0;
// count12=0;
// count13=0;
// count14=0;
// count15=0;
// trialpos1=[];

// for (var d = 0; d < 70; d++)
// {
// 	if (trialstimdevi1[d] > 0 && trialstimdevi1[d] < 15)
// 	{trialpos1[d]=shuffstim1pos1[count11];
// 	count11++;}
// 	else if (trialstimdevi1[d] > 14 && trialstimdevi1[d]  < 29)
// 	{trialpos1[d]=shuffstim1pos2[count12];
// 	count12++;}
// 	else if (trialstimdevi1[d] > 28 && trialstimdevi1[d] < 43)
// 	{trialpos1[d]=shuffstim1pos3[count13];
// 	count13++;}
// 	else if (trialstimdevi1[d] > 42 &&  trialstimdevi1[d] < 57)
// 	{trialpos1[d]=shuffstim1pos4[count14];
// 	count14++;}
// 	else if (trialstimdevi1[d] > 56 &&  trialstimdevi1[d] < 71)
// 	{trialpos1[d]=shuffstim1pos5[count15];
// 	count15++;}				
// }	



// //the stim deviation for array 2
// trialstimdevi2 = shuffle(Array.apply(null, Array(70)).map(function (_, w) {return w+1;})); //array 2
		
// //the stim position for array 2
// shuffstim2pos1 = shuffle(repeatArray([1,2],14));
// shuffstim2pos2 = shuffle(repeatArray([1,2],14));
// shuffstim2pos3 = shuffle(repeatArray([1,2],14));
// shuffstim2pos4 = shuffle(repeatArray([1,2],14));
// shuffstim2pos5 = shuffle(repeatArray([1,2],14));

// count21=0;
// count22=0;
// count23=0;
// count24=0;
// count25=0;
// trialpos2=[];

// for (var a = 0; a < 70; a++)
// {
// 	if (trialstimdevi2[a] > 0 && trialstimdevi2[a] < 15)
// 	{trialpos2[a]=shuffstim2pos1[count21];
// 	count21++;}
// 	else if (trialstimdevi2[a] > 14 && trialstimdevi2[a]  < 29)
// 	{trialpos2[a]=shuffstim2pos2[count22];
// 	count22++;}
// 	else if (trialstimdevi2[a] > 28 && trialstimdevi2[a] < 43)
// 	{trialpos2[a]=shuffstim2pos3[count23];
// 	count23++;}
// 	else if (trialstimdevi2[a] > 42 &&  trialstimdevi2[a] < 57)
// 	{trialpos2[a]=shuffstim2pos4[count24];
// 	count24++;}
// 	else if (trialstimdevi2[a] > 56 &&  trialstimdevi2[a] < 71)
// 	{trialpos2[a]=shuffstim2pos5[count25];
// 	count25++;}				
// }	



// //the stim deviation for array 3
// trialstimdevi3 = shuffle(Array.apply(null, Array(70)).map(function (_, w) {return w+1;})); //array 3
		
// //the stim position for array 2
// shuffstim3pos1 = shuffle(repeatArray([1,2],14));
// shuffstim3pos2 = shuffle(repeatArray([1,2],14));
// shuffstim3pos3 = shuffle(repeatArray([1,2],14));
// shuffstim3pos4 = shuffle(repeatArray([1,2],14));
// shuffstim3pos5 = shuffle(repeatArray([1,2],14));

// count31=0;
// count32=0;
// count33=0;
// count34=0;
// count35=0;
// trialpos3=[];

// for (var b = 0; b < 70; b++)
// {
// 	if (trialstimdevi3[b] > 0 && trialstimdevi3[b] < 15)
// 	{trialpos3[b]=shuffstim3pos1[count31];
// 	count31++;}
// 	else if (trialstimdevi3[b] > 14 && trialstimdevi3[b]  < 29)
// 	{trialpos3[b]=shuffstim3pos2[count32];
// 	count32++;}
// 	else if (trialstimdevi3[b] > 28 && trialstimdevi3[b] < 43)
// 	{trialpos3[b]=shuffstim3pos3[count33];
// 	count33++;}
// 	else if (trialstimdevi3[b] > 42 &&  trialstimdevi3[b] < 57)
// 	{trialpos3[b]=shuffstim3pos4[count34];
// 	count34++;}
// 	else if (trialstimdevi3[b] > 56 &&  trialstimdevi3[b] < 71)
// 	{trialpos3[b]=shuffstim3pos5[count35];
// 	count35++;}				
// }	
		
		
		
//trialnumDots= trialstimdevi1.concat(trialstimdevi2).concat(trialstimdevi3); //join all three arrays together
trialpos = trialpos1.concat(trialpos2).concat(trialpos3);


//return trialnumDots; //commented2018
return trialpos;

}

}
