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
	this.databases = [];
	
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
						infoWindow: {
							content: "<p>Name: " + this.the_map.layers[i].points[j].name + "<br>" +
								"Lat: " + this.the_map.layers[i].points[j].getLat() + "<br>" +
								"Long: " + this.the_map.layers[i].points[j].getLong() + "</p>"
							},
						icon: "markers/icon1.png"
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
			this.the_map.layers[layerIndex].addPointLatLong("Lat: " + (randLat).toFixed(1) + "\n" + "Long: " + (randLong).toFixed(1), "Random Point", randLat, randLong);
			
		}
			
		console.log("Random Points Generated - Total: " + numPoints);
		};
	
	this.addDatabaseConnectionPHP = function(dbObjParams){
		// NOTE: When implementing this function into the application, make sure dbObjParams is an object that contains:
		// a name
		// a hostname
		// a domain name
		// a username
		// a password
		// and maybe a user provided description
		
		this.databases.push(new databaseObj(dbObjParams));
		};
		
	this.addDatabaseConnectionCS = function(dbObjParams){
		// NOTE: When implementing this function into the application, make sure dbObjParams is an object that contains:
		// a name
		// a hostname
		// a domain name
		// a username
		// a password
		// and maybe a user provided description
		
		this.databases.push(new databaseObj(dbObjParams));
		};
	
	this.fetchWellListFromDatabasePHP = function(dbIndex){
		if(databases.length == 0){
			// No DBs
			return;
		}
		
		// Use ajax to grab a list of the well groups from the DB
		
		// Return a list of Well groups that ui.js can use DOM to print out
		
		
	}
	
	this.fetchWellListFromDatabaseCS = function(dbIndex){
		if(databases.length == 0){
			// No DBs
			return;
		}
		
		// Use ajax to grab a list of the well groups from the DB
		
		// Return a list of Well groups that ui.js can use DOM to print out
		
		
	}
	
	this.loadPointsFromDatabaseCS = function(dbIndex){
		
		// dbIndex bounds checking
		if(dbIndex < 0 || dbIndex >= this.databases.length){
			return;
		}
		
		// Connect to DB using info stored at dbIndex
		
		// NOTE: Read up on some of this later
		// http://www.w3schools.com/aspnet/webpages_examples.asp
		
	}
	
	this.loadPointsFromDatabasePHP = function(dbIndex){
	}
	
}

// Database object
// Will store connection data for access to DBs
// the controller object should use this when calling the C# functions for DB access
function databaseObj(dbObjParams){
	
	// User set DB name and PW
	this.dbName = "";
	
	this.hostName = "";
	this.domainName = "";
	this.userName = "";
	this.password = "";
	
}

function mapMetadata(name){
	//console.log("mapMetadata() constructor called, name is " + name);
	this.mapName = name;
	
	// description is empty on creation
	this.description = "";
	
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
		this.description = newDesc;
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
MISC Functions
*/

// Uses a regex to make sure a text string is a proper hex color.
function hexCheck(sNum){
	return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(sNum);
}
