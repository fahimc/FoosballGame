var FoosballPlayer=(function(){
	
	function FoosballPlayer(){};
	
	ClassUtil.extend(FoosballPlayer,Element);	
	
	
	FoosballPlayer.STATE=
	{
		KICKING:"KICKING",
		LIFTED:"LIFTED"
	};
	
	var prototype=
	{
		state:"",
		color:"",
		build:function(){
			
		},
		setStyle:function(){
			this.getElement().className = "Player";
			this.getElement().classList.add(this.color);
		},
		kick:function(){
			this.state = FoosballPlayer.STATE.KICKING;
			this.getElement().classList.add("kick");
		},
		stopKick:function(){
			this.state="";
			this.getElement().classList.remove("kick");
		}
	};
	ClassUtil.proto(FoosballPlayer,prototype);
	
	return FoosballPlayer;
	
})();
