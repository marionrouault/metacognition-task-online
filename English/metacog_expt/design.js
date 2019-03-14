// Marion Rouault March 2016.
// This function creates accuracy_level and fb_type for learning blocks, respecting a nb of constraints.
// ATTENTION while loops can take too long to accomplish even when lowering constraints ...
// also creates Dots1, Dots2 and task.

// definition of learning blocks.

//nlearningblock corresponds to number of trials per block and N_series to number of blocks

function design(nlearningblock,N_series) 
{


   

    var accuracy_level = [] ;
    var fb_type = [] ;
    var task = [] ;
    var position = [] ;
   



    for (cond = 0; cond < N_series; cond++) {
        
     
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;
                var lbcolumn4 = shuffle(math.ones(nlearningblock[cond]/2)._data.map(function(x) { return x * 70; }).concat(math.ones(nlearningblock[cond]/2)._data.map(function(x) { return x * 85; })  )) ;
                for (t=0; t < nlearningblock[cond]-5; t++) {
                    if (lbcolumn4[t]===lbcolumn4[t+1] & lbcolumn4[t+1]===lbcolumn4[t+2] & lbcolumn4[t+2]===lbcolumn4[t+3] & lbcolumn4[t+3]===lbcolumn4[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn5 = math.zeros(nlearningblock[cond])._data ;
            
            for (i=0; i < lbcolumn4.length; i++) {
                if (lbcolumn4[i]===70) {
                    lbcolumn5[i] = 1 ;
                }
                else if (lbcolumn4[i]===85) {
                    lbcolumn5[i] = 0 ;
                }
            }

            var lbcolumn6 = math.zeros(nlearningblock[cond])._data ;
            for (t=0; t < nlearningblock[cond]; t++) {
                if (lbcolumn4[t] === 70) {lbcolumn6[t] = 2;}
                else if (lbcolumn4[t] === 85) {lbcolumn6[t] = 1;};
            }

            var lbcolumn7 = math.zeros(nlearningblock[cond])._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock[cond]/4)._data.concat(math.ones(nlearningblock[cond]/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock[cond]/4)._data.concat(math.ones(nlearningblock[cond]/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
           
            for (j=0; j < nlearningblock[cond]/2; j++) {
                lbcolumn7[P1[j]] = TT1[j] ;
            }
        
            //var P2 = find(lbcolumn6===2) ; // remplissage pour essais de task2
            var P2 = []; // equivalent de la fonction matlab find
            var element = 2; // on vt trouver la position pour qd taskcol6==2
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P2.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
            
            for (j=0; j < nlearningblock[cond]/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

           
        
        
        // ajoute les unes a la suite des autres selon l'ordre de cond
        
        var accuracy_level = accuracy_level.concat(lbcolumn4) ;
        var fb_type = fb_type.concat(lbcolumn5) ;
        var task = task.concat(lbcolumn6) ;
        var position = position.concat(lbcolumn7) ;

    } // end of for loop
    


    return [accuracy_level, fb_type, task, position];
    // accuracy_level and fb_type are both arrays of length 288 = 12 series * 24 nlearningblock

};