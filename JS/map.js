/*

map.js
The map object is what will hold the layer objects.

*/
function map(mapName){
	// Arrays in Javascript aren't like Arrays in C/C++
	// You don't have to specify how big the array is or what it's storing
	
	// this.layers = new Array();
	// Arrays can also be made like this, which I've been told is better:
	this.layers = [];
	
	this.metadata = new mapMetadata(mapName);
	
}

map.prototype = {
	
	changeName : function(newName){
		this.metadata.changeName(newName);
	},
	
	changeDescription : function(newDesc){
		this.metadata.changeDescription(newDesc);
	},
	
	newLayer : function(layerName){
		// You can put new objects (or anything) into an Array with the .push() method
		this.layers.push(new Layer(layerName));
	},
	
	newPointLayer: function(name){
		this.layers.push(new pointLayer(name));
	},
	
	newPathLayer : function(name){
		this.layers.push(new pathLayer(name));
	},
	
	newPolyLayer : function(name){
		this.layers.push(new polyLayer(name));
	},
	
	layerCount : function(){
		return this.layers.length;
	},
	
	deleteLayer : function(index){
		if(index >= this.layers.length){
			console.log("Layer " + index + " does not exist");
			return;
		}
		this.layers.splice(index, 1);
	},
	
	// Methods to control layer visibility
	switchVis : function(index){
		console.log("Switching vis on "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		else{
			this.layers[index].switchVis();
		}
	},
	
	visOn : function(index){
		console.log("Switching vis on "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = true;
	},
	
	visOff : function(index){
		console.log("Switching vis off "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = false;
	},
	
	switchVisAllOff : function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = false;
		}
	},
	
	switchVisAllOn : function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = true;
		}
	},
	
	sortLayersByNameAscending : function(){
		// Now where did I put my notes from Data Structures and Algorithms? -T
		// Ascending Sort - John
		// Oh, this works:
		// http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
		this.layers.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
	},
	
	sortLayersByNameDescending : function(){
		// Descending Sort I hope - John
		// I just flipped the return values from the returning sort, hopefully this makes sense
		this.layers.sort(function(a,b) {return (b.name > a.name) ? 1: ((a.name > b.name) ? -1 : 0);})
	},
	
	// Go through the layer list and delete empty layers
	cullEmptyLayers : function(){
		for(var i = 0; i < this.layers.length;){
			if(this.layers[i].isEmpty()){
				this.layers.splice(i,1);
			}
			else{
				i++;
			}
		}
	},
	
	copywellLayers : function(){
		alert("copy");
		//should be able to copy the list is its in an array with the slice function
		//need to be able to call array from this class though -John
		//var copiedlist = this.layers.slice();
		
	},
	
	cutwellLayers : function(){
		alert("cut");
		//cut should be the same as copy but with a delete function built in
		//also Java sucks at garbage collection so just create for loop to deallocate memory- John
		//var cutlist = this.layers.slice();
		//for (var i = 0; i < this.layers.length; i++){
		//	arr[i] = null;	
		//}
	},
	
	pastewellLayers : function(){
		alert("paste");
		//need for loop to copy and overwrite onto array - John
		//for (var i = 0; i < this.layer.length; i++){
		//	arr[i] = array.length[i];
		//}
	}
};

//////////////////////////////
// JSON Saving and Loading
//////////////////////////////
map.prototype.toJSON = function() {
	return Generic_toJSON("map", this);
};

map.fromJSON = function(value) {
	return Generic_fromJSON(map, value.data);
};

Reviver.constructors.map = map;

function mapMetadata(mapName){

	this.mapName = mapName;
	
	// description is empty on creation
	this.desc = "";
	
	// coordinates for where the map should focus on when loaded
	this.origin = [55.0, -115.0];
	this.zoomLVL = 5;
	
	// TODO:
	// GoogleMaps has a bunch of map types (Satellite, Streets, etc)
	// Double check those, and maybe make a function to set this
	this.mapType = 2;
	
};

mapMetadata.prototype = {	
	changeName : function(newName){
		this.mapName = newName;
	},
	
	changeDescription : function(newDesc){
		this.desc = newDesc;
	}
}

//////////////////////////////
// JSON Saving and Loading
//////////////////////////////
mapMetadata.prototype.toJSON = function() {
	return Generic_toJSON("mapMetadata", this);
};

mapMetadata.fromJSON = function(value) {
	return Generic_fromJSON(mapMetadata, value.data);
};

Reviver.constructors.mapMetadata = mapMetadata;