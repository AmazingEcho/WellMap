$('document').ready(function(){
	if(window.File && window.FileReader && window.FileList && window.Blob){
		console.log("FileReader is supported!");
	}
	else {
		alert('The File APIs are not fully supported in this browser.  Saving and Loading will not function...');
	}

	convertXLS = function(){

		console.log("Check");
		
		var fileInput = document.getElementById("loadXLSField");		
		var file = fileInput.files[0];
		
		var reader = new FileReader();
		var name = file.name;
					
		var output = "";
		
		reader.onload = function(e) {
			var data = e.target.result;

			/* if binary string, read with type 'binary' */
			var workbook = XLS.read(data, {type: 'binary'});
			//var workbook = XLS.utils.sheet_to_json(data, {raw:true});
			//console.log(workbook);
			
			/* DO SOMETHING WITH workbook HERE */
			output = JSON.stringify(workbook);
		
			// Ew, no!  Don't want this...
			//console.log(output);
			
			var JSON_string = to_json(workbook);
			console.log(JSON.stringify(JSON_string, 2, 2));
			/*
			var sheet_name_list = workbook.SheetNames;
			sheet_name_list.forEach(function(y) {
				var worksheet = workbook.Sheets[y];
				for (z in worksheet) {
					if(z[0] === '!') continue;
					console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
				}
			});
			*/
		};
		
		reader.readAsBinaryString(file);
		
	}
	
	function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if(roa.length > 0){
				result[sheetName] = roa;
			}
		});
	return result;
	}
});