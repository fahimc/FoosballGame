var Element=(function(){
	
	function Element(element){
		this._element = element?element:document.createElement("DIV");
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
