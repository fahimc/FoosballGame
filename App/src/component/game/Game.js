var Game = (function(){
	
	function Game(){};
	
	ClassUtil.extend(Game,Element);
	
	var prototype=
	{
		_background:null,
		_table:null,
		build:function(){
			this._background  =new Background();
			this._background.build();
			this._background.setStyle();
			this._background.arrange();
			
			this._table  =new Table();
			this._table.build();
			this._table.setStyle();
			this._table.arrange();
			
			this.getElement().appendChild(this._background.getElement());
			this.getElement().appendChild(this._table.getElement());
		},
		setStyle:function(){
			this.getElement().className = "Game";
		}
	};
	
	ClassUtil.proto(Game,prototype);
	
	return Game;
	
})();
