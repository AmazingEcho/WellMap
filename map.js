/*

map.js
The map object is what will hold the layer objects.

*/
function map(name){i
	// Arrays in Javascript aren't like Arrays in C/C++
	// You don't have to specify how big the array is or what it's storing
	
	// this.layers = new Array();
	// Arrays can also be made like this, which I've been told is better:
	this.layers = [];
	
	this.metadata = new mapMetadata(name);
	
	this.changeDescription = function(newDesc){
		this.metadata.changeDescription(newDesc);
	};
	
	this.newLayer = function(name){
		// You can put new objects (or anything) into an Array with the .push() method
		this.layers.push(new Layer(name));
	};
	
	this.newPointLayer = function(name){
		this.layers.push(new pointLayer(name));
	};
	
	this.newPathLayer = function(name){
		this.layers.push(new pathLayer(name));
	};
	
	this.newPolyLayer = function(name){
		this.layers.push(new polyLayer(name));
	};
	
	this.layerCount = function(){
		return this.layers.length;
	};
	
	this.deleteLayer = function(index){
		if(index >= this.layers.length){
			console.log("Layer " + index + " does not exist");
			return;
		}
		this.layers.splice(index, 1);
	}
	
	// Methods to control layer visibility
	this.switchVis = function(index){
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
	}
	
	this.visOn = function(index){
		console.log("Switching vis on "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = true;
	}
	this.visOff = function(index){
		console.log("Switching vis off "+ index);
		if(index < 0){
			return;
		}
		else if(index >= this.layers.length){
			return;
		}
		this.layers[index].visible = false;
	}
	
	this.switchVisAllOff = function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = false;
		}
	}
	
	this.switchVisAllOn = function(){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].visible = true;
		}
	}
	
	this.sortLayersByNameAscending = function(){
		// Now where did I put my notes from Data Structures and Algorithms? -T
		// Ascending Sort - John
		// Oh, this works:
		// http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
		this.layers.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
	}
	
	this.sortLayersByNameDescending = function(){
		// Descending Sort I hope - John
		// I just flipped the return values from the returning sort, hopefully this makes sense
		this.layers.sort(function(a,b) {return (b.name > a.name) ? 1: ((a.name > b.name) ? -1 : 0);})
	}
	
	// Go through the layer list and delete empty layers
	this.cullEmptyLayers = function(){
		for(var i = 0; i < this.layers.length;){
			if(this.layers[i].isEmpty()){
				this.layers.splice(i,1);
			}
			else{
				i++;
			}
		}
	}
	
	this.copywellLayers = function(){
		alert("copy");
		//should be able to copy the list is its in an array with the slice function
		//need to be able to call array from this class though -John
		//var copiedlist = this.layers.slice();
		
	}
	
	this.cutwellLayers = function(){
		alert("cut");
		//cut should be the same as copy but with a delete function built in
		//also Java sucks at garbage collection so just create for loop to deallocate memory- John
		//var cutlist = this.layers.slice();
		//for (var i = 0; i < this.layers.length; i++){
		//	arr[i] = null;	
		//}
	}
	
	this.pastewellLayers = function(){
		alert("paste");
		//need for loop to copy and overwrite onto array - John
		//for (var i = 0; i < this.layer.length; i++){
		//	arr[i] = array.length[i];
		//}
	}
}

Types.map = map;

map.prototype.toJSON = function(){
	return {
		__type: 'map',
		layers: this.layers,
		metadata: this.metadata
	};
};

map.revive = function(data){
	//console.log("Revive Function called for map.  Data is " + data);
	return new map(data.metadata.name);
};

map.prototype.changeName = function(newName){
		this.metadata.changeName(newName);
	}


function mapMetadata(name){
	//console.log("mapMetadata() constructor called, name is " + name);
	this.mapName = name;
	
	// description is empty on creation
	this.description = "";
	
	// coordinates for where the map should focus on when loaded
	this.origin = [55.0, -115.0]
	
	// TODO:
	// GoogleMaps has a bunch of map types (Satellite, Streets, etc)
	// Double check those, and maybe make a function to set this
	this.mapType = "default";
	
	this.changeName = function(newName){
		this.mapName = newName;
	}
	
	this.changeDescription = function(newDesc){
		this.description = newDesc;
	}
}

// SUPER IMPORTANT!!!
// This is the code that allows JSON.parse() to restore functions to objects made through JSON
// Every constructor (except controller) needs it's own version of this.
// More info here:
// http://stackoverflow.com/questions/14027168/how-to-restore-original-object-type-from-json

Types.mapMetadata = mapMetadata;

mapMetadata.prototype.toJSON = function(){
	return {
		__type: 'mapMetadata',
		mapName: this.mapName,
		origin: this.origin,
		mapType: this.mapType
	};
};

mapMetadata.revive = function(data){
	console.log("Revive Function called" + data.mapName);
	return new mapMetadata(data.mapName);
};
