// JavaScript Document
// ui.js
// Author: Thomas 'Toss' Condon

// Javascript functionallity for UI components of WellMap

var Gmap;

$(document).on('submit', '.edit_marker', function(e) {
  e.preventDefault();

  var $index = $(this).data('marker-index');

  $lat = $('#marker_' + $index + '_lat').val();
  $lng = $('#marker_' + $index + '_lng').val();

  var template = $('#edit_marker_template').text();

  // Update form values
  var content = template.replace(/{{index}}/g, $index).replace(/{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);

  Gmap.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
  Gmap.markers[$index].infoWindow.setContent(content);

  $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
  $marker.data('marker-lat', $lat);
  $marker.data('marker-lng', $lng);
});

// Update center
$(document).on('click', '.pan-to-marker', function(e) {
  e.preventDefault();

  var lat, lng;

  var $index = $(this).data('marker-index');
  var $lat = $(this).data('marker-lat');
  var $lng = $(this).data('marker-lng');

  if ($index != undefined) {
    // using indices
    var position = Gmap.markers[$index].getPosition();
    lat = position.lat();
    lng = position.lng();
  }
  else {
    // using coordinates
    lat = $lat;
    lng = $lng;
  }

  Gmap.setCenter(lat, lng);
});

$('document').ready(function(){
	
	var the_controller = new controller();
	
	// TODO: Start up menu option to select between starting a new map and loading one
	// Also, must be unclosable, in order to force a choice...
	console.log("Ititializing Start Modal");
	$('.basic.modal.startup')
		.modal('setting', 'closable', false)
		.modal('show');
	
	$('.massive.ui.button.startupNewMap').on('click', function(){
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
	
// TODO: Move this over to controller.js
Gmap = new GMaps({
	div: '#googleMap',
	lat: 55.00,
	lng: -115.00,
	zoom: 5,
	mapTypeId:google.maps.MapTypeId.TERRAIN,
	disableDefaultUI:true
	});
	
GMaps.on('marker_added', Gmap, function(marker) {
    $('#markers-with-index').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + map.markers.indexOf(marker) + '">' + marker.title + '</a></li>');

    $('#markers-with-coordinates').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
  });

  GMaps.on('click', Gmap.map, function(event) {
    var index = Gmap.markers.length;
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    var template = $('#edit_marker_template').text();

    var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);

    Gmap.addMarker({
      lat: lat,
      lng: lng,
      title: 'Marker #' + index,
      infoWindow: {
        content : content
      }
    });
  });

$(function() {
    var tabs = $( "#tabs" ).tabs({
		collapsible: true
	});
	tabs.find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        tabs.tabs( "refresh" );
      }
    });
  });

$('#sidebar-toggle').click(function() {
	//$('#mapArea').toggleClass('slide-away');
	$('.ui.sidebar')
		.sidebar({overlay: true})
		.sidebar('toggle');
	console.log("I hear you!");
});

$('.ui.dropdown').dropdown();

var path = [[55.000,-115.000],[55.000,-113.000],[52.000,-113.000],[52.000,-115.000]];

polygon = Gmap.drawPolygon({
  paths: path, // pre-defined polygon shape
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});

$('#modal-button').click(function(){
	console.log("modal time");
	$('.basic.modal.wellLoad').modal('show');
});

});	// End of $('document').ready(function());