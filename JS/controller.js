/*
WellMap
controller.js
Written by: Thomas Condon

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
	this.wellGroupList = [];
	
	this.initGMaps = function(){
		this.Gmap = new GMaps({
			div: '#googleMap',
			lat: 55.00,
			lng: -115.00,
			zoom: 5,
			mapTypeId:google.maps.MapTypeId.TERRAIN,
			disableDefaultUI:true
			});
		}
	}
	
controller.prototype = {
	
	newMap : function(){
		this.the_map = new map("Untitled Map");
	},
	
	changeMapType : function(mapType){
		switch(mapType) {
			case 1:
				this.Gmap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
				break;
			case 2:
				this.Gmap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
				break;
			case 3:
				this.Gmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				break;
			case 4:
				this.Gmap.setMapTypeId(google.maps.MapTypeId.HYBRID);
				break;
			default:
		}
	},
	
	refreshMap : function(){
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
	},
	
	// Functions are made in a similar fashion as attributes
	// function() means that that we're declaring a function (duh)
	// the name in function(name) is an incoming argument
	// Notice how its not 'String name'.  That's because JavaScript uses Duck Typing.  Look it up...
	newLayer : function(name){
		// the only thing this function does is call the newLayer() function on the_map object, passing along the name...
		this.the_map.newLayer(name);
	},
	
	newPointLayer : function(name){
		this.the_map.newPointLayer(name);
	},
	
	newPathLayer : function(name){
		this.the_map.newPathLayer(name);
	},
	
	newPolyLayer : function(name){
		this.the_map.newPolyLayer(name);
	},
	
	deleteLayer : function(index){
		this.the_map.deleteLayer(index);
	},
	
	createNewPointLayerFromSelection : function(layerIndex){
		
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
	},
	
	// Returns an array of layer names and index values for those layers
	generateLayerList : function(){
		
		var layerList = [];
		
		for(var i = 0; i < this.the_map.layers.length; i++){
			layerList.push({
				name: this.the_map.layers[i].name,
				index: i
				});
		}
		
		return layerList;
	},
	
	// Exports Data on the map as a spread sheet
	// TODO: Write the whole function
	exportXLS : function(){
		console.log("exportXLS() not yet written");
	},
	
	
	// TODO:
	// Saving and Loading
	// I'd like to try and set it up to save all the objects with JSON, and then have those loaded the same way.
	// A JSON file is basically just a text file that contains object data that can be parsed by Javascript
	// and turned into actual objects.
	
	// The problem is that JS is kind of weird about openning files on a cilent side HD.
	// Security concerns about rogue web pages running .js code to peek at the contents of someones HD.
	
	saveDataJSON : function(fileInfo){
		var mapJSONString = this.the_map.toJSON();
		console.log(mapJSONString);
		return mapJSONString;
	},
	
	loadDataJSON_OLD : function(fileInfo){
		this.the_map = JSON.parse(fileInfo, function(key, value){
			return key === '' && value.hasOwnProperty('__type') ? Types[value.__type].revive(value) : this[key];
		});
	},
	
	loadDataJSON : function(mapJSONString){
		this.the_map = restore(mapJSONString);
	},

	// Helper Function
	// Not for use in final product
	generateRandomPoints : function(numPoints){
		this.newPointLayer("Random Point Layer");
		var layerIndex = this.the_map.layers.length - 1;
		
		for(var i = 0; i < numPoints; i++){
			var randLat = (Math.random() * 11.0) + 49.0;
			var randLong = -((Math.random() * 10.0) + 110.0);
			this.the_map.layers[layerIndex].addPointLatLong("Lat: " + (randLat).toFixed(1) + "\n" + "Long: " + (randLong).toFixed(1), "Random Point", randLat, randLong);
		}
		console.log("Random Points Generated - Total: " + numPoints);
	},
	
	addDatabaseConnectionPHP : function(dbObjParams){
		// NOTE: When implementing this function into the application, make sure dbObjParams is an object that contains:
		// a name
		// a hostname
		// a domain name
		// a username
		// a password
		// and maybe a user provided description
		
		this.databases.push(new databaseObjPHP(dbObjParams));
	},
		
	addDatabaseConnectionCS : function(dbObjParams){
		// NOTE: When implementing this function into the application, make sure dbObjParams is an object that contains:
		// a name
		// a hostname
		// a domain name
		// a username
		// a password
		// and maybe a user provided description

		this.databases.push(new databaseObj(dbObjParams));
	},
	
	fetchWellGroupsFromDatabasePHP : function(dbIndex){
		
		if(this.databases.length == 0){
			console.log("No Database information present.  Please set Databse Options.");
			return;
		}
		
		var conPTR = this;
		
		$.ajax({
			type: "POST",
			url: this.databases[dbIndex].groupListURL,
			dataType: 'xml',
			success: function(xml_out){
				/* -FORMAT-
				<div class="menu" id="#importWellMenuGroupList">
					<div class="item" data-value="1">Well Group 1</div>
					<div class="item" data-value="2">Well Group 2</div>
					<div class="item" data-value="3">Well Group 3</div>
				</div>
				*/
				
				// Clear list
				document.getElementById("#importWellMenuGroupList").innerHTML = "";
				conPTR.wellGroupList = [];
				
				var divElem;
				
				$(xml_out).find("wellGroup").each(function(){

					divElem = document.createElement("div");
					divElem.className = "item";
					divElem.setAttribute("data-value", $(this).attr("wellGroupID"));
					divElem.setAttribute("id", "wellGroupIndex");
					divElem.innerHTML = $(this).attr("wellGroupName") + " - " + $(this).attr("wellGroupOwner");
					document.getElementById("#importWellMenuGroupList").appendChild(divElem);
					
					conPTR.wellGroupList[$(this).attr("wellGroupID")] = {groupName: $(this).attr("wellGroupName"), groupOwner: $(this).attr("wellGroupOwner")};
					
				});
				
				console.log("AJAX pull from PHP successful!");
			},
		
			error: function(){
			console.log("Error in fetchWellGroupsFromDatabasePHP()");
			}
		});
	},
	
	fetchWellsFromDatabasePHP : function(dbIndex, groupName, groupIndex){
		if(this.databases.length == 0){
			console.log("No Database information present.  Please set Databse Options.");
			return;
		}
		
		var conPTR = this;
		
		$.ajax({
			type: "POST",
			url: this.databases[dbIndex].wellListURL + groupIndex,
			dataType: 'xml',
			success: function(xml_out){
				
				console.log("AJAX pull from PHP successful!");
				
				conPTR.newPointLayer(groupName);
				var layerIndex = conPTR.the_map.layers.length - 1;
				
				$(xml_out).find("well").each(function(){

					conPTR.the_map.layers[layerIndex].addPointLatLong(
						$(this).attr("wellName"),
						$(this).attr("wellType"),
						$(this).attr("lat"),
						$(this).attr("lng"));
						

				});
			},
		
			error: function(){
			console.log("Problem with fetchWellsFromDatabasePHP()");
			}
			
		});
	},
	
	fetchWellListFromDatabaseCS : function(dbIndex){
		if(databases.length == 0){
			console.log("No Database information present.  Please set Databse Options.");
			return;
		}
		
		// Use ajax to grab a list of the well groups from the DB
		// Return a list of Well groups that ui.js can use DOM to print out
	},
	
	loadPointsFromDatabaseCS : function(dbIndex){
		
		// dbIndex bounds checking
		if(dbIndex < 0 || dbIndex >= this.databases.length){
			return;
		}
		
		// Connect to DB using info stored at dbIndex
		
		// NOTE: Read up on some of this later
		// http://www.w3schools.com/aspnet/webpages_examples.asp
		
	}
	
};

/*
MISC Functions
*/

// Uses a regex to make sure a text string is a proper hex color.
function hexCheck(sNum){
	return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(sNum);
}

// restore()
// Restores a JSON object
function restore(obj) {
	var initializer = window[obj.initializer];
	if (typeof initializer.restore == "function") {
		return initializer.restore(obj);
	}

	var restoredObj = new initializer();
	for (var key in obj) {
		restoredObj[key] = obj[key];
	}
	return restoredObj;
}