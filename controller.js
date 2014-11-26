/*
WellMap
controller.js
*/

function controller(){
	this.the_map = new map();
	
	this.newLayer = function(name){
		this.the_map.newLayer(name);
	};
}

function map(){
	this.layers = new Array();
	
	this.newLayer = function(name){
		this.layers.push(new layer(name));
	};
	
	this.layerCount = function(){
		return this.layers.length;
	}
}

function layer(name){
	this.name = name;
}

