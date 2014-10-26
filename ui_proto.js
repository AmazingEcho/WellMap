// JavaScript Document
// ui_proto.js
// Author: Thomas 'Toss' Condon

// Small collection javascript to power current UI Prototype

$('document').ready(function(){
    
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

});	// End of $('document').ready(function());