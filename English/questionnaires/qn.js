function qn() {


//EMPTY ARRAY FOR TIMELINE OF QUESTIONNAIRES
var qns = [];

//INSTRUCTIONS PLUGIN
	var begin_qns =
	{
	type:"text",
	text:'<p class="instructions">We will now ask you to complete some questionnaires. Please note the options given might differ for different questionnaries.</p>' +
	'<p class="instructions">Please read each question carefully and answer according to the options given.</p>' +
	'<p class="instructions">Press spacebar to continue.</p>',
	data: {label: 'intruct', trialType: 'quest'},
	cont_key: 32
	};



//BIS PLUGIN
var  bis_qn =[' 1) I plan tasks carefully.',
				'2) I do things without thinking.',
				'3) I make-up my mind quickly.',
				'4) I am happy-go-lucky.',
				'5) I don’t “pay attention.”',
				'6) I have “racing” thoughts.',
				'7) I plan trips well ahead of time.',
				'8) I am self controlled.',
				'9) I concentrate easily.',
				'10) I save regularly.',
				'11) I “squirm” at plays or lectures.',
				'12) I am a careful thinker.',
				'13) I plan for job security.',
				'14) I say things without thinking.',
				'15) I like to think about complex problems.',
				'16) I change jobs.',
				'17) I act “on impulse.”',
				'18) I get easily bored when solving thought problems.',
				'19) I act on the spur of the moment.',
				'20) I am a steady thinker.',
				'21) I change residences.',
				'22) I buy things on impulse.',
				'23) I can only think about one thing at a time.',
				'24) I change hobbies.',
				'25) I spend or charge more than I earn.',
				'26) I often have extraneous thoughts when thinking.',
				'27) I am more interested in the present than the future.',
				'28) I am restless at the theater or lectures.',
				'29) I like puzzles.',
				'30) I am future oriented.'];


var bis_scale = ["Do not agree at all",  "Agree slightly", "Agree a lot",  "Agree completely"];

// bis has 30 qns		
		var bis = 
		{ type: "survey-multi-choice",
		questions: [bis_qn],
		options: [[bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale,bis_scale]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		horizontal: true,
		preamble: ['<strong>People differ in the ways they act and think in different situations. Read each statement and rate according to the labels. Do not spend too much time on any statment. Answer quickly and honestly.'],
		data:{label: 'bis', trialType: 'quest'}
		};





//OCIR PLUGIN
var ocir_qn = ['1) I have saved up so many things that they get in the way. ',
				'2) I check things more often than necessary. ',
				'3) I get upset if objects are not arranged properly.' ,
				'4) I feel compelled to count while I am doing things. ',
				'5) I find it difficult to touch an object when I know it has been touched by strangers or certain people.',

				'6) I find it difficult to control my own thoughts. ',
				'7) I collect things I don’t need. ',
				'8) I repeatedly check doors, windows, drawers, etc. ',
				'9) I get upset if others change the way I have arranged things. ',
				'10) I feel I have to repeat certain numbers. ',
				'11) I sometimes have to wash or clean myself simply because I feel contaminated.',

				"12) If you are paying attention to these questions, please select 'A little' as your answer.", // !!!!!catch question in OCIR number 12

				'13) I am upset by unpleasant thoughts that come into my mind against my will. ',
				'14) I avoid throwing things away because I am afraid I might need them later. ',
				'15) I repeatedly check gas and water taps and light switches after turning them off.',

				'16) I need things to be arranged in a particular way. ',
				'17) I feel that there are good and bad numbers. ',
				'18) I wash my hands more often and longer than necessary. ',
				'19) I frequently get nasty thoughts and have difficulty in getting rid of them.'];

				//ocir has 18 qns				+ 1 for catch question		 
				var ocir_scale = ["Not at all",  "A little", "Moderately",  "A lot" , "Extremely"];


		var ocir = 				
		{ type: "survey-multi-choice",
		questions: [ocir_qn],
		options: [[ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale,ocir_scale]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		horizontal: true,
		preamble: ['<strong>The following statements refer to experiences that many people have in their everyday lives. Rate according to the label that best describes HOW MUCH that experience has DISTRESSED or BOTHERED you during the PAST MONTH.</strong>'],

		data:{label: 'ocir', trialType: 'quest'}
		};


//SCHIZO PLUGIN
var schizo_qn = ['1) When in the dark do you often see shapes and forms even though there is nothing there?',
				'2) Are your thoughts sometimes so strong that you can almost hear them?',
				'3) Have you ever thought that you had special, almost magical powers?',
				'4) Have you sometimes sensed an evil presence around you, even though you could not see it?',
				"5) Do you think that you could learn to read other's minds if you wanted to?",
				'6) When you look in the mirror does your face sometimes seem quite different from usual?',
				'7) Do ideas and insights sometimes come to you so fast that you cannot express them all?',
				'8) Can some people make you aware of them just by thinking about you?',
				'9) Does a passing thought ever seem so real it frightens you?',
				'10) Do you feel that your accidents are caused by mysterious forces?',
				'11) Do you ever have a sense of vague danger or sudden dread for reasons that you do not understand?',
				'12) Does your sense of smell sometimes become unusually strong?',

				'13) Are you easily confused if too much happens at the same time?',
				'14) Do you frequently have difficulty in starting to do things?',
				'15) Are you a person whose mood goes up and down easily?',
				'16) Do you dread going into a room by yourself where other people have already gathered and are talking?',
				'17) Do you find it difficult to keep interested in the same thing for a long time?',
				'18) Do you often have difficulties in controlling your thoughts?',
				'19) Are you easily distracted from work by daydreams?',
				"20) Do you ever feel that your speech is difficult to understand because the words are all mixed up and don't make sense?",
				'21) Are you easily distracted when you read or talk to someone?',
				'22) Is it hard for you to make decisions?',
				'23) When in a crowded room, do you often have difficulty in following a conversation?'];

var schizo_qn2=['24) Are there very few things that you have ever enjoyed doing?',
				'25) Are you much too independent to get involved with other people?',
				'26) Do you love having your back massaged?',
				'27) Do you find the bright lights of a city exciting to look at?',
				'28) Do you feel very close to your friends?',
				'29) Has dancing or the idea of it always seemed dull to you?',
				'30) Do you like mixing with people?',
				'31) Is trying new foods something you have always enjoyed?',
				'32) Have you often felt uncomfortable when your friends touch you?',
				'33) Do you prefer watching television to going out with people?',

				'34) Do you consider yourself to be pretty much an average sort of person?',
				'35) Would you like other people to be afraid of you?',
				"36) Do you often feel the impulse to spend money which you know you can't afford?",
				'37) Are you usually in an average kind of mood, not too high and not too low?',
				'38) Do you at times have an urge to do something harmful or shocking?',
				'39) Do you stop to think things over before doing anything?',
				'40) Do you often overindulge in alcohol or food?',
				'41) Do you ever have the urge to break or smash things?',
				'42) Have you ever felt the urge to injure yourself?',
				'43) Do you often feel like doing the opposite of what other people suggest even though you know they are right?'];

//schizo has 43 qns						
var schizo_scale = ["No", "Yes"];


		var schizo =       
		{ type: "survey-multi-choice",
		questions: [schizo_qn, schizo_qn2],
		options: [[schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale] , [schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale,schizo_scale ]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		horizontal: true,
		preamble: ["<strong>Please read the statments and answer whether you agree or disagree with the statements with 'No' or 'Yes' ONLY.</strong>"],
		data:{label: 'schizo', trialType: 'quest'}
		};



//XUNG PLUGIN
var  zung_qn = ['1) I feel down-hearted and blue.', 
				'2) Morning is when I feel the best.',
				'3) I have crying spells or feel like it.',
				'4) I have trouble sleeping at night.',
				'5) I eat as much as I used to.',
				'6) I still enjoy sex.',
				'7) I notice that I am losing weight.',
				'8) I have trouble with constipation.',
				'9) My heart beats faster than normal.',
				'10) I get tired for no reason.',
				'11) My mind is as clear as it used to be.',
				'12) I find it easy to do the things I used to do.',
				"13) I am restless and can't keep still.",
				'14) I feel hopeful about the future.',
				'15) I am more irritable than usual.',
				'16) I find it easy to make decisions.',
				'17) I feel that I am useful and needed.',
				'18) My life is pretty full.',
				'19) I feel that others would be better off if I were dead.',
				'20) I still enjoy the things I used to do.'];


var zung_scale = ["A little of the time",  "Some of the time", "Good part of the time",  "Most of the time"];

//zung has 20 qns		
		var zungdep = 			
		{ type: "survey-multi-choice",
		questions: [zung_qn],
		options: [[zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale,zung_scale]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		horizontal: true,
		preamble : ['<strong>Please read each statement and decide HOW MUCH of the time the statement describes how you have been feeling during the PAST SEVERAL DAYS.</strong>'],
		data:{label: 'depress', trialType: 'quest'}
		};





//LIEBO SOCIAL ANXIETY QUESTIONNAIRE
var lebsocial_qn = ['<strong>1) Telephoning in public.</strong><br></br> Fear/Anxiety:',		
					'Avoidance:',
					'<br><strong>2) Participating in small groups.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>3) Eating in public places.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>4) Drinking with others in public places.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>5) Talking to people in authority.</strong><br></br> Fear/Anxiety:'	,			
					'Avoidance:',
					'<br><strong>6) Acting, performing or giving a talk in front of an audience.</strong><br></br> Fear/Anxiety:'	,
					'Avoidance:',
					'<br><strong>7) Going to a party.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>8) Working while being observed.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>9) Writing while being observed.</strong><br></br> Fear/Anxiety:'		,	
					'Avoidance:',
					'<br><strong>10) Calling someone you don’t know very well.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>11) Talking with people you don’t know very well.</strong><br></br> Fear/Anxiety:'		,
					'Avoidance:',
					'<br><strong>12) Meeting strangers.</strong><br></br> Fear/Anxiety:',
					'Avoidance:'];


var lebsocial_qn2 = ['<strong>13) Urinating in a public bathroom.</strong><br></br> Fear/Anxiety:'			,	
					'Avoidance:',
					'<br><strong>14) Entering a room when others are already seated.</strong><br></br> Fear/Anxiety:'	,
					'Avoidance:',
					'<br><strong>15) Being the center of attention.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					'<br><strong>16) Speaking up at a meeting.</strong><br></br> Fear/Anxiety:' ,
					'Avoidance:',
					'<br><strong>17) Taking a test.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					"<br><strong>18) Expressing a disagreement or disapproval to people you don't know very well.</strong><br></br> Fear/Anxiety:",
					'Avoidance:',
					'<br><strong>19) Looking at people you don’t know very well in the eyes.</strong><br></br> Fear/Anxiety:'	,
					'Avoidance:',
					'<br><strong>20) Giving a report to a group.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					'<br><strong>21) Trying to pick up someone.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					'<br><strong>22) Returning goods to a store.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					'<br><strong>23) Giving a party.</strong><br></br> Fear/Anxiety:',
					'Avoidance:',
					'<br><strong>24) Resisting a high pressure salesperson.</strong><br></br> Fear/Anxiety:',
					'Avoidance:'
];

var lebsocial_scale1 = [ "None" , "Mild", "Moderate","Severe"];
var lebsocial_scale2 = [ "Never (0%)" ,"Occasionally (1—33%)", "Often (33—67%)","Usually (67—100%)"];


		var lebsocial =      
		{ type: "survey-multi-choice",
		questions: [lebsocial_qn,lebsocial_qn2],
		options: [[lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2 ], [lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2, lebsocial_scale1,lebsocial_scale2]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		preamble: ['<strong>Read each bolded statement carefully and answer two questions about that statement. The first question asks how ANXIOUS or FEARFUL you feel in that situation. The second question asks how often you AVOID that situation. Please base your ratings on the way that the situations have affected you in the LAST WEEK.</strong>'],

		data:{label: 'social', trialType: 'quest'}
		};




//	IQ QUESTIONAIRE PLUGIN
var  iq_qn1 = ['1) What number is one fifth of one fourth of one ninth of 900?',
				'2) Zach is taller than Matt and Richard is shorter than Zach. Which of the following statements would be the most accurate?',
				'3) Joshua is 12 years old and his sister is three times as old as he. When Joshua is 23 years old, how old will his sister be?',				
				'4) If the day after tomorrow is two days before Thursday then what day is it today?',
				'5) In the following alphanumeric series, what letter comes next? K N P S U',
				'6) In the following alphanumeric series, what letter comes next? V Q M J H',
				'7) In the following alphanumeric series, what letter comes next? I J L O S',
				'8) In the following alphanumeric series, what letter comes next? Q S N P L'];

var  iq_qn2 = [	'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx45_q.png"><br><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx45_a.png"><br></center>'+
				'9) Which figure fits into the missing slot?',

				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx46_q.png"><br><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx46_a.png"><br></center>'+
				'10) Which figure fits into the missing slot?',

				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx47_q.png"><br><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx47_a.png"><br></center>'+
				'11) Which figure fits into the missing slot?',

				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx55_q.png"><br><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/mx55_a.png"><br></center>'+
				'12) Which figure fits into the missing slot?'];


var  iq_qn3 = [	'13) All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.<br>' +
				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/rsd3_q.png"></center>',

				'14) All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.<br>' +
				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/rsd4_q.png"></center>',

				'15) All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.<br>' +
				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/rsd6_q.png"></center>',

				'16) All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.<br>' +
				'<center><img src="http://www.fil.ion.ucl.ac.uk/~tseow/metacog_phaseII/rsd8_q.png"></center>'];
				

var iq_scale1 = ["2", "3", "4", "5", "6","7"];		
var iq_scale2 = ["Richard is taller than Matt", "Richard is shorter than Matt",  "Richard is as tall as Matt" ,"It's impossible to tell"];
var iq_scale3 = ["25" ,"39", "44", "47" ,"53", "57"];
var iq_scale4 = ["Friday" ,"Monday", "Wednesday",  "Saturday" ,"Tuesday", "Sunday"];
var iq_scale5 = ["S" ,"T", "U",  "V" ,"W", "X"];
var iq_scale6 = ["E" ,"F", "G", "H" ,"I", "J"];
var iq_scale7 = ["T" ,"U", "V",  "X" ,"Y", "Z"];
var iq_scale8 = ["J" ,"H", "I", "N" ,"M", "L"];

var iq_scale9 = ["A" ,"B", "C", "D" ,"E", "F"];
var iq_scale10 = ["A" ,"B", "C", "D" , "E", "F","G","H"];


		var icariq = 			
		{ type: "survey-multi-choice",
		questions: [iq_qn1, iq_qn2, iq_qn3],
		preamble: ['<strong>Please read each question carefully and answer as best as you can.</strong>'],
		options: [[iq_scale1,iq_scale2,iq_scale3,iq_scale4,iq_scale5,iq_scale6,iq_scale7,iq_scale8],[ iq_scale9,iq_scale9,iq_scale9,iq_scale9] , [iq_scale10,iq_scale10,iq_scale10,iq_scale10] ],
		required: [[true,true,true,true,true,true,true,true], [true,true,true,true], [true,true,true,true]],
		data:{label: 'iq', trialType: 'quest'}
		};
		
		
	//AUDIT PLUGIN
var  alcohol_qn =[' 1) How often do you have a drink containing alcohol? ',
				'2) How many drinks containing alcohol do you have on a typical day when you are drinking?',
				'3) How often do you have six or more drinks on one occasion? ',
				'4) How often during the last year have you found that you were not able to stop drinking once you had started? ',
				'5) How often during the last year have you failed to do what was normally expected from you because of drinking?  ',
				'6) How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session? ',
				'7) How often during the last year have you had a feeling of guilt or remorse after drinking?',
				'8) How often during the last year have you been unable to remember what happened the night before because you had been drinking? ',
				'9) Have you or someone else been injured as a result of your drinking?',
				'10) Has a relative or friend, or a doctor or other health worker been concerned about your drinking or suggested you cut down?'];

var alcohol_scale1 = [ "Never" , "Monthly or less", "Two to four times a month","Two to three times a week","Four or more times a week"];
var alcohol_scale2 = [ "1 or 2" , "3 or 4","5 or 6","7 to 9","10 or more"];
var alcohol_scale3 = [ "Never","Less than monthly","Monthly","Weekly","Daily or almost daily"];
var alcohol_scale4 = [ "No","Yes, but not in the last year","Yes, during the last year"];


		var alcoholadd =      
		{ type: "survey-multi-choice",
		questions: [alcohol_qn],
		options: [[alcohol_scale1,alcohol_scale2,alcohol_scale3,alcohol_scale3,alcohol_scale3,alcohol_scale3,alcohol_scale3,alcohol_scale3,alcohol_scale4,alcohol_scale4]],
		required: [[true,true,true,true,true,true,true,true,true,true]],
		preamble: ['<strong>Now we are going to ask you some questions about your use of alcoholic beverages during the past year. Please try to be as honest and as accurate as you can be.</strong>'],
		data:{label: 'alcohol', trialType: 'quest'}
		};
		
//APATHY PLUGIN
var  apathy_qn =[' 1) I am interested in things. ',
				'2) I get things done during the day. ',
				'3) Getting things started on my own is important to me.',
				'4) I am interested in having new experiences.  ',
				'5) I am interested in learning new things.  ',
				'6) I put little effort into anything.  ',
				'7) I approach life with intensity. ',
				'8) Seeing a job through to the end is important to me. ',
				'9) I spend time doing things that interest me. ',
				'10) Someone has to tell me what to do each day. ',
				'11) I am less concerned about my problems than I should be. ',
				'12) I have friends.  ',
				'13) Getting together with friends is important to me.',
				'14) When something good happens, I get excited.' ,
			    '15) I have an accurate understanding of my problems. ',
				'16) Getting things done during the day is important to me.',
				'17) I have initiative.',
				'18) I have motivation.' ];

var apathy_scale = [ "Not at all characteristic","Slightly characteristic","Somewhat characteristic","Very characteristic"];

		var apathy =      
		{ type: "survey-multi-choice",
		questions: [apathy_qn],
		options: [[apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale,apathy_scale]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		preamble: ['<strong>For each question, choose the answer that best describes your thoughts, feelings, and actions during the past 4 weeks.</strong>'],
		data:{label: 'apathy', trialType: 'quest'}
		};

		
//EATING DISORDER PLUGIN
var  eat_qn =[' 1) I am terrified about being overweight.',
				'2) I avoid eating when I am hungry.',
				'3) I find myself preoccupied with food.',
				'4) I have gone on eating binges where I feel that I may not be able to stop. ',
				'5) I cut my food into small pieces.',
				'6) I am aware of the calorie content of foods I eat.',
				'7) I particularly avoid foods with high carbohydrate content.',
				'8) I feel that others would prefer if I ate more.',
				'9) I vomit after I have eaten. ',
				'10) I feel extremely guilty after eating.',
				'11) I am preoccupied with a desire to be thinner.',
				'12) I think about burning up calories when I exercise.',
				'13) Other people think that I am too thin.',
				'14) I am preoccupied with the thought of having fat on my body.',
			    '15) I take longer than others to eat meals.',
				'16) I avoid foods with sugar in them.',
				'17) I eat diet foods.',
				'18) I feel that food controls my life.',
				'19) I display self-control around food.',
				'20) I feel that others pressure me to eat.',
				'21) I give too much time and thought to food.' ,
			    '22) I feel uncomfortable after eating sweets.',
				'23) I engage in dieting behaviour.',
				'24) I like my stomach to be empty.',
				'25) I enjoy trying new rich foods.',
				'26) I have the impulse to vomit after meals.'];

var eat_scale = [ "Always","Usually","Often","Sometimes","Rarely","Never"];

		var eat =      
		{ type: "survey-multi-choice",
		questions: [eat_qn],
		options: [[eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale,eat_scale]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		preamble: ['<strong>Please answer the questions below as accurately, honestly and completely as possible. There are no right or wrong answers.</strong>'],
		data:{label: 'eat', trialType: 'quest'}
		};
		
		
		
		//ANXIETY PLUGIN
var  anxiety_qn =[' 1) I feel pleasant.',
				'2) I feel nervous and restless.',
				'3) I feel satisfied with myself.',
				'4) I wish I could be as happy as others seem to be. ',
				'5) I feel like a failure.',
				'6) I feel rested.',
				'7) I am "calm, cool, and collected".',
				'8) I feel that difficulties are piling up so that I cannot overcome them.',
				"9) I worry too much over something that really doesn't matter. ",
				'10) I am happy.',
				'11) I have disturbing thoughts.',
				'12) I lack self-confidence.',
				'13) I feel secure.',
				'14) I make decisions easily.',
			    '15) I feel inadequate.',
				'16) I am content.',
				'17) Some unimportant thought runs through my mind and bothers me.',
				"18) I take disappointments so keenly that I can't put them out of my mind.",
				'19) I am a steady person.',
				'20) I get in a state of tension or turmoil as I think over my recent concerns and interests.'];

var anxiety_scale = [ "Almost never","Sometimes","Often","Almost always"];

		var genanxiety =      
		{ type: "survey-multi-choice",
		questions: [anxiety_qn],
		options: [[anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale,anxiety_scale ]],
		required: [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]],
		preamble: ['<strong>Read each statement and select the appropriate response to indicate how you feel right now, that is, at this very moment. There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</strong>'],
		data:{label: 'anxiety', trialType: 'quest'}
		};	
		
		
		
		
		
		
		
		
	

		
//PUSH QUESTIONNAIRE INSTRUCTIONS
qns.push(begin_qns);

//, ocir, schizo, zungdep, lebsocial, icariq, genanxiety, apathy, eat, alcoholadd
var questlist = [bis, ocir, schizo, zungdep, lebsocial, icariq, genanxiety, apathy, eat, alcoholadd];
var shufflequestlist  = jsPsych.randomization.shuffle(questlist);

//PUSH THE QUESTIONNAIRES
for(var i = 0; i < shufflequestlist.length; i++)
{
qns.push(shufflequestlist[i]);
};


return qns;

}

//166 qns in total	