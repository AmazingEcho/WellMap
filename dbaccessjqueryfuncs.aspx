//scans the database and creates an array of all the wells currently in the database
//TODO 
//need to figure out the best way to return that data
<script type = "text/javascript">
function ImportWells(){
  $.ajax({
  type: "GET",
  url: 'dbaccess.aspx/read_data',
  data: "",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  async:false,
  success: function(msg){
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//adds a new well the database. requires all fields except wellkey, which will be automatically generated
//variable names in the success and data sections need to be the same as those on the page, with the corresponding text entry fields
<script type = "text/javascript">
function AddWellToDB(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/add_new',
  data: "{'wellGroup': " +document.getElementById('txtWellGroup').value+ ", 'wellName': " +document.getElementById('txtWellName').value+ ", 'wellType': " +document.getElementById('txtWellType').value+ ", 'latitude': " +document.getElementById('txtWellLat').value+ ", 'longitude': " +document.getElementById('txtWellLong').value+ ", 'wellCapacity': " +document.getElementById('txtWellCapacity').value+ ", 'wellOutput': " +document.getElementById('txtWellOutput').value+ "}",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  async:false,
  success: function(msg){
	$('#txtWellGroup').val('');
	$('#txtWellName').val('')
	$('#txtWellType').val('');
	$('#txtWellLat').val('');
	$('#txtWellLng').val('');
	$('#txtWellCapacity').val('');
	$('#txtWellOutput').val('');
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//updates a well in the database. requires all fields, including wellkey
//TODO provide proper well key to the function
<script type = "text/javascript">
function UpdateExistingWell(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/update_well',
  data: "{'wellKey': "+wellKey+", 'wellGroup': " +document.getElementById('txtWellGroup').value+ ", 'wellName': " +document.getElementById('txtWellName').value+ ", 'wellType': " +document.getElementById('txtWellType').value+ ", 'latitude': " +document.getElementById('txtWellLat').value+ ", 'longitude': " +document.getElementById('txtWellLong').value+ ", 'wellCapacity': " +document.getElementById('txtWellCapacity').value+ ", 'wellOutput': " +document.getElementById('txtWellOutput').value+ "}",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  async:false,
  success: function(msg){
	$('#toUpdateWellKey').val('');
	$('#txtWellGroup').val('');
	$('#txtWellName').val('')
	$('#txtWellType').val('');
	$('#txtWellLat').val('');
	$('#txtWellLng').val('');
	$('#txtWellCapacity').val('');
	$('#txtWellOutput').val('');
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//deletes well from database, requires the key (unique identifier) of that well
//TODO need the well key from the system of which well to delete
<script type = "text/javascript">
function DeleteWellFromDB(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/delete_well',
  data: "{workingWellKey: " +key+ "}",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  async:false,
  success: function(msg){
	$('#toDeleteWellKey').val('');
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}
