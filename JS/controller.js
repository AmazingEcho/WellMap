/*

WellMap
Version 1.0 - Remilia

Team-Avengineers
https://github.com/Team-Avengineers/WellMap

*/

/*
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
	this.clickState = 1;
	this.selectBoxPath = [];
	this.KML_layers = [];
	this.KML_active = true;
}

controller.prototype = {

	initGMaps : function(){
		var conptr = this;
		this.Gmap = new GMaps({
			div: '#googleMap',
			lat: 55.00,
			lng: -115.00,
			zoom: 5,
			mapTypeId:google.maps.MapTypeId.TERRAIN,
			disableDefaultUI:true,
			// Listeners:
			
			click: function(e){
				if(conptr.clickState == 2){
					conptr.clickState = 3;
					//console.log("Start at " + e.latLng.lat() + " and " + e.latLng.lng());
					conptr.boxStartLat = e.latLng.lat();
					conptr.boxStartLng = e.latLng.lng();
				}
			},
			
			mousemove: function(e){
				if(conptr.clickState == 3){
					conptr.Gmap.removePolylines();
					//console.log("Now at " + e.latLng.lat() + " and " + e.latLng.lng());
					conptr.boxEndLat = e.latLng.lat();
					conptr.boxEndLng = e.latLng.lng()
					conptr.selectBoxPath = [
						[conptr.boxStartLat,	conptr.boxStartLng],
						[conptr.boxStartLat,	conptr.boxEndLng],
						[conptr.boxEndLat,	conptr.boxEndLng],
						[conptr.boxEndLat,	conptr.boxStartLng],
						[conptr.boxStartLat,	conptr.boxStartLng]
					];
					conptr.Gmap.drawPolyline({
						path: conptr.selectBoxPath,
						strokeColor: "#131570",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						click: function(){
							conptr.clickState = 2;
							conptr.Gmap.removePolylines();
							//console.log("End at " + e.latLng.lat() + " and " + e.latLng.lng());
							conptr.selectPointsByArea(conptr.boxStartLat, conptr.boxStartLng, conptr.boxEndLat, conptr.boxEndLng);
							fullRefresh(conptr);
						}
					});
				}
			}
			
		});
		
		this.Gmap.enableKeyDragZoom({key: 'ctrl'});

		// TODO: Actually get some KML data, and set it up on a different tab somewhere...
		console.log("loading KML");
		this.KML_layers[0] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/a.kml"
		});
		this.KML_layers[1] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/b.kml"
		});
		this.KML_layers[2] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/c.kml"
		});
		this.KML_layers[3] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/d.kml"
		});
		this.KML_layers[4] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/e.kml"
		});
		this.KML_layers[5] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/f.kml"
		});
		this.KML_layers[6] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/g.kml"
		});
		this.KML_layers[7] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/h.kml"
		});
		this.KML_layers[8] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/i.kml"
		});
		this.KML_layers[9] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/j.kml"
		});
		this.KML_layers[10] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/k.kml"
		});
		this.KML_layers[11] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/l.kml"
		});
		this.KML_layers[12] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/m.kml"
		});
		this.KML_layers[13] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/n.kml"
		});
		this.KML_layers[14] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/o.kml"
		});
		this.KML_layers[15] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/p.kml"
		});
		this.KML_layers[16] = this.Gmap.loadFromKML({
			url: "http://team-avengineers.github.io/WellMap/NTS/q.kml"
		});
		
		console.log("loaded KML");
	},

// Functions can also be added through a prototype
// This is more memory efficient...	
	
	newMap : function(){
		this.the_map = new map("Untitled Map");
	},
	
	changeMapType : function(mapType){
		this.the_map.metadata.mapType = mapType;
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
	
	changeClickState : function(newState){
		this.clickState = newState;
		if(this.clickState == 2){
			this.Gmap.setOptions({draggable:false});
		}
		if(this.clickState == 1){
			this.Gmap.setOptions({draggable:true});
		}
	},
	
	refreshMap : function(){
		//FUnction uses Dynamic Icons from Google...
		//https://developers.google.com/chart/image/docs/gallery/dynamic_icons
		
		// Clear the map
		this.Gmap.removeMarkers();
		this.Gmap.removePolylines();
		this.Gmap.removePolygons();
		
		for(var i = 0; i < this.the_map.layers.length; i++){
			// Skip over non-visible objects
			if(this.the_map.layers[i].visible == true){
				// console.log("Now drawing: " + this.the_map.layers[i].name + " which contains " + this.the_map.layers[i].points.length + " points.");
				switch(this.the_map.layers[i].layerType){
					case "point":
					
					for(var j = 0; j < this.the_map.layers[i].points.length; j++){
						this.Gmap.addMarker({
							lat: this.the_map.layers[i].points[j].getLat(),
							lng: this.the_map.layers[i].points[j].getLong(),
							title: this.the_map.layers[i].points[j].name,
							// icon: "markers/icon1" + (this.the_map.layers[i].points[j].selected == true ? "s" : "") + ".png",
							icon: (this.the_map.layers[i].points[j].selected == false ?
								"https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="
									+ this.the_map.layers[i].pointStyle.pointLetter + "|"
									+ this.the_map.layers[i].pointStyle.pointColour + "|"
									+ this.the_map.layers[i].pointStyle.textColour
								:
								"https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|"
									+ this.the_map.layers[i].pointStyle.pointLetter + "|"
									+ this.the_map.layers[i].pointStyle.pointColour + "|"
									+ this.the_map.layers[i].pointStyle.textColour
									+ "|FFD700"
							),
							click: generate_handler_selectPoint(i, j, this)
						});
					}
					break;
				
					case "path":
					case "poly":
					default:
				}	// End of Switch
			}	// End of if visible
		}	// End of for loop
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
	
	deleteSelectedLayers : function(){
		for(var i = 0; i < this.the_map.layers.length;){
			if(this.the_map.layers[i].selected == true){
				this.deleteLayer(i);
			}
			else{
				i++;
			}
		}
	},
	
	selectedLayersCount : function(){
		var selectedLayers = [];
		for(var i = 0; i < this.the_map.layers.length;i++){
			if(this.the_map.layers[i].selected == true){
				selectedLayers.push(i);
			}
		}
		return selectedLayers;
	},
	
	selectedWells : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point"){
				for(var j = 0; j < this.the_map.layers[i].points.length; j++){
					if(this.the_map.layers[i].points[j].selected == true){
						return true;
					}
				}
			}
		}
		return false;
	},
	
	selectPointsByArea : function(lat1, long1, lat2, long2){
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point" && this.the_map.layers[i].visible){
				this.the_map.layers[i].selectPointsByArea(lat1, long1, lat2, long2);
			}
		}
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
	
	createNewPointLayerFromSelectionAllLayers : function(newLayerName){
		
		// Verify that layer has selected points in the first place
		var selectedPresent = false;
		for(var i = 0; i < this.the_map.layers.length && !selectedPresent; i++){
			for(var j = 0; j < this.the_map.layers[i].points.length && !selectedPresent; j++){
				if(this.the_map.layers[i].points[j].selected){
					console.log("SELECTED FOUND!");
					selectedPresent = true;
				}
			}
		}
		
		if(!(selectedPresent)){
			console.log("No Points Found");
			return false;
		}
		
		this.the_map.newPointLayer(newLayerName);
		
		var newLayerIndex = (this.the_map.layers.length) - 1;
		console.log("newLayerIndex is " + newLayerIndex);
		
		for(var i = 0; i < newLayerIndex; i++){
			for(var j = 0; j < this.the_map.layers[i].points.length;){
				if(this.the_map.layers[i].points[j].selected){
					console.log("COPYING!");
					//splice the point from the first layer, and put it in the new layer
					var temp = this.the_map.layers[i].points[j];
					this.the_map.layers[i].points.splice(j,1);
					this.the_map.layers[newLayerIndex].points.push(temp);
				}
				else{
					j++;
				}
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
	
	// Compares Capacity of wells
	//compareCap : function(){
	//	for(var i = 0; i < this.the_map.layers.length; i++){
	//		for(var j = 0; j < this.the_map.layers[i].points.length; j++){
	//			if (this.the_map.layers[i].points[j].wellData.wellCapacity > this.the_map.layers[i].points[j+1].wellData.wellCapacity){	
	//			var temp = this.the_map.layers[i].points[j].wellData.wellCapacity;
	//			this.the_map.layers[i].points[j].wellData.wellCapacity = this.the_map.layers[i].points[j+1].wellData.wellCapacity;
	//			this.the_map.layers[i].points[j+1].wellData.wellCapacity = temp;
	//			}
	//		
	//		}	
	//	}
	//	
	//},
	
	selectAllPoints : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point"){
				for(var j = 0; j < this.the_map.layers[i].points.length; j++){
					this.the_map.layers[i].points[j].selected = true;
				}
			}
		}
	},
	
	unselectAllPoints : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point"){
				for(var j = 0; j < this.the_map.layers[i].points.length; j++){
					this.the_map.layers[i].points[j].selected = false;
				}
			}
		}
	},
	
	selectAllLayers : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			this.the_map.layers[i].selected = true;
		}
	},
	
	unselectAllLayers : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			this.the_map.layers[i].selected = false;
		}
	},
	
	deleteSelectedWells : function(){
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point"){
				for(var j = 0; j < this.the_map.layers[i].points.length;){
					if(this.the_map.layers[i].points[j].selected == true){
						this.the_map.layers[i].points.splice(j,1);
					}
					else{
						j++;
					}
				}
			}
		}
	},
	
	toggleKML : function(){
		// Turn it off
		if(this.KML_active == true){
			for (var i = 0; i < 17; i++) {
				this.KML_layers[i].setMap(null);
				this.KML_active = false;
			}
		}
		// Turn it on
		else if(this.KML_active == false){
			this.KML_layers[0] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/a.kml"
			});
			this.KML_layers[1] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/b.kml"
			});
			this.KML_layers[2] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/c.kml"
			});
			this.KML_layers[3] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/d.kml"
			});
			this.KML_layers[4] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/e.kml"
			});
			this.KML_layers[5] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/f.kml"
			});
			this.KML_layers[6] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/g.kml"
			});
			this.KML_layers[7] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/h.kml"
			});
			this.KML_layers[8] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/i.kml"
			});
			this.KML_layers[9] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/j.kml"
			});
			this.KML_layers[10] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/k.kml"
			});
			this.KML_layers[11] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/l.kml"
			});
			this.KML_layers[12] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/m.kml"
			});
			this.KML_layers[13] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/n.kml"
			});
			this.KML_layers[14] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/o.kml"
			});
			this.KML_layers[15] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/p.kml"
			});
			this.KML_layers[16] = this.Gmap.loadFromKML({
				url: "http://team-avengineers.github.io/WellMap/NTS/q.kml"
			});
			this.KML_active = true;

		}
	},
	
	// Exports Data on the map as a spread sheet
	// TODO: Write the whole function
	exportXLS : function(){
		console.log("exportXLS() not yet written");
	},
	
	//Imports Data from spreadsheet to map
	importXLS : function(){
		console.log("importXLS() not yet written");	
		
		$.ajax({
		type: "GET",
		url: "data.txt",
		dataType: "text",
		success: function(data) {processData(data);}
		});
		
	},
	
	convertXLS_2_JSON : function(fileFieldID, conptr){
		
		var fileInput = document.getElementById(fileFieldID);		
		var file = fileInput.files[0];
		
		var reader = new FileReader();
		var name = file.name;
					
		var output = "";
		
		reader.onload = function(e) {
			var data = e.target.result;

			/* if binary string, read with type 'binary' */
			var workbook = XLS.read(data, {type: 'binary'});
					var JSON_string;

			JSON_string = to_json(workbook);
			JSON_string = JSON_string.Sheet1;
			//console.log("onload returns: \n" + JSON.stringify(JSON_string, 2, 2));
			
			// Create a new group and populate it with JSON_string
			var currentPoint;
			
			conptr.newPointLayer("XLS Layer");
			var indexXLS = conptr.the_map.layers.length - 1;
			console.log("XLS contains " + JSON_string.length + " Items");
			for(var i = 0; i < JSON_string.length; i++){
				
				currentPoint = JSON_string[i];

				conptr.the_map.layers[indexXLS].addPointLatLong(
					currentPoint.Name,
					currentPoint.Type,
					currentPoint.Latitude,
					currentPoint.Longitude
				);
				conptr.the_map.layers[indexXLS].points[i].wellData = {
					wellCapacity: currentPoint.Capacity,
					wellOutput: currentPoint.Output,
					owner: currentPoint.Owner
				};
			}
			
			fullRefresh(conptr);
		};
		
		reader.readAsBinaryString(file);
		
	},
	

	processData : function(alltext){
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];
		
		for(var i=1; i<allTextLines.length; i++)
		{
			var data = allTextLines[i].split(',');
			if(data.length == headers.length)
			{
			var tarr = [];
			for(var j=0; j<headers.length; j++)
				{
				tarr.push(headers[j]+":"+data[j]);
				}
				lines.push(tarr);
			}
		}
	},

	//////////////////////////////////////////////////////
	// Saving and Loading Maps
	//////////////////////////////////////////////////////
	// 100% Done
	//////////////////////////////////////////////////////

	saveDataJSON : function(fileInfo){
		
		var currentCenter = this.Gmap.getCenter()
		this.the_map.metadata.origin = [currentCenter.lat(), currentCenter.lng()];
		this.the_map.metadata.zoomLVL = this.Gmap.getZoom();
		
		var mapJSONString = JSON.stringify(this.the_map);
		return mapJSONString;
	},
	
	loadDataJSON : function(mapJSONString){
		// console.log("Received: " + mapJSONString);
		this.the_map = null;
		this.the_map = JSON.parse(mapJSONString, Reviver);

		this.changeMapType(this.the_map.metadata.mapType);
		this.Gmap.panTo({lat: this.the_map.metadata.origin[0], lng: this.the_map.metadata.origin[1]});
		this.Gmap.setZoom(this.the_map.metadata.zoomLVL);
	},

	// Helper Function
	// Not for use in final product
	// generate random points function
	// The map.js is what will hold the layer objects
	generateRandomPoints : function(numPoints){
		this.newPointLayer("Random Points"); // generate a title in this case in the sidebar
		var layerIndex = this.the_map.layers.length - 1;
		
		for(var i = 0; i < numPoints; i++){
			var randLat = (Math.random() * 11.0) + 49.0; //  call math.random functon to generate random latitudes
			var randLong = -((Math.random() * 10.0) + 110.0); // call math.random functon to  generate random longitudes
			var randCap= (Math.random() *100) + (Math.random() * 50); // call math.random function to generate random capacity
			var randOut= (Math.random() *100) + (Math.random() * 50);
			// show points in the map 
			this.the_map.layers[layerIndex].addPointLatLong("Lat: " + (randLat).toFixed(1) + "\n" + "Long: " + (randLong).toFixed(1), "Random Point", randLat, randLong);
			
			this.the_map.layers[layerIndex].points[this.the_map.layers[layerIndex].points.length - 1].wellData = {wellCapacity: randCap, wellOutput: randOut, owner: "Random"};
		}
		console.log("Random Points Generated - Total: " + numPoints); // I DON'T EXACTLY KNOW WHAT THIS DOES YET FIGURE OUT LATER
		// It prints a message to the console
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
				var pointIndex = 0;
				$(xml_out).find("well").each(function(){

					conPTR.the_map.layers[layerIndex].addPointLatLong(
						$(this).attr("wellName"),
						$(this).attr("wellType"),
						$(this).attr("lat"),
						$(this).attr("lng")
					);
					conPTR.the_map.layers[layerIndex].points[pointIndex].wellData = {
						wellCapacity	: $(this).attr("wellCapacity"),
						wellOutput		: $(this).attr("wellOutput"),
						owner				: "Fix this later"
					};
					//console.log("Added well with " + conPTR.the_map.layers[layerIndex].points[pointIndex].wellData.wellCapacity);
					pointIndex++;
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
		
	},
	
	// Prepares a list of wells for the DataTable in the chart model
	prepareTableList : function(mode){
		var tableData = [];
		
		for(var i = 0; i < this.the_map.layers.length; i++){
			if(this.the_map.layers[i].layerType == "point"){
				for(var j = 0; j < this.the_map.layers[i].points.length; j++){
					tableData.push(
						[	this.the_map.layers[i].points[j].name,
							this.the_map.layers[i].points[j].type,
							this.the_map.layers[i].points[j].wellData.owner,
							this.the_map.layers[i].name,
							this.the_map.layers[i].points[j].getLat(),
							this.the_map.layers[i].points[j].getLong(),
							this.the_map.layers[i].points[j].wellData.wellCapacity,
							this.the_map.layers[i].points[j].wellData.wellOutput
						]
					);
				}
			}
		}
		return tableData;
	}
};

/*
MISC Functions
*/

// Uses a regex to make sure a text string is a proper hex color.
function hexCheck(sNum){
	return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(sNum);
}

// Generates a random colour
// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColour(){
	var letters = '0123456789ABCDEF'.split('');
	// var colour = '#';
	var colour = '';
	for (var i = 0; i < 6; i++ ) {
		colour += letters[Math.floor(Math.random() * 16)];
	}
	return colour;
}

// Helper functon for controller.convertXLS_2_JSON
function to_json(workbook){
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}


function generate_handler_selectPoint(layerIndex, pointIndex, the_controller){
	return function(event){

		if(the_controller.the_map.layers[layerIndex].points[pointIndex].selected == false){
			the_controller.the_map.layers[layerIndex].points[pointIndex].selected = true;
			// console.log("Layer " + layerIndex + " Point " + pointIndex + " selected");
		}
		else if(the_controller.the_map.layers[layerIndex].points[pointIndex].selected == true){
			the_controller.the_map.layers[layerIndex].points[pointIndex].selected = false;
			// console.log("Layer " + layerIndex + " Point " + pointIndex + " unselected");
		}

		the_controller.refreshMap();
	};
};

// JSON Functions
// Thanks to this thread:
// http://stackoverflow.com/questions/8111446/turning-json-strings-into-objects-with-methods

// A generic "smart reviver" function.
// Looks for object values with a `ctor` property and
// a `data` property. If it finds them, and finds a matching
// constructor that has a `fromJSON` property on it, it hands
// off to that `fromJSON` fuunction, passing in the value.
function Reviver(key, value) {

	// console.info( 'reviver with key =' + key );
	// ^ uncomment for debugging
	
	var ctor;

	if (typeof value === "object" &&
		typeof value.ctor === "string" &&
		typeof value.data !== "undefined"){
			
		ctor = Reviver.constructors[value.ctor] || window[value.ctor];
		if (typeof ctor === "function" &&
			typeof ctor.fromJSON === "function"){
				
			return ctor.fromJSON(value);
		}
	}
	return value;
}

// A list of constructors the smart reviver should know about  
Reviver.constructors = {};
  
// A generic "toJSON" function that creates the data expected by Reviver.
// `ctorName`	The name of the constructor to use to revive it
// `obj`			The object being serialized
// `keys`		(Optional) Array of the properties to serialize,
//					if not given then all of the objects "own" properties
//					that don't have function values will be serialized.
//					(Note: If you list a property in `keys`, it will be serialized
//					regardless of whether it's an "own" property.)
// Returns:		The structure (which will then be turned into a string
//					as part of the JSON.stringify algorithm)

function Generic_toJSON(ctorName, obj, keys) {
	var data, index, key;

	if (!keys){
		keys = Object.keys(obj); // Only "own" properties are included
	}
    
	data = {};
	for (index = 0; index < keys.length; ++index) {
		key = keys[index];
		data[key] = obj[key];
	}
	return {ctor: ctorName, data: data};
}
  
// A generic "fromJSON" function for use with Reviver: Just calls the
// constructor function with no arguments, then applies all of the
// key/value pairs from the raw data to the instance. Only useful for
// constructors that can be reasonably called without arguments!
// `ctor`      The constructor to call
// `data`      The data to apply
// Returns:    The object
function Generic_fromJSON(ctor, data) {
	var obj, name;

	obj = new ctor();
	for (name in data) {
		obj[name] = data[name];
	}
	return obj;
}
