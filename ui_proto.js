// JavaScript Document
// ui_proto.js
// Author: Thomas 'Toss' Condon

// Small collection of javascript to power current UI Prototype


var map;
$('document').ready(function(){

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

$('.ui.dropdown').dropdown();

var path = [[55.000,-115.000],[55.000,-113.000],[52.000,-113.000],[52.000,-115.000]];

polygon = map.drawPolygon({
  paths: path, // pre-defined polygon shape
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});

$(function() {
    $( "#beginning" ).button({
      text: false,
      icons: {
        primary: "ui-icon-seek-start"
      }
    });
    $( "#rewind" ).button({
      text: false,
      icons: {
        primary: "ui-icon-seek-prev"
      }
    });
    $( "#play" ).button({
      text: false,
      icons: {
        primary: "ui-icon-play"
      }
    })
    .click(function() {
      var options;
      if ( $( this ).text() === "play" ) {
        options = {
          label: "pause",
          icons: {
            primary: "ui-icon-pause"
          }
        };
      } else {
        options = {
          label: "play",
          icons: {
            primary: "ui-icon-play"
          }
        };
      }
      $( this ).button( "option", options );
    });
    $( "#stop" ).button({
      text: false,
      icons: {
        primary: "ui-icon-stop"
      }
    })
    .click(function() {
      $( "#play" ).button( "option", {
        label: "play",
        icons: {
          primary: "ui-icon-play"
        }
      });
    });
    $( "#forward" ).button({
      text: false,
      icons: {
        primary: "ui-icon-seek-next"
      }
    });
    $( "#end" ).button({
      text: false,
      icons: {
        primary: "ui-icon-seek-end"
      }
    });
    $( "#shuffle" ).button();
    $( "#repeat" ).buttonset();
  });

});	// End of $('document').ready(function());