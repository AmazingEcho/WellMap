<?php

require("common.php");

if(($_GET['id'])){
	$id = $_GET['id'];
}
else{
	echo "I require a wellgroup ID";
	die('Could not connect: ' . mysql_error());
}

function parseToXML($htmlStr)
{
$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace("'",'&#39;',$xmlStr);
$xmlStr=str_replace("&",'&amp;',$xmlStr);
return $xmlStr;
}

// Select all the rows in the markers table
$query = "SELECT * FROM wells WHERE wellGroup =" . $id;

try{
	// Execute the query to check for an existing entry 
	$stmt = $con->prepare($query); 
	$stmt->execute(); 
}

catch(PDOException $ex){ 
	die("Failed to run query: " . $ex->getMessage()); 
}

$rows = $stmt->fetchAll();

header("Content-type: text/xml");

// Start XML file, echo parent node
echo '<wells>';

// Iterate through the rows, printing XML nodes for each
foreach($rows as $row){
  // ADD TO XML DOCUMENT
  echo '<well ';
  echo 'wellKey="' . $row['wellKey'] . '" ';
  echo 'wellGroup="' . $row['wellGroup'] . '" ';
  echo 'wellName="' . parseToXML($row['wellName']) . '" ';
  echo 'wellType="' . parseToXML($row['wellType']) . '" ';
  echo 'lat="' . $row['lat'] . '" ';
  echo 'lng="' . $row['lng'] . '" ';
  echo 'wellCapacity="' . $row['wellCapacity'] . '" ';
  echo 'wellOutput="' . $row['wellOutput'] . '" ';
  echo '/>';
}

// End XML file
echo '</wells>';

?>
