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

if(isset($_POST['submit'])){
	
	$wells = $_POST['wells'];
	
	if(!is_numeric($wells)){
		die("Value in wells is not numeric!");
	}
	
	$query = "SELECT *
				FROM wellGroups
				WHERE wellGroupName= :groupName AND wellGroupOwner= :ownerName ";
	
	$query_params = array( 
		':groupName' => $_POST['name'],
		':ownerName' => $_POST['owner']
	);
	
	try{
		// Execute the query to check for an existing entry 
		$stmt = $con->prepare($query); 
		$result = $stmt->execute($query_params); 
	} 
	catch(PDOException $ex){ 
		die("Failed to run query: " . $ex->getMessage()); 
	}
	
	$row = $stmt->fetch();
	
	// If the row exists, don't add a dupe.
	// Just add extra wells
	
	// If it doesn't, create it, and add wells...
	if(!($row)){

		$query = "INSERT INTO wellGroups (wellGroupName, wellGroupOwner, wellGroupInfo)
				VALUES (:groupName, :ownerName, :groupInfo)";
		
		$query_params = array( 
		':groupName' => $_POST['name'],
		':ownerName' => $_POST['owner'],
		':groupInfo' => $_POST['info']
		);	
			
		try{
			// Execute the query to check for an existing entry 
			$stmt = $con->prepare($query); 
			$result = $stmt->execute($query_params); 
		}
		 
		catch(PDOException $ex){ 
			die("Failed to run query: " . $ex->getMessage()); 
		}
	
		echo "Record Posted";
	}
	
	$query = "SELECT *
				FROM wellGroups
				WHERE wellGroupName= :groupName AND wellGroupOwner= :ownerName ";
	
	$query_params = array( 
		':groupName' => $_POST['name'],
		':ownerName' => $_POST['owner'],
	);
	
	try{
		// Execute the query to check for an existing entry 
		$stmt = $con->prepare($query); 
		$result = $stmt->execute($query_params); 
	} 
	catch(PDOException $ex){ 
		die("Failed to run query: " . $ex->getMessage()); 
	}
	
	$row = $stmt->fetch();
	$groupIndex = $row['wellGroupID'];
	
	// Add wells
	for($i = 0 ; $i < $wells; $i++){
		
		$randLat = 49.0 + 10.0 * mt_rand() / mt_getrandmax();
		$randLng = -120.0 + 20.0 * mt_rand() / mt_getrandmax();

		$randCapacity = rand(10,10000);
		$randOutput = rand(10,10000);
		
		$query = "INSERT INTO wells (wellGroup, wellName, wellType, lat, lng, wellCapacity, wellOutput)
					VALUES (:groupIndex, :wellName ,:wellType, :lat, :lng, :wellCap, :wellOut)";
					
		$query_params = array( 
		':groupIndex' => $groupIndex,
		':wellName' => $_POST['name']." ".$i ,
		':wellType' => "Well",
		':lat' => $randLat,
		':lng' => $randLng,
		':wellCap' => $randCapacity,
		':wellOut' => $randOutput
		);

		try{
			$stmt = $con->prepare($query); 
			$result = $stmt->execute($query_params); 
		} 
		catch(PDOException $ex){ 
			die("Failed to run query: " . $ex->getMessage()); 
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