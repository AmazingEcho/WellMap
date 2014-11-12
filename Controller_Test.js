/*
Controller_Test.js
Author: Thomas Condon
Original: Nov 9th 2014

Experimenting with data structures in Javascript

Using jsclass so I don't have to code data structures that I've coded in C++/Java a dozen times for other courses...
http://jsclass.jcoglan.com/
https://github.com/jcoglan/jsclass
*/

JS.require('JS.LinkedList', function(LinkedList){

console.log("Running Controller_Test.js!");

function Controller(){
	console.log("Initializing Controller");
	this.mapList = new MapList();
	
	this.createMap = function(name){
		this.mapList.createMap(name);
		}
	this.switchMap - function(){
		}
}

// MapList uses a linked list of maps
// LinkedList provided by jsclass
function MapList(){
	console.log("Initializing MapList");
	this.mapsLL = new LinkedList.Doubly.Circular();
	this.size = 0;
	this.active = null;
	
	this.switchMap = function(index){
		this.active = this.mapsLL.at(index);
		}

	this.createMap = function(name){
		var newMap = new Map(name);
		this.mapsLL.push(newMap);
		// A newly created map should be the active map
		this.active = this.size++;
		}
	//Write these later
	this.deleteMap = function(index){}
}

// Map will contain one instance of MetaData, and then however many instances of layers
function Map(name){
	console.log("Creating map: " + name)
	this.metadata = new MapMetadata(name);
}

function MapMetadata(name){
	this.mapName = name;
}

console.log("Initializing");
var The_Controller = new Controller();

The_Controller.createMap("TestMap00");
The_Controller.createMap("TestMap01");

console.log("Map list size is " + The_Controller.mapList.size + ".  This should be 2");
console.log("Active Map is " + The_Controller.mapList.mapsLL.at(The_Controller.mapList.active).metadata.mapName + ".  This should be 1");
console.log("Switching Active Map!");

The_Controller.mapList.switchMap(0);

console.log("Active Map is " + The_Controller.mapList.mapsLL.at(The_Controller.mapList.active).metadata.mapName + ".  This should be 0");

console.log("Initialization complete!");

});