// Staircase performance in the dots task. Nov 2016.


function staircase2edit(dots_diff,lastTrialsCorrect,dir,trialNum)
{

    var back1 = lastTrialsCorrect[lastTrialsCorrect.length-1]; // Last trial
    var back2 = lastTrialsCorrect[lastTrialsCorrect.length-2]; // Two trials ago
    var reverse = false; // Initialize reversal to false
     
    if(back1) // If the last trial was correct
    {
        if(back2) // AND two trials ago were correct
        {
             
            if (trialNum < 7)
             
            dots_diff -= 0.4;
         
             // for 0==trial and for the second half of the practice
         
            else if (trialNum > 6 && trialNum < 12)
         
            dots_diff -= 0.2;
            // for the first 5 trials of the practice
         
            else if (trialNum > 11)
             
            dots_diff -= 0.1;
            // for next 5 trials of the practice
             
            lastTrialsCorrect[lastTrialsCorrect.length-1] = false;
             
             
         
            dir[0] = dir[1]; // Set the direction two trials ago to the direction one trial ago
            dir[1] = "up";  // Set the direction one trial ago to up
            reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step down
        }
        // If the last trial was correct and two trials ago were wrong, do nothing.
    }
    else // If the last trial was wrong
    {
     
            if (trialNum < 7)
         
            dots_diff += 0.4; 
            // for 0==trial and for the second half of the practice
         
            else if (trialNum > 6 && trialNum < 12)
             
            dots_diff += 0.2; 
            // for the first 5 trials of the practice
         
            else if (trialNum > 11)
     
            dots_diff += 0.1;
            // for next 5 trials of the practice
         
         
         
        dir[0] = dir[1]; // Set the direction two trials ago to the direction one trial ago
        dir[1] = "down"; // Set the direction one trial ago to down
        reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step up
    }
    // Set limits on dots_diff s.t. it remains in the range of [0,50] inclusive
    //if (dots_diff >= 4.25) 
    //  dots_diff = 4.25;
    if (dots_diff <= 1)
        dots_diff = 1;
     
    var output = 
    {
        diff: dots_diff,
        direction: dir,
        reversal: reverse,
        stepcount: lastTrialsCorrect
    };
    return output;
}
 
// Note that we only call check_reversal when there was a step up or step down
function check_reversal(dir)
{
    if(dir[0] !== dir[1]) // If the direction two trials ago is NOT the same direction as the last trial, then there was a reversal 
        return true;
    else // If the direction two trials ago and the last trial are the same direction, no reversal
        return false;
}