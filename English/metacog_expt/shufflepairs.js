// Marion Rouault March 2016

function shufflepairs()
{


		// Design for one individual. 
		// NB javascript doesnt handle matrices you have to use arrays. dont forget commas between array elements.
		

		//permet de shuffler tout en gardant les paires(series_type, nlearningblock):
		var A = [[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[1,12],[2,12],[3,12],[4,12],[5,12],[6,12],[1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20]] ;//remplacer par les paires

		function shuffler(a) {
    		var j, x, i;
    		for (i = a.length; i; i -= 1) {
    		    j = Math.floor(Math.random() * i);
    		    x = a[i - 1];
   			    a[i - 1] = a[j];
   		 	    a[j] = x;}
    		};

		function range(start, stop, step) {
    		if (typeof stop == 'undefined') {
        		// one param defined
        		stop = start;
        		start = 0;
    		}

    		if (typeof step == 'undefined') {
        		step = 1;
    		}

    		if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        		return [];
    		}

    		var result = [];
    		for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        		result.push(i);
    		}

    		return result;
		};

		var idx = range(A.length) ;
		shuffler(idx) ;
		var shuffle_A = [] ;
		$.map(idx,function(elt){shuffle_A.push(A[elt])}) ;

		var series_type = [] ;
		var nlearningblock = [] ;

		//from shuffle_A, re-build 2 arrays keeping the pairs:
		for (var i = 0 ; i < shuffle_A.length ; i++) {
			var interm = shuffle_A[i] ;
			var series_type = series_type.concat(interm[0]) ;
			var nlearningblock = nlearningblock.concat(interm[1]) ;
		}
		//on obtient ca ms shuffled: series_type = shuffle([1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]); 
		//et: nlearningblock = shuffle([4,4,4,4,4,4,8,8,8,8,8,8,12,12,12,12,12,12,16,16,16,16,16,16,20,20,20,20]);
		//importantly l'ordre des paires est conserve




return nlearningblock;
} // end of function 