// Marion Rouault March 2016.
// This function creates accuracy_level and fb_type for learning blocks, respecting a nb of constraints.
// unfortunately while loops take too long to accomplish even when lowering constraints ...
// also creates Dots1, Dots2 and task.

// definition of learning blocks.
// series type 1: FB70   T1 - FB85   T2
// series type 2: FB70   T1 - NOFB70 T2
// series type 3: FB70   T2 - NOFB85 T1
// series type 4: FB85   T1 - NOFB70 T2
// series type 5: FB85   T2 - NOFB85 T1
// series type 6: NOFB70 T1 - NOFB85 T2


function design(nlearningblock,N_series,series_type,easy,hard) 
{

// initiate subsequent while loop:
//var accuracy_level = math.ones(nlearningblock*N_series).map(function(x) { return x * 99; });
//var fb_type = math.ones(nlearningblock*N_series).map(function(x) { return x * 99; });

//while (math.sum( math.sort([fb_type[0], fb_type[nlearningblock+0], fb_type[2*nlearningblock+0], fb_type[3*nlearningblock+0], fb_type[4*nlearningblock+0], fb_type[5*nlearningblock+0], accuracy_level[0], accuracy_level[nlearningblock+0], accuracy_level[2*nlearningblock+0], accuracy_level[3*nlearningblock+0], accuracy_level[4*nlearningblock+0], accuracy_level[5*nlearningblock+0]]) - [0, 0, 0, 1, 1, 1, 70, 70, 70, 85, 85, 85] ) !== 0)
//console.log((math.sum( math.sort([fb_type[0], fb_type[nlearningblock+0], fb_type[2*nlearningblock+0], fb_type[3*nlearningblock+0], fb_type[4*nlearningblock+0], fb_type[5*nlearningblock+0], accuracy_level[0], accuracy_level[nlearningblock+0], accuracy_level[2*nlearningblock+0], accuracy_level[3*nlearningblock+0], accuracy_level[4*nlearningblock+0], accuracy_level[5*nlearningblock+0]]) - [0, 0, 0, 1, 1, 1, 70, 70, 70, 85, 85, 85] ) !== 0));

//while(false)
//{

    
    var accuracy_level = [] ;
    var fb_type = [] ;
    var task = [] ;
    var position = [] ;
   



    for (cond = 0; cond < series_type.length; cond++) {
        
        if (series_type[cond]===1) { // series type 1: FB70   T1 - FB85   T2
            
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;
                var lbcolumn4 = shuffle( math.ones(nlearningblock/2)._data.map(function(x) { return x * 70; }).concat( math.ones(nlearningblock/2)._data.map(function(x) { return x * 85; }) )) ; 

                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn4[t]===lbcolumn4[t+1] & lbcolumn4[t+1]===lbcolumn4[t+2] & lbcolumn4[t+2]===lbcolumn4[t+3] & lbcolumn4[t+3]===lbcolumn4[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn5 = math.ones(nlearningblock)._data ;

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn4[t] === 70) {lbcolumn6[t] = 1;}
                else if (lbcolumn4[t] === 85) {lbcolumn6[t] = 2;};
            }

            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
        
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

        }

            
        else if (series_type[cond]===2) { // series type 2: FB70   T1 - NOFB70 T2
            
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;

                var lbcolumn5 = shuffle(math.ones(nlearningblock/2)._data.concat(math.zeros(nlearningblock/2)._data)) ;
                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn5[t]===lbcolumn5[t+1] & lbcolumn5[t+1]===lbcolumn5[t+2] & lbcolumn5[t+2]===lbcolumn5[t+3] & lbcolumn5[t+3]===lbcolumn5[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}

            var lbcolumn4 = math.ones(nlearningblock)._data.map(function(x) { return x * 70; }) ;

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn5[t] === 1) {lbcolumn6[t] = 1;}
                else if (lbcolumn5[t] === 0) {lbcolumn6[t] = 2;};
            }

            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
           
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

        }
            

        else if (series_type[cond]===3) { // series type 3: FB70   T2 - NOFB85 T1
            
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;
                var lbcolumn4 = shuffle(math.ones(nlearningblock/2)._data.map(function(x) { return x * 70; }).concat(math.ones(nlearningblock/2)._data.map(function(x) { return x * 85; })  )) ;
                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn4[t]===lbcolumn4[t+1] & lbcolumn4[t+1]===lbcolumn4[t+2] & lbcolumn4[t+2]===lbcolumn4[t+3] & lbcolumn4[t+3]===lbcolumn4[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn5 = math.zeros(nlearningblock)._data ;
            
            for (i=0; i < lbcolumn4.length; i++) {
                if (lbcolumn4[i]===70) {
                    lbcolumn5[i] = 1 ;
                }
                else if (lbcolumn4[i]===85) {
                    lbcolumn5[i] = 0 ;
                }
            }

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn4[t] === 70) {lbcolumn6[t] = 2;}
                else if (lbcolumn4[t] === 85) {lbcolumn6[t] = 1;};
            }

            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
           
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

           }


        else if (series_type[cond]===4) { // series type 4: FB85   T1 - NOFB70 T2
            
            var compteur = 1 ;
            //while (compteur>0) {
                compteur = 0 ;
                var lbcolumn4 = shuffle(math.ones(nlearningblock/2)._data.map(function(x) { return x * 70; }).concat(math.ones(nlearningblock/2)._data.map(function(x) { return x * 85; })) ) ;
                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn4[t]===lbcolumn4[t+1] & lbcolumn4[t+1]===lbcolumn4[t+2] & lbcolumn4[t+2]===lbcolumn4[t+3] & lbcolumn4[t+3]===lbcolumn4[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn5 = math.zeros(nlearningblock)._data ;
            for (i=0; i < lbcolumn4.length; i++) {
                if (lbcolumn4[i]===70) {
                    lbcolumn5[i] = 0 ;
                }
                else if (lbcolumn4[i]==85) {
                    lbcolumn5[i] = 1 ;
                }
            }

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn4[t] === 85) {lbcolumn6[t] = 1;}
                else if (lbcolumn4[t] === 70) {lbcolumn6[t] = 2;};
            }

            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
            
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

          }


        else if (series_type[cond]===5) { // series type 5: FB85   T2 - NOFB85 T1
            
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;
                var lbcolumn5 = shuffle(math.ones(nlearningblock/2)._data.concat(math.zeros(nlearningblock/2)._data)) ;
                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn5[t]===lbcolumn5[t+1] & lbcolumn5[t+1]===lbcolumn5[t+2] & lbcolumn5[t+2]===lbcolumn5[t+3] & lbcolumn5[t+3]===lbcolumn5[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn4 = math.ones(nlearningblock)._data.map(function(x) { return x * 85; }) ;

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn5[t] === 1) {lbcolumn6[t] = 2;}
                else if (lbcolumn5[t] === 0) {lbcolumn6[t] = 1;};
            }

            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
            
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }

           }


        else if (series_type[cond]===6) { // series type 6: NOFB70 T1 - NOFB85 T2
            
            var compteur = 1 ;
            //while (compteur>0) {
                var compteur = 0 ;
                var lbcolumn4 = shuffle(math.ones(nlearningblock/2)._data.map(function(x) { return x * 70; }).concat(math.ones(nlearningblock/2)._data.map(function(x) { return x * 85; }))   ) ;
                for (t=0; t < nlearningblock-5; t++) {
                    if (lbcolumn4[t]===lbcolumn4[t+1] & lbcolumn4[t+1]===lbcolumn4[t+2] & lbcolumn4[t+2]===lbcolumn4[t+3] & lbcolumn4[t+3]===lbcolumn4[t+4]) {
                        compteur = compteur + 1 ;
                    }
                }
            //}
            
            var lbcolumn5 = math.zeros(nlearningblock)._data ;

            var lbcolumn6 = math.zeros(nlearningblock)._data ;
            for (t=0; t < nlearningblock; t++) {
                if (lbcolumn4[t] === 70) {lbcolumn6[t] = 1;}
                else if (lbcolumn4[t] === 85) {lbcolumn6[t] = 2;};
            }
            
            var lbcolumn7 = math.zeros(nlearningblock)._data ;//col7 construction de position
            
            var TT1 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R
            var TT2 = shuffle(math.ones(nlearningblock/4)._data.concat(math.ones(nlearningblock/4)._data.map(function(x) { return x * 2; }))) ;//melange de 1 et de 2 = for L and R

            //var P1 = find(lbcolumn6===1) ; // remplissage pour essais de task1
            var P1 = []; // equivalent de la fonction matlab find
            var element = 1; // on vt trouver la position pour qd taskcol6==1
            var idx = lbcolumn6.indexOf(element);
            while (idx != -1) {
            P1.push(idx);
            idx = lbcolumn6.indexOf(element, idx + 1);
            }
            
            for (j=0; j < nlearningblock/2; j++) {
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
            
            for (j=0; j < nlearningblock/2; j++) {
                lbcolumn7[P2[j]] = TT2[j] ;
            }



            }
            
        
        
        // ajoute les unes a la suite des autres selon l'ordre de cond
        //accuracy_level = [accuracy_level ; lbcolumn4] ;
        var accuracy_level = accuracy_level.concat(lbcolumn4) ;
        var fb_type = fb_type.concat(lbcolumn5) ;
        var task = task.concat(lbcolumn6) ;
        var position = position.concat(lbcolumn7) ;

    } // end of for loop
    
//} // end of while loop vertical controlling 1st trial of series






// creation of dots for learning block trials.

var Dots1 = [] ;
var Dots2 = [] ;
// Dots1 is always the one that has more dots

for (i = 0; i < nlearningblock*N_series; i++) {
if (accuracy_level[i] === 70) { Dots1[i] = hard ;
Dots2[i] = 0 ;}
else if (accuracy_level[i] === 85) {Dots1[i] = easy ;
Dots2[i] = 0 ;}
;}



    return [accuracy_level, fb_type, Dots1, Dots2, task, position];
    // accuracy_level and fb_type are both arrays of length 288 = 12 series * 24 nlearningblock

};