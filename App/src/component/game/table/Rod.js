var Rod = (function() {

	function Rod() {
		this.players = [];
	};

	ClassUtil.extend(Rod, Element);

	var prototype = {
		players : [],
		type : 0,
		color : "red",
		isPlayer : false,
		build : function() {
			for (var a = 0; a < this.type; a++) {
				this.buildPlayer(a);
			}
			if(this.isPlayer)this.setListeners();
		},
		setListeners : function() {			
			this.getElement().addEventListener("mousemove", this.onMouseMove.bind(this));
			this.getElement().addEventListener("mouseover", this.onMouseOver.bind(this));
			this.getElement().addEventListener("mouseout", this.onMouseOut.bind(this));
			this.getElement().addEventListener("mousedown", this.onMouseDown.bind(this));
			this.getElement().addEventListener("mouseup", this.onMouseUp.bind(this));
		},
		buildPlayer : function(index) {
			index++;
			var name = "";
			switch(this.type) {
				case 1:
					name = "goalie";
					break;
				case 2:
					name = "defender" + index;
					break;
				case 5:
					name = "midfielder" + index;
					break;
				case 3:
					name = "striker" + index;
					break;
			}

			var player = new FoosballPlayer();
			player.color = this.color;
			player.build();
			player.setStyle();
			player.arrange();
			player.getElement().classList.add(name);
			this.getElement().appendChild(player.getElement());

			this.players.push(player);
		},
		setStyle : function() {
			this.getElement().className = "Rod";
		},
		arrange : function() {
			// var ph = this.getElement().parentNode.clientHeight * 0.2;
			// this.getElement().style.height = "calc(100% + "+ph+"px)";
		},
		onMouseOver:function(event){
			this.startY=event.clientY;
		},
		onMouseMove : function(event) {
			
			var y = this.getY();
			var ph = this.getElement().parentNode.clientHeight * 0.1;
			var pos =  (y-(this.startY-event.clientY));
			if(pos>0)pos=0;
			if(pos<-ph)pos=-ph;
			this.getElement().style.top =pos + "px";
			this.startY=event.clientY;
		},
		onMouseDown:function(){
			for(var a=0;a<this.players.length;a++){
				this.players[a].kick();
			}
		},
		onMouseUp:function(){
			for(var a=0;a<this.players.length;a++){
				this.players[a].stopKick();
			}
		},
		onMouseOut:function(){
			this.onMouseUp();
		},
		getY : function() {
			return Number(this.getElement().style.top.replace("px",""));
		}
	};

	ClassUtil.proto(Rod, prototype);

	return Rod;

})();
