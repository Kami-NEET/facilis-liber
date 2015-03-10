function utilsLib() {

	utilsLib.prototype.processClick = function(action, task, extra) {
		if ((action != null && task != null) && (action != undefined && task != undefined)) {
			switch(action) {
			case 'blank':
				Ti.App.CORE.tradeWin(extra.object, task, extra.param, extra.customback);
				break;
			case 'self':
				Ti.App.CORE.addView(extra.object, task, extra.piece, extra.fade, extra.vars);
				break;
			}
		}
	};

};

module.exports = utilsLib;
