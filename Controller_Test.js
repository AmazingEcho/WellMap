// JavaScript Document

function Controller(){
	this.mapList = MapList();
}

// MapList is a linked list of maps
// Oh boy, linked lists in Javascript!
// Now that I think about it, I'm going to be using a lot of linked lists...
// I wonder if theres any generic type LL tools I can use...
function MapList(){
	
	this.listHead = null;
	this.listTail = null;
	this.length = 0;
	
	this.newMap = function(){
		if(this.listHead = null){
			this.listHead = new MapNode(length);
			this.listTail = this.listHead;
		}
		else{
			this.listTail.next = new MapNode(length);
			this.listTail = this.listTail.next;
		}
		length++;
	}
}

function MapNode(index_p){
	this.index = index_p;
	this.next = null;
	this.map = new Map();
}

// Map will contain one instance of MetaData, and then however many instances of layers
function Map(){
}