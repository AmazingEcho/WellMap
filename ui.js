// JavaScript Document
// ui.js
// Author: Thomas 'Toss' Condon

// Javascript functionallity for UI components of WellMap

$('document').ready(function(){
	
	// I used to have the controller initialize GMaps on it's own when the constructor was called
	// This caused the QUnit Test Suite to go all read, so I opted instead to have a seperate method
	var the_controller = new controller();
	the_controller.initGMaps();
	
	// The first thing the application does on startup is show the startup modal
	console.log("Ititializing Start Modal");
	$('.ui.modal.startup')
		.modal('setting', 'closable', false)
		.modal('show');
	
	// This is the button that starts up a new map
	$('.massive.ui.button.startupNewMap').click(function(){
		the_controller.newMap();
		console.log("Controller status: On - Map name: " + the_controller.the_map.metadata.mapName);
		$('.ui.modal.startup').modal('hide');
		// maybe bring up a new map info modal?
	})
	
	// This is the button that loads a new map
	// Since map loading hasn't been done yet, it simply issues an alert
	$('.massive.ui.button.startupLoadMap').click(function(){
		// TODO: hook this up to the map load function
		alert("Map Saving/Loading not yet implemented...");
	})

// Sidebar options
// This one simply adds some properties to the sidebar
// transition: "overlay" means the sidebar acts as an overlay, rather than a 'pusher'
// dimPage means the rest of the page gets dimmed when the sidebar is open
// closable means the sidebar closes when you click outside of of it
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

$('.ui.accordion').accordion({
	exclusive: false
	});

$('.menu .item').tab();

$('.ui.dropdown').dropdown();
$('.ui.checkbox').checkbox();

$('.ui.button').popup();

$('#modal-button-importPrivateDB').click(function(){
	$('.ui.modal.importPrivateDB').modal('show');
});

$('.ui.button.randomPoints').click(function(){
	the_controller.generateRandomPoints(16);
});

$('.ui.button.refreshMap').click(function(){
	the_controller.refreshMap();
	the_controller.refreshLayerList();
	
	// Checkboxes created in the refreshed layer list are not properly initialized if they are created AFTER .checkbox() is called
	//$('.ui.checkbox').checkbox();
	for(var i =0 ; i < the_controller.the_map.layers.length; i++){
		$('.ui.checkbox.layerVis_'+i).checkbox({
			onChecked: function(){
				console.log("Layer # " + i + " is set to visible: ");
			},
				
			onUnchecked: function(){
				console.log("Layer # " + i + " is set to invisible: ");
			}
		});
	}
});

});	// End of $('document').ready(function());