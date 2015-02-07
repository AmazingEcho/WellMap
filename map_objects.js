
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
	
	this.wellData = null;
	
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
