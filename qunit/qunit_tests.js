/*
WellMap
QUnit Test Suite
Author: Thomas Condon

QUnit is a Unit Testing Framework for Javascript.  If you want to add new tests, just follow the example in the Dummy Test below!

If you're feeling really brave, you can try making your own set of tests!  Just make a copy of index.html, and make sure it points to the right .js files.

This carousel - takes us round and round!
This crazy maze of life,
You can't tell up from down...
Having so much fun...
We forgot to ask where this magic's taking us,
But hey, here we come

This carousel - spins you round and out!
You really don't know why,
But it makes you wanna shout:
"We've only just begun...
Let's enjoy this wild Maze of life!"
*/

/*
module('Dummy Tests', {
    setup: function () {
    },
    teardown: function () {
    }
});

test( "Dummy Test", function() {
  ok( 1 == "1", "Passed!" );
});
*/

module('Map Metadata Tests', {
    setup: function () {
    },
    teardown: function () {
    }
});

test("Metadata: Name", function(){
	var the_controller = new controller();
	ok(the_controller.the_map.metadata.mapName == "Untitled Map", "Map name is: " + the_controller.the_map.metadata.mapName);
});

test("Metadata: Description", function(){
	var the_controller = new controller();
	ok(the_controller.the_map.metadata.description == "", "Description is: " + the_controller.the_map.metadata.description);
});

module('Data Structure Tests', {
    setup: function () {
    },
    teardown: function () {
    }
});

test("Basic Data Structure Creation Tests", function(){
	
	var the_controller = new controller();
	ok(the_controller, "Controller created!");
	
	the_controller.newLayer("Test Layer");
	ok( the_controller.the_map.layers[0].name === "Test Layer", "Test Layer Created!");
	
	the_controller.newLayer("Test Layer 2");
	the_controller.newLayer("Test Layer 3");
	
	ok(the_controller.the_map.layerCount() == 3, "Additional Layers Created!");
});

test("Point Layer Creation",function(){
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer");
	
	ok(the_controller.the_map.layers[0].name === "Test Point Layer", "Layer name is: " + the_controller.the_map.layers[0].name);
	
	var testPoint = new GMapPoint(55.0, -115.0);
	the_controller.the_map.layers[0].addPoint("Test Point", "Well", testPoint);
	
	ok(
	the_controller.the_map.layers[0].getLat(0) === 55.0 &&
	the_controller.the_map.layers[0].getLong(0) === -115.0,
	"Point created - Lat: " + the_controller.the_map.layers[0].getLat(0) + " Long: " + the_controller.the_map.layers[0].getLong(0));
});

test("Path Layer Creation",function(){
	
	// Create the controller and add a Path Layer
	var the_controller = new controller();
	the_controller.newPathLayer("Test Path Layer");
	
	// Create a path, and add some points to it
	var testPath = new Path("Test Path", "Road");
	testPath.addPoint(55.0, -115.0);
	testPath.addPoint(54.0, -114.0);
	testPath.addPoint(55.0, -113.0);
	testPath.addPoint(56.0, -112.0);
	
	// Add the path to the path layer
	
	the_controller.the_map.layers[0].addPath(testPath);
	
	ok(
	the_controller.the_map.layers[0].paths[0].pathPoints[0].lat === 55.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[0].long === -115.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[1].lat === 54.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[1].long === -114.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[2].lat === 55.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[2].long === -113.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[3].lat === 56.0 &&
	the_controller.the_map.layers[0].paths[0].pathPoints[3].long === -112.0
	, "Path created");
});

test("Poly Layer Creation", function(){
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	
	var testPoly = new Poly("Test Poly", "Bigfoot Habitat");
	testPoly.addPoint(55.0, -115.0);
	testPoly.addPoint(54.0, -114.0);
	testPoly.addPoint(55.0, -113.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly);
	
	ok(the_controller.the_map.layers[0].polys[0].polyPoints[0].lat === 55.0 &&
	the_controller.the_map.layers[0].polys[0].polyPoints[0].long === -115.0 &&
	the_controller.the_map.layers[0].polys[0].polyPoints[1].lat === 54.0 &&
	the_controller.the_map.layers[0].polys[0].polyPoints[1].long === -114.0 &&
	the_controller.the_map.layers[0].polys[0].polyPoints[2].lat === 55.0 &&
	the_controller.the_map.layers[0].polys[0].polyPoints[2].long === -113.0
	, "Poly layer created");
	
	var testPoly2 = new Poly("Test Poly", "Manbearpig Habitat");
	testPoly2.addPoint(52.0, -110.0);
	testPoly2.addPoint(52.0, -112.0);
	testPoly2.addPoint(53.0, -111.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly2);
	
	ok(the_controller.the_map.layers[0].polys[1].polyPoints[0].lat === 52.0 &&
	the_controller.the_map.layers[0].polys[1].polyPoints[0].long === -110.0 &&
	the_controller.the_map.layers[0].polys[1].polyPoints[1].lat === 52.0 &&
	the_controller.the_map.layers[0].polys[1].polyPoints[1].long === -112.0 &&
	the_controller.the_map.layers[0].polys[1].polyPoints[2].lat === 53.0 &&
	the_controller.the_map.layers[0].polys[1].polyPoints[2].long === -111.0
	, "Second Polygon added to layer");
	
});

test("Poly Size Restriction", function(){
	// Polygons need to be have at least 3 points in them
	// A Polygon with 0, 1 or 2 shouldn't be created...
	
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	
	var testPoly = new Poly("Test Poly", "Bigfoot Habitat");
	testPoly.addPoint(55.0, -115.0);
	testPoly.addPoint(54.0, -114.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly);
	
	ok(the_controller.the_map.layers[0].polys[0] == null, "Test not finished");
});

module("Layer Delation Tests", {
	setup: function(){
		
	},
	teardown: function(){
		
	}
});

test("Layer Delete", function(){
	
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer");
	the_controller.newPathLayer("Test Path Layer");
	the_controller.newPathLayer("Test Poly Layer");
	
	ok(the_controller.the_map.layerCount() == 3, "Layers created");
	
	// Delete the Path layer
	the_controller.deleteLayer(1);
	
	ok(the_controller.the_map.layers[0].name == "Test Point Layer" &&
		the_controller.the_map.layers[1].name == "Test Poly Layer"
		, "Path Layer deleted");
	
});

test("Point Delete", function(){
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer");
	
	the_controller.the_map.layers[0].addPointLatLong("Test Point 1", "Well", 55.0, -115.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 2", "Well", 54.0, -114.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 3", "Well", 53.0, -113.0);
	
	ok(the_controller.the_map.layers[0].points.length == 3, the_controller.the_map.layers[0].points.length + " points added to Test Point Layer!");
	
	the_controller.the_map.layers[0].deletePoint(1);
	
	ok(the_controller.the_map.layers[0].points.length == 2, "Point deleted");
	ok(the_controller.the_map.layers[0].getLat(0) == 55.0 && the_controller.the_map.layers[0].getLat(1) == 53.0, "Correct point was deleted!");
});

test("Point Delete by Area", function(){
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer");
	
	//
	
	// Center - WILL BE DELETED
	the_controller.the_map.layers[0].addPointLatLong("Test Point 1", "Well", 53.0, -113.0);
	
	// Near edges - WILL BE DELETED
	the_controller.the_map.layers[0].addPointLatLong("Test Point 2", "Well", 53.75, -113.75);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 3", "Well", 53.75, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 4", "Well", 53.75, -112.25);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 5", "Well", 53.0, -112.25);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 6", "Well", 52.25, -112.25);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 7", "Well", 52.25, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 8", "Well", 52.25, -113.75);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 9", "Well", 53.0, -113.75);
	
	// Edges - WILL BE DELETED
	the_controller.the_map.layers[0].addPointLatLong("Test Point 10", "Well", 54.0, -114.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 11", "Well", 54.0, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 12", "Well", 54.0, -112.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 13", "Well", 53.0, -112.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 14", "Well", 52.0, -112.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 15", "Well", 52.0, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 16", "Well", 52.0, -114.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 17", "Well", 53.0, -114.0);
	
	// Outside - Undeleted
	the_controller.the_map.layers[0].addPointLatLong("Test Point 18", "Well", 54.25, -114.25);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 19", "Well", 54.25, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 20", "Well", 54.25, -111.75);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 21", "Well", 53.0, -111.75);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 22", "Well", 51.75, -111.75);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 23", "Well", 51.75, -113.0);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 24", "Well", 51.75, -114.25);
	the_controller.the_map.layers[0].addPointLatLong("Test Point 25", "Well", 53.0, -114.25);
	
	ok(the_controller.the_map.layers[0].points.length == 25, "Points created");
	
	the_controller.the_map.layers[0].deletePointsByArea(54.0, -114.0 , 52.0, -112.0);
	
	ok(the_controller.the_map.layers[0].points.length == 8, "Points deleted.  Points remaining: " + the_controller.the_map.layers[0].points.length);
	
	ok(the_controller.the_map.layers[0].points[0].name == "Test Point 18" &&
		the_controller.the_map.layers[0].points[1].name == "Test Point 19" &&
		the_controller.the_map.layers[0].points[2].name == "Test Point 20" &&
		the_controller.the_map.layers[0].points[3].name == "Test Point 21" &&
		the_controller.the_map.layers[0].points[4].name == "Test Point 22" &&
		the_controller.the_map.layers[0].points[5].name == "Test Point 23" &&
		the_controller.the_map.layers[0].points[6].name == "Test Point 24" &&
		the_controller.the_map.layers[0].points[7].name == "Test Point 25"		
	, "Correct points deleted");
});

test("Path Delete", function(){
	var the_controller = new controller();
	the_controller.newPathLayer("Test Path Layer");
	
	var testPath = new Path("Test Path 1", "Yellow Brick Road");
	testPath.addPoint(53.0, -113.0);
	testPath.addPoint(54.0, -114.0);
	testPath.addPoint(55.0, -113.0);
	
	the_controller.the_map.layers[0].addPath(testPath);
	
	var testPath2 = new Path("Test Path 2", "Trail of Broken Hearts");
	testPath2.addPoint(52.0, -110.0);
	testPath2.addPoint(52.0, -112.0);
	testPath2.addPoint(53.0, -111.0);
	
	the_controller.the_map.layers[0].addPath(testPath2);
	
	ok(the_controller.the_map.layers[0].paths.length == 2, "Layer has two paths!");
	
	the_controller.the_map.layers[0].deletePath(0);
	
	ok(the_controller.the_map.layers[0].paths.length == 1, "After deleting a path, layer has one path!");
	
	ok(the_controller.the_map.layers[0].paths[0].name == "Test Path 2", "Correct path was deleted!");
	
});

test("Poly Delete", function(){
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	
	var testPoly = new Poly("Test Poly 1", "Bigfoot Habitat");
	testPoly.addPoint(55.0, -115.0);
	testPoly.addPoint(54.0, -114.0);
	testPoly.addPoint(55.0, -113.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly);
	
	var testPoly2 = new Poly("Test Poly 2", "Manbearpig Habitat");
	testPoly2.addPoint(52.0, -110.0);
	testPoly2.addPoint(52.0, -112.0);
	testPoly2.addPoint(53.0, -111.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly2);
	
	ok(the_controller.the_map.layers[0].polys.length == 2, "Layer has two polygons!");
	
	the_controller.the_map.layers[0].deletePoly(0);
	
	ok(the_controller.the_map.layers[0].polys.length == 1, "After deleting a polygon, layer has one polygon!");
	
	ok(the_controller.the_map.layers[0].polys[0].name == "Test Poly 2", "Correct polygon was deleted!");
	
});

module("Layer Settings Tests", {
	setup: function(){
		
	},
	teardown: function(){
		
	}
});

test("Visibility On/Off", function(){
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer");
	ok(the_controller.the_map.layers[0].visible == true, "Layer is visible on creation!");
	the_controller.the_map.switchVis(0);
	ok(the_controller.the_map.layers[0].visible == false, "Layer is switched to non-visible");
	the_controller.the_map.switchVis(0);
	ok(the_controller.the_map.layers[0].visible == true, "Layer is visible again");
	
	the_controller.the_map.VisOff(0);
	ok(the_controller.the_map.layers[0].visible == false, "Layer is off");
	the_controller.the_map.VisOff(0);
	ok(the_controller.the_map.layers[0].visible == false, "Layer is still off");
	the_controller.the_map.VisOn(0);
	ok(the_controller.the_map.layers[0].visible == true, "Layer is visible again");
	the_controller.the_map.VisOn(0);
	ok(the_controller.the_map.layers[0].visible == true, "Layer is still visible");
	
	the_controller.newPointLayer("Test Point Layer 2");
	ok(the_controller.the_map.layers[1].visible == true && the_controller.the_map.layers[0].visible == true, 
	"Second layer is visible on creation!");
	the_controller.the_map.switchVis(1);
	ok(the_controller.the_map.layers[1].visible == false && the_controller.the_map.layers[0].visible == true, 
	"Second layer is switched to non-visible, but first is visible");
	the_controller.the_map.switchVis(1);
	ok(the_controller.the_map.layers[1].visible == true, "Layer is visible again");
});

test("Visibility All On/Off", function(){
	// Make a bunch of layers, switch them on and off randomly,
	// and then use the all on/off functions to turn them all on/off at once.
	
	var the_controller = new controller();
	the_controller.newPointLayer("Test Point Layer 1");
	the_controller.newPointLayer("Test Point Layer 2");
	the_controller.newPointLayer("Test Point Layer 3");
	the_controller.newPointLayer("Test Point Layer 4");
	
	the_controller.the_map.switchVisAllOff();
	
	var allOff = false;
	allOff = (the_controller.the_map.layers[0].visible == false &&
				the_controller.the_map.layers[1].visible == false &&
				the_controller.the_map.layers[2].visible == false &&
				the_controller.the_map.layers[3].visible == false
				);
	
	ok(allOff, "All layers set to non-visible.");
	
	the_controller.the_map.switchVisAllOn();
	
	var allOn = false;
	allOn = (the_controller.the_map.layers[0].visible == true &&
				the_controller.the_map.layers[1].visible == true &&
				the_controller.the_map.layers[2].visible == true &&
				the_controller.the_map.layers[3].visible == true
				);
	
	ok(allOn, "All layers set to visible.");
	
	the_controller.the_map.switchVisAllOff();
	
	allOff = false;
	allOff = (the_controller.the_map.layers[0].visible == false &&
				the_controller.the_map.layers[1].visible == false &&
				the_controller.the_map.layers[2].visible == false &&
				the_controller.the_map.layers[3].visible == false
				);
	
	ok(allOff, "All layers set to non-visible again.");
});

module("gmaps.js Data Generation", {
	setup: function(){
		
	},
	teardown: function(){
		
	}
});

test("Path gmaps.js array generator",function(){
	
	var the_controller = new controller();
	the_controller.newPathLayer("Test Path Layer");
	
	var testPath = new Path("Test Path", "Stairway to Heaven");
	testPath.addPoint(50.0, -115.0);
	testPath.addPoint(51.0, -114.0);
	testPath.addPoint(52.0, -113.0);
	
	the_controller.the_map.layers[0].addPath(testPath);
	
	var testArray = the_controller.the_map.layers[0].paths[0].generatePointArray();
	
	ok(testArray[0][0] == 50.0 && testArray[0][1] == -115.0 && 
		testArray[1][0] == 51.0 && testArray[1][1] == -114.0 && 
		testArray[2][0] == 52.0 && testArray[2][1] == -113.0
		, "Generated Array is " + testArray);
});

test("Poly gmaps.js array generator",function(){
	
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	
	var testPoly = new Poly("Test Poly", "Bigfoot Habitat");
	testPoly.addPoint(55.0, -115.0);
	testPoly.addPoint(54.0, -114.0);
	testPoly.addPoint(55.0, -113.0);
	
	the_controller.the_map.layers[0].addPoly(testPoly);
	
	var testArray = the_controller.the_map.layers[0].polys[0].generatePointArray();
	
	ok(testArray[0][0] == 55.0 && testArray[0][1] == -115.0 && 
		testArray[1][0] == 54.0 && testArray[1][1] == -114.0 && 
		testArray[2][0] == 55.0 && testArray[2][1] == -113.0
		, "Generated Array is " + testArray);
});

module("Visual Properties Tests", {
	setup: function(){
		
	},
	teardown: function(){
		
	}
});

test("Path Layer Visual Properties", function(){
	
	ok(false, "Wrtie later...");
});

test("Poly Layer Visual Properties", function(){
	
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	
	ok(the_controller.the_map.layers[0].visualProperties.strokeColor == "#ffffff", "Poly Layer has default strokeColor.");
	ok(the_controller.the_map.layers[0].visualProperties.strokeOpacity == 1, "Poly Layer has default strokeOpacity.");
	ok(the_controller.the_map.layers[0].visualProperties.strokeWeight == 3, "Poly Layer has default strokeWeight.");
	ok(the_controller.the_map.layers[0].visualProperties.fillColor == "#777777", "Poly Layer has default fillColor.");
	ok(the_controller.the_map.layers[0].visualProperties.fillOpacity == 0.5, "Poly Layer has default fillOpacity.");
	
	// Should reject strings that aren't hex colours
	// strokeColor
	the_controller.the_map.layers[0].editStrokeColor("#GGGGGG");
	ok(the_controller.the_map.layers[0].visualProperties.strokeColor == "#ffffff", "Bad string rejected; strokeColor unchanged.");
	
	the_controller.the_map.layers[0].editStrokeColor("ffffff");
	ok(the_controller.the_map.layers[0].visualProperties.strokeColor == "#ffffff", "Bad string rejected; strokeColor unchanged.");
	
	the_controller.the_map.layers[0].editStrokeColor("1");
	ok(the_controller.the_map.layers[0].visualProperties.strokeColor == "#ffffff", "Bad string rejected; strokeColor unchanged.");
	
	the_controller.the_map.layers[0].editStrokeColor("#ff0000");
	ok(the_controller.the_map.layers[0].visualProperties.strokeColor == "#ff0000", "Good String accepted; strokeColor changed.");
	
	// strokeOpacity
	the_controller.the_map.layers[0].editStrokeOpacity(10);
	ok(the_controller.the_map.layers[0].visualProperties.strokeOpacity == 1, "Bad value rejected; strokeOpacity unchanged.");
	
	the_controller.the_map.layers[0].editStrokeOpacity(-.01);
	ok(the_controller.the_map.layers[0].visualProperties.strokeOpacity == 1, "Bad value rejected; strokeOpacity unchanged.");
	
	the_controller.the_map.layers[0].editStrokeOpacity("robot");
	ok(the_controller.the_map.layers[0].visualProperties.strokeOpacity == 1, "Bad value rejected; strokeOpacity unchanged.");
	
	the_controller.the_map.layers[0].editStrokeOpacity(.5);
	ok(the_controller.the_map.layers[0].visualProperties.strokeOpacity == .5, "Good value accepted; strokeOpacity changed.");
	
	// strokeWeight
	the_controller.the_map.layers[0].editStrokeWeight(0);
	ok(the_controller.the_map.layers[0].visualProperties.strokeWeight == 3, "Bad value rejected; strokeWeight unchanged.");
	
	the_controller.the_map.layers[0].editStrokeWeight(-1);
	ok(the_controller.the_map.layers[0].visualProperties.strokeWeight == 3, "Bad value rejected; strokeWeight unchanged.");
	
	the_controller.the_map.layers[0].editStrokeWeight("robot");
	ok(the_controller.the_map.layers[0].visualProperties.strokeWeight == 3, "Bad value rejected; strokeWeight unchanged.");
	
	the_controller.the_map.layers[0].editStrokeWeight(.5);
	ok(the_controller.the_map.layers[0].visualProperties.strokeWeight == .5, "Good value accepted; strokeWeight changed.");
	
	// fillColor
	the_controller.the_map.layers[0].editFillColor("#GGGGGG");
	ok(the_controller.the_map.layers[0].visualProperties.fillColor == "#777777", "Bad string rejected; fillColor unchanged.");
	
	the_controller.the_map.layers[0].editFillColor("ffffff");
	ok(the_controller.the_map.layers[0].visualProperties.fillColor == "#777777", "Bad string rejected; fillColor unchanged.");
	
	the_controller.the_map.layers[0].editFillColor("1");
	ok(the_controller.the_map.layers[0].visualProperties.fillColor == "#777777", "Bad string rejected; fillColor unchanged.");
	
	the_controller.the_map.layers[0].editFillColor("#00ff00");
	ok(the_controller.the_map.layers[0].visualProperties.fillColor == "#00ff00", "Good String accepted; fillColor changed.");
	
	// fillOpacity
	the_controller.the_map.layers[0].editFillOpacity(10);
	ok(the_controller.the_map.layers[0].visualProperties.fillOpacity == 0.5, "Bad value rejected; fillOpacity unchanged.");
	
	the_controller.the_map.layers[0].editFillOpacity(-.01);
	ok(the_controller.the_map.layers[0].visualProperties.fillOpacity == 0.5, "Bad value rejected; fillOpacity unchanged.");
	
	the_controller.the_map.layers[0].editFillOpacity("robot");
	ok(the_controller.the_map.layers[0].visualProperties.fillOpacity == 0.5, "Bad value rejected; fillOpacity unchanged.");
	
	the_controller.the_map.layers[0].editFillOpacity(.8);
	ok(the_controller.the_map.layers[0].visualProperties.fillOpacity == 0.8, "Good value accepted; fillOpacity changed.");
	
});