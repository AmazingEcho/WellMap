<?php
header('Access-Control-Allow-Origin: *');

pingPHP();

function pingPHP(){
	
	$myvar = $_POST['q']." how are you?";
	$myvar2 = $_POST['z'];
	echo $myvar + $myvar2;
}
?>