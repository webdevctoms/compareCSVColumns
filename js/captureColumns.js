function CaptureColumns(){
	
}

CaptureColumns.prototype.getOptions = function(headerRow) {
	let columnOptions = [];
	for(let i = 0; i < headerRow.length; i++){
		let option = headerRow[i].replace(',','');
		let optionsString = '<option value="' + option + '">' + option + '</option>';
		columnOptions.push(optionsString);
	}
	return columnOptions;
};