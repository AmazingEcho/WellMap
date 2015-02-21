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
		alert('The File APIs are not fully supported in this browser.');
	}	
	
	// Startup proceedures
	
	// I used to have the controller initialize GMaps on it's own when the constructor was called.
	// Since the test suite page doesn't have a div that holds an instance of GoogleMaps, this would
	// the QUnit Test Suite to go all red.  Moving gmaps.js initiallization into a seperate function
	// fixes this.
	var the_controller = new controller();
	the_controller.initGMaps();
	
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
	console.log("Initializing Start Menu");
	$('#startupMenu')
		.modal('setting', 'closable', false)
		.modal('show');
	
	// This is the button that starts up a new map
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
	
	// When the Back button is clicked, they should go back to the first modal
	$("#newMapModalBack , #loadMapModalBack").click(function(){
		$("#newMapModal").modal('hide');
		$('#startupMenu')
			.modal('setting', 'closable', false)
			.modal('show');
	});

	$("#newMapModalCreateNewMap").click(function(){

	});
	
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
		$("#newMapWARNING")
			.modal('setting', 'closable', false)
			.modal('show');
	});
	
	// Save Map Button
	$("#dropdown-saveMapModal, #button-saveMapModal").click(function(){
		// Pull info from controller, and put it in the the inputs
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
					// Load function goes here
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
		$("#dropdown-editmapinfoModal").modal('show');
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


	//Import data from excel sheet 
	$("#dropdown-importexcelButton").click(function(){
		$("#dropdown-importexcelModal")
		.modal({
				closable: false,
				onApprove: function(){
					// !!!!!!!!!!!!!!!!!!!!!!!!
					// Load function goes here
					// !!!!!!!!!!!!!!!!!!!!!!!!
					console.log("Preparing to load file");
					var fileInput = document.getElementById("loadExcelFile");
					
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
				}
			})
		.modal('show');
	});
	
	//Export data to an excel sheet
	$("#dropdown-exportexcelButton").click(function(){
		$("#dropdown-exportexcelModal").modal('show');
		//Input data needs to be linked to selected wells!!
		var dataToWrite = document.getElementById('inputTextToSave').value;
		var blob = new Blob([dataToWrite], {type: "text/plain"});
		var excelnewdoc = document.getElementById('excelnewdoc').value;
		saveAs(blob, excelnewdoc + ".txt");
	});
	
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
		the_controller.generateRandomPoints(16);
		
	});
	
	$("#exitImportWellsFromDB").click(function(){
		fullRefresh(the_controller);
	});
	
	///////////////////////////////////////////////////////
	//		Report Bug Modal
	///////////////////////////////////////////////////////

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
	
	// handlers for layer visibility
	function generate_handler_visON(j){
		return function(event){
			the_controller.the_map.layers[j].visible = true;
			the_controller.refreshMap();
		};
	}
	
	function generate_handler_visOFF(j){
		return function(event){ 
			the_controller.the_map.layers[j].visible = false;
			the_controller.refreshMap();
		};
	}
	
	// Go through the list of layers and create 'nodes' containing the appropriate tags.
	for(var i = 0; i < the_controller.the_map.layers.length; i++){

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
		
		actionElem = document.createElement("input");
		actionElem.type = "checkbox";
			
		checkElem = document.createElement("div");
		checkElem.className = "ui checkbox";
		checkElem.id = "layerVis-" + i;
		checkElem.style.cssFloat = 'left';		// For non-IE
		checkElem.style.styleFloat = 'left';		// For IE
		
		
		// TODO: Fix this
		// Need to figure out a way to sear a layer index into the layer...
		/*
		checkElem.onclick = function(){
			console.log("Action heard on layer " + i);
			the_controller.the_map.switchVis(i)
		};
		*/
		checkElem.appendChild(actionElem);
			
		document.getElementById("LayerList").appendChild(checkElem);
		
		titleElem = document.createElement("div");
		titleElem.className = "title";
		titleElem.innerHTML = "<i class=\"dropdown icon\" style =\"float: left;\"> </i>";
			
		document.getElementById("LayerList").appendChild(titleElem);
		
		layerNameElem = document.createTextNode(the_controller.the_map.layers[i].name);
		
		document.getElementById("LayerList").appendChild(layerNameElem);
		
		contentElem = document.createElement("div");
		contentElem.className = "content";
		ulElem = document.createElement("ul");
		ulElem.id = "layer"+i;
		contentElem.appendChild(ulElem);
			
		document.getElementById("LayerList").appendChild(contentElem);
			
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
	}
}
