function metatask_fa1(practice, numPrac, numBlocks, numTrials)
{

//EMPTY ARRAY FOR TIMELINE OF EXPERIMENT
var experiment = [];

if(numTrials > 0) // If any trials, run entire task with instructions
{


//GENERAL INSTRUCTIONS							 
	var instr  = ['<p class="instructions">Willkommen zu dieser Untersuchung!</p>' +
	'<p class="instructions">Wir bitten Sie nun zu entscheiden, welches von zwei Bildern mehr Punkte beinhaltet. Danach werden Sie gefragt, wie sicher Sie sich bei Ihrer Entscheidung sind.</p>' +
	'<p class="instructions">Zu Beginn jeder Aufgabe sehen Sie ein schwarzes Kreuz in der Mitte des Bildschirms. Bitte konzentrieren Sie sich darauf. Danach erscheinen für eine sehr kurze Zeit zwei schwarze Boxen mit weissen Punkten. Sie müssen dann entscheiden, welche der beiden Boxen mehr Punkte enthielt.</p>' +
	'<p class="instructions">Falls die <strong>linke</strong> Box mehr Punkte enthielt, drücken Sie bitte die Taste <strong>W</strong>. Falls die <strong>rechte</strong> Box mehr Punkte enthielt, drücken Sie <strong>E</strong>.</p>' +
	'<p class="instructions">Bitte antworten Sie so schnell und korrekt wie möglich.</p>' +
	'<p class="instructions">Anschliessend geben Sie bitte auf einer Skala an, wie sicher Sie sich bei Ihrer Entscheidung sind. Dazu benötigen Sie die Maus.</p>' +
	'<p class="instructions">Bitte versuchen Sie, so genau wie möglich anzugeben wie sicher Sie sich sind. Benutzen Sie dazu die gesamte Skala.</p>' +
	'<p class="instructions">Bitte drücken Sie die Leertaste, um fortzufahren.</p>'];


//IF NO PRACTICE, GO STRAIGHT TO EXPERIMENTAL INSTRUCTIONS
if (practice === 0) 
{
	instr.push('<p class="instructions">Sie werden nun direkt mit dem Experiment beginnen. Die Punkte werden nur für eine ganz kurze Zeit angezeigt.</p>' +
	'<p class="instructions">Nach jeder Aufgabe werden Sie gebeten, anzugeben, wie sicher Sie mit Ihrer Entscheidung sind.</p>' +
	'<p class="instructions">Bitte drücken Sie die Leertaste, um fortzufahren.</p>');
}

//IF GOT PRACTICE, GO TO PRACTICE INSTRUCTIONS
else 
{
	instr.push('<p class="instructions">Wir bitten Sie, nun ein paar Übungsaufgaben zu lösen. Bitte antworten Sie erst wenn die Punkte ausgeblendet sind.</p>' +  
	'<p class="instructions">In diesen Übungsaufgaben werden wir Ihnen rückmelden, ob Sie die richtige oder falsche Entscheidung getroffen haben. <br></br>Falls Sie <strong>richtig</strong> liegen, wird die von Ihnen ausgewählte Box in <font color="green"><strong>grün</strong></font> hervorgehoben. <br>Falls sie <strong>falsch</strong> liegen, wird die von Ihnen ausgewählte Box in <font color="red"><strong>rot</strong></font> hervorgehoben.</p>' +
	'<p class="instructions">Sie werden während dieser Übungsaufgaben nicht gefragt, wie sicher Sie sich bei Ihrer Entscheidung sind.</p>' +
	'<p class="instructions">Bitte drücken Sie die Leertaste, um fortzufahren.</p>');
}

//INSTRUCTIONS PLUGIN + PUSH IT
	var instructions = 
	{
	type:"text",
	text:instr,
	data:{label: 'intruct', block_nb: 9, trialType: 'instructions'},
	cont_key: 32
	};

	experiment.push(instructions);

	
//EXPERIMENT PARAMETERS 

// Create variables for timing
var fixation_time = 1000;
var feedback_trial_time = 500;
var prac_stim_time = 300;
var stim_time = 300; 
var max_CR_RT = -1;
var inter_trial_interval = 500;

var numDots2 = 0; //the box with the less dots
	
var blankstim1 = draw_blankstimulus("myInnerCanvas");
var blankstim2 = draw_blankstimulus("myInnerCanvas2");



//PRACTICE BLOCK
if (practice != 0)
{


//MAKING THE SET STIMULUS DEVIATIONS

// the stim deviation
stimdeviset_fa1('prac',numPrac); //returns pracpos and pracnumDots
// pracpos is a sequence of 1 and 2 
dotdiff = pracnumDots.slice(0,numPrac);


//PRACTICE TRIAL LOOP
for(var i = 0; i < numPrac; i++)

{



//FULLSCREEN PLUGIN
	var check_fullscreen = 
	{   
	type: 'fullscreen',    
	showtext: '<p>Ihr Browser muss im Vollbild-Modus sein, um mit dem Experiment zu beginnen. <br></br> Bitte klicken Sie auf den untenstehenden Button, um in den Vollbild-Modus zu gelangen.<br></br><p>',    
	buttontext: "Weiter",
	data: {trialType: 'practice', block_nb: 0}
	};		

    var stimpos = pracpos[i];

	var numDots1 = dotdiff[i];console.log(numDots1);

	var pracstim1 = draw_stimulus("myInnerCanvas", numDots1);
	var pracstim2 = draw_stimulus("myInnerCanvas2", numDots2); // Create stimulus 2 //stim 2 is the one with the LESS dots
			

//FIXATION AND DOTS PLUGIN 
	var practice_trial = 
	{
	type: 'xabpositionleft',
	stimuli: [['fixation5.png',pracstim1, pracstim2]],
	pos: stimpos,
	timing_x: fixation_time,
	timing_xab_gap: -1,
	timing_ab: prac_stim_time,
	prompt: '<p style="text-align:center; font-size: 24px">Drücken Sie W, falls die linke Box mehr Punkte beinhaltet. Drücken Sie E, falls die rechte Box mehr Punkte enthält.</p>',
	timing_response: prac_stim_time,
	timing_post_trial: 0,
	data: {stimdevi: numDots1, trialType: 'practice', label: 'dottedstim', block_nb: 0}	
	};


//RESPONSE PLUGIN
	var practice_trial_2 = 
	{
	type: 'doublestim_fa',
	stimuli: [[blankstim1,  blankstim2]],
	timing_ab: -1, // Stimulus presentation = max_RT
	prompt: '<p style="text-align:center; font-size: 24px">Drücken Sie W, falls die linke Box mehr Punkte beinhaltet. Drücken Sie E, falls die rechte Box mehr Punkte enthält.</p>',
	timing_response: -1,
	data: {trialType: 'practice', label: 'responseblk', block_nb: 0}, //need this for feedback
	timing_post_trial: 0,
	on_finish: function() // This part is crucial
		{
			var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
			var correct = JSON.parse(data.correct); // Get boolean True/False if correct
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

	return draw_feedback_fa(responseSide, feedbackStim, correct);
	},

	timing_stim: feedback_trial_time,
	timing_response: feedback_trial_time,
	data: {trialType: 'practice', label: 'feedback', block_nb: 0},
	prompt: function() // Give feedback on correctness of trial in words as well
	{
	var data = jsPsych.data.getLastTrialData();
	var correct = JSON.parse(data.correct);
	if(correct)
	return '<p style = "text-align:center; font-size: 24px">Richtig</p>';
	else
	return '<p style = "text-align:center; font-size: 24px">Falsch</p>';
	},
	choices: ['none'],
	timing_post_trial: inter_trial_interval		
	};

  
 
   
//PUSH THE WHOLE TRIAL
	var practchunk= {
	chunk_type: 'linear',
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
	text:'<p class="instructions">In der Hauptaufgabe werden wir Ihnen keine Rückmeldung mehr zu Ihrer Leistung geben. Ihre Auswahl wird <font color="blue"><strong>blau</strong></font> hervorgehoben.</p>' +
	'<p class="instructions">Nach jeder Aufgabe werden Sie gefragt, anzugeben, wie sicher Sie bei Ihrer Entscheidung sind. Dies wird nachfolgend erklärt.</p>' +
	'<p class="instructions">Bitte drücken Sie die Leertaste, um fortzufahren.</p>',
	data: {label: 'intruct', trialType: 'intruc', block_nb: 9},
	cont_key: 32
	};



//CONFIDENCE RATING TEST PLUGINS
	var confid_prac1 = ['<p class="instructions">Während des gesamten Experiments sehen Sie die untenstehende Skala. Geben Sie Ihre Antwort an, indem Sie einen Punkt auf der Skala mit der Maus auswählen und anklicken. <br></br>Wählen Sie einen Punkt auf der Skala aus und drücken Sie ‚Bestätigen‘.</p><br>'];
	var confid_prac2 = ["Wenn Sie sich Ihrer Antwort sehr sicher sind, wo auf der Skala würden Sie dies angeben? <br></br>", "Wenn Sie sich sehr unsicher sind, wo auf der Skala würden Sie dies angeben? <br></br>" ];


	var confid_prac_ans = [ '<p class="instructions">Wenn Sie zuversichtlich sind, dass sie richtig geantwortet haben, dann hätten sie mit ‚sicher‘ antworten sollen.</p>' +			             
	'<p class="instructions">Wenn Sie sich sehr unsicher bei Ihrer Antwort sind, dann hätten Sie mit ‚raten‘ antworten sollen.</p>' + 
	'<p class="instructions">Bitte drücken Sie die Leertaste, um fortzufahren.</p>' ];


	var confid_prac3 = [ '<p class="instructions">Falls Sie sich einigermassen sicher sind, dass Ihre Antwort korrekt ist, dann klicken Sie in der Mitte der Skala zwischen den beiden Beschreibungen.</p>' +
	'<p class="instructions">Wenn Sie verstanden haben, wie sie die gesamte Skala benutzen können, klicken Sie ‚Bestätigen‘.</p><br>'];

	var confid_scale = ["Raten",  " ", "Sicher"];


	var confrating_prac1 = 

	{ type: "survey-likert-german",
	questions: [confid_prac1],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'confidprac', block_nb: 9}
	};


	var confrating_prac2 = 
	{      
	type: "survey-likert-german",
	questions: [confid_prac2],
	labels: [[confid_scale, confid_scale]],
	intervals: [[6,6]],
	data:{label: 'confidprac', trialType: 'confidprac', block_nb: 9}

	};

	var confrating_prac_ans =
	{
	type: "text",
	text: confid_prac_ans,
	data:{label: 'confidprac', trialType: 'confidprac', block_nb: 9},
	cont_key: 32
	};


	var confrating_prac3 = 
	{      
	type: "survey-likert-german",
	questions: [confid_prac3],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'confidprac', block_nb: 9}

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
stimdeviset_fa1('trial',numTrials);
// returns 6 vectors of dott diffs and positions for the three blocks (hard coded), each having 38 elements



//TRIAL BLOCKS PLUGINS
for (var y = 0; y < numBlocks; y++) // here 3 blocks of 38 trials each

{



	var task_break =
	{
	type:"text",
	text: '<p class="instructions">Das Hauptexperiment hat drei Blöcke mit je 38 Aufgaben. Vor jedem Block können Sie eine kurze Pause machen.</p>' +
	'<p class="instructions">Es gibt keine zeitliche Begrenzung für Ihre Entscheidung oder das Benutzen der Rating-Skala.</p>' +
	'<p class="instructions">Zur Erinnerung: Falls die linke Box mehr Punkte beinhaltete, drücken Sie <strong>W</strong>.<br> Falls die rechte Box mehr Punkte beinhaltet hat, drücken Sie <strong>E</strong>.</p>' +
	'<p class="instructions"><br>Drücken Sie die Leertaste, um zu beginnen.</p>', 
	data: {trialType: 'instructions', label: 'intruct', block_nb: 9},
	cont_key: 32
	};

	var task_break2 =
	{
	type:"text",
	text: '<p class="instructions">Sie können jetzt eine Pause machen. Sie haben '+y+' von '+numBlocks+' Blöcken absolviert.</p>' +
	'<p class="instructions"><br>Zur Erinnerung: Falls die linke Box mehr Punkte beinhaltete, drücken Sie <strong>W</strong>.<br> Falls die rechte Box mehr Punkte beinhaltet hat, drücken Sie <strong>E</strong>.</p>' +
	'<p class="instructions"><br>Drücken Sie die Leertaste, um fortzufahren.</p>', 
	data: {trialType: 'instructions', label: 'intruct', block_nb: 9},
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


if (y===0) {
var stimpos = trialpos1;
var dotdiff = trialstimdevi1;
}
else if (y===1) {
var stimpos = trialpos2;
var dotdiff = trialstimdevi2;
}
else if (y===2) {
var stimpos = trialpos3;
var dotdiff = trialstimdevi3;
}



for(var i = 0; i < numTrials; i++) // For numTrials=38 trials, do all 4 parts.
{


//CHECK FULLSCREEN PLUGIN 
		var check_fullscreen2 = 
		{    
		type: 'fullscreen',    
		showtext: '<p>Ihr Browser muss im Vollbild-Modus sein, um mit dem Experiment zu beginnen. <br></br> Bitte klicken Sie auf den untenstehenden Button, um in den Vollbild-Modus zu gelangen.<br></br><p>',    
		buttontext: "Weiter",
		data: {trial_type: 1, trialType: 'trial', block_nb: 1}
		};		

//STIMULI PARAMETERS FOR PARTICULAR TRIAL	

var stimposition = stimpos[i];

var numDots1 = dotdiff[i];


var trialstim1 = draw_stimulus("myInnerCanvas",numDots1);
var trialstim2 = draw_stimulus("myInnerCanvas2",numDots2);


//FIXATION AND DOTS PLUGIN
		var trial = 
		{
		type: 'xabpositionleft',
		stimuli: [['fixation5.png', trialstim1, trialstim2]],
		pos: stimposition,
		timing_x: fixation_time,
		timing_xab_gap: -1,
		timing_ab: stim_time,
		prompt: '<p style="text-align:center; font-size: 24px"></p>',
		timing_response: stim_time,
		timing_post_trial: 0,
		data: {stimdevi: numDots1, trialType: 'trial', label: 'dottedstim', block_nb: 1}
		};


//RESPONSE BLOCK PLUGIN
		var trial_2 = 
		{
		type: 'doublestim_fa',
		stimuli: [[blankstim1,  blankstim2]],
		timing_response: -1,
		prompt: '<p style="text-align:center; font-size: 24px"></p>',
		data: {trial_type: 1, trialType: 'trial', block_nb: 1, label: 'responseblk'},
		timing_post_trial: 0,
		on_finish: function() // This part is crucial
			{
				var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
				var correct = JSON.parse(data.correct); // Get boolean True/False if correct
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

		return draw_feedback_fa(responseSide, feedbackStim);
		},
		timing_stim: feedback_trial_time,
		timing_response: feedback_trial_time,
		choices: ['none'],
		data: {trial_type: 1, trialType: 'trial', label: 'feedback', block_nb: 1}, 
		timing_post_trial: 0
		};


//CONFIDENCE RATING PLUGIN
		var confratingscale = 
		{ type: "survey-likert-german",
		questions: [['<p style = "text-align: center; font-size: 28px">Bitte geben Sie an, wie sicher Sie sind<br></br></p>']],
		labels: [[["Raten", " ", "Sicher"]]],
		intervals: [[6]],
		data: {trial_type: 1, label: 'confidrating', trialType: 'trial', block_nb: 1}
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