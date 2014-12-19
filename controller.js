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
	
	this.switchVis = function(index){
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		else{
			this.layers[index].switchVis();
		}
	}
	
	this.VisOn = function(index){
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = true;
	}
	this.VisOff = function(index){
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = false;
	}
}

function GMapPoint(lat, long){
	this.lat = lat;
	this.long = long;
}

function Point(name, type, gmpoint){
	this.name = name;
	this.type = type;
	this.point = gmpoint;
}

function Layer(name){
	this.name = name;
	//New Layers are always visible on creation.
	this.visible = true;
	
	this.switchVis = function(){
		if(this.visible == true){
			this.visible = false;
		}
		else{
			this.visible = true;
		}
	}
	this.VisOn = function(){
		this.visible = true;
	}
	this.VisOff = function(){
		this.visible = false;
	}
}

/*
So it turns out that inheritance in JS works a lot differently than it does in Java/C++.  JS is Object Oriented, but it doesn't have classes, so trying to create a "class" that inherits properties from another "class" is somewhat unusual.

Regardless, after some creative Googling, I found out how to make "constructors" that will pass on params to superclasses...
http://www.2ality.com/2011/06/prototypes-as-classes.html
*/

function pointLayer(name){
	
	Layer.call(this, name);
	
	this.points = [];
	
	this.addPoint = function(name, type, gmpoint){
		this.points.push(new Point(name, type, gmpoint));
	};
	
	this.getLat = function(index){
		return this.points[index].point.lat;
	}
	
	this.getLong = function(index){
		return this.points[index].point.long;
	}
}