//put this in the main script
function save_data(alldata){
  var data_table = "test1"; // name of your table in mysql
  $.ajax({
      type:'post',
      cache: false,
      url: '/~tseow/meta_expt_draft2/savedata.php', // change this to point to your php file
     data: {
         table: data_table,
         json: JSON.stringify(alldata)
      },
     success: function(output) { console.log(output); } // write the result to javascript console
   });
}




//add this at the end in the jspsych init

jsPsych.init({
		    on_finish:{
		
			save_data(jsPsych.data.getData());
			
			}
)};






//create a php file with this, change accordingly (file was called 'database_connect.php')

<?php

$dbc = mysql_connect('localhost', 'your username', 'password'); 
mysql_select_db('database name', $dbc);

?>







//create another php file (file was called 'save_data.php')

<?php

// Submit Data to mySQL database

include('database_connect.php');

// You should not need to edit below this line

function mysql_insert($table, $inserts) {
    $values = array_map('mysql_real_escape_string', array_values($inserts));
    $keys = array_keys($inserts);

    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')');
}

// get the table name
$tab = $_POST['table'];

// decode the data object from json
$trials = json_decode($_POST['json']);

// get the optional data (decode as array)
$opt_data = json_decode($_POST['opt_data'], true);
$opt_data_names = array_keys($opt_data);

var_dump($trials);

// for each element in the trials array, insert the row into the mysql table
for($i=0;$i<count($trials);$i++)
{
    $to_insert = (array)($trials[$i]);
    // add any optional, static parameters that got passed in (like subject id or condition)
    for($j=0;$j<count($opt_data_names);$j++){
        $to_insert[$opt_data_names[$j]] = $opt_data[$opt_data_names[$j]];
    }
    $result = mysql_insert($tab, $to_insert);
}

// confirm the results
if (!$result) {
    die('Invalid query: ' . mysql_error());
} else {
    print "successful insert!";
}

?>