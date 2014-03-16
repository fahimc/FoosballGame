var Element=(function(){
	
	function Element(element){
		this._construct(element);
	};
	

	ClassUtil.extend(Element,EventDispatcher);
	ClassUtil.implement(Element,IElement);
	
	
	var prototype=
	{
		_element:null,
		_construct:function(element){
			this._element = element;
		},
		getElement:function(){
			return this._element?this._element:this._element=document.createElement("DIV");
		},
		getY : function(node) {
			return Number(node?node:this.getElement().style.top.replace("px", ""));
		},
		getX : function(node) {
			return Number(node?node:this.getElement().style.left.replace("px", ""));
		}
	};
	
	ClassUtil.proto(Element,prototype);
	
	return Element;
})();
