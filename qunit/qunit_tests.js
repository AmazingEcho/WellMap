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
	the_controller.the_map.layers[0].points[0].lat === 55.0 &&
	the_controller.the_map.layers[0].points[0].long === -115.0, "Point created");
});
