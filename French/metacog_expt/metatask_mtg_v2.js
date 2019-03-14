function metatask_mtg_v2(practice, numPrac, numBlocks, numTrials)
{

//EMPTY ARRAY FOR TIMELINE OF EXPERIMENT
var experiment = [];

if (true) //(numTrials > 0) // If any trials, run entire task with instructions
{


//GENERAL INSTRUCTIONS							 

	var instr  = ['<p class="instructions">Bienvenue !</p>' +
	'<p class="instructions">Votre tâche sera de juger laquelle de deux boîtes contient le plus de points, puis de donner une évaluation de votre confiance en chaque jugement.</p>' +
	'<p class="instructions">Au début de chaque essai, une croix de fixation sera présentée au centre de l’écran. Focalisez votre attention dessus. Ensuite, deux boîtes noires contenant un certain nombre de points blancs seront présentées très rapidement et vous devrez juger laquelle des deux boîtes contient le plus de points.</p>' +
	'<p class="instructions">Merci de répondre rapidement et le mieux possible.</p>' +
	'<p class="instructions">Vous devrez ensuite évaluer votre confiance en votre réponse sur une échelle avec la souris.</p>' +
	'<p class="instructions">Merci de faire de votre mieux pour évaluer votre confiance le plus précisement possible, et tirer profit de l’ensemble de l’échelle.</p>' +
	'<p class="instructions">Cliquez n’importe où sur le texte pour continuer.</p>'];

//IF NO PRACTICE, GO STRAIGHT TO EXPERIMENTAL INSTRUCTIONS
if (practice === 0) 
{
	instr.push('<p class="instructions">Appuyez sur la barre espace pour continuer.</p>');
}

//IF GOT PRACTICE, GO TO PRACTICE INSTRUCTIONS
else 
{
	instr.push('<p class="instructions">Vous avez maintenant quelques essais pour vous entraîner.</p>' +  
	'<p class="instructions">Pendant cette phase d’entraînement, on vous dira à chaque essai si votre réponse était correcte ou incorrecte.</p>' +
	'<p class="instructions">Vous n’aurez pas besoin d’évaluer votre confiance pour ces essais d’entraînement.</p>' +
	'<p class="instructions"><strong>C’est normal que la tâche soit difficile. Essayez simplement de faire de votre mieux.</strong></p>' +
	'<p class="instructions">Cliquez n’importe où sur le texte pour continuer.</p>');
}

//INSTRUCTIONS PLUGIN + PUSH IT

	var instructions = 
	{
	type:"text",
	text:instr,
	data:{ label: 'intruct', trialType: 'intruc'},
	cont_key: 'mouse'
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
		showtext: '<p>Vous devez être en mode plein écran pour continuer ! <br></br> Merci de cliquer sur le bouton ci-dessous pour entrer en mode plein écran.<br></br><p>',    
		buttontext: "Continuer",
		on_finish: function()
		{
        jsPsych.data.addDataToLastTrial({trial_type: 0, trialType: 'practice', block_nb: 0});
		}
		// data: function() 
		// {var data = jsPsych.data.getLastTrialData();
		// jsPsych.data.addDataToLastTrial({trialType: 'practice'});
		//jsPsych.data.addProperties({trialType: 'practice'});
		
		//}
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
					//var lastTrialResponses = [];
			        //lastTrialResponses[0] = responseMatrix[responseMatrix.length-2];
			        //lastTrialResponses[1] = responseMatrix[responseMatrix.length-1]; 
					
					// Use the mean_diff on the last trial, the last two responses, 
					//and the current direction of the staircase to decide how to change the value of mean_diff
					//do the adaptive here: 5 trials log(0.4), 
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
	timing_ab: prac_stim_time, // Stimulus presentation = max_RT
	prompt: '<p style="text-align:center; font-size: 24px"></p>',
	timing_response: prac_stim_time,
	timing_post_trial: 400,
	//timing_post_trial: 0,
	on_finish: function()
	{
        jsPsych.data.addDataToLastTrial({stimdevi:  Math.round(Math.exp(numDots1)),trialType: 'practice', label: 'dottedstim', block_nb: 0});
	}
	
	};


//RESPONSE PLUGIN
// CI-DESSOUS 3 ESSAIS ECHEC, CURRENT PLUG-IN, PLUG-IN ORIGINAL THAT WORKS WITH KEYBOARD


		 // var practice_trial_2 = 
		 // { type: "survey-likert-french",
		 // questions: [['<p style = "text-align: center; font-size: 28px">Quelle boîte contient le plus de points ?<br></br></p>']],
		 // labels: [[["Gauche", "Droite"]]],
		 // intervals: [[2]],
		 // data: {trialType: 'practice',  label: 'responseblk', block_nb: 0}, //need this for feedback
		 // 	on_finish: function() // This part is crucial
		 // 		{
		 // 			var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
		 // 			var correct = JSON.parse(data.correct); // Get boolean True/False if correct
		 // 			responseMatrix = responseMatrix.concat(correct);
					
		 // 			return {};
		 // 		}
		 // // data:function()
		 // // {var data =  jsPsych.data.getLastTrialData();
		 // // 	//	var correct = JSON.parse(data.correct); // Get boolean True/False if correct
		 // // 	//	responseMatrix = responseMatrix.concat(correct);
		 // // return {trial_type: 1, label: 'responseblk', trialType: 'practice', block_nb: 0};
		 // // }
		 // };

		 // var practice_trial_2 = {
		 //    type: 'image-button-response2',
		 //    stimulus:blankstim1,
		 //    stimulus2:blankstim2,
		 //    trial_duration:2000,
		 //    timing_post_trial:0,
		 //    choices: ['Gauche', 'Droite'],
		 //    data: {label: 'practice'}
		 // } ;

		 // var practice_trial_2 = {
		 //    type: 'html-button-response',
		 //    stimulus: '<p>Quelle boîte avait le plus de points ?</p>',
		 //    choices: ['Gauche', 'Droite'],
		 //    prompt: "<p>Quelle boîte avait le plus de points ?</p>"
		 // };



    	
		var qn_dir =['<p style = "font-size: 24px">Quelle boîte a le plus de points ?</p><br></br>'];

		var resp_dir = ['Gauche<br></br>','Droite<br></br><br></br>'];

		var practice_trial_2 = 
		{ type: "survey-multi-choice",
		questions: [qn_dir],
		options: [[resp_dir]],
		required: [[true]],
		horizontal: true,
		preamble: [''],
		//data:{label: 'responseblk', trialType: 'practice', block_nb: 0},

		on_finish: function() // This part is crucial
		{
			var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
			
			var response = JSON.parse(data.key_press);

			var dataL = jsPsych.data.getLastLastTrialData();
			
			var stimpos = JSON.parse(dataL.target_left);

			// transformation 1to1:
			if (stimpos)
				var stimpoz = 1;
			else
				var stimpoz = 2;

			if (response === stimpoz) 
				var correct = true ;
			else if (response !== stimpoz) 
				var correct = false ;

			//var correct = JSON.parse(data.correct); // Get boolean True/False if correct
			responseMatrix = responseMatrix.concat(correct);
			{
    	    jsPsych.data.addDataToLastTrial({correct: correct, key_press: response, label: 'responseblk', trial_type: 0, trialType: 'practice', block_nb: 0});
			}

		
			return {};
		},

		};



	// var practice_trial_2 = 
	// {
	// type: 'doublestim_mtg',
	// stimuli: [[blankstim1,  blankstim2]],
	// timing_ab: -1, // Stimulus presentation = max_RT
	// prompt: '<p style="text-align:center; font-size: 24px">Appuyez sur Z si la boîte de gauche contient le plus de points. Appuyez sur E si la boîte de droite contient le plus de points.</p>',
	// timing_response: -1,
	// data: {trialType: 'practice',  label: 'responseblk', block_nb: 0}, //need this for feedback
	// timing_post_trial: 0,
	// on_finish: function() // This part is crucial
	// 			{
	// 				var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
	// 				var correct = JSON.parse(data.correct); // Get boolean True/False if correct
	// 				responseMatrix = responseMatrix.concat(correct);
	// 				//save_responses(correct); // Save that boolean to the responseMatrix
	// 				return {};
	// 			}
	// };


//FEEDBACK PLUGIN
	var practice_feedback = 
	{
	type: 'single-stim',
	stimuli: '',
	// stimuli: function() // Draw feedback as a function relative to which stimulus they responded to and whether their response was correct 
	// {
	// var data = jsPsych.data.getLastTrialData();
	// var response = JSON.parse(data.key_press);
	// 		if (response === stimpos) 
	// 			var correct = true ;
	// 		else if (response !== stimpos) 
	// 			var correct = false ;
	// // Save which stimulus will be used for feedback
	// var feedbackStim = "";
	// if (correct)
	// feedbackStim = "";
	// else
	// feedbackStim = "";

	// var responseSide = "none";
	// if(response === 1) 
	// responseSide = "left";
	// else if (response === 2) 
	// responseSide = "right";
	// else // If they didn't respond
	// feedbackStim = ""; // Display no stimulus during feedback

	// return draw_feedback_mtg_v2(responseSide, feedbackStim, correct);
	// },

	timing_stim: feedback_trial_time,
	timing_response: feedback_trial_time,
	data: {trialType: 'practice', label: 'feedback', block_nb: 0},
	prompt: function() // Give feedback on correctness of trial in words as well
	{
	var data = jsPsych.data.getLastTrialData();
		var response = JSON.parse(data.key_press);
	
			var dataL = jsPsych.data.getLastLastTrialData();
			
			var stimpos = JSON.parse(dataL.target_left);

			// transformation 1to1:
			if (stimpos)
				var stimpoz = 1;
			else
				var stimpoz = 2;

			if (response === stimpoz) 
				var correct = true ;
			else if (response !== stimpoz) 
				var correct = false ;

	//var correct = JSON.parse(data.correct);


	if (correct)
	return '<p style = "text-align:center; font-size: 40px"><font color="green"><strong>Correct</strong></font></p>';
	else
	return '<p style = "text-align:center; font-size: 40px"><font color="red"><strong>Incorrect</strong></font></p>';
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
	text:'<p class="instructions">Pendant l’expérience elle-même, on ne vous dira pas si votre réponse était correcte ou incorrecte.</p>' +
	'<p class="instructions">Vous devrez ensuite évaluer votre confiance en votre réponse sur une échelle d’évaluation, à chaque essai, ce que nous allons maintenant expliquer plus en détail.</p>' +
	'<p class="instructions">Cliquez n’importe où sur le texte pour continuer.</p>',
	data: {label: 'intruct', trialType: 'intruc'},
	cont_key: 'mouse'//32
	};



//CONFIDENCE RATING TEST PLUGINS
	var confid_prac1 = ['<p class="instructions">Voici l’échelle d’évaluation qui sera employée pour tous les essais. Vous pourrez évaluer votre confiance en votre réponse en choisissant un point le long de l’échelle en cliquant dessus. <br></br>Cliquez sur ‘Continuer’.</p><br>'];
	var confid_prac2 = ["Pendant la tâche, si vous êtes <strong>très sûr(e)</strong> d avoir choisi la bonne boîte, où est-ce que vous répondriez sur l’échelle ? <br></br>", "Si vous n’êtes <strong>pas sûr(e) du tout</strong> d’avoir choisi la bonne boîte, où est-ce que vous répondriez sur l’échelle ? <br></br>" ];


	var confid_prac_ans = ['<p class="instructions">Si vous êtes <strong>très sûr(e)</strong> d’avoir choisi la bonne boîte, vous auriez dû répondre <strong>Certain</strong>.</p>' +			             
	'<p class="instructions">Si vous n’êtes <strong>pas sûr(e) du tout</strong> d’avoir choisi la bonne boîte, vous auriez dû répondre <strong>Au hasard</strong>.</p>' + 
	'<p class="instructions">Cliquez n’importe où sur le texte pour continuer.</p>' ];


	var confid_prac3 = ['<p class="instructions">Si vous êtes <strong>peu sûr(e)</strong> de votre réponse, vous devrez choisir un point entre ces deux descriptions en fonction de votre confiance.</p>' +
	'<p class="instructions">Essayez d’utiliser l’ensemble de l’échelle, en gardant à l’esprit que l’échelle représente une confiance relative. Sachant que la tâche est difficile, vous serez rarement complètement sûr(e)s que votre réponse est correcte.</p>' +
	'<p class="instructions">Si vous avez bien compris comment utiliser et exploiter l’ensemble de l’échelle, cliquez sur ‘Continuer’.</p><br>'];

	var confid_scale = ['<p style = "font-size: 24px">Au hasard</p>', " ", '<p style = "font-size: 24px">Certain</p>'];

	var confrating_prac1 = 

	{ type: "survey-likert-french",
	questions: [confid_prac1],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'confidprac'}
	};


	var confrating_prac2 = 
	{      
	type: "survey-likert-french",
	questions: [confid_prac2],
	labels: [[confid_scale, confid_scale]],
	intervals: [[6,6]],
	data:{label: 'confidprac', trialType: 'confidprac'}

	};

	var confrating_prac_ans =
	{
	type: "text",
	text: confid_prac_ans,
	data:{label: 'confidprac', trialType: 'confidprac'},
	cont_key: 'mouse'//32
	};


	var confrating_prac3 = 
	{      
	type: "survey-likert-french",
	questions: [confid_prac3],
	labels: [[confid_scale]],
	intervals: [[6]],
	data:{label: 'confidprac', trialType: 'confidprac'}

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
	text: '<p class="instructions">L’expérience est divisée en 3 blocs de 36 essais, entre lesquels vous pourrez faire une pause.</p>' +
	'<p class="instructions">Il n’y a pas de limite de temps pour choisir entre les boîtes ni pour évaluer votre confiance.</p>' +
	'<p class="instructions"><br>Cliquez n’importe où sur le texte lorsque vous êtes prêt(e) !</p>', 

	data: {trial_type: 0, label: 'intruct', trialType: 'intruc'},
	cont_key: 'mouse' //32
	};

	var task_break2 =
	{
	type:"text",
	text: '<p class="instructions">Vous pouvez maintenant faire une pause. Vous avez terminé '+y+' blocs sur '+numBlocks+'.</p>' +
	'<p class="instructions"><br>Cliquez n’importe où sur le texte pour continuer.</p>', 
	data: {trial_type: 0, label: 'intruct', trialType: 'intruc'},
	cont_key: 'mouse'
	};
	
	
//PUSH BREAK SCREENS BETWEEN EACH BLOCK
		if (y > 0)
		{experiment.push(task_break2);}
		else 
		{experiment.push(task_break);}

//////////////////////////////////
//EXPERIMENTAL TRIAL STARTS HERE// 
//////////////////////////////////


// prepare les essais determined, easier to keep people encouraged: 4 essais sur 36
var determined_dot_diff = shuffle([65,68,71,74]); //maybe put them even easier?

var position_determined = shuffle(Array.apply(null, Array(36)).map(function (_, w) {return w+1;}));
var pos_determined = [position_determined[0],position_determined[1],position_determined[2],position_determined[3]] ; //the first four trials 



for(var i = 0;i < numTrials;i++) // For numTrials trials, do all 4 parts (trial, feedback, confidence_rating, confidence_rating_feedback)
{


//CHECK FULLSCREEN PLUGIN 
		var check_fullscreen2 = 
		{    
		type: 'fullscreen',    
		showtext: '<p>Vous devez être en mode plein écran pour continuer ! <br></br> Cliquez sur le bouton ci-dessous pour entrer en mode plein écran.<br></br><p>',    
		buttontext: "Continuer",
		on_finish: function()
		{
        jsPsych.data.addDataToLastTrial({trial_type: 1, trialType: 'trial', block_nb: 1});
		}

		// data: function() 
		// {var data = jsPsych.data.getLastTrialData();
		// var tNum = data.tNum + 1;
		// jsPsych.data.addDataToLastTrial({trial_type: 1, trialType: 'trial', block_nb: 1});
		//jsPsych.data.addProperties({trial_type: 1, trialType: 'trial', block_nb: 1});
		
		//}

		};		

//STIMULI PARAMETERS FOR PARTICULAR TRIAL	

//var numDots1 =70;
//var numDots2 =0;

//var stim1 = draw_stimulus("myInnerCanvas",numDots1); // Create stimulus 1
//var stim2 = draw_stimulus("myInnerCanvas2",numDots2); // Create stimulus 2
var blankstim1 = draw_blankstimulus("myInnerCanvas");
var blankstim2 = draw_blankstimulus("myInnerCanvas2");

var stimpos = trialpos[i];


//FIXATION AND DOTS PLUGIN
if (i == pos_determined[0] ||i == pos_determined[1] ||i == pos_determined[2] ||i == pos_determined[3])	{ // these are interleaved easy trials, follow the L/R position

		if      (i==pos_determined[0]) {var numDots1det = determined_dot_diff[0];}
		else if (i==pos_determined[1]) {var numDots1det = determined_dot_diff[1];}
		else if (i==pos_determined[2]) {var numDots1det = determined_dot_diff[2];}
		else if (i==pos_determined[3]) {var numDots1det = determined_dot_diff[3];}

		var numDots2 = 0;

		var trialstim1det = draw_stimulus("myInnerCanvas",numDots1det); // Create stimulus 1
		var trialstim2det = draw_stimulus("myInnerCanvas2",numDots2); // Create stimulus 2

		var trial = 
		{
		type: 'xabpositionleft',
		stimuli: [['fixation5.png', trialstim1det, trialstim2det]],
		pos: stimpos,
		timing_x: fixation_time,
		timing_xab_gap: -1,
		timing_ab: stim_time, // Short stimulus presentation
		prompt: '',
		timing_response: stim_time,
		//data: {trialType: 'trialdetermined', label: 'dottedstim', block_nb: y},
		timing_post_trial: 0,
		on_finish: function()
		{
        jsPsych.data.addDataToLastTrial({stimdevi: numDots1det, trialType: 'trialdetermined', label: 'dottedstim', block_nb: 1});
		}
		};
		

//RESPONSE BLOCK PLUGIN
		var qn_dir =['<p style = "font-size: 24px">Quelle boîte a le plus de points ?</p><br></br>'];

		var resp_dir = ['Gauche<br></br>','Droite<br></br><br></br>'];

		var trial_2 = 
		{ type: "survey-multi-choice",
		questions: [qn_dir],
		options: [[resp_dir]],
		required: [[true]],
		horizontal: true,
		preamble: [''],
		//data:{trial_type: 1, trialType: 'trial', block_nb: 1, label: 'responseblk'},
		on_finish: function() // This part is crucial
		{
			var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
			
			var response = JSON.parse(data.key_press);

			var dataL = jsPsych.data.getLastLastTrialData();
			
			var stimpos = JSON.parse(dataL.target_left);

			// transformation 1to1:
			if (stimpos)
				var stimpoz = 1;
			else
				var stimpoz = 2;

			if (response === stimpoz) 
				var correct = true ;
			else if (response !== stimpoz) 
				var correct = false ;

			{
    	    jsPsych.data.addDataToLastTrial({correct: correct, key_press: response, label: 'responseblk', trial_type: 0, trialType: 'trialdetermined', block_nb: 1});
			}
			//var correct = JSON.parse(data.correct); // Get boolean True/False if correct
			
			//responseMatrix = responseMatrix.concat(correct);//commented June 18, 2018, bc we dont add anything for a no-staircase trial
			
			return {};
		}
		};


		}

else {	// these are the staircased trials i.e. all others
		var trial = 
		{
		type: 'xabpositionleft',
		stimuli: [function() // Note the specifics of how the stimuli function is wrapped in brackets like so: [function(){}]
				{
					//var lastTrialResponses = [];
			        //lastTrialResponses[0] = responseMatrix[responseMatrix.length-2];
			        //lastTrialResponses[1] = responseMatrix[responseMatrix.length-1]; 
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
		timing_ab: stim_time, // Short stimulus presentation
		prompt: '',
		timing_response: stim_time,
		//data: {trialType: 'trialstaircase', label: 'dottedstim', block_nb: y},
		timing_post_trial: 0,
		on_finish: function()
		{
        jsPsych.data.addDataToLastTrial({stimdevi: Math.round(Math.exp(numDots1)), trialType: 'trialstaircase', label: 'dottedstim', block_nb: 1});
		}
		};



//RESPONSE BLOCK PLUGIN
		var qn_dir =['<p style = "font-size: 24px">Quelle boîte a le plus de points ?</p><br></br>'];

		var resp_dir = ['Gauche<br></br>','Droite<br></br><br></br>'];

		var trial_2 = 
		{ type: "survey-multi-choice",
		questions: [qn_dir],
		options: [[resp_dir]],
		required: [[true]],
		horizontal: true,
		preamble: [''],
		//data:{trial_type: 1, trialType: 'trial', block_nb: 1, label: 'responseblk'},
		on_finish: function() // This part is crucial
		{
			var data = jsPsych.data.getLastTrialData(); // Get data from the response block (on_finish evaluates getLastTrialData() as the trial that is currently being coded under)
			
			var response = JSON.parse(data.key_press);

			var dataL = jsPsych.data.getLastLastTrialData();
			
			var stimpos = JSON.parse(dataL.target_left);

			// transformation 1to1:
			if (stimpos)
				var stimpoz = 1;
			else
				var stimpoz = 2;

			if (response === stimpoz) 
				var correct = true ;
			else if (response !== stimpoz) 
				var correct = false ;

			{
    	    jsPsych.data.addDataToLastTrial({correct: correct, key_press: response, label: 'responseblk', trial_type: 1, trialType: 'trialstaircase', block_nb: 1});
			}
			//var correct = JSON.parse(data.correct); // Get boolean True/False if correct
			responseMatrix = responseMatrix.concat(correct);
			
			return {};
		}
		};

	}

//CONFIDENCE RATING PLUGIN
		var confratingscale = 
		{ type: "survey-likert-french",
		questions: [['<p style = "text-align: center; font-size: 28px">Evaluez votre confiance :<br></br></p>']],
		labels: [[['<p style = "font-size: 24px">Au hasard</p>', " ", '<p style = "font-size: 24px">Certain</p>']]],
		intervals: [[6]],
		data:function()
		{var data =  jsPsych.data.getLastTrialData();
		return {trial_type: 1, label: 'confidrating', trialType: 'trial', block_nb: 1};
		}
		};



//GROUP EXPERIMENTAL TRIAL INTO ONE CHUNK + PUSH IT
	var exptchunk= {
	chunk_type:'linear',
	timeline: [check_fullscreen2, trial, trial_2, confratingscale]
	//timeline: [check_fullscreen2, trial, trial_2, trial_feedback, confratingscale]
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