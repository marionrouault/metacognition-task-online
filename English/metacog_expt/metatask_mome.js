function metatask_mome(practice, numPrac, numBlocks, numTrials)
{

//EMPTY ARRAY FOR TIMELINE OF EXPERIMENT
var experiment = [];

if(numTrials > 0) // If any trials, run entire task with instructions
{


//GENERAL INSTRUCTIONS							 

	var instr  = ['<p class="instructions">Welcome to the task!</p>' +
	'<p class="instructions">We will now ask you to judge which of two images contains more dots, before asking you to rate your confidence in your judgement.</p>' +
	'<p class="instructions">At the beginning of each trial, you will be presented with a black cross in the middle of the screen. Focus your attention on it. Then, two black boxes with a number of white dots will be flashed and you will be asked to judge which box had a higher number of dots.</p>' +
	'<p class="instructions">If the box on the <strong>left</strong> had more dots, <strong>press W</strong>.<br> If the box on the <strong>right</strong> had more dots, <strong> press E</strong>.</p>' +
	'<p class="instructions">Please respond quickly and to the best of your ability.</p>' +
	'<p class="instructions">You will then rate your confidence in your judgement on a scale with the mouse.</p>' +
	'<p class="instructions">Please do your best to rate your confidence accurately and do take advantage of the whole rating scale.</p>' +
	'<p class="instructions">Press spacebar to continue.</p>'];

//IF NO PRACTICE, GO STRAIGHT TO EXPERIMENTAL INSTRUCTIONS
if (practice == 0) 
{
	instr.push('<p class="instructions">You will now continue directly to the experiment. The dots will presented only for a short period of time.</p>' +
	'<p class="instructions">You will be asked to rate your confidence in your judgement after each trial.</p>' +
	'<p class="instructions">Press spacebar to continue.</p>');
}

//IF GOT PRACTICE, GO TO PRACTICE INSTRUCTIONS
else 
{
	instr.push('<p class="instructions">We will now ask you to carry out some practice trials. Please respond only when the dots have disappeared.</p>' +  
	'<p class="instructions">In this practice phase we will tell you whether your judgements are right or wrong. <br></br>If you are <strong>correct</strong>, the box that you selected will be outlined in <font color="green"><strong>green</strong></font>. <br>If you are <strong>incorrect</strong>, the box that you selected will be outlined in <font color="red"><strong>red</strong></font>.</p>' +
	'<p class="instructions">You will not need to rate your confidence of your judgements on these trials.</p>' +
	'<p class="instructions">Press spacebar to continue.</p>');
}

//INSTRUCTIONS PLUGIN + PUSH IT

	var instructions = 
	{
	type:"text",
	text:instr,
	data:{trialType: 'instructions',  label: 'intruct'},
	cont_key: 32
	};

	experiment.push(instructions);

	
//EXPERIMENT PARAMETERS 

	// Create variables for timing
	var fixation_time = 1000;
	var feedback_trial_time = 500;
	var prac_stim_time= 300;
	var stim_time= 300; 
	var max_CR_RT = -1;
	var inter_trial_interval = 500;

	// Initialize staircase variables
	var responseMatrix = [true, true];
	var reversals = 0;
	var	s2_dir = ["up", "up"];
    numDots1 = 4.65;  //in log space; this is about 104 dots which is 70 dots shown for the first one
	var numDots2 = 0;
	count = 0;


//PRACTICE BLOCK
if (practice != 0)
{


//MAKING THE SET STIMULUS DEVIATIONS

//the stim deviation
stimdeviset('prac',numPrac); //returns pracpos only (randomise left/right bc i removed the auto option in the pulgin)
// pracpos is a sequence of 1 and 2 


//PRACTICE TRIAL LOOP
for(var i = 0; i < numPrac; i++)
{
	
//FULLSCREEN PLUGIN
		var check_fullscreen = 
		{    
		type: 'fullscreen',    
		showtext: '<p>You need to be in fullscreen mode to continue the experiment! <br></br> Please click the button below to enter fullscreen mode.<br></br><p>',    
		buttontext: "Continue",
		data: function() 
		{var data = jsPsych.data.getLastTrialData();
		jsPsych.data.addProperties({trialType: 'practice'});
		}
		};		


		var blankstim1 = draw_stimulus("myInnerCanvas");
		var blankstim2 = draw_stimulus("myInnerCanvas2");

        var stimpos = pracpos[i];

//FIXATION AND DOTS PLUGIN 
	var practice_trial = 
	{
	type: 'xabpositionleft',
	stimuli: [function() // Note the specifics of how the stimuli function is wrapped in brackets like so: [function(){}]
				{
					++count;
					s2 = staircase2edit(numDots1, responseMatrix, s2_dir,count); 
					
				    numDots1 = s2.diff;
					s2_dir = s2.direction;
					responseMatrix = s2.stepcount;
					if (s2.reversal) // Check for reversal. If true, add one to reversals variable
					reversals += 1;
				    
					var stim1 = draw_stimulus("myInnerCanvas", Math.round(Math.exp(numDots1))); // Create stimulus 1
				    var stim2 = draw_stimulus("myInnerCanvas2", numDots2); // Create stimulus 2 //stim 2 is the one with the LESS dots

					var stimulus = ['fixation5.png', stim1, stim2];
					return stimulus;
				}],
	pos: stimpos,
	timing_x: fixation_time,
	timing_xab_gap: -1,
	timing_ab: prac_stim_time,
	prompt: '<p style="text-align:center; font-size: 24px">Press W if the box on the left had more dots. Press E if the box on the right had more dots.</p>',
	timing_response: prac_stim_time,
	data: {trialType: 'practice', label: 'dottedstim'},
	timing_post_trial: 0,
	on_finish: function()
	{
        jsPsych.data.addDataToLastTrial({stimdevi: Math.round(Math.exp(numDots1))});
	}
	
	};


//RESPONSE PLUGIN
	var practice_trial_2 = 
	{
	type: 'doublestim_mome',
	stimuli: [[blankstim1,  blankstim2]],
	timing_ab: -1,
	prompt: '<p style="text-align:center; font-size: 24px">Press W if the box on the left had more dots. Press E if the box on the right had more dots.</p>',
	timing_response: -1,
	data: {trialType: 'practice', label: 'responseblk'}, //need this for feedback
	timing_post_trial: 0,
	on_finish: function() // This part is crucial
				{
					var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
					var correct = JSON.parse(data.correct); // Get boolean True/False if correct
					responseMatrix = responseMatrix.concat(correct);
					return {};
				}
	};


//FEEDBACK PLUGIN
	var practice_feedback = 
	{
	type: 'single-stim',
	stimuli: function() // Draw feedback as a function relative to which stimulus they responded to and whether their response was correct 
	{
	var data = jsPsych.data.getLastTrialData();
	var response = JSON.parse(data.key_press);
	var correct = JSON.parse(data.correct);
	
	
	var blankstim1 = data.blankstim1; //this is just to show the boxes in feedback
	var blankstim2 = data.blankstim2; 

	// Save which stimulus will be used for feedback
	var feedbackStim = "";
	if (correct)
	feedbackStim = blankstim1; 
	else
	feedbackStim = blankstim2;

	var responseSide = "none";
	if(response === 87) // Pressed W
	responseSide = "left";
	else if (response === 69) // Pressed E
	responseSide = "right";
	else // If they didn't respond
	feedbackStim = ""; // Display no stimulus during feedback

	return draw_feedback_mome(responseSide, feedbackStim, correct);
	},

	timing_stim: feedback_trial_time,
	timing_response: feedback_trial_time,
	data: {trialType: 'practice', label: 'feedback'},
	prompt: function() // Give feedback on correctness of trial in words as well
	{
	var data = jsPsych.data.getLastTrialData();
	var correct = JSON.parse(data.correct);
	if(correct)
	return '<p style = "text-align:center; font-size: 24px">Correct</p>';
	else
	return '<p style = "text-align:center; font-size: 24px">Incorrect</p>';
	},
	choices: ['none'],
	timing_post_trial: inter_trial_interval		
	};

  
 
   
//PUSH THE WHOLE TRIAL
	var practchunk= {
	chunk_type:'linear',
	timeline: [check_fullscreen, practice_trial, practice_trial_2, practice_feedback]
	};


	experiment.push(practchunk);


}


////////////////////////////
//END OF PRACTICE SESSION///
////////////////////////////


///////////////////////////
//CONFIDENCE RATING TESTS//
//////////////////////////

//TASK INSTRUCTIONS PLUGIN
	var begin_task =
	{
	type:"text",
	text:'<p class="instructions">In the task proper, you will not be provided accuracy feedback on your judgements, but the box you selected will be outlined in <font color="blue"><strong>blue</strong></font>.</p>' +
	'<p class="instructions">You will be asked to rate your confidence in your judgement on a rating scale after each trial, which will be explained next.</p>' +
	'<p class="instructions">Press spacebar to continue.</p>',
	data: {label: 'intruct', trialType: 'instructions'},
	cont_key: 32
	};



//CONFIDENCE RATING TEST PLUGINS
		var confid_prac1 = ['<p class="instructions">A rating scale as shown below is used throughout the task. You will be able to rate your confidence of your judgements by choosing any point along the rating scale with your mouse. <br></br>Choose any point on the rating scale and click ‘Submit’ to continue.</p><br>'];
		var confid_prac2 = ["During the task, if you are <strong>very sure</strong> that you made the correct judgement, where on the scale would you choose? <br></br>", "If you are <strong>very unsure</strong> that you made the correct judgement, where on the scale would you choose? <br></br>" ];


		var confid_prac_ans = [ '<p class="instructions">If you are <strong>very sure</strong> that you made the correct judgement, you should have responded <strong>Certain</strong>.</p>' +			             
		'<p class="instructions">If you are <strong>very unsure</strong> you made the correct judgement, you should have responded <strong>Guessing</strong>.</p>' + 
		'<p class="instructions">Press spacebar to continue.</p>' ];


		var confid_prac3 = [ '<p class="instructions">If you are <strong>somewhat sure</strong> about being correct, you should select a rating between the two descriptions.</p>' +
		'<p class="instructions">If you understand how to use and take advantage of the whole rating scale, choose any point on the rating scale and click ‘Submit’ to continue.</p><br>'];

		var confid_scale = ["Guessing",  " ", "Certain"];


	var confrating_prac1 = 

	{ type: "survey-likert",
	questions: [confid_prac1],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'trial'}
	};


	var confrating_prac2 = 
	{      
	type: "survey-likert",
	questions: [confid_prac2],
	labels: [[confid_scale, confid_scale]],
	intervals: [[6,6]],
	data:{label: 'confidprac', trialType: 'trial'}

	};

	var confrating_prac_ans =
	{
	type: "text",
	text: confid_prac_ans,
	data:{label: 'confidprac', trialType: 'trial'},
	cont_key: 32
	};


	var confrating_prac3 = 
	{      
	type: "survey-likert",
	questions: [confid_prac3],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'trial'}

	};


//PUSH THE INSTRUCTIONS + CONFIDENCE RATING TEST
		experiment.push(begin_task);
		experiment.push(confrating_prac1);
		experiment.push(confrating_prac2);
		experiment.push(confrating_prac_ans);
		experiment.push(confrating_prac3);
		
				

}




/////////////////////////////
//EXPERIMENTAL TASK PROPER///
/////////////////////////////


//MAKING THE SET STIMULUS DEVIATIONS

//the stim deviation
stimdeviset('trial',numTrials); // returns trialnumDots and trialpos, 70 is the range of dots
// trialnumDots is not used because we have the staircase


//TRIAL BLOCKS PLUGINS
for (var y = 0; y < numBlocks; y++)
{



//SORT WHICH STIMULUS PARAMETERS TO USE BETWEEN THE BLOCKS


	var task_break =
	{
	type:"text",
	text: '<p class="instructions">The task proper is divided into 3 blocks of 36 trials, where you can pause for a break before every block.</p>' +
	'<p class="instructions">There are no time limits on your responses to the dots and on your confidence ratings.</p>' +
	'<p class="instructions">You can receive up to 2 pounds bonus if your performance is satisfactory.</p>' +
	'<p class="instructions">As a reminder: <br>If the box on the <strong>left</strong> had more dots, press <strong>W</strong>.<br> If the box on the <strong>right</strong> had more dots, press <strong>E</strong>.</p>' +
	'<p class="instructions"><br>Press spacebar to begin!</p>', 
	data: {label: 'intruct', trialType: 'instructions'},
	cont_key: 32
	};

	var task_break2 =
	{
	type:"text",
	text: '<p class="instructions">You can now pause for a break. You have completed '+y+' out of '+numBlocks+' blocks.</p>' +
	'<p class="instructions">As a reminder: <br>If the box on the <strong>left</strong> had more dots, press <strong>W</strong>.<br> If the box on the <strong>right</strong> had more dots, press <strong>E</strong>.</p>' +
	'<p class="instructions"><br>Press spacebar to continue the task.</p>', 
	data: {label: 'intruct', trialType: 'instructions'},
	cont_key: 32
	};
	
	
//PUSH BREAK SCREENS BETWEEN EACH BLOCK
		if (y > 0)
		{experiment.push(task_break2);}
		else 
		{experiment.push(task_break);}

//////////////////////////////////
//EXPERIMENTAL TRIAL STARTS HERE// 
//////////////////////////////////

for(var i = 0; i < numTrials; i++) // For numTrials trials, do all 4 parts (trial, feedback, confidence_rating, confidence_rating_feedback)
{


//CHECK FULLSCREEN PLUGIN 
		var check_fullscreen2 = 
		{    
		type: 'fullscreen',    
		showtext: '<p>You need to be in fullscreen mode to continue the experiment! <br></br> Please click the button below to enter fullscreen mode.<br></br><p>',    
		buttontext: "Continue",
		//data: {block_nb: y},
		data: function() 
		{var data = jsPsych.data.getLastTrialData();
		var tNum = data.tNum + 1;
		jsPsych.data.addProperties({trialType: 'trial'});
		}
		};	

//STIMULI PARAMETERS FOR PARTICULAR TRIAL	

var blankstim1 = draw_blankstimulus("myInnerCanvas");
var blankstim2 = draw_blankstimulus("myInnerCanvas2");

var stimpos = trialpos[i];



//FIXATION AND DOTS PLUGIN
		var trial = 
		{
		type: 'xabpositionleft',
		stimuli: [function() // Note the specifics of how the stimuli function is wrapped in brackets like so: [function(){}]
				{ 
					++count;
					// Use the mean_diff on the last trial, the last two responses, 
					//and the current direction of the staircase to decide how to change the value of mean_diff
					s2 = staircase2edit(numDots1, responseMatrix, s2_dir,count); 
				    numDots1 = s2.diff;
					s2_dir = s2.direction;
					responseMatrix = s2.stepcount;
					if (s2.reversal) // Check for reversal. If true, add one to reversals variable
					reversals += 1;

				
				    
					var trialstim1 = draw_stimulus("myInnerCanvas", Math.round(Math.exp(numDots1))); // Create stimulus 1
				    var trialstim2 = draw_stimulus("myInnerCanvas2", numDots2); // Create stimulus 2 //stim 2 is the one with the LESS dots

					var stimulus = ['fixation5.png', trialstim1, trialstim2];
					return stimulus;
				}],
		
		pos: stimpos,
		timing_x: fixation_time,
		timing_xab_gap: -1,
		timing_ab: stim_time, // Shorter stimulus presentation
		prompt: '',
		timing_response: stim_time,
		data: {trialType: 'trial', label: 'dottedstim'},
		timing_post_trial: 0,
		on_finish: function()
		{
        jsPsych.data.addDataToLastTrial({stimdevi:  Math.round(Math.exp(numDots1))});
		}
		};

//RESPONSE BLOCK PLUGIN
		var trial_2 = 
		{
		type: 'doublestim_mome',
		stimuli: [[blankstim1,  blankstim2]],
		timing_response: -1,
		prompt: '',
		data: function()
		{var data = jsPsych.data.getLastTrialData();
		return {trialType: 'trial', label: 'responseblk'
		};
		}, //need this for feedback
		timing_post_trial: 0,
		on_finish: function() // This part is crucial
				{
					var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
					var correct = JSON.parse(data.correct); // Get boolean True/False if correct
					responseMatrix = responseMatrix.concat(correct);
					return {};
				}
		};


//FEEDBACK PLUGIN 
		var trial_feedback = 
		{
		type: 'single-stim',
		stimuli: function() // Draw feedback as a function relative to which stimulus they responded to (MOD THIS TO CHANGE TO WHICH DOTTED STIM)
		{

		var data = jsPsych.data.getLastTrialData();
		var response = JSON.parse(data.key_press);
		var correct = JSON.parse(data.correct);
		var blankstim1 = data.blankstim1;
		var blankstim2 = data.blankstim2;

		// Set which stimulus will be used for feedback
		var feedbackStim = "";
		if (correct)
		feedbackStim = blankstim1;
		else
		feedbackStim = blankstim2;

		var responseSide = "none";
		if(response === 87) // Pressed W
		responseSide = "left";
		else if (response === 69) // Pressed E
		responseSide = "right";
		else // If they didn't respond
		feedbackStim = ""; // Display no stimulus during feedback


		return draw_feedback_mome(responseSide, feedbackStim);
		},
		timing_stim: feedback_trial_time,
		timing_response: feedback_trial_time,
		choices: ['none'],
		data: function()
		{var data = jsPsych.data.getLastTrialData();
		return {trialType: 'trial', label: 'feedback'};
		}, 
		timing_post_trial: 0
		};



//CONFIDENCE RATING PLUGIN
		var confratingscale = 
		{ type: "survey-likert",
		questions: [['<p style = "text-align: center; font-size: 28px">Rate your confidence:<br></br></p>']],
		labels: [[["Guessing", " ", "Certain"]]],
		intervals: [[6]],
		data:function()
		{var data =  jsPsych.data.getLastTrialData();
		return {label: 'confidrating', trialType: 'trial'};
		}
		};



//GROUP EXPERIMENTAL TRIAL INTO ONE CHUNK + PUSH IT
	var exptchunk= {
	chunk_type:'linear',
	timeline: [check_fullscreen2, trial, trial_2, trial_feedback, confratingscale]
	};



experiment.push(exptchunk);

	
////////////////////////////
//END OF EXPERIMENTAL TASK//
////////////////////////////


}


	}


}


return experiment;

}