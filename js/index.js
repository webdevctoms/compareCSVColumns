function App(dropZoneID,downloadID,selectDiv){
	this.csvDropZone = document.getElementById(dropZoneID);
	this.downloadLink = document.getElementById(downloadID);
	this.selectDiv = document.getElementById(selectDiv);

	this.options1 = [];
	this.options2 = [];
	this.commaSplitData;
	this.captureCSV = new CaptureCSV();
	this.captureColumns = new CaptureColumns();
}

App.prototype.initApp = function() {
	this.csvDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.fileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.csvDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);

};

App.prototype.createBlob = function(arr){
	let lineArray = [];

	arr.forEach(function(rowArr,index){
		let row = rowArr.join("");
		lineArray.push(row);	
	});
	let csvContent = lineArray.join("\n");
	let csvData = new Blob([csvContent],{type:'text/csv'});
	let csvURL = URL.createObjectURL(csvData);
	return csvURL;
};

App.prototype.createDownload = function(csvData){
	this.downloadLink.classList.remove("hide");
	this.downloadLink.setAttribute("href","");
	this.downloadLink.setAttribute("href",csvData);
	this.downloadLink.setAttribute("download", "new_data.csv");
};

App.prototype.updateSelect = function(selectNode,options){
	for(let i = 0;i < options.length; i++){
		
	}
};

App.prototype.fileDropped = function(event){
	let csvFile = event.dataTransfer.items[0].getAsFile();
	this.captureCSV.readFile(csvFile)

	.then(commaSplitData => {
		this.commaSplitData = commaSplitData;
		console.log(this.commaSplitData);
		let options = this.captureColumns.getOptions(this.commaSplitData[0])
		console.log(options);
		let selectNode = document.createElement("SELECT");
		let csvData = this.createBlob(this.commaSplitData);
		this.createDownload(csvData);
	})

	.catch(err => {
		console.log("error reading file", err);
	});
	//console.log(this.commaSplitData);
};

let app = new App("drop_zone","downloadLink","selectDiv");
window.onload = app.initApp();