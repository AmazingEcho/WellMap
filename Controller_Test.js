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
}

// MapList uses a linked list of maps
// LinkedList provided by jsclass
function MapList(){
	console.log("Initializing MapList");
	this.mapsLL = new LinkedList.Doubly.Circular();
	this.size = 0;
	this.active = null;
	
	this.createMap = function(name){
		var newMap = new Map(name);
		this.mapsLL.push(newMap)
		this.size++;
		}
	//Write these later
	this.deleteMap = function(index){}
	this.switchMap = function(index){}
}

// Map will contain one instance of MetaData, and then however many instances of layers
function Map(name){
	console.log("Creating map: " + name)
	this.metdata = new MapMetadata(name);
}

function MapMetadata(name){
	this.mapName = name;
}

console.log("Initializing");
var The_Controller = new Controller();

The_Controller.mapList.createMap("TestMap01");
The_Controller.mapList.createMap("TestMap02");

console.log("Map list size is " + The_Controller.mapList.size)
console.log("This should be 2");

console.log("Initialization complete!");

});