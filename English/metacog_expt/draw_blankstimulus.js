//Function to draw blankstimulus


function draw_blankstimulus(canvasID) 
{
	var stimCanvas = document.getElementById(canvasID);
  	var stimContext = stimCanvas.getContext("2d");
	//var stimCenterWidth  = stimCanvas.width / 2; //stimcanvas width is 400px
	//var stimCenterHeight = stimCanvas.height / 2; //set at width to make a square, but originally stimCanvas.height i set as 600px
	
	//stimContext.clearRect(0,0, stimCanvas.width, stimCanvas.height);
	
	//var topLeftSquare = [stimCenterWidth - stimCenterWidth/2 +2 , stimCenterHeight - stimCenterHeight/2 +2]; // Top left position of inner square
	//stimContext.fillStyle = "#000000"; // black border
	//stimContext.fillRect(stimCenterWidth - stimCenterWidth/2, stimCenterHeight - stimCenterHeight/2, stimCenterWidth, stimCenterHeight); // Fill blue border
	//stimContext.fillStyle = "#000000 "; // grey inner square#C0C0C0
	//stimContext.fillRect(topLeftSquare[0], topLeftSquare[1], stimCenterWidth - 4, stimCenterHeight - 4); // Fill black square (stimulus background)
	
	//create black stimulus box
	var squareWidth = 250;
	var sqystartpoint= (stimCanvas.height - squareWidth)/2;
	var sqxstartpoint= (stimCanvas.width - squareWidth)/2;
	
	function createbox() {
	stimContext.fillStyle = "#000000 "; // grey inner square#C0C0C0
	stimContext.fillRect(sqxstartpoint,  sqystartpoint, squareWidth, squareWidth);// Fill black square (stimulus background)
	}
	createbox();
		

	//specification 	
     var cellSize = 10;
	
	
	var string4stimulus = stimCanvas.toDataURL();
	
	stimContext.clearRect(0, 0, stimCanvas.width, stimCanvas.height);

	return string4stimulus;
}	
