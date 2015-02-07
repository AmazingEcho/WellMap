// networkDB

var pingPHP = function(dbSettings){
	
	var result = 0;
	var done = false;
	
	$.ajax({
		type: "POST",
		url: "http://www.tconx.net/wellMapServ/test.php",
		dataType: 'json',
		data:  {'q': 4,'z':8},
		success: function(output){
			console.log(output);
			result = output;
		},
		
		error: function(){
		console.log("Opps");
		}
	});
	
	return result;
}

var getWellsPHP = function(dbSettings, index){
	$.ajax({
		type: "POST",
		url: "http://www.tconx.net/wellMapServ/well_create_xml.php?id=" + index,
		dataType: 'xml',
		success: function(output){
			console.log(output);
			console.log("AJAX pull from PHP successful!");
		},
		
		error: function(){
		console.log("Opps");
		}
	});
}
