(function() {
	function init() {
		window.addEventListener('load', onLoad);
	}

	function onLoad() {
		Localise.langList=['de-de','ar-eg'];
		Localise.addEventListener('complete', onLocalised);
		Localise.load(DataModel);
	}

	function onLocalised() {
		Localise.removeEventListener('complete', onLocalised);
		bindData();
		start();
	}

	function bindData() {
		DataBinder.bind(DataModel);
	}
	
	function start(){
		var mainModel = new MainModel();
		var viewController = new ViewController();
		viewController.setModel(mainModel);
		viewController.init();
	}
		

	window.onLangChange = function(lang) {
		Localise.load(DataModel, lang, true);

	};
	init();
})();
