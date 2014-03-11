var Background=(function(){
	
	function Background(){};
	
	ClassUtil.extend(Background,Element);
	
	var prototype=
	{
		build:function(){
			
		},
		setStyle:function(){
			this.getElement().className = "Background";
		}
	};
	
	ClassUtil.proto(Background,prototype);
	
	return Background;
	
})();
