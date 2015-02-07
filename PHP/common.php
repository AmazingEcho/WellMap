<?php
header('Access-Control-Allow-Origin: *');
/*
	$username = "tconxnet_CScode"; 
	$password = "z2lafile6b2mq044"; 
	$host = "localhost"; 
	$dbname = "tconxnet_wellmap2";
*/
	$con = mysql_connect("localhost","tconxnet_CScode","z2lafile6b2mq044");
	
	if (!$con){
		die('Could not connect: ' . mysql_error());
		}

	mysql_select_db("tconxnet_wellmap2", $con);

?>