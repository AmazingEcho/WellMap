// JavaScript Document

$('document').ready(function(){
    
function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(55.00,-115.00),
  zoom:5,
  mapTypeId:google.maps.MapTypeId.ROADMAP
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
	$('#mapArea').toggleClass('slide-away');
	//$('#googleMap').toggleClass('slide-away');
	console.log("I hear you!");
});

});