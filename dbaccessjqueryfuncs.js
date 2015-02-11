<script type = "text/javascript">
function ImportWells(){
  $.ajax({
  type: "POST",
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

<script type = "text/javascript">
function AddWellToDB(){
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

<script type = "text/javascript">
function AddWellToDB(){
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
