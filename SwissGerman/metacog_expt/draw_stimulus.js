function draw_stimulus(canvasID,numDots) 
{
	
	var stimCanvas = document.getElementById(canvasID);
  	var stimContext = stimCanvas.getContext("2d");
	
	stimContext.clearRect(0, 0, stimCanvas.width, stimCanvas.height);
	
	//create black stimulus box
	var squareWidth  = 250;
	var sqystartpoint = (stimCanvas.height - squareWidth)/2; //145 (h)
	var sqxstartpoint = (stimCanvas.width - squareWidth)/2; //75 (w)

	stimContext.fillStyle = "#000000 ";
	stimContext.fillRect(sqxstartpoint, sqystartpoint, squareWidth, squareWidth); // Fill black square (stimulus background)

	//specification: granulation de la grille
    var cellSize = 10 ;
	
	var dotindex = randperm(625); // vector of 0 to 624, gives positions

	//vector of random 1s and 0s, indicates white or black dot
	var dotmatrix = [];
	
	for (var j = 0 ; j < dotindex.length ; j++) {   
		if (dotindex[j] < (312 + numDots))
		{dotmatrix[j] = 1;} // white dots
		else
		{dotmatrix[j] = 0;} // black dots
	}
    
	//fill the grid:
	var k = 0 ;
	
	
	for (var x = sqxstartpoint ; x < sqxstartpoint + squareWidth; x += cellSize ) {
	
			for (var y = sqystartpoint ; y < sqystartpoint + squareWidth; y += cellSize ) {
	
			stimContext.beginPath();
    		stimContext.arc(x + (cellSize/2) , y + (cellSize/2), 2, 0, 2 * Math.PI); // coordonnees du dot k au centre de la cellule
	
			if (dotmatrix[k] === 1)
    		{ stimContext.fillStyle = "#FFFFFF"; } //white dots 
			else 
			{ stimContext.fillStyle = "#000000"; } //black dots 
			
			stimContext.fill();
			k++ ;

		} // end of for loop y
	} // end of for loop x

	var string4stimulus = stimCanvas.toDataURL();

	stimContext.clearRect(0, 0, stimCanvas.width, stimCanvas.height);

	return string4stimulus;
}