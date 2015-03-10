function mainUI(mainWin) {
	var mainView = Ti.UI.createView();
	Ti.App.CORE.addView(mainWin, mainView, 'menu', true, false,{"color":"white"});
	return mainView;
};

module.exports = mainUI;