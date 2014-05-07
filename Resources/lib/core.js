function coreLib() {
	/*
	 * Object Original Values
	 */
	this.osType = Ti.Platform.osname;
	this.properties = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'data', 'properties.json').read());
	this.mainWin = null;

	/*
	 * Return Current Value on a CORE Object
	 */
	coreLib.prototype.getVar = function(key) {
		return this[key];
	};

	/*
	 * Set a New Value on a CORE Object
	 */
	coreLib.prototype.setVar = function(key, value) {
		this[key] = value;
	};

	/*
	 * Function that starts up the Application
	 */
	coreLib.prototype.ini = function() {
		Ti.API.info('Ini - START');
		var mainWin = Ti.UI.createWindow();
		if (Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'ui/' + this.properties.ui + '/' + this.osType + '/main.js').exists()) {
			var mainView = require(Ti.Filesystem.resourcesDirectory + 'ui/' + this.properties.ui + '/' + this.osType + '/main');
		} else {
			var mainView = require(Ti.Filesystem.resourcesDirectory + 'ui/' + 'default' + '/' + this.osType + '/main');
		}
		mainView = new mainView();
		mainWin.add(mainView);
		mainWin.mainView = mainView;
		this.mainWin = mainWin;
		mainWin.open();
		Ti.API.info('Ini - END');
	};

	/*
	 * Adds a View (piece or not) to a View
	 */
	coreLib.prototype.addView = function(parentView, childName, piece) {
		if (piece) {
			var path = Ti.Filesystem.resourcesDirectory + 'ui/' + this.properties.ui + '/' + this.osType + '/piece/' + childName;
		} else {
			var path = Ti.Filesystem.resourcesDirectory + 'ui/' + this.properties.ui + '/' + this.osType + '/' + childName;
		}
		if (Ti.Filesystem.getFile(path + '.js').exists()) {
			Ti.API.warn('Overwrited / UI: ' + this.properties.ui);
			var childView = require(path);
		} else {
			if (piece) {
				var path = Ti.Filesystem.resourcesDirectory + 'ui/default/' + this.osType + '/piece/' + childName;
			} else {
				var path = Ti.Filesystem.resourcesDirectory + 'ui/default/' + this.osType + '/' + childName;
			}
			var childView = require(path);
		}
		Ti.API.info('Adding View with Name "' + childName + '" From -> ' + path);
		childView = new childView();
		parentView[childName] = childView;
		parentView.add(childView);
	};
};

module.exports = coreLib;
