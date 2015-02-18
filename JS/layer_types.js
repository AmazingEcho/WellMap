// JavaScript Document
/*
layer_types.js

Layer types
*/

function Layer(name){
	this.name = name;
	//New Layers are always visible on creation.
	this.visible = true;
	
	this.layerType = "NONE";
};

Layer.prototype = {
	
	switchVis : function(){
		if(this.visible == true){
			this.visible = false;
		}
		else{
			this.visible = true;
		}
	},
	
	visOn : function(){
		this.visible = true;
	},
	
	visOff : function(){
		this.visible = false;
	}
};

Layer.prototype.initializer = "Layer";
Layer.prototype.toJSON = function(){  
  var result = this instanceof Array? [] : {};
  result.initializer = this.initializer;
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      result[key] = this[key];
    }
  }
  return result;
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
};
	
pointLayer.prototype = Object.create(Layer.prototype);

pointLayer.prototype.addPoint = function(name, type, gmpoint){
	this.points.push(new Point(name, type, gmpoint));
};
	
pointLayer.prototype.addPointLatLong = function(name, type, lat, long){
	this.points.push(new Point(name, type, new GMapPoint(lat, long)));
};
	
pointLayer.prototype.getLat = function(index){
	return this.points[index].GMpoint.lat;
};
	
pointLayer.prototype.getLong = function(index){
	return this.points[index].GMpoint.long;
};
	
pointLayer.prototype.deletePoint = function(index){
	this.points.splice(index,1);
};
	
pointLayer.prototype.selectPoint = function(index){
	this.points[index].selected = true;
};
	
pointLayer.prototype.deselectPoint = function(index){
	this.points[index].selected = false;
};
	
pointLayer.prototype.selectAll = function(){
	for(var i = 0; i < this.points.length; i++){
		this.points[i].selected = true;
	}
};
	
pointLayer.prototype.deselectAll = function(){
	for(var i = 0; i < this.points.length; i++){
		this.points[i].selected = false;
	}
};
	
pointLayer.prototype.selectPointsByArea = function(lat1, long1, lat2, long2){
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
};
	
pointLayer.prototype.deleteSelectedPoints = function(){

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
};
	
pointLayer.prototype.deletePointsByArea = function(lat1, long1, lat2, long2){
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
};
	
pointLayer.prototype.isEmpty = function(){
		return (this.points.length == 0);
};

// TODO:
// Exports the points into an XLS format
pointLayer.prototype.exportPointsXLS = function(){

};

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
};

pathLayer.prototype = Object.create(Layer.prototype);
	
pathLayer.prototype.addPath = function(pathObj){
	this.paths.push(pathObj);
};
	
pathLayer.prototype.deletePath = function(index){
	this.paths.splice(index,1);
};
	
pathLayer.prototype.editLineColor = function(newCol){
	if(hexCheck(newCol)){
		this.visualProperties.strokeColor = newCol;
	}
};
	
pathLayer.prototype.editLineOpacity = function(newOp){
	if(newOp >= 0.0 && newOp <= 1.0){
		this.visualProperties.strokeOpacity = newOp;
	}
};
	
pathLayer.prototype.editLineWeight = function(newWei){
	// Use a regex to make sure the color is
	if(newWei > 0.0){
		this.visualProperties.strokeWeight = newWei;
	}
};
	
pathLayer.prototype.isEmpty = function(){
	return (this.paths.length == 0);
};


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
	}
};

polyLayer.prototype = Object.create(Layer.prototype);
	
polyLayer.prototype.addPoly = function(polyObj){
	if(polyObj.polyPoints.length < 3){
		//console.log("polyObj '" + polyObj.name + "' has fewer than 3 points");
		return;
	}
	this.polys.push(polyObj);
};
	
polyLayer.prototype.deletePoly = function(index){
	this.polys.splice(index,1);
};
	
polyLayer.prototype.editStrokeColor = function(newCol){
	if(hexCheck(newCol)){
		this.visualProperties.strokeColor = newCol;
	}
};
	
polyLayer.prototype.editStrokeOpacity = function(newOp){
	if(newOp >= 0.0 && newOp <= 1.0){
		this.visualProperties.strokeOpacity = newOp;
	}
};
	
polyLayer.prototype.editStrokeWeight = function(newWei){
	// Use a regex to make sure the color is
	if(newWei > 0.0){
		this.visualProperties.strokeWeight = newWei;
	}
};
	
polyLayer.prototype.editFillColor = function(newCol){
	// Use a regex to make sure the color is
	if(hexCheck(newCol)){
		this.visualProperties.fillColor = newCol;
	}
};
	
polyLayer.prototype.editFillOpacity = function(newOp){
	// Use a regex to make sure the color is
	if(newOp >= 0.0 && newOp <= 1.0){
		this.visualProperties.fillOpacity = newOp;
	}
};
	
polyLayer.prototype.isEmpty = function(){
	return (this.polys.length == 0);
};
