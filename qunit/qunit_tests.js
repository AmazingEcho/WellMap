/*
WellMap
QUnit Test Suite
*/

module('Dummy Tests', {
    setup: function () {
    },
    teardown: function () {
    }
});

test( "Dummy Test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
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
	the_controller.newPointLayer("Test Point Layer")
	var testPoint = new Point(55.0, -115.0);
	the_controller.the_map.layers[0].addPoint("Test Point", "Well", testPoint);
	
	ok(
	the_controller.the_map.layers[0].getLat(0) === 55.0 &&
	the_controller.the_map.layers[0].getLong(0) === -115.0, "Point created");
});

test("Path Layer Creation",function(){
	var the_controller = new controller();
	the_controller.newPathLayer("Test Path Layer");
	var testPath = new Array();
	testPath[0] = new Point(55.0, -115.0);
	testPath[1] = new Point(54.0, -114.0);
	testPoint[2] = new Point(55.0, -113.0);
	testPoint[3] = new Point(56.0, -112.0);
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
	, "Point created");
});
