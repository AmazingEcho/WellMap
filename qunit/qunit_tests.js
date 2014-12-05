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
	var testPoint = new GMapPoint(55.0, -115.0);
	the_controller.the_map.layers[0].addPoint("Test Point", "Well", testPoint);
	
	ok(
	the_controller.the_map.layers[0].getLat(0) === 55.0 &&
	the_controller.the_map.layers[0].getLong(0) === -115.0, "Point created - Lat: " + the_controller.the_map.layers[0].getLat(0) + " Long: " + the_controller.the_map.layers[0].getLong(0));
});

test("Path Layer Creation",function(){
	var the_controller = new controller();
	the_controller.newPathLayer("Test Path Layer");
	var testPath = new Array();
	testPath[0] = new GMapPoint(55.0, -115.0);
	testPath[1] = new GMapPoint(54.0, -114.0);
	testPath[2] = new GMapPoint(55.0, -113.0);
	testPath[3] = new GMapPoint(56.0, -112.0);
	the_controller.the_map.layers[0].addPath("Test Path", "Road", testPath);
	
	ok(
	the_controller.the_map.layers[0].paths[0].points[0].lat === 55.0 &&
	the_controller.the_map.layers[0].paths[0].points[0].long === -115.0 &&
	the_controller.the_map.layers[0].paths[0].points[1].lat === 54.0 &&
	the_controller.the_map.layers[0].paths[0].points[1].long === -114.0 &&
	the_controller.the_map.layers[0].paths[0].points[2].lat === 55.0 &&
	the_controller.the_map.layers[0].paths[0].points[2].long === -113.0 &&
	the_controller.the_map.layers[0].paths[0].points[3].lat === 56.0 &&
	the_controller.the_map.layers[0].paths[0].points[3].long === -112.0
	, "Path created");
});

test("Poly Layer Creation", function(){
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	var testPoly = new Array();
	testPoly[0] = new Point(55.0, -115.0);
	testPoly[1] = new Point(54.0, -114.0);
	testPoly[2] = new Point(55.0, -113.0);
	the_controller.the_map.layers[0].addPoly("Test Poly", "Bigfoot Habitat", testPoly);
	
	ok(false, "Test not finished");
});

test("Poly Size Restriction", function(){
	// Polygons need to be have at least 3 points in them
	// A Polygon with 0, 1 or 2 shouldn't be created...
	
	var the_controller = new controller();
	the_controller.newPolyLayer("Test Poly Layer");
	var testPoly = new Array();
	testPoly[0] = new Point(55.0, -115.0);
	testPoly[1] = new Point(54.0, -114.0);
	
	the_controller.the_map.layers[0].addPoly("Bad Poly", "Bigfoot Habitat", testPoly);
	
	ok(false, "Test not finished");
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
	
	the_controller.switchVisAllOff();
	ok(false, "Write this test later...");
	
	the_controller.switchVisAllOn();
	ok(false, "Write this test later...");
	
	the_controller.switchVisAllOff();
	ok(false, "Write this test later...");
});
