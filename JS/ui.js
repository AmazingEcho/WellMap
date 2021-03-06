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
	document.title = "WellmAPPS - " + the_controller.the_map.metadata.mapName;
	console.log("Controller status: On");
	
	var tossDB = {
		dbName: "Test Database",
		dbDesc: "Database of Test Data",
		groupListURL: "http://www.tconx.net/wellMapServ/wellGroup_create_xml.php",
		wellListURL: "http://www.tconx.net/wellMapServ/well_create_xml.php?id="
	};
		
	the_controller.addDatabaseConnectionPHP(tossDB);
	
	var wellDataTable = $("#wellTableWHOLE").DataTable({
		scrollY: "300px",
		dom: "frtiS",
		//dom: 'T<"clear">lfrtip',
		//deferRender: true,
		paging: false
		/*
		"tableTools": {
			"sSwfPath": "JS/csv_xls.swf",
			"aButtons": [
			"aButtons": [
				{
					"sExtends": "xls",
					"sButtonText": "Export as Excel (.xls)"
				}
			]
		}
		*/
	});
	
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
	$('#button-addNewList, #dropdown-createNewGroupsFromSelection').click(function(){
		// Check that there are wells currently selected
		if(the_controller.selectedWells()){
			$('#listModal').modal({
				closable: false,
				onApprove: function(){
					// should take the name inputed from the keyboard and and display to the screen
					var title = document.getElementById("inputNameField")
					the_controller.createNewPointLayerFromSelectionAllLayers(title.value);
					fullRefresh(the_controller);
					},
				}
			)
			.modal('show');
		}
		// If there are no selected wells, 
		else{
			console.log("Popup GO!");
			$("#modal-noWellsSelected").modal("show");
		}
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
	
	$("#dropdown-editLayerProps").click(function(){
		// 3 possible states:
		// - No layers Selected
		// Modal doesn't appear
		// - One Selected
		// Modal appears
		// - 2 or more selected
		// Modal appears, but you can't change names
		
		var selectedLayers = the_controller.selectedLayersCount();
		
		if(selectedLayers.length == 0){
			console.log("No Layers Selected");
			return;
		}
		
		if(selectedLayers.length == 1){
			var selectedLayer = selectedLayers[0];
			$("#layerPropertiesModal")
				.modal({
					closable: false,
					onApprove: function(){
						// !!!!!!!!!!!!!!!!!!!!!!!!
						// Check that layer name field isn't empty 
						// !!!!!!!!!!!!!!!!!!!!!!!!
					
						if(($("input#layerNameField").val())){
							the_controller.the_map.layers[selectedLayer].name = ($("input#layerNameField").val());
							the_controller.the_map.layers[selectedLayer].pointStyle.pointLetter = ($("input#layerPropLetter").val());
							the_controller.the_map.layers[selectedLayer].pointStyle.pointColour = ($("input#layerPropColour").val());
							the_controller.the_map.layers[selectedLayer].pointStyle.textColour = ($("input#layerPropTextColour").val());
							fullRefresh(the_controller);
						}
						else{
							$("#NO_NAME_WARNING_LAYER_PROP").show();
							// Returning false prevents this modal from closing
							return false;
						}
					}
				})
			.modal('show');
			$("#NO_NAME_WARNING_LAYER_PROP").hide();
			$("#layerPropsEdittingName").text("Now Editting " + the_controller.the_map.layers[selectedLayer].name);
			$("input#layerNameField").val(the_controller.the_map.layers[selectedLayer].name);
			$("input#layerPropLetter").val(the_controller.the_map.layers[selectedLayer].pointStyle.pointLetter);
			document.getElementById("layerPropColour").color.fromString(the_controller.the_map.layers[selectedLayer].pointStyle.pointColour);
			document.getElementById("layerPropTextColour").color.fromString(the_controller.the_map.layers[selectedLayer].pointStyle.textColour);
		}
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
	
	//compare Capacity of wells
	$('#button-compareCapacity').click(function(){
		the_controller.the_map.sortCapacity();
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
	
	$("#button-deleteGroups").click(function(){
		if(the_controller.selectedLayersCount().length > 0){
			$("#deleteGroupConfirmModal").modal({
				closable: false,
				onApprove: function(){
					the_controller.deleteSelectedLayers();
					fullRefresh(the_controller);
				}
			})
			.modal("show");
		}
	});
	
	$("#button-deleteWells").click(function(){
		if(the_controller.selectedWells()){
			$("#deleteWellsConfirmModal").modal({
				closable: false,
				onApprove: function(){
					the_controller.deleteSelectedWells();
					fullRefresh(the_controller);
				}
			})
			.modal("show");
		}
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
		if(the_controller.clickState == 1){
			the_controller.changeClickState(2);
			$("#button-selectByArea").toggleClass("blue", true);
		}
		
		else{
			the_controller.changeClickState(1);
			$("#button-selectByArea").toggleClass("blue", false);
		}
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
					// Load function 
					// !!!!!!!!!!!!!!!!!!!!!!!!
					
					// handleFile();
					
					the_controller.convertXLS_2_JSON("loadExcelFile",the_controller);
				}
			})
		.modal('show');
	});

	//Export data to an excel sheet
	$("#dropdown-exportexcelButton").click(function(){
		$("#dropdown-exportexcelModal").modal('show');
		//Input data needs to be linked to selected wells!!
		//var dataToWrite = document.getElementById('inputTextToSave').value;
		//var blob = new Blob([dataToWrite], {type: "text/plain"});
		//var excelnewdoc = document.getElementById('excelnewdoc').value;
	});
	
	// Maybe move this to an onApprove in the modal code
	$("#dropdown-exportexcelModalGenerate").click(function(e){
		
		var tableData = the_controller.prepareTableList(0);
		wellDataTable.clear();
		wellDataTable.rows.add(tableData).draw();
		
		// This doesn't work in IE 11
		// URI limitations
/*
		$("#wellTableWHOLE").table2excel({
			exclude: ".noExl",
			name: "Excel Document Name"
		});
	*/
	
		// http://www.kubilayerdogan.net/javascript-export-html-table-to-excel-with-custom-file-name/
		//getting values of current time for generating the file name
		var dt = new Date();
		var day = dt.getDate();
		var month = dt.getMonth() + 1;
		var year = dt.getFullYear();
		var hour = dt.getHours();
		var mins = dt.getMinutes();
		var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
		//creating a temporary HTML link element (they support setting file names)
		var a = document.createElement('a');
		//getting data from our div that contains the HTML table
		var data_type = 'data:application/vnd.ms-excel';
		var table_div = document.getElementById('wellTableWHOLE');
		var table_html = table_div.outerHTML.replace(/ /g, '%20');
		a.href = data_type + ', ' + table_html;
		//setting the file name
		a.download = $("input#excelnewdoc").val() + ".xls";
		//triggering the function
		a.click();
		//just in case, prevent default behaviour
		e.preventDefault();

	});
	
	/*
	function filterSelected(mapLayers){
		var filteredPoints = new Array();
		
		for (layers in mapLayers) {
		
			for (point in mapLayers[layers].points){
				console.log(mapLayers[layers].points[point].name);
				
				if(mapLayers[layers].points[point].selected){
					filteredPoints.push(mapLayers[layers].points[point]);
				}
			}
			return filteredPoints;
		}
	}
	
	//Function for export data to excel
	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
   	if (ShowLabel) {
        var row = "number, well_name, type, lat, lng";
		row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
	}
	
    //This condition will generate the Label/Header
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
		row += '"' + i + '",';
		row += '"' + arrData[i].name + '",';
		row += '"' + arrData[i].type + '",';
		row += '"' + arrData[i].GMpoint.lat + '",';
		row += '"' + arrData[i].GMpoint.long + '",';
		
		//IN FUTURE
		//row += '"' + arrData[i].capacity + '",';
		//row += '"' + arrData[i].output + '",';
		//row += '"' + arrData[i].group + '",';

        row.slice(0, row.length - 1);
        
		
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
	*/
	
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
		//window.open("https://support.google.com/maps/?hl=en");
		window.open("man/UserManual.pdf");
	});
	
	// print button
	$('#dropdown-printButton').click(function(){
		// window.print();
		// Thanks StackEx
		// http://stackoverflow.com/questions/6500962/how-to-print-only-a-selected-html-element
		
		var content = window.document.getElementById("googleMap"); // get you map details
		var newWindow = window.open(); // open a new window
		newWindow.document.write(content.innerHTML); // write the map into the new window
		newWindow.print(); // print the new window
		newWindow.close();
	});
	
	///////////////////////////////////////////////////////
	//		Toolbar Buttons
	///////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
	//		Table Modal Buttons
	///////////////////////////////////////////////////////
	
	$("#dropdown-wellDataTable").click(function(){
		var tableData = the_controller.prepareTableList(0);

		wellDataTable.clear();
		$("#modal-wellList").modal("show");
		wellDataTable.rows.add(tableData).draw();
		/*
		$("#tableValuesType").dropdown({
			action: function(text, value){
				console.log("Dropdown change: " + value);
			}
		});
		*/
	});
	
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
	
	$("#dropdown-displayUWIGrid").click(function(){
		the_controller.toggleKML();
	});
	
	///////////////////////////////////////////////////////
	//		Selection Menu Buttons
	///////////////////////////////////////////////////////
	
	$("#dropdown-selectAllPoints").click(function(){
		the_controller.selectAllPoints();
		fullRefresh(the_controller);
	});
	
	$("#dropdown-deselectAllPoints").click(function(){
		the_controller.unselectAllPoints();
		fullRefresh(the_controller);
	});
	
	$("#dropdown-selectAllGroups").click(function(){
		the_controller.selectAllLayers();
		fullRefresh(the_controller);
	});
	
	$("#dropdown-deselectAllGroups").click(function(){
		the_controller.unselectAllLayers();
		fullRefresh(the_controller);
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
		the_controller.fetchWellsFromDatabasePHP(0, the_controller.wellGroupList[dataVal].groupName, dataVal, the_controller.wellGroupList[dataVal].groupOwner);
		
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
			if(the_controller.the_map.layers[j].selected == false){
				the_controller.the_map.layers[j].selected = true;
			}
			else if(the_controller.the_map.layers[j].selected == true){
				the_controller.the_map.layers[j].selected = false;
			}
			refreshLayerList(the_controller);
		}
	};
	
	generate_handler_dropper = function(j){
		return function(event){
			$("#sublist"+j).toggle();
		}
	};
});// End of $('document').ready(function());


