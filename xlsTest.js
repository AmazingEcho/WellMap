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
			//console.log(workbook);
			
			/* DO SOMETHING WITH workbook HERE */
			output = JSON.stringify(workbook);
		
			console.log(output);
		};
		
		reader.readAsBinaryString(file);
		
	}
	
});