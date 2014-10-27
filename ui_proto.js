// JavaScript Document
// ui_proto.js
// Author: Thomas 'Toss' Condon

// Small collection javascript to power current UI Prototype


var map;
$('document').ready(function(){
/*    
function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(55.00,-115.00),
  zoom:5,
  mapTypeId:google.maps.MapTypeId.TERRAIN,
  disableDefaultUI:true
  };
var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	}

google.maps.event.addDomListener(window, 'load', initialize);
*/
map = new GMaps({
	div: '#googleMap',
	lat: 55.00,
	lng: -115.00,
	zoom: 5,
	mapTypeId:google.maps.MapTypeId.TERRAIN,
	disableDefaultUI:true
	});

$(function(){
	$( "#slider" ).slider();
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

var path = [[55.000,-115.000],[55.000,-113.000],[52.000,-113.000],[52.000,-115.000]];

polygon = map.drawPolygon({
  paths: path, // pre-defined polygon shape
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});

});	// End of $('document').ready(function());