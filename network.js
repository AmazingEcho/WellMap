// networkDB

pingPHP = function(dbSettings){
	
	var result = 0;
	
	jQuery.ajax({
		type: "POST",
		url: 'http://www.tconx.net/wellMapServ/test.php',
		dataType: 'json',
		data: {functionname: 'ping', arguments: [4, 8]},
		success: function (obj, textstatus){

			if(!('error' in obj)){
				yourVariable = obj.result;
				}
			else{
				console.log(obj.error);
			}
		}
	});
	
	return result;
}