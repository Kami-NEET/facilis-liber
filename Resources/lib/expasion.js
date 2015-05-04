/*
 *  Ti.ExpansionFiles Helper Lib by Daniel Galvão
 */

function expasionLib() {

	var expansionFiles = require('ti.expansionfiles');
	var downloadParams = Ti.App.CORE.getVar('expasionFile').serverDNS;
	var callback = null;

	expansionFiles.addEventListener('downloadProgress', function(e) {
		var progress = e.overallProgress / e.overallTotal * 100;
		console.log('downloadProgress: ' + progress + "%");
	});

	expansionFiles.addEventListener('validateAPKStarted', function() {
		console.log('validateAPKStarted');
	});

	expansionFiles.addEventListener('validateAPKFinished', function() {
		console.log('validateAPKFinished');
	});

	expansionFiles.addEventListener('downloaderStateChanged', function(e) {
		console.log('downloaderStateChanged: ' + e.state);
		switch(e.state) {
		case expansionFiles.STATE_COMPLETED:
			alert('Completed');
			var filePaths = expansionFiles.getDownloadedFilePaths();
			alert('main file location: ' + filePaths.mainFile);
			callback();
		}
	});

	expasionLib.prototype.downloadExpansion = function(callbackFunction) {
		callback = callbackFunction;
		expansionFiles.downloadXAPKs(downloadParams);
	};

	expasionLib.prototype.readFile = function(path) {
		expansionFiles.downloadXAPKs(downloadParams);
		var fileObject = expansionFiles.getFileFromMain(path);
		Ti.API.info(fileObject.read());
		return fileObject.read();
	};

	expasionLib.prototype.listFiles = function() {
		files = expansionFiles.listAllFilesInMain();
		files.forEach(function(file) {
			Ti.API.info(file);
		});
	};
};
module.exports = expasionLib;
