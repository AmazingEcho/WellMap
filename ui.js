// JavaScript Document
// ui.js
// Author: Thomas 'Toss' Condon

// Javascript functionallity for UI components of WellMap

$('document').ready(function(){
	
	// Startup proceedures
	
	// I used to have the controller initialize GMaps on it's own when the constructor was called.
	// Since the test suite page doesn't have a div that holds an instance of GoogleMaps, this would
	// the QUnit Test Suite to go all red.  Moving gmaps.js initiallization into a seperate function
	// fixes this.
	var the_controller = new controller();
	the_controller.initGMaps();
	
	var tossDB = {};
	the_controller.addDatabaseConnectionPHP(tossDB);
	
	// The first thing the application does on startup is show the startup modal
	console.log("Ititializing Start Menu");
	$('#startupMenu')
		.modal('setting', 'closable', false)
		.modal('show');
	
	// This is the button that starts up a new map
	$('#startupNewMap').click(function(){
		the_controller.newMap();
		console.log("Controller status: On - Map name: " + the_controller.the_map.metadata.mapName);
		$('#startupMenu').modal('hide');
		$("#mapInfoModal").modal('show');
		// maybe bring up a new map info modal?
	})
	
	// This is the button that loads a new map
	// Since map loading hasn't been done yet, it simply issues an alert
	$('#startupLoadMap').click(function(){
		// TODO: hook this up to the map load function
		alert("Map Saving/Loading not yet implemented...");
	})

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
		//$('#mapArea').toggleClass('slide-away');
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

	///////////////////////////////////////////////////////
	// Small Button Functions
	///////////////////////////////////////////////////////
	
	// Clicking on this button displays a modal that shows current map info
	// Also allows editing of current map info
	$("#displayMapInfo").click(function(){
		// Pull info from controller, and put it in the the inputs
		console.log("launching info panel");
		$("#mapInfoModal").modal('show');
		
		$("input#mapNameField").val(the_controller.the_map.metadata.mapName);
		$("input#mapDescField").val(the_controller.the_map.metadata.description);
	});
	//sort the names on the well list(s) by ascending order
	$('#modal-button-sortascending').click(function(){
		the_controller.the_map.sortLayersByNameAscending();
	});
	//sort the names of the well lists by descending order
	$('#modal-button-sortdescending').click(function(){
		the_controller.the_map.sortLayersByNameDescending();
	});
	
	$('#refreshMap').click(function(){
		// Note: Temporary
		// In the final version, the map and layer list should update on just about every user action.
		// Having this set to a button is better for debugging.
		the_controller.refreshMap();
		refreshLayerList(the_controller);
	});

	$("#importWellsFromDatabaseButton").click(function(){
		$("#importWellsFromDatabaseModal").modal('show');
	});

	//Settings Button Area
	$('#modal-button-settingsButton').click(function(){
		$('.ui.modal.settings').modal('show');
	});

	$('#modal-button-settingsButtonOkay').click(function(){
		//$('.ui.modal.settings').modal('show');
		//alert("piril say okay");
		var mapName = document.getElementById('mapNameField').value;
		var mapDesc= document.getElementById('mapDescField').value;

		the_controller.the_map.changeName(mapName);
		the_controller.the_map.changeDescription(mapDesc);

	});
	//saves current well lists onto server
	$('#modal-button-saveMap').click(function(){ 
		$('.ui.modal.saveMap').modal('show');
	});
	//save confirmation button
	$('#modal-button-saveMapButtonOkay').click(function(){
	 	var mapName = document.getElementById('mapNameField').value;
		var mapDesc= document.getElementById('mapDescField').value;

		the_controller.the_map.changeName(mapName);
		the_controller.the_map.changeDescription(mapDesc);
		
	});
	//import data from excel sheet
	$('#modal-button-importexcel').click(function(){
		$('.ui.modal.importexcel').modal('show');
		//function needed to import data
	});
	//export data to an excel sheet
	$('#modal-button-exportexcel').click(function(){
		$('.ui.modal.exportexcel').modal('show');
		//function needed to export data
	});
	//new map button
	$('#modal-button-newMap').click(function(){
	window.open("http://team-avengineers.github.io/WellMap/well_map.html");
	});
	
	// function to implement the world (sproule) icon
	$('#modal-button-sproule').click(function(){
		window.open("http://sproule.com/");
	});
	//report bug button
	$('#modal-button-reportbug').click(function(){
		$('.ui.modal.reportbug').modal('show');
		var email = document.getElementById('email').value;
		var issue = document.getElementById('issue').value;
		//insert function to store data in spreadsheet for IT to access
	});
	//help button
	$('#modal-button-Help').click(function(){
		window.open("https://support.google.com/maps/?hl=en");
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
	
	///////////////////////////////////////////////////////
	// Database Management Modal Buttons
	///////////////////////////////////////////////////////
	
	$('#databaseLoadWellListButton').click(function(){
		
	});

	$('#generateRandomPoints').click(function(){
		the_controller.generateRandomPoints(16);
	});
	
	$('#wellGroup1').click(function(){
		the_controller.fetchWellsFromDatabasePHP("Test Wells Group Alpha", 1);
	});
	
	$('#wellGroup2').click(function(){
		the_controller.fetchWellsFromDatabasePHP("Test Wells Group Beta", 2);
	});




});// End of $('document').ready(function());


refreshLayerList = function(the_controller){
	// Behold, my introduction to Javascripts DOM functionallity. -T
	// First, clear the layer list
	document.getElementById("LayerList").innerHTML = "";
		
	/*
	FORMAT:
	<div class="ui checkbox" style="float:left">
		<input type="checkbox">			//  Put the onclick functionallity here!
	</div>
	<div class="title">
		<i class="dropdown icon"></i>
		Layer Name
	</div>
	<div class="content" >
		<ul id="layer???">
		<li>Point 1</li>
		<li>Point 2</li>
		<li>Point 3</li>
		</ul>
	</div>
	*/
		
	var checkElem;
	var actionElem;
	var titleElem;
	var iconElem;
	var layerNameText;
	var ulNode;
	
	var contentNode;
	var ulElem;
	
	var liNode;
	var textnode;
		
	// Go through the list of layers and create 'nodes' containing the appropriate tags.
	for(var i = 0; i < the_controller.the_map.layers.length; i++){
			
		actionElem = document.createElement("input");
		actionElem.type = "checkbox";
		
		//actionElem.onUnchecked = function(){ this.the_map.visOff(i)};
			
		checkElem = document.createElement("div");
		checkElem.className = "ui checkbox layerVis_" + i;
		checkElem.style.cssFloat = 'left';		// For non-IE
		checkElem.style.styleFloat = 'left';		// For IE
		
		// TODO: Fix this
		// Need to figure out a way to sear a layer index into the layer...
		checkElem.onclick = function(){
			console.log("Action heard on layer " + i);
			the_controller.the_map.switchVis(i)
		};
		
		checkElem.appendChild(actionElem);
		//checkElem.innerHTML = "<label></label>";
			
		document.getElementById("LayerList").appendChild(checkElem);
		
		titleElem = document.createElement("div");
		titleElem.className = "title";
		titleElem.innerHTML = "<i class=\"dropdown icon\"> </i>" + the_controller.the_map.layers[i].name;
			
		document.getElementById("LayerList").appendChild(titleElem);
		
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
			$('.ui.checkbox.layerVis_'+i).checkbox('check');
		}
		
		// Note: I forgot about this code.
		// It's a remnant from when I tried running the refreshLayerList code in controller.js
		// It didn't work because I couldn't get the functions to access the_controller itself...
		// Might be worth a second try...
		// -T
			
		/*
		$('.ui.checkbox.layerVis_'+i).onEnable = function(){
			this.the_map.layers[i].visible = true;
			console.log("Layer # " + i + " is set to visible: " + this.the_map.layers[i].visible);
		}
		$('.ui.checkbox.layerVis_'+i).onDisable = function(){
			this.the_map.layers[i].visible = false;
			console.log("Layer # " + i + " is set to visible: " + this.the_map.layers[i].visible);
		}
		*/
	}
}
