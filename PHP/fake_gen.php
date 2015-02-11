<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Fake Data Generator</title>
</head>

<body>

<?php

// PHP Page to easily generate randomized test data for use in WellMap

require("common.php");

$wells = $_POST['wells'];

if(is_numeric($wells)){
	
	$groupName = $_POST['name'];
	$ownerName = $_POST['owner'];
	$groupInfo = $_POST['info'];
}


if(isset($_POST['submit'])){
	
	$query = "SELECT *
				FROM wellGroups
				WHERE wellGroupName='$groupName' AND wellGroupOwner='$ownerName'";
				
	$result = mysql_query($query);
	
	if(!$result){
		die('Invalid query: ' . mysql_error());
	}
	
	// If the row exists, don't add a dupe.
	// Just add extra wells
	
	// If it doesn't, create it, and add wells...
	if(mysql_num_rows($result) == 0){

		$query = "INSERT INTO wellGroups (wellGroupName, wellGroupOwner, wellGroupInfo)
				VALUES ('$groupName','$ownerName','$groupInfo')";
	
		$result = mysql_query($query);
	
		if(!$result){
			die('Invalid query: ' . mysql_error());
		}
	
	echo "Record Posted";
	}
	
	$query = "SELECT *
				FROM wellGroups
				WHERE wellGroupName='$groupName' AND wellGroupOwner='$ownerName'";
				
	$result = mysql_query($query);
	
	if(!$result){
		die('Invalid query: ' . mysql_error());
	}
	
	$groupIndex;
	
	// Add wells
	for($i = 0 ; $i < $wells; $i++){
		
		$randLat = 49.0 + 10.0 * mt_rand() / mt_getrandmax();
		$randLng = -120.0 + 20.0 * mt_rand() / mt_getrandmax();

		$randCapacity = rand(10,100000);
		$randOutput = rand(10,100000);
		
		$query = "INSERT INTO wells (wellGroup, wellName, wellType, lat, lng, wellCapacity, wellOutput)
					VALUES ('$groupIndex','$ownerName','$groupInfo')";

		$result = mysql_query($query);
	
		if(!$result){
			die('Invalid query: ' . mysql_error());
		}
	}
}

?>

<h1>Fake Data Generator</h1>
<h3>Because manually doing this in phpMyAdmin is tedious...</h3>
<br />
<br />
<form method="post" action="fake_gen.php">
	Name: <input type="text" name="name" value=""><br />
	Owner: <input type="text" name="owner" value=""><br />
	Info:<textarea name="info" rows="5" cols="40"></textarea><br />
	Number of Wells to add: <input type="text" name="wells" value="">
	<input name="submit" type="submit" value="Submit">
</form>
<?php
?>
</body>
</html>