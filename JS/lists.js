// Refreshes the map AND the layer list
fullRefresh = function(conPTR){
	console.log("Refreshing");
	conPTR.refreshMap();
	refreshLayerList(conPTR);
};

refreshLayerList = function(the_controller){
	document.getElementById("LayerList").innerHTML = "";
	
	// Go through the list of layers and create 'nodes' containing the appropriate tags.
	for(var i = 0; i < the_controller.the_map.layers.length; i++){
		
		var actionElem = document.createElement("input");
		actionElem.type = "checkbox";
		
		var checkElem = document.createElement("div");
		checkElem.className = "ui checkbox";
		checkElem.id = "layerVis-" + i;
		checkElem.style.cssFloat = 'left';		// For non-IE
		checkElem.style.styleFloat = 'left';		// For IE
		checkElem.appendChild(actionElem);
			
		document.getElementById("LayerList").appendChild(checkElem);
		
		var layerColourNode = document.createElement("div");
		layerColourNode.className = "layerColour";
		layerColourNode.style.backgroundColor = "#" + the_controller.the_map.layers[i].pointStyle.pointColour;
		document.getElementById("LayerList").appendChild(layerColourNode);
		
		var dropperNode = document.createElement("div");
		dropperNode.id = "dropper"+i;
		dropperNode.style.cssFloat = 'left';		// For non-IE
		dropperNode.style.styleFloat = 'left';		// For IE
		dropperNode.innerHTML = "[+] ";
		document.getElementById("LayerList").appendChild(dropperNode);
		
		var listItemNode = document.createElement("div");
		listItemNode.id = "clickable_layer" + i;
		listItemNode.innerHTML += the_controller.the_map.layers[i].name;
		document.getElementById("LayerList").appendChild(listItemNode)
		
		var subItemListNode = document.createElement("ul");
		subItemListNode.id = "sublist"+i;
		subItemListNode.className = "sublist";
		document.getElementById("LayerList").appendChild(subItemListNode);
		
		// For each layer, insert all of it's points into the list.
		// TODO: Code to handle the other layer types
		switch(the_controller.the_map.layers[i].layerType){
			case "point":
				for(var j = 0; j < the_controller.the_map.layers[i].points.length; j++){
					liNode = document.createElement("li");
					textnode = document.createTextNode(the_controller.the_map.layers[i].points[j].name);
					liNode.appendChild(textnode);
					document.getElementById("sublist"+i).appendChild(liNode);
				}
			case "path":
			case "poly":
			default:
		}
		
		if(the_controller.the_map.layers[i].visible == true){
			$("#layerVis-" + i).checkbox('check');
		}
		
		if(the_controller.the_map.layers[i].selected == true){
			$("#clickable_layer"+i).css('font-weight', 'bold');
			$("#clickable_layer"+i).css('color', 'red');
		}
		else if(the_controller.the_map.layers[i].selected == false){
			$("#clickable_layer"+i).css('font-weight', 'normal');
			$("#clickable_layer"+i).css('color', 'black');
		}
		
		$("#layerVis-" + i).checkbox(
			{
				onChecked : generate_handler_visON(i),
				onUnchecked : generate_handler_visOFF(i),
			}
		);
		
		$("#dropper" + i).click(generate_handler_dropper(i));
		$("#clickable_layer" + i).click(generate_handler_selectLayer(i));
	}
	
	$(".sublist").hide();
}

tableWellList = function(conptr){
	// Clear the Table
	document.getElementById("wellList").innerHTML = "";
	
	for(var i = 0; i < conptr.the_map.layers.length; i++){
		for(var j = 0; j < conptr.the_map.layers[i].points.length; j++){

		// Create a <tr>
		var rowNode = document.createElement("tr");
		
		// and fill it with info in <td>'s
		var nameNode = document.createElement("td");
		nameNode.innerHTML = conptr.the_map.layers[i].points[j].name;
		rowNode.appendChild(nameNode);
		
		var ownNode = document.createElement("td");
		ownNode.innerHTML = "";
		rowNode.appendChild(ownNode);
		
		var groupNode = document.createElement("td");
		groupNode.innerHTML = conptr.the_map.layers[i].name;
		rowNode.appendChild(groupNode);
		
		var latNode = document.createElement("td");
		latNode.innerHTML = conptr.the_map.layers[i].points[j].getLat();
		rowNode.appendChild(latNode);
		
		var longNode = document.createElement("td");
		longNode.innerHTML = conptr.the_map.layers[i].points[j].getLong();
		rowNode.appendChild(longNode);
		
		var capNode = document.createElement("td");
		capNode.innerHTML = conptr.the_map.layers[i].points[j].wellData.wellCapacity;
		rowNode.appendChild(capNode);
		
		var outNode = document.createElement("td");
		outNode.innerHTML = conptr.the_map.layers[i].points[j].wellData.wellOutput;
		rowNode.appendChild(outNode);
		
		document.getElementById("wellList").appendChild(rowNode);
					
		}
	}
}
