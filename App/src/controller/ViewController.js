var ViewController = (function() {

	function ViewController() {
		this.model = null;
	};

	ClassUtil.extend(ViewController, Controller);

	var prototype = {
		_currentView : null,
		_views : [],
		init : function() {
			var viewName = this.model.getCurrentView();
			var currentView = this.model.getViewByName(viewName);
			this.hideView(currentView);
			
			var view = new GameView();
			this.model.addView('GameView',view);
			this.model.setCurrentView('GameView');
			
			this.showView(view);
		},
		hideView : function(view) {
			if (view) {
				view.hide();
			}
		},
		showView : function(view) {
			if (view) {
				view.build();
				view.setStyle();
				view.arrange();
				document.body.appendChild(view.getElement());
				view.show();
			}
		},
		setModel : function(model) {
			this.model = model;
		}
	};
	
	ClassUtil.proto(ViewController,prototype);
	
	return ViewController;
})();
