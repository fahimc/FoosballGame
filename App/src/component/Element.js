var Element=(function(){
	
	function Element(){
		this._element = document.createElement("DIV");
	};
	

	ClassUtil.extend(Element,EventDispatcher);
	ClassUtil.implement(Element,IElement);
	
	
	var prototype=
	{
		getElement:function(){
			return this._element;
		}
	};
	
	ClassUtil.proto(Element,prototype);
	
	return Element;
})();
