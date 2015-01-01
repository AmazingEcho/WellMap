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
	
	this.newPathLayer = function(name){
		this.the_map.newPathLayer(name);
	}
	
	this.newPolyLayer = function(name){
		this.the_map.newPolyLayer(name);
	}
	
	this.deleteLayer = function(index){
		this.the_map.deleteLayer(index);
	}
}

function mapMetadata(name){
	this.mapName = name;
	// description is empty on creation
	this.description = "";
	
	this.changeDescription = function(newDesc){
		this.description = newDesc;
	}
}

/*

map
The map object is what will hold the layer objects.

*/
function map(){
	// Arrays in Javascript aren't like Arrays in C/C++
	// You don't have to specify how big the array is or what it's storing
	
	// this.layers = new Array();
	// Arrays can also be made like this, which I've been told is better:
	this.layers = [];
	
	this.metadata = new mapMetadata("Untitled Map");
	
	this.changeDescription = function(newDesc){
		this.metadata.changeDescription(newDesc);
	}
	
	// !!! PLACEHOLDER !!!
	// TODO:
	// Put code to summon a map via gmaps.js here
	
	this.renderMap = function(){
		// TODO:
		// Write a function to read through the layers, and feed data from each layer
		// into the gmap.js functions to draw objects onto the map.

		// Also, skip over non-visible objects
	}
	
	this.newLayer = function(name){
		// You can put new objects (or anything) into an Array with the .push() method
		this.layers.push(new Layer(name));
	};
	
	this.newPointLayer = function(name){
		this.layers.push(new pointLayer(name));
	};
	
	this.newPathLayer = function(name){
		this.layers.push(new pathLayer(name));
	};
	
	this.newPolyLayer = function(name){
		this.layers.push(new polyLayer(name));
	};
	
	this.layerCount = function(){
		return this.layers.length;
	}
	
	this.deleteLayer = function(index){
		if(index >= this.layers.length){
			console.log("Layer " + index + " does not exist");
			return;
		}
		this.layers.splice(index, 1);
	}
	
	// Methods to control layer visibility
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
	
	this.switchVisAllOff = function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = false;
		}
	}
	
	this.switchVisAllOn = function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = true;
		}
	}
}

/*
GMapPoint
Just a point in GMap with a lat and a long
Points will have just one, while paths and polys will have more than one
*/
function GMapPoint(lat, long){
	this.lat = lat;
	this.long = long;
}


function Point(name, type, gmpoint){
	this.name = name;
	this.type = type;
	this.point = gmpoint;
}

function Path(name, type){
	this.name = name;
	this.type = type;
	
	this.pathPoints = [];
	
	this.addPoint = function(lat, long){
		this.pathPoints.push(new GMapPoint(lat, long));
	}
	
	// In order to make gmaps.js draw a path, you have to give it an array in a specific format; a 2D array with dimentions of 2*n
	this.generatePointArray = function(){
		var returnArray = [];
		for(var i = 0; i < this.pathPoints.length; i++){
			returnArray[i] = [];
			returnArray[i][0] = this.pathPoints[i].lat;
			returnArray[i][1] = this.pathPoints[i].long;
		}
		
		return returnArray;
	}
}

function Poly(name, type){
	this.name = name;
	this.type = type;
	
	this.polyPoints = [];
	
	this.addPoint = function(lat, long){
		this.polyPoints.push(new GMapPoint(lat, long));
	}
	
	// In order to make gmaps.js draw a polygon, you have to give it an array in a specific format; a 2D array with dimentions of 2*n
	this.generatePointArray = function(){
		var returnArray = [];
		for(var i = 0; i < this.polyPoints.length; i++){
			returnArray[i] = [];
			returnArray[i][0] = this.polyPoints[i].lat;
			returnArray[i][1] = this.polyPoints[i].long;
		}
		
		return returnArray;
	}
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
	
	this.deletePoint = function(index){
		this.points.splice(index,1);
	}
}

function pathLayer(name){
	
	Layer.call(this, name);
	
	this.paths = [];
	
	// Some default visual properties
	// User should have he option to change these
	this.visualProperties = {
		strokeColor: '#ffffff',
		strokeOpacity: 1,
		strokeWeight: 6
	}
	
	this.addPath = function(pathObj){
		this.paths.push(pathObj);
	};
	
	this.deletePath = function(index){
		this.paths.splice(index,1);
	}
}

function polyLayer(name){
	
	Layer.call(this, name);
	
	this.polys = [];
	
	// Some default visual properties
	// User should have he option to change these
	this.visualProperties = {
		strokeColor: '#ffffff',
		strokeOpacity: 1,
		strokeWeight: 3,
		fillColor: '#777777',
		fillOpacity: 0.5
	};
	
	this.addPoly = function(polyObj){
		if(polyObj.polyPoints.length < 3){
			console.log("polyObj '" + polyObj.name + "' has fewer than 3 points");
			return;
		}
		this.polys.push(polyObj);
	};
	
	this.deletePoly = function(index){
		this.polys.splice(index,1);
	}
	
}