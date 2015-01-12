// JavaScript Document
// ui.js
// Author: Thomas 'Toss' Condon

// Javascript functionallity for UI components of WellMap

$('document').ready(function(){
	
	var the_controller = new controller();
	the_controller.initGMaps();
	
	// TODO: Start up menu option to select between starting a new map and loading one
	// Also, must be unclosable, in order to force a choice...
	console.log("Ititializing Start Modal");
	$('.basic.modal.startup')
		.modal('setting', 'closable', false)
		.modal('show');
	
	$('.massive.ui.button.startupNewMap').click(function(){
		// TODO: control logic that either starts a new map or tries to load an existing one, based on user input...
		the_controller.newMap();
		console.log("Controller status: On - Map name: " + the_controller.the_map.metadata.mapName);
		$('.basic.modal.startup').modal('hide');
		// maybe bring up a new map info modal?
	})
	
	$('.massive.ui.button.startupLoadMap').click(function(){
		// TODO: hook this up to the map load function
		alert("Map Saving/Loading not yet implemented...");
	})

$('#sidebar-toggle').click(function() {
	//$('#mapArea').toggleClass('slide-away');
	$('.ui.sidebar')
		.sidebar({overlay: true})
		.sidebar('toggle');
});

$('.ui.dropdown').dropdown();



$('#modal-button-importPrivateDB').click(function(){
	$('.basic.modal.importPrivateDB').modal('show');
});

$('.ui.button.randomPoints').click(function(){
	the_controller.generateRandomPoints(16);
});

$('.ui.button.refreshMap').click(function(){
	the_controller.refreshMap();
});

});	// End of $('document').ready(function());