function restLib() {

	restLib.prototype.request = function(task, content, callback) {
		Ti.API.info('Starting HTTPClient XHR (' + task + ')');
		var xhr = Titanium.Network.createHTTPClient();
		xhr.open("POST", Ti.App.CORE.getVar('properties').serverDNS+'?task='+task);
		if(content){
			xhr.send(JSON.stringify(content));
		}else{
			xhr.send();
		}
		xhr.onreadystatechange = function() {
			if (this.readyState == 4) {
				Ti.API.info('Ending HTTPClient XHR (' + task + ') - Calling callback function');
				callback(this.responseText);
			}
		};
	};
	
};

module.exports = restLib; 