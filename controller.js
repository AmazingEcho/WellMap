/*
WellMap
controller.js
*/

function controller(){
	this.the_map = new map();
	
	this.newLayer = function(name){
		this.the_map.newLayer(name);
	};
	
	this.newPointLayer = function(name){
		this.the_map.newPointLayer(name);
	}
}

function map(){
	this.layers = new Array();
	
	this.newLayer = function(name){
		this.layers.push(new layer(name));
	};
	
	this.newPointLayer = function(name){
		this.layers.push(new pointLayer(name));
	};
	
	this.layerCount = function(){
		return this.layers.length;
	}
}

function layer(name){
	this.name = name;
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

function pointLayer(name){
	
	this.inheritFrom = layer;
	this.inheritFrom();
	
	this.points = [];
	
	this.addPoint = function(name, type, gmpoint){
		this.points.push(new Point(name, type, gmpoint));
	};
	
	this.getLat = function(index){
		return this.points[index].point.lat;
	};
	
	this.getLong = function(index){
		return this.points[index].point.long;
	};
}