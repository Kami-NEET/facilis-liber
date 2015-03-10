function coreLib() {
	/*
	 * Object Original Values
	 */
	this.osType = Ti.Platform.osname;
	this.properties = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'data', 'properties.json').read());

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
	 * Reads from the data folder JSON text files and returns them as objects
	 */
	coreLib.prototype.readData = function(filename){
		var dataObjects = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'data', filename+'.json');
		dataObjects = dataObjects.read();
		dataObjects = JSON.parse(dataObjects);
		return dataObjects;
	};

	/*
	 * Function that starts up the Application
	 */
	coreLib.prototype.ini = function() {
		Ti.API.info('Ini - START');
		var mainWin = Ti.UI.createWindow();
		var mainView = require(Ti.Filesystem.resourcesDirectory + 'ui/' + 'default' + '/' + this.osType + '/main');
		mainView = new mainView(mainWin);
		mainWin.mainView = mainView;
		mainWin.add(mainView);
		mainWin.open();
		Ti.API.info('Ini - END');
	};

	/*
	 * Adds a View (piece or not) to a View
	 */
	coreLib.prototype.addView = function(mainWin, parentView, childName, piece, fade, vars) {
		if(vars == undefined){
			var vars = null;
		}
		if (piece) {
			var path = Ti.Filesystem.resourcesDirectory + 'ui/default/' + this.osType + '/piece/' + childName;
		} else {
			var path = Ti.Filesystem.resourcesDirectory + 'ui/default/' + this.osType + '/' + childName;
		}
		var childView = require(path);
		Ti.API.info('Adding View with Name "' + childName + '" From -> ' + path);
		childView = new childView(mainWin, vars);
		childView.parentView = parentView;
		parentView[childName] = childView;
		if (fade === true) {
			childView.opacity = 0;
		}
		parentView.add(childView);
		if (fade === true) {
			childView.animate({
				opacity : 1,
				duration : 1000
			});
			Ti.API.info('Animating View with Name "' + childName + '" after adding ');
		}
	};

	/*
	 * Removes a View from a parent View
	 */
	coreLib.prototype.removeView = function(parentView, childName, fade) {
		if (fade === true) {
			parentView[childName].animate({
				opacity : 0,
				duration : 1000
			}, function() {
				parentView.remove(parentView[childName]);
				parentView[childName] = null;
				Ti.API.info('View with Name "' + childName + '" removed after animation ');
			});
		} else {
			parentView.remove(parentView[childName]);
			parentView[childName] = null;
			Ti.API.info('View with Name "' + childName + '" removed ');
		}
	};

	/*
	 * Closes a Window and opens other instead
	 */
	coreLib.prototype.tradeWin = function(currentWin, tmpl, param, customBack) {
		Ti.API.info('TradeWin('+tmpl+') - START');
		var mainWin = Ti.UI.createWindow(param);
		if (this.osType == 'android') {
			mainWin.modal = true;
			if (disableBack === true) {
				Ti.API.info('Custom Back button event for "' + tmpl + '" added ');
				mainWin.addEventListener('android:back', function() {
					//void
				});
			}
		}
		var path = Ti.Filesystem.resourcesDirectory + 'ui/default/' + this.osType + '/' + tmpl;
		var mainView = require(path);
		mainView = new mainView(mainWin);
		mainWin.mainView = mainView;
		mainWin.add(mainView);
		currentWin.close();
		mainWin.open();
		Ti.API.info('TradeWin('+tmpl+') - END');
	};
};

module.exports = coreLib;
