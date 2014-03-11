var FoosballPlayer=(function(){
	
	function FoosballPlayer(){};
	
	ClassUtil.extend(FoosballPlayer,Element);	
	
	var prototype=
	{
		color:"",
		build:function(){
			
		},
		setStyle:function(){
			this.getElement().className = "Player";
			this.getElement().classList.add(this.color);
		},
		kick:function(){
			this.getElement().classList.add("kick");
		},
		stopKick:function(){
			this.getElement().classList.remove("kick");
		}
	};
	ClassUtil.proto(FoosballPlayer,prototype);
	
	return FoosballPlayer;
	
})();
