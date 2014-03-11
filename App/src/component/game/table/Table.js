var Table=(function(){
	
	function Table(){};
	
	ClassUtil.extend(Table,Element);	
	
	var prototype=
	{
		rod:{},
		build:function(){
			this.buildAllRods();
		},
		buildAllRods:function(){
			this.rod.redGoalie = this.buildRod(1,"red",true);
			this.rod.redDefenders = this.buildRod(2,"red",true);
			this.rod.redMidfielders = this.buildRod(5,"red",true);
			this.rod.redStrikers = this.buildRod(3,"red",true);
			
			this.rod.buleGoalie = this.buildRod(1,"blue");
			this.rod.buleDefenders = this.buildRod(2,"blue");
			this.rod.buleMidfielders = this.buildRod(5,"blue");
			this.rod.buleStrikers = this.buildRod(3,"blue");
		},
		buildRod:function(type,color,isPlayer){
			var rod = new Rod();
			rod.type=type;
			rod.isPlayer=isPlayer?isPlayer:false;
			rod.color=color;
			rod.build();
			rod.setStyle();
			
			this.getElement().appendChild(rod.getElement());
			rod.arrange();
			
			return rod;
		},
		setStyle:function(){
			this.getElement().className = "Table";
		},
		arrange:function(){
			this.rod.redGoalie.getElement().style.left="11%";
			this.rod.redDefenders.getElement().style.left="22%";
			
			this.rod.buleStrikers.getElement().style.left="33%";
			
			this.rod.redMidfielders.getElement().style.left="44%";
			
			this.rod.buleMidfielders.getElement().style.left="55%";
			
			this.rod.redStrikers.getElement().style.left="66%";
			
			this.rod.buleDefenders.getElement().style.left="77%";
			
			this.rod.buleGoalie.getElement().style.left="88%";
		}
	};
	
	ClassUtil.proto(Table,prototype);
	
	return Table;
	
})();
