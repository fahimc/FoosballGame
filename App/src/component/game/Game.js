var Game = (function(){
	
	function Game(){};
	
	
	Game.prototype=
	{
		_background:null,
		_table:null,
		init:function(){
			this._background  =new Background();
			this._table  =new Table();
		}
	};
	
	return Game;
	
})();
