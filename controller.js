/*
WellMap
controller.js
*/

/*

Constructors for the various classes.

*/

/*
controller
The controller that handles all of the control logic
*/
function controller(){
	
	// Classes will have attributes and functions, both of which MUST be prefaced with a 'this.'
	// When the controller is made, the first thing it does is create a map object
	// It does this by calling the map() constructor function
	this.the_map = new map();
	
	// Functions are made in a similar fashion as attributes
	// function() means that that we're declaring a function (duh)
	// the name in function(name) is an incoming argument
	// Notice how its not 'String name'.  That's because JavaScript uses Duck Typing.  Look it up...
	this.newLayer = function(name){
		// the only thing this function does is call the newLayer() function on the_map object, passing along the name...
		this.the_map.newLayer(name);
	};
	
	this.newPointLayer = function(name){
		this.the_map.newPointLayer(name);
	}
}

function map(){
	// Arrays in Javascript aren't like Arrays in C/C++
	// You don't have to specify how big the array is or what it's storing
	this.layers = new Array();
	
	this.newLayer = function(name){
		// You can put new objects (or anything) into an Array with the .push() method
		this.layers.push(new Layer(name));
	};
	
	this.newPointLayer = function(name){
		this.layers.push(new pointLayer(name));
	};
	
	this.layerCount = function(){
		return this.layers.length;
	}
}

var Layer = Class.extend({
	constuct: function(nameA){
		this.name = nameA;
		this.visible = true;
	},
	
	getName: function(){
		return this.name;
	},
	
	getVis: function(){
		return this.visible;
	}
});

function GMapPoint(lat, long){
	this.lat = lat;
	this.long = long;
}

function Point(name, type, gmpoint){
	this.name = name;
	this.type = type;
	this.point = gmpoint;
}

var pointLayer = Layer.extend({
	
	addPoint: function(name, type, gmpoint){
		this.points.push(new Point(name, type, gmpoint));
	},
	
	getLat: function(index){
		return this.points[index].point.lat;
	},
	
	getLong: function(index){
		return this.points[index].point.long;
	}
});