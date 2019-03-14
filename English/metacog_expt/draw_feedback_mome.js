
function draw_feedback_mome(responseSide, feedbackStim_DataURL, correct)
{		
	var feedbackCanvas = document.getElementById("myFeedbackCanvas");
  	var feedbackContext = feedbackCanvas.getContext("2d");

	var feedbackCenterWidth = feedbackCanvas.width / 2.0;
	//var feedbackCenterHeight = feedbackCanvas.height / 2.0;
    var squareWidth = 250; //stimulus size
	var sqystartpoint= (feedbackCanvas.height - squareWidth)/2;  //400-250 /2 = 75 or 475
	var sqxstartpoint= (feedbackCenterWidth - squareWidth)/2;   //540-250 /2 = 145 
		
	
	feedbackContext.clearRect(0,0, feedbackCenterWidth, feedbackCanvas.height); // Clear the canvas
	
	if (typeof correct !== "undefined") // If correctness of trial is provided
	{
		if(correct) // If they were correct
			feedbackContext.fillStyle = 'green'; // green square
		else // If they were incorrect
			feedbackContext.fillStyle = 'red'; // red square
	}
	else // If correctness of trial is not provided
	{
		feedbackContext.fillStyle = 'blue'; // blue square
	}
	
	if(responseSide == "left") // If they responded to left stimulus
	{
		var leftPos = feedbackCanvas.width / 4.0; // Place at left position = 200
	}
	else if(responseSide == "right") // If thqey responded to right stimulus
	{
		var leftPos = feedbackCanvas.width * 3.0 / 4.0; // Place at right position = 600
	}
	else // If they don't respond
	{
		var leftPos = feedbackCanvas.width / 2.0; // Place in center of screen = 400
		feedbackContext.fillStyle = 'red'; // Use red square as feedback
	}

	// Create feedback box
	//feedbackContext.fillRect(leftPos - feedbackCenterWidth/4.0 - 15, feedbackCenterHeight - feedbackCenterHeight/2 - 15, feedbackCenterWidth / 2.0 + 30, feedbackCenterHeight + 30); 
     feedbackContext.fillRect(leftPos - 125 - 15, sqystartpoint - 15, squareWidth + 30, squareWidth + 30); 
	
	
	
	
	
	// To display the stimulus from the original type 1 judgment
	if (feedbackStim_DataURL !== "") // If there is a dataURL
	{
		var stimImage = new Image; // Create an image
		stimImage.src = feedbackStim_DataURL; // Set the image to the dataURL
		feedbackContext.drawImage(stimImage,leftPos-200, 0); // Draw the image over the box already displayed on the screen
	}
	
	var string4feedback = feedbackCanvas.toDataURL();
	feedbackContext.clearRect(0, 0, feedbackCanvas.width, feedbackCanvas.height);
	return string4feedback;	
}