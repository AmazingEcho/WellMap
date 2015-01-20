/*
WellMap
controller.js
Written by: Thomas Condon

*/

// A registry of types
// Needed in order to make sure objects made through JSON.parse() get thier attached functions back.
// Further information here:
// http://stackoverflow.com/questions/14027168/how-to-restore-original-object-type-from-json
var Types = {};

// TODO: Write toJSON and revive functions for each constructor
// A rather tedious copy-paste job...

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
	
	// Edit:
	// controller now has to be TOLD to make a new map
	this.the_map = null;
	this.Gmap = null;
	
	// TODO:
	// Put code to summon a map via gmaps.js here
	// Could just copy some code right out of the prototype
	// Needs to go here because I don't want the JSON file to have actual GMap info.
	this.initGMaps = function(){
		this.Gmap = new GMaps({
			div: '#googleMap',
			lat: 55.00,
			lng: -115.00,
			zoom: 5,
			mapTypeId:google.maps.MapTypeId.TERRAIN,
			disableDefaultUI:true
		});
	
		var path = [[55.000,-115.000],[55.000,-113.000],[52.000,-113.000],[52.000,-115.000]];

		this.Gmap.drawPolygon({
			paths: path, // pre-defined polygon shape
			strokeColor: '#BBD8E9',
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: '#BBD8E9',
			fillOpacity: 0.6
		});	
	}
	
	this.newMap = function(){
		this.the_map = new map("Untitled Map");
	}
	
	this.refreshMap = function(){
		// TODO:
		// Write a function to read through the layers, and feed data from each layer
		// into the gmap.js functions to draw objects onto the map.
		console.log("Refreshing Map! " + this.the_map.layers.length + " layers to draw!");
		
		this.Gmap.removeMarkers();
		this.Gmap.removePolylines();
		this.Gmap.removePolygons();

		// Also, skip over non-visible objects
		for(var i = 0; i < this.the_map.layers.length; i++){
			console.log("Now drawing: " + this.the_map.layers[i].name + " which contains " + this.the_map.layers[i].points.length + " points.");
			switch(this.the_map.layers[i].layerType){
				case "point":
				
				for(var j = 0; j < this.the_map.layers[i].points.length; j++){
					this.Gmap.addMarker({
						lat: this.the_map.layers[i].points[j].getLat(),
						lng: this.the_map.layers[i].points[j].getLong(),
						title: this.the_map.layers[i].points[j].name,
						infoWindow: {content: '<p>test2</p>'}
					});
				}
				break;
				
				case "path":
				case "poly":
				default:
			}
		}
	}
	
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
	
	this.createNewPointLayerFromSelection = function(layerIndex){
		
		if(this.the_map.layers[layerIndex].layerType != "point"){
			console.log("Layer " + layerIndex + " is not a point layer.");
			return;
		}
		
		// Verify that layer has selected points in the first place
		var selectedPresent = false;
		for(var i = 0; i <  this.the_map.layers[layerIndex].points.length; i++){
			if(this.the_map.layers[layerIndex].points[i].selected){
				selectedPresent = true;
				console.log("Selected Point Found");
				break;
			}
		}
		
		if(!(selectedPresent)){
			console.log("No Points Found");
			return false;
		}
		
		this.the_map.newPointLayer("Selection from " + this.the_map.layers[layerIndex].name);
		
		var newLayerIndex = (this.the_map.layers.length) - 1;
		console.log("newLayerIndex is " + newLayerIndex);
		
		for(var j = 0; j < this.the_map.layers[layerIndex].points.length;){
			if(this.the_map.layers[layerIndex].points[j].selected){
				
				//splice the point from the first layer, and put it in the new layer
				var temp = this.the_map.layers[layerIndex].points[j];
				this.the_map.layers[layerIndex].points.splice(j,1);
				this.the_map.layers[newLayerIndex].points.push(temp);
			}
			else{
				j++;
			}
		}
	}
	
	// Returns an array of layer names and index values for those layers
	this.generateLayerList = function(){
		
		var layerList = [];
		
		for(var i = 0; i < this.the_map.layers.length; i++){
			layerList.push({
				name: this.the_map.layers[i].name,
				index: i
				});
		}
		
		return layerList;
	};
	
	// TODO:
	// Put some points onto a DB server, and try to get this function to load them
	// serverInfo should be an object containing the info needed to access the server
	this.importPointLayerDataFromServer = function(name, serverInfo){
		
	};
	
	// Exports Data on the map as a spread sheet
	// TODO: Write the whole function
	this.exportXLS = function(){
		console.log("exportXLS() not yet written");
	};
	
	
	// TODO:
	// Saving and Loading
	// I'd like to try and set it up to save all the objects with JSON, and then have those loaded the same way.
	// A JSON file is basically just a text file that contains object data that can be parsed by Javascript
	// and turned into actual objects.
	
	// The problem is that JS is kind of weird about openning files on a cilent side HD.
	// Security concerns about rogue web pages running .js code to peek at the contents of someones HD.
	
	this.saveDataJSON = function(fileInfo){
		var controllerJSONString = JSON.stringify(this.the_map);
		//console.log(controllerJSONString);
		return controllerJSONString;
	};
	
	this.loadDataJSON = function(fileInfo){
		this.the_map = JSON.parse(fileInfo, function(key, value){
			return key === '' && value.hasOwnProperty('__type') ? Types[value.__type].revive(value) : this[key];
		});
	};
	
	// Helper Function
	// Not for use in final product
	this.generateRandomPoints = function(numPoints){
		this.newPointLayer("Random Point Layer");
		var layerIndex = this.the_map.layers.length - 1;
		
		for(var i = 0; i < numPoints; i++){
			var randLat = (Math.random() * 11.0) + 49.0;
			var randLong = -((Math.random() * 10.0) + 110.0);
			var infowindow = this.the_map.InfoWindow({content: test});
			InfoWindow.open(randLat, randLong);
			this.the_map.layers[layerIndex].addPointLatLong("Random Point " + i, "Random Point", randLat, randLong);
			
		}
			
		console.log("Random Points Generated - Total: " + numPoints);
		};
	}

function mapMetadata(name){
	//console.log("mapMetadata() constructor called, name is " + name);
	this.mapName = name;
	
	// description is empty on creation
	this.descript = "";
	
	// coordinates for where the map should focus on when loaded
	this.origin = [55.0, -115.0]
	
	// TODO:
	// GoogleMaps has a bunch of map types (Satellite, Streets, etc)
	// Double check those, and maybe make a function to set this
	this.mapType = "default";
	
	this.changeName = function(newName){
		this.mapName = newName;
	}
	
	this.changeDescription = function(newDesc){
		this.descript = newDesc;
	}
}

// SUPER IMPORTANT!!!
// This is the code that allows JSON.parse() to restore functions to objects made through JSON
// Every constructor (except controller) needs it's own version of this.
// More info here:
// http://stackoverflow.com/questions/14027168/how-to-restore-original-object-type-from-json

Types.mapMetadata = mapMetadata;

mapMetadata.prototype.toJSON = function(){
	return {
		__type: 'mapMetadata',
		mapName: this.mapName,
		origin: this.origin,
		mapType: this.mapType
	};
};

mapMetadata.revive = function(data){
	console.log("Revive Function called" + data.mapName);
	return new mapMetadata(data.mapName);
};

/*

map
The map object is what will hold the layer objects.

*/
function map(name){
	// Arrays in Javascript aren't like Arrays in C/C++
	// You don't have to specify how big the array is or what it's storing
	
	// this.layers = new Array();
	// Arrays can also be made like this, which I've been told is better:
	this.layers = [];
	
	this.metadata = new mapMetadata(name);
	
	this.changeDescription = function(newDesc){
		this.metadata.changeDescription(newDesc);
	};
	
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
	};
	
	this.deleteLayer = function(index){
		if(index >= this.layers.length){
			console.log("Layer " + index + " does not exist");
			return;
		}
		this.layers.splice(index, 1);
	}
	
	// Methods to control layer visibility
	this.switchVis = function(index){
		console.log("Switching vis on "+ index);
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
	
	this.visOn = function(index){
		console.log("Switching vis on "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = true;
	}
	this.visOff = function(index){
		console.log("Switching vis off "+ index);
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
	
	this.sortLayersByName = function(){
		// Now where did I put my notes from Data Structures and Algorithms? -T
		// Oh, this works:
		// http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
		this.layers.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
	}
	
	// Go through the layer list and delete empty layers
	this.cullEmptyLayers = function(){
		for(var i = 0; i < this.layers.length;){
			if(this.layers[i].isEmpty()){
				this.layers.splice(i,1);
			}
			else{
				i++;
			}
		}
	}
}

Types.map = map;

map.prototype.toJSON = function(){
	return {
		__type: 'map',
		layers: this.layers,
		metadata: this.metadata
	};
};

map.revive = function(data){
	//console.log("Revive Function called for map.  Data is " + data);
	return new map(data.metadata.name);
};

map.prototype.changeName = function(newName){
		this.metadata.changeName(newName);
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
	this.GMpoint = gmpoint;
	this.selected = false;
	
	this.getLat = function(){
		return this.GMpoint.lat;
	}
	this.getLong = function(){
		return this.GMpoint.long;
	}
	
	// TODO:
	// Returns an object containing all the information gmaps.js needs to make a point
	// Lat, long, name, all that stuff
	this.generatePointData = function(){
		var returnPoint = {
			lat: this.GMpoint.lat,
			lng: this.GMpoint.long,
			title: this.name
			};
		
		return returnPoint;
	}
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
	
	this.layerType = "NONE";
	
	this.switchVis = function(){
		if(this.visible == true){
			this.visible = false;
		}
		else{
			this.visible = true;
		}
	}
	
	this.visOn = function(){
		this.visible = true;
	}
	
	this.visOff = function(){
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
	
	this.layerType = "point";
	
	this.points = [];
	
	this.addPoint = function(name, type, gmpoint){
		this.points.push(new Point(name, type, gmpoint));
	}
	
	this.addPointLatLong = function(name, type, lat, long){
		this.points.push(new Point(name, type, new GMapPoint(lat, long)));
	}
	
	this.getLat = function(index){
		return this.points[index].GMpoint.lat;
	}
	
	this.getLong = function(index){
		return this.points[index].GMpoint.long;
	}
	
	this.deletePoint = function(index){
		this.points.splice(index,1);
	}
	
	this.selectPoint = function(index){
		this.points[index].selected = true;
	}
	
	this.deselectPoint = function(index){
		this.points[index].selected = false;
	}
	
	this.selectAll = function(){
		for(var i = 0; i < this.points.length; i++){
			this.points[i].selected = true;
		}
	}
	
	this.deselectAll = function(){
		for(var i = 0; i < this.points.length; i++){
			this.points[i].selected = false;
		}
	}
	
	this.selectPointsByArea = function(lat1, long1, lat2, long2){
		// this function has to assume that either set of coordinates could belong to any corner...
		// So we have to use min/max functions to figure out the bounds of the area
		var latBottomLeft = Math.min(lat1, lat2);
		var latTopRight = Math.max(lat1, lat2);
		
		var longBottomLeft = Math.min(long1, long2);
		var longTopRight = Math.max(long1, long2);
		
		for(var i = 0; i < this.points.length; i++){
			if(this.points[i].getLat() >= latBottomLeft && this.points[i].getLat() <= latTopRight &&
			this.points[i].getLong() >= longBottomLeft && this.points[i].getLong() <= longTopRight ){
				this.points[i].selected = true;
			}
		}
	}
	
	this.deleteSelectedPoints = function(){
		
		// Notice how there's no i++ in the for() loop parameters?
		// That because if you remove something from a JS array, it shuffles everything afterwards forwards
		// Which means it should only i++ when it DOESNT delete the point
		for(var i = 0; i < this.points.length;){
			if(this.points[i].selected == true){
				this.points.splice(i,1);
			}
			else{
				i++;
			}
		}
	}
	
	this.deletePointsByArea = function(lat1, long1, lat2, long2){
		var latBottomLeft = Math.min(lat1, lat2);
		var latTopRight = Math.max(lat1, lat2);
		
		var longBottomLeft = Math.min(long1, long2);
		var longTopRight = Math.max(long1, long2);
		
		for(var i = 0; i < this.points.length;){
			if(this.points[i].getLat() >= latBottomLeft && this.points[i].getLat() <= latTopRight &&
			this.points[i].getLong() >= longBottomLeft && this.points[i].getLong() <= longTopRight ){
				//console.log("Deleting: " + this.points[i].name);
				this.points.splice(i,1);
			}
			
			else{
				i++;
			}
		}
	}
	
	this.isEmpty = function(){
		return (this.points.length == 0);
	}
	
	// Exports the points into an XLS format
	// TODO:
	this.exportPointsXLS = function(){
	}
}

function pathLayer(name){
	
	Layer.call(this, name);
	
	this.layerType = "path";
	
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
	
	this.editLineColor = function(newCol){
		if(hexCheck(newCol)){
			this.visualProperties.strokeColor = newCol;
		}
	}
	
	this.editLineOpacity = function(newOp){
		if(newOp >= 0.0 && newOp <= 1.0){
			this.visualProperties.strokeOpacity = newOp;
		}
	}
	
	this.editLineWeight = function(newWei){
		// Use a regex to make sure the color is
		if(newWei > 0.0){
			this.visualProperties.strokeWeight = newWei;
		}
	}
	
	this.isEmpty = function(){
		return (this.paths.length == 0);
	}
}

function polyLayer(name){
	
	Layer.call(this, name);
	
	this.layerType = "poly";
	
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
			//console.log("polyObj '" + polyObj.name + "' has fewer than 3 points");
			return;
		}
		this.polys.push(polyObj);
	};
	
	this.deletePoly = function(index){
		this.polys.splice(index,1);
	}
	
	this.editStrokeColor = function(newCol){
		if(hexCheck(newCol)){
			this.visualProperties.strokeColor = newCol;
		}
	}
	
	this.editStrokeOpacity = function(newOp){
		if(newOp >= 0.0 && newOp <= 1.0){
			this.visualProperties.strokeOpacity = newOp;
		}
	}
	
	this.editStrokeWeight = function(newWei){
		// Use a regex to make sure the color is
		if(newWei > 0.0){
			this.visualProperties.strokeWeight = newWei;
		}
	}
	
	this.editFillColor = function(newCol){
		// Use a regex to make sure the color is
		if(hexCheck(newCol)){
			this.visualProperties.fillColor = newCol;
		}
	}
	
	this.editFillOpacity = function(newOp){
		// Use a regex to make sure the color is
		if(newOp >= 0.0 && newOp <= 1.0){
			this.visualProperties.fillOpacity = newOp;
		}
	}
	
	this.isEmpty = function(){
		return (this.polys.length == 0);
	}
	
}

/*
MISC Functions
*/

// Uses a regex to make sure a text string is a proper hex color.
function hexCheck(sNum){
	return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(sNum);
}
