var GameView=(function(){
	
	function GameView(){
	};
	
	ClassUtil.extend(GameView,View);
	
	var prototype=
	{
		_game:null,
		build:function(){
			this._game = new Game();
			this._game.build();
			this._game.setStyle();
			this._game.arrange();
			this.getElement().appendChild(this._game.getElement());
		},
		setStyle:function(){
			this.getElement().className = "GameView";
		}
	};
	
	ClassUtil.proto(GameView,prototype);
	
	return GameView;
})();
