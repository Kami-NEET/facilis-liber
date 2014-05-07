function mainUI() {
	var mainView = Ti.UI.createView({
		width : 100,
		height : 100,
		backgroundColor : 'blue'
	});
	
	Ti.App.CORE.addView(mainView, 'label', true);

	return mainView;
};

module.exports = mainUI; 