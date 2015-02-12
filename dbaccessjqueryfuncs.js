//scans the database and creates an array of all the wells currently in the database
//TODO 
//need to figure out the best way to return that data
script type = "text/javascript">
function ImportWells(){
  $.ajax({
  type: "GET",
  url: 'WellMap.dbaccess/read_data',
  data: "",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  success: function(msg){
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//adds a new well the database. requires all fields except wellkey, which will be automatically generated
<script type = "text/javascript">
function AddWellToDB(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/add_new',
  data: "{wellGroup: " +group+ ", wellName: " +name+ ", wellType: " +type+ ", latitude: " +lat+ ", longitude: " +long+ ", wellCapacity: " +capacity+ ", wellOutput: " +output+ "}",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  success: function(msg){
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//updates a well in the database. requires all fields, including wellkey
<script type = "text/javascript">
function UpdateExistingWell(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/update_well',
  data: "{workingWellKey: " +key+ ", wellGroup: " +group+ ", wellName: " +name+ ", wellType: " +type+ ", latitude: " +lat+ ", longitude: " +long+ ", wellCapacity: " +capacity+ ", wellOutput: " +output+ "}",
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  success: function(msg){
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}

//deletes well from database, requires the key (unique identifier) of that well
<script type = "text/javascript">
function DeleteWellFromDB(){
  $.ajax({
  type: "POST",
  url: 'WellMap.dbaccess/delete_well',
  data: "{workingWellKey: " +key+ "},
  contentType: "application/json; charset=utf-8",
  datatype: "json",
  success: function(msg){
    $("#divResult").html("success");
  },
  error: function(e){
    $("#divResult").html("Something Wrong.");
  }
  });
}
