// JavaScript Document
// ui.js
// Author: Thomas 'Toss' Condon

// Javascript functionallity for UI components of WellMap
// Wonder if I should start splitting this up...

$('document').ready(function(){
	
	if(window.File && window.FileReader && window.FileList && window.Blob){
		console.log("FileReader is supported!");
	}
	else {
		alert('The File APIs are not fully supported in this browser.  Saving and Loading will not function...');
	}	
	
	// Startup proceedures
	
	// I used to have the controller initialize GMaps on it's own when the constructor was called.
	// Since the test suite page doesn't have a div that holds an instance of GoogleMaps, this would
	// the QUnit Test Suite to go all red.  Moving gmaps.js initiallization into a separate function
	// fixes this.
	var the_controller = new controller();
	
	setTimeout(function(){
		the_controller.initGMaps();
		},
		100);
		
	the_controller.newMap();
	document.title = "WellMap - " + the_controller.the_map.metadata.mapName;
	console.log("Controller status: On");
	
	var tossDB = {
		dbName: "Test Database",
		dbDesc: "Database of Test Data",
		groupListURL: "http://www.tconx.net/wellMapServ/wellGroup_create_xml.php",
		wellListURL: "http://www.tconx.net/wellMapServ/well_create_xml.php?id="
	};
		
	the_controller.addDatabaseConnectionPHP(tossDB);
	
	////////////////////////////////////////////////////////////
	// Special Semantic Object Class Initializers
	////////////////////////////////////////////////////////////

	// Sidebar options
	// This one simply adds some properties to the sidebar
	// transition: "overlay" means the sidebar acts as an overlay, rather than a 'pusher'
	// dimPage means the rest of the page gets dimmed when the sidebar is open.  We don't want this, so it's been set to false
	// closable means the sidebar closes when you click outside of of it.  Again, we don't want this...
/*
	$('.ui.sidebar').sidebar({
		// overlay: true,
		// overlay got depritiated!
		transition: "overlay",
		dimPage: false,
		closable: false
		});

	// And, of course, clicking the sidebar toggle button makes the sidebar open and close!
	$('#sidebar-toggle').click(function() {
		$('.ui.sidebar').sidebar('toggle');
	});
*/

	// Controls the dropdown layer lists
	$('.ui.accordion').accordion({
		exclusive: false
		});

	$('.menu .item').tab();
	$('.ui.dropdown').dropdown();
	$('.ui.checkbox').checkbox();
	$('.ui.button').popup();
	
	////////////////////////////////////////////////////////////
	// Start Up Menus
	////////////////////////////////////////////////////////////
	
	// The first thing the application does on startup is show the startup modal

/*
	console.log("Initializing Start Menu");
	$('#startupMenu')
		.modal('setting', 'closable', false)
		.modal('show');
*/
	
	// This is the button that starts up a new map
/*	
	$('#startupNewMap').click(function(){
		the_controller.newMap();
		console.log("Controller status: On");
		$('#startupMenu').modal('hide');
		
		// After selection, brings up modal to input map info.
		$("#newMapModal")
			.modal({
				closable: false,
				onApprove: function(){
					if(!($("input#newMapNameField").val())){
						$("#NO_NAME_WARNING").html(" - Map Name cannot be empty");
						// Returning false prevents this modal from closing
						return false;
					}
					else{
						the_controller.the_map.changeName($("input#newMapNameField").val());
						the_controller.the_map.changeDescription($("input#newMapDescField").val());
					}
				},
			})
			.modal('show');
		$("input#newMapNameField").val(the_controller.the_map.metadata.mapName);
		$("input#newMapDescField").val(the_controller.the_map.metadata.desc);
	});
*/
	
	// When the Back button is clicked, they should go back to the first modal
/*
	$("#newMapModalBack , #loadMapModalBack").click(function(){
		$("#newMapModal").modal('hide');
		$('#startupMenu')
			.modal('setting', 'closable', false)
			.modal('show');
	});


	$("#newMapModalCreateNewMap").click(function(){

	});
	*/
	
	// This is the button that loads a new map
	// Since map loading hasn't been done yet, it simply issues an alert
	$('#startupLoadMap').click(function(){
		
		// TODO: hook this up to the map load function
		$("#startupMenu").modal('hide');
		$("#startupLoadMapModal")
			.modal({
				closable: false,
				onApprove: function(){
					console.log("Preparing to load file");
					var fileInput = document.getElementById("loadFileFieldStartup");
					
					var file = fileInput.files[0];
					var textType = "text/plain";
					
					console.log(file.type);
					if (file.type.match(textType)) {
						var reader = new FileReader();
						reader.onload = function(e){
							the_controller.loadDataJSON(e.target.result);
							
							fullRefresh(the_controller);
						}
						reader.readAsText(file);
					}
					else{
						console.log("ERROR! Invalid file type!");
						return false;
						// ^ prevents modal from closing
					}
				},
			})
			.modal('show');
	});

	///////////////////////////////////////////////////////
	// Small Button Functions
	///////////////////////////////////////////////////////
	
	// New Map Button
	$("#dropdown-newMapModal, #button-newMapModal").click(function(){
		/*
		$("#newMapWARNING")
			.modal('setting', 'closable', false)
			.modal('show');
		*/
		//window.open("file:///C:/Users/TConX/Documents/GitHub/WellMap/well_map.html");
		window.open("http://team-avengineers.github.io/WellMap/well_map.html");
  		//win.focus();
	});
	
	// Save Map Button
	$("#dropdown-saveMapModal, #button-saveMapModal").click(function(){
		// Pull info from controller, and put it in the inputs
		$("input#saveMapNameField").val(the_controller.the_map.metadata.mapName);
		$("input#saveMapDescField").val(the_controller.the_map.metadata.desc);
		
		$("#saveMapModal")
			.modal({
				closable: false,
				onApprove: function(){
					if(!($("input#saveMapNameField").val())){
						$("#NO_NAME_WARNING_SAVE").html(" - Map Name cannot be empty");
						// Returning false prevents this modal from closing
						return false;
					}
					else{
						the_controller.the_map.changeName($("input#saveMapNameField").val());
						the_controller.the_map.changeDescription($("input#saveMapDescField").val());
						
						// Call the Save Map function
						
						var saveData = the_controller.saveDataJSON("testSaveFileName.json");
						var blob = new Blob([saveData], {type: "text/plain"});
						saveAs(blob, the_controller.the_map.metadata.mapName + ".txt");
					}
				},
			})
			.modal('show');
	});
	
	$("#dropdown-loadMapModal, #button-loadMapModal").click(function(){
		
		$("#loadMapModal")
			.modal({
				closable: false,
				onApprove: function(){
					// !!!!!!!!!!!!!!!!!!!!!!!!
					// Load function 
					// !!!!!!!!!!!!!!!!!!!!!!!!
					console.log("Preparing to load file");
					var fileInput = document.getElementById("loadFileField");
					
					var file = fileInput.files[0];
					var textType = "text/plain";
					
					console.log(file.type);
					if (file.type.match(textType)) {
						var reader = new FileReader();
						reader.onload = function(e){
							// Do stuff here
							// console.log(e.target.result);
							the_controller.loadDataJSON(e.target.result);
							
							fullRefresh(the_controller);
						}
						reader.readAsText(file);
					}
					
					else{
						console.log("ERROR! Invalid file type!");
					}
					
				},
			})
			.modal('show');
	});
//////////////////////////////
// add a new list button
//////////////////////////////
		$('#button-addNewList').click(function(){


		$('#listModal')
			.modal({
				closable: false,
				onApprove: function(){
					    

// should take the name inputed from the keyboard and and display to the screen
var title = document.getElementById("inputNameField")
			the_controller.addList(title.value);
			fullRefresh(the_controller);





				},
			})
			.modal('show');
$("#inputNameField").each(function ()
{
    // store default value
    var default_val = this.value;

    $(this).blur(function ()
    {
        // clear value to default
        if (this.value.length == 0) this.value = default_val;
    }).focus(function ()
    {
        // when input has previous values, it should be clear when  user clicks the button 
        this.value = "";
    }); 
});
	});

		// press button to show name of the list on the sidebar
			$('#listModalOk').click(function () {
					fullRefresh(the_controller);
// i want to display this to the sidebar how do i do that
					// select the generated wells with a mouse 
					// click the add new list button to 
					// a window asking to create new list name
					// pull the selected wells from one list and import to new list
					// the new list with imported wells should be displayed to the sidebar 
					});
	
	$('#modal-button-copywelldata').click(function(){
		the_controller.the_map.copywellLayers();
	});
	
	$('#modal-button-cutwelldata').click(function(){
		the_controller.the_map.cutwellLayers();
	});
	
	$("#modal-button-pastewelldata").click(function(){
		the_controller.the_map.pastewellLayers();
	});
	
	$("#importWellsFromDatabaseButton").click(function(){
		$("#importWellsFromDatabaseModal")
			.modal('setting', 'closable', false)
			.modal('show')
		;
	});
	
	// Clicking on this button displays a modal that shows current map info
	// Also allows editing of current map info
	$("#dropdown-editmapinfoButton").click(function(){
		$("#NO_NAME_WARNING_MAP_INFO").html("");
		$("#dropdown-editmapinfoModal")
			.modal({
				closable: false,
				onApprove: function(){
					// !!!!!!!!!!!!!!!!!!!!!!!!
					// Check that the map name field has a name 
					// !!!!!!!!!!!!!!!!!!!!!!!!
					
					if(($("input#mapInfoNameField").val())){
						the_controller.the_map.changeName($("input#mapInfoNameField").val());
						the_controller.the_map.changeDescription($("input#mapInfoDescField").val());
					}
					else{
						$("#NO_NAME_WARNING_MAP_INFO").html(" - Map Name cannot be empty");
						// Returning false prevents this modal from closing
						return false;
					}
				}
			})
			.modal('show');
		// Pull info from controller, and put it in the the inputs
		$("input#mapInfoNameField").val(the_controller.the_map.metadata.mapName);
		$("input#mapInfoDescField").val(the_controller.the_map.metadata.desc);
	});
	
	//sort the names on the well list(s) by ascending order
	$('#button-sortascending').click(function(){
		the_controller.the_map.sortLayersByNameAscending();
		fullRefresh(the_controller);
	});
	//sort the names of the well lists by descending order
	$('#button-sortdescending').click(function(){
		the_controller.the_map.sortLayersByNameDescending();
		fullRefresh(the_controller);
	});
	
	$("#button-zoomIn").click(function(){
		var currentZoom = the_controller.Gmap.getZoom();
		the_controller.Gmap.setZoom(currentZoom + 1);
	});
	
	$("#button-zoomOut").click(function(){
		var currentZoom = the_controller.Gmap.getZoom();
		the_controller.Gmap.setZoom(currentZoom - 1);
	});
	
	$('#button-refreshMap').click(function(){
		// Note: Temporary
		// In the final version, the map and layer list should update on just about every user action.
		fullRefresh(the_controller);
	});
	
	/////////////////////////////////////////////////
	// Selection Mode Buttons
	/////////////////////////////////////////////////
	// Clicking on one turns it blue,
	// and also turns the others not-blue
	/////////////////////////////////////////////////
	$("#button-selectByClick").click(function(){
		the_controller.changeClickState(1);
		$("#button-selectByClick").toggleClass("blue", true);
		$("#button-selectByArea").toggleClass("blue", false);
	});
	
	$("#button-selectByArea").click(function(){
		the_controller.changeClickState(2);
		$("#button-selectByArea").toggleClass("blue", true);
		$("#button-selectByClick").toggleClass("blue", false);
	});

	$("#importWellsFromDatabaseButton").click(function(){
		$("#importWellsFromDatabaseModal").modal('show');
	});

	//Settings Button Area
	$('#modal-button-settingsButton').click(function(){
		$('.ui.modal.settings').modal('show');
	});
	
	// Chart/Graph modal button
	$('#dropdown-graphsViewer, #button-graphsViewer').click(function(){
		the_controller.graph.renderGraph()
		$('#graphsModal').modal('show');
	});

	var X = XLS;
	var xlf = document.getElementById('loadExcelFile');
	//Import data from excel sheet 
	$("#dropdown-importexcelButton").click(function(){
		$("#dropdown-importexcelModal")
		.modal({
				closable: false,
				onApprove: function(){
					handleFile();
					// !!!!!!!!!!!!!!!!!!!!!!!!
					// Load function 
					// !!!!!!!!!!!!!!!!!!!!!!!!
				}
			})
		.modal('show');
	});
	
	function handleFile() {
		alert("omgwtfbbq");
	rABS = false;
	use_worker = false;
	var files = xlf.files;
		var f = files[0];
		{
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				if(typeof console !== 'undefined') 
					console.log("onload", new Date(), rABS, use_worker);
					
				var data = e.target.result;
				var wb;
				var arr = fixdata(data);
				wb = X.read(btoa(arr), {type: 'base64'});
				process_wb(wb);
			};
			reader.readAsArrayBuffer(f);
		}
	}
	
	function fixdata(data) {
		var o = "", l = 0, w = 10240;
		for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
		o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
		return o;
	}
	
	function process_wb(wb) {
		var output = "";
		var jsondata = to_json(wb);
		if(typeof console !== 'undefined') 
		{
			console.log("output", new Date());
		}
		var sheetList = wb.SheetNames;
		var returnedData = new Array();
		for (sheet in sheetList) {
			if (jsondata[sheetList[sheet]]	 !== undefined)
			{
				for (row in jsondata[sheetList[sheet]])
				{
					returnedData.push(row);
				}
			}
		}
		
		alert(returnedData[0]);
	}
	
	function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}
	
	//Export data to an excel sheet
	$("#dropdown-exportexcelButton").click(function(){
		$("#dropdown-exportexcelModal").modal('show');
		//Input data needs to be linked to selected wells!!
		//var dataToWrite = document.getElementById('inputTextToSave').value;
		//var blob = new Blob([dataToWrite], {type: "text/plain"});
		//var excelnewdoc = document.getElementById('excelnewdoc').value;
		//saveAs(blob, excelnewdoc + ".txt");
		$("#dropdown-exportexcelModalGenerate").click(function(){
		var data = $('#txt').val();
        if(data == '')
            return;
        JSONToCSVConvertor(data, excelnewdoc, true);
		});
	});
	//Function for export data to excel
	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = ReportTitle;  
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
	
	//new map button
	$('#modal-button-newMap').click(function(){
	window.open("http://team-avengineers.github.io/WellMap/well_map.html");
	});
	
	// function to implement the world (sproule) icon
	$('#button-sproule').click(function(){
		window.open("http://sproule.com/");
	});
	
	// report bug button
	$('#dropdown-reportbugButton').click(function(){
		$('#dropdown-reportbugModal').modal('show');
		var email = document.getElementById('email').value;
		var issue = document.getElementById('issue').value;
		//insert function to store data in spreadsheet for IT to access
	});
	
	// Help button
	// Google help page currently a placeholder it will be linked to User Manual in April
	$('#dropdown-helpButton').click(function(){
		window.open("https://support.google.com/maps/?hl=en");
	});
	
	// print button
	$('#dropdown-printButton').click(function(){
		window.print();
	});
	
	///////////////////////////////////////////////////////
	//		Toolbar Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Change Map Display Type Buttons
	///////////////////////////////////////////////////////
	
	$("#changeMapTypeSAT").click(function(){
		the_controller.changeMapType(1);
	});
	
	$("#changeMapTypeTER").click(function(){
		the_controller.changeMapType(2);
	});
	
	$("#changeMapTypeROAD").click(function(){
		the_controller.changeMapType(3);
	});
	
	$("#changeMapTypeHYB").click(function(){
		the_controller.changeMapType(4);
	});
	
	///////////////////////////////////////////////////////
	//		New Map Info Modal Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		New Map Modal Buttons
	///////////////////////////////////////////////////////
	//		For when the user clicks the new map button
	//		on the toolbar.
	///////////////////////////////////////////////////////
	//		100% COMPLETE
	///////////////////////////////////////////////////////
		
	// Warning Buttons
	$('#newMapWARNINGno').click(function(){
		// This should just close the window...
	});
	
	$('#newMapWARNINGyes').click(function(){
		
		// Delete current map, and restart the controller...
		the_controller = new controller();
		the_controller.initGMaps();
		the_controller.newMap();
	
		var tossDB = {
			dbName: "Test Database",
			dbDesc: "Database of Test Data",
			groupListURL: "http://www.tconx.net/wellMapServ/wellGroup_create_xml.php",
			wellListURL: "http://www.tconx.net/wellMapServ/well_create_xml.php?id="
		};
			
		the_controller.addDatabaseConnectionPHP(tossDB);
		
		$("#newMapModal")
			.modal('setting', 'closable', false)
			.modal('show');
		$("input#newMapNameField").val(the_controller.the_map.metadata.mapName);
		$("input#newMapDescField").val(the_controller.the_map.metadata.desc);
	});

	// No back button!

	$("#newMapModalCreateNewMap_2").click(function(){
		if(!($("input#newMapNameField_2").val())){
			$("#NO_NAME_WARNING_2").html("Ayy Lmao 2");
			// TODO: Prevent Modal from hiding
		}
		else{
			the_controller.the_map.metadata.changeName($("input#newMapNameField_2"));
			the_controller.the_map.metadata.changeDescription($("input#newMapDescField_2"));
		}
		
	});
	
	///////////////////////////////////////////////////////
	//		Save Map Modal Buttons
	///////////////////////////////////////////////////////
	
	// DO NOT DELETE IT WORKS!
	// Note: moved to $("#button-saveMapModal")
	/*
	$('#saveMapModalSave').click(function(){
		
		var smapnameField = document.getElementById("saveMapNameField");
		var smapnameLength = smapnameField.value.length;

		var smapdescField = document.getElementById("saveMapDescField");
		var smapdescLength = smapdescField.value.length;


		if (smapnameLength == 0||smapdescLength ==0)
		{
			alert("Unable to save. Please fill out the Name and Description fields.");
		}
		else
		{
			the_controller.the_map.changeName(smapnameField);
			the_controller.the_map.changeDescription(smapdescField);
		}
	});
	*/
	
	///////////////////////////////////////////////////////
	//		Load Map Modal Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Edit Map Info Modal Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Import Data Modal Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Export Data Info Modal Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Settings for Map Modal Buttons
	///////////////////////////////////////////////////////
	
		//DO NOT DELETE IT WORKS!
	$('#modal-button-settingsButtonApply').click(function(){
		//$('.ui.modal.settings').modal('show');
		//alert("piril say okay");
		var mapName = document.getElementById('settingsMapNameField');
		var mapNameLength = mapName.value.length;

		var mapDesc= document.getElementById('settingsMapDescField');
		var mapDescLength = mapDesc.value.length;
		
		if (mapNameLength == 0||mapDescLength ==0)
		{
			alert("Unable to save. Please fill out the Name and Description fields.");
		}
		else
		{
			the_controller.the_map.changeName(mapName);
			the_controller.the_map.changeDescription(mapDesc);
		}
	});
	
	///////////////////////////////////////////////////////
	//		Import Well From Database Modal Buttons
	///////////////////////////////////////////////////////
	
	$('#databaseLoadWellListButton').click(function(){
		the_controller.fetchWellGroupsFromDatabasePHP(0);
	});
	
	$("#importWellMenuLoadWellsFromGroup").click(function(){
		//TODO: Error Checking
		
		var dataVal = $(".item.active.selected#wellGroupIndex").dropdown("get value");
		console.log("Selected Well Group: " + dataVal);
		console.log("Selected Well Group Name: " + the_controller.wellGroupList[dataVal].groupName);
		
		//NOTE: replace the 0 in this function with a value from the database selector
		the_controller.fetchWellsFromDatabasePHP(0, the_controller.wellGroupList[dataVal].groupName, dataVal);
		
		//NOTE: since well pulls are ajax powers, it might take a few ms to actually get the wells
	});

	$('#generateRandomPoints').click(function(){
		the_controller.generateRandomPoints(16); // generate random points and show on map and side bar
		
	});
	
	$("#exitImportWellsFromDB").click(function(){
		fullRefresh(the_controller);
	});
	
	///////////////////////////////////////////////////////
	//		Report Bug Modal
	///////////////////////////////////////////////////////

	// handlers for layer visibility
	generate_handler_visON = function(j){
		return function(event){
			the_controller.the_map.layers[j].visible = true;
			the_controller.refreshMap();
		};
	};
	
	generate_handler_visOFF = function(j){
		return function(event){ 
			the_controller.the_map.layers[j].visible = false;
			the_controller.refreshMap();
		};
	};
	
	generate_handler_selectLayer = function(j){
		return function(event){
			the_controller.the_map.layers[j].selected = true;
			console.log("Layer " + j + " selected");
			$("#clickable_layer"+j).css("background-color","blue")
		}
	};

});// End of $('document').ready(function());

// Refreshes the map AND the layer list
fullRefresh = function(conPTR){
	console.log("Refreshing");
	conPTR.refreshMap();
	refreshLayerList(conPTR);
};

refreshLayerList = function(the_controller){

	// First, clear the layer list
	document.getElementById("LayerList").innerHTML = "";
	
	// Go through the list of layers and create 'nodes' containing the appropriate tags.
	for(var i = 0; i < the_controller.the_map.layers.length; i++){

		var selectNameElem;
		var checkElem;
		var actionElem;
		var titleElem;
		var layerNameElem;
		var iconElem;
		var layerNameText;
		var ulNode;
	
		var contentNode;
		var ulElem;
	
		var liNode;
		var textnode;
		
		$("#LayerList").append("<div>");
		
		actionElem = document.createElement("input");
		actionElem.type = "checkbox";
		
		checkElem = document.createElement("div");
		checkElem.className = "ui checkbox";
		checkElem.id = "layerVis-" + i;
		checkElem.style.cssFloat = 'left';		// For non-IE
		checkElem.style.styleFloat = 'left';		// For IE
		
		checkElem.appendChild(actionElem);
			
		document.getElementById("LayerList").appendChild(checkElem);
		
		titleElem = document.createElement("div");
		titleElem.className = "title";
		titleElem.innerHTML = "<i class=\"dropdown icon\" style =\"float: left;\"> </i>";
			
		document.getElementById("LayerList").appendChild(titleElem);
		
		selectNameElem = document.createElement("div");
		
		layerNameElem = document.createTextNode(the_controller.the_map.layers[i].name);
		selectNameElem.appendChild(layerNameElem);
		selectNameElem.id = "clickable_layer" + i;
		
		document.getElementById("LayerList").appendChild(selectNameElem);
		
		contentElem = document.createElement("div");
		contentElem.className = "content";
		ulElem = document.createElement("ul");
		ulElem.id = "layer"+i;
		contentElem.appendChild(ulElem);
			
		document.getElementById("LayerList").appendChild(contentElem);
		
		$("#LayerList").append("</div>");
		
		// For each layer, insert all of it's points into the list.
		// TODO: Code to handle the other layer types
		switch(the_controller.the_map.layers[i].layerType){
			case "point":
				for(var j = 0; j < the_controller.the_map.layers[i].points.length; j++){
					liNode = document.createElement("li");
					textnode = document.createTextNode(the_controller.the_map.layers[i].points[j].name);
					liNode.appendChild(textnode);
					document.getElementById("layer"+i).appendChild(liNode);
				}
			case "path":
			case "poly":
			default:
		}
		
		if(the_controller.the_map.layers[i].visible == true){
			$("#layerVis-" + i).checkbox('check');
		}
		
		$("#layerVis-" + i).checkbox(
			{
				onChecked : generate_handler_visON(i),
				onUnchecked : generate_handler_visOFF(i),
			}
		);
		
		$("#clickable_layer" + i).click(generate_handler_selectLayer(i));
	}
}
