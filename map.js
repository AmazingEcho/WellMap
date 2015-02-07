/*

map.js
The map object is what will hold the layer objects.

*/
function map(name){
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
		this.layers.sortascending(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
	}
	
	this.sortLayersByNameDescending = function(){
		// Descending Sort I hope - John
		this.layers.sortdescending(function(a,b) {return (b.name > a.name) ? 1: ((a.name > b.name) ? -1 : 0);})
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
