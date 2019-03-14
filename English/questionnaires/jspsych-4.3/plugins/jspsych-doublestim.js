//plugin for doublestim
 
 
(function( $ ) {
	jsPsych["doublestim"] = (function(){

		var plugin = {};

		plugin.create = function(params) {
			
			
      params = jsPsych.pluginAPI.enforceArray(params, ['data']);
			
			
			var trials = new Array(params.stimuli.length);
			for (var i = 0; i < trials.length; i++) {
			
				 trials[i] = {};
				 trials[i].type = "doublestim";
			     trials[i].stimuli = params.stimuli[i];
				
				
                 trials[i].a_path = params.stimuli[i][0];
                 trials[i].b_path = params.stimuli[i][1];
                // other information needed for the trial method can be added here
                
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
				
                 trials[i].left_key = params.left_key || 81; // defaults to 'q'
                 trials[i].right_key = params.right_key || 80; // defaults to 'p'
				 
                 // timing parameters
                 trials[i].timing_ab = params.timing_ab || -1; // defaults to -1, meaning infinite time on AB. If a positive number is used, then AB will only be displayed for that length.
                 trials[i].timing_response = params.timing_response || -1;
			
				  // optional parameters
                  trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
                  trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;

			}
			return trials;
		};
		
		
		
		
		plugin.trial = function(display_element, trial) {
			
				
			
		trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

		var setTimeoutHandlers = [];
			
		var keyboardListener;
	    

	   var images = [trial.a_path, trial.b_path];
	   
		//this calls placement of xab stimulus with the doublestim
		
	    var prevdata = jsPsych.data.getLastTrialData();
	    var target_left = JSON.parse(prevdata.target_left);
	   
       // var target_left = (Math.floor(Math.random() * 2) === 0); // 50% chance target is on left. //target left is either 1 or 0 === 0, if not 0, images are b then a
      
	  if (!target_left) {
         images = [trial.b_path, trial.a_path];
        }

        // show the options
        if (!trial.is_html) {
          display_element.append($('<img>', {
            "src": images[0],
            "class": 'jspsych-double-stimulus left'
          }));
          display_element.append($('<img>', {
            "src": images[1],
            "class": 'jspsych-double-stimulus right'
          }));
        } else {
          display_element.append($('<div>', {
            "class": 'jspsych-double-stimulus left',
            html: images[0]
          }));
          display_element.append($('<div>', {
            "class": 'jspsych-double-stimulus right',
            html: images[1]
          }));
        }

        if (trial.prompt !== "") {
          display_element.append(trial.prompt);
        }

        // if timing_ab is > 0, then we hide the stimuli after timing_ab milliseconds
        if (trial.timing_ab > 0) {
          setTimeoutHandlers.push(setTimeout(function() {
            $('.jspsych-double-stimulus').css('visibility', 'hidden');
          }, trial.timing_ab));
        }
		
		if (trial.timing_ab > 0) {
          setTimeoutHandlers.push(setTimeout(function() {
            $('.jspsych-double-stimulus').css('visibility', 'hidden');
          }, trial.timing_ab));
        }
		
		 // if timing_response > 0, then we end the trial after timing_response milliseconds
        if (trial.timing_response > 0) {
			var t2 = setTimeout(function() {
				end_trial({rt: -1, correct: false, key: -1});
			}, trial.timing_response);
			setTimeoutHandlers.push(t2);
		}

        // create the function that triggers when a key is pressed.
        var after_response = function(info) {

          // kill any remaining setTimeout handlers
          for (var i = 0; i < setTimeoutHandlers.length; i++) {
            clearTimeout(setTimeoutHandlers[i]);
          }

		// kill keyboard listeners
			if(typeof keyboardListener !== 'undefined'){
				jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
			}
		
          var correct = false; // true when the correct response is chosen

          if (info.key == trial.left_key) // 'q' key by default
          {
            if (target_left) {
              correct = true;
            }
          } else if (info.key == trial.right_key) // 'p' key by default
          {
            if (!target_left) {
              correct = true;
            }
          }

		  
		 info.correct = correct;
		 
		 end_trial(info);
		  
		  };
		  
		  

        var end_trial = function(info) {
          // kill any remaining setTimeout handlers
          for (var i = 0; i < setTimeoutHandlers.length; i++) {
            clearTimeout(setTimeoutHandlers[i]);
          }
		  
       jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

          // create object to store data from trial
          var trial_data = {
            "rt": info.rt,
            "correct": info.correct,
            "stimulus": JSON.stringify([trial.a_path, trial.b_path]),
            "key_press": info.key
          };
          jsPsych.data.write(trial_data);

          display_element.html(''); // remove all

          xab_trial_complete = true;

          // move on to the next trial after timing_post_trial milliseconds
          jsPsych.finishTrial();

        };
		
		
		
		  keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: [trial.left_key, trial.right_key],
          rt_method: 'date',
          persist: false,
          allow_held_key: false
          });
      
      }

    return plugin;
  })();
})(jQuery);


