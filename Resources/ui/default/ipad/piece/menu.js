function menuPiece(mainWin, vars) {
	var menuObjects = Ti.App.CORE.readData('menu');
	var piece = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal'
	});
	for (var i in menuObjects) {
		var menuEntry = Ti.UI.createLabel({
			textid : menuObjects[i].text,
			color : vars.color,
			action : menuObjects[i].action,
			task : menuObjects[i].task,
			params : menuObjects[i].params
		});
		piece.add(menuEntry);
		if (i < menuObjects.length-1) {
			var separator = Ti.UI.createLabel({
				text : '|',
				color : vars.color
			});
			piece.add(separator);
		}
	}
	piece.addEventListener('click', function(e) {
		var extra = e.source.params;
		extra.object = mainWin;
		Ti.App.UTILS.processClick(e.source.action, e.source.task, extra);
	});

	return piece;
};
module.exports = menuPiece; 