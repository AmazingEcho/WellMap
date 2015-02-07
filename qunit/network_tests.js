/*
WellMap
Network Tests
Author: Thomas Condon

Tests for the network features...
*/

/*
module('Dummy Tests', {
	setup: function () {
	},
	teardown: function () {
	}
});

test( "Dummy Test", function() {
  ok( 1 == "1", "Example Pass!" );
  ok( 1 === "1", "Example Fail!" );
});
*/

module('Network Tests: PHP', {
	setup: function () {
	},
	teardown: function () {
	}
});

test("Ping the Server PHP", function(){
	var the_controller = new controller();
	the_controller.newMap();
	
	the_controller.addDatabaseConnectionPHP({});
	
	var pingValue = 3;
	pingValue = pingPHP({});
	
	ok(pingValue == 12, "pingValue is " + pingValue + ". Should be 12.");
	
});

test("Get Test Wells PHP", function(){
	var the_controller = new controller();
	the_controller.newMap();
	
	the_controller.addDatabaseConnectionPHP({});
	
	getWellsPHP({}, 1);
	getWellsPHP({}, 2);
	
	ok(false, "QUnit doesn't like AJAX...");
	
});

module('Network Tests: C#', {
	setup: function () {
	},
	teardown: function () {
	}
});
