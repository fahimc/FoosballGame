var Localise = (function() {

	function Localise() {
	};

	var prototype = {
		LANG_PREFIX : "resource/lang/",
		LANG_SUFFIX : "copy.json",
		CSS_SUFFIX : "style.css",
		hasCSS : true,
		_client : null,
		_model : null,
		_cssTag : null,
		_updateBinds:false,
		_cssLoadHandler : null,
		defaultLang:'en-gb',
		langList:[],
		lang : null,
		load : function(model,lang,up) {
			
			this._updateBinds=up;
			this._model = model;
			
			var navLang = String(navigator.language).toLowerCase();
			
			if(!this.hasLang(navLang))navLang = this.defaultLang;
			
			this.lang = lang?lang:navLang;

			var _this = this;

			this._client = new XMLHttpRequest();
			this._client.open('GET', this.LANG_PREFIX + this.lang + "/" + this.LANG_SUFFIX+"?ts="+new Date().getTime());
			this._client.onreadystatechange = function() {
				if (this.readyState == 4)
					_this.onLangComplete(_this._client.responseText);
			};
			this._client.send();
		},
		hasLang:function(lang){
			for(var a=0;a<this.langList.length;a++){
				if(lang==this.langList[a])return true;
			}
			return false;
		},
		onLangComplete : function(data) {
			
			if (data)
				this._model.setData(JSON.parse(data));
			this.loadCSS();
		},
		loadCSS : function() {
			if (!this.hasCSS)
				this.complete();
			if (this._cssTag) 
				document.getElementsByTagName("head")[0].removeChild(this._cssTag);
				
				this._cssTag = document.createElement("link");
				this._cssTag.setAttribute("rel", "stylesheet");
				this._cssTag.setAttribute("type", "text/css");
				var _this = this;
				this._cssLoadHandler = function() {
					_this.onCSSComplete();
				};
				
			document.getElementsByTagName("head")[0].appendChild(this._cssTag);
			this._cssTag.addEventListener('load', this._cssLoadHandler);
			this._cssTag.addEventListener('error', this._cssLoadHandler);
			this._cssTag.setAttribute("href", this.LANG_PREFIX + this.lang + "/" + this.CSS_SUFFIX);
		},
		onCSSComplete : function(data) {
			this._cssTag.removeEventListener('load', this._cssLoadHandler);
			this.complete();
		},
		complete : function() {
			if(this._updateBinds)DataBinder.update();
			this._updateBinds=false;
			this.dispatchEvent('complete');
		},
		
	};
	
	Localise.prototype=new EventDispatcher();
	
	for(name in prototype){
		Localise.prototype[name]=prototype[name];
	}
	
	return new Localise();

})();
