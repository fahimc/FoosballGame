var Rod = (function() {

	function Rod() {
		this.players = [];
	};

	ClassUtil.extend(Rod, Element);

	var prototype = {
		playerHolder : null,
		players : [],
		type : 0,
		color : "red",
		isPlayer : false,
		startY : 0,
		build : function() {
			this.playerHolder=document.createElement("DIV");
			this.getElement().appendChild(this.playerHolder);
			
			for (var a = 0; a < this.type; a++) {
				this.buildPlayer(a);
			}
			if (this.isPlayer)
				this.setListeners();
		},
		setListeners : function() {
			//this.getElement().addEventListener("mousemove", this.onMouseMove.bind(this));
			//this.getElement().addEventListener("mouseover", this.onMouseOver.bind(this));
			//this.getElement().addEventListener("mouseout", this.onMouseOut.bind(this));
			//this.getElement().addEventListener("mousedown", this.onMouseDown.bind(this));
			//this.getElement().addEventListener("mouseup", this.onMouseUp.bind(this));
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
			this.playerHolder.appendChild(player.getElement());

			this.players.push(player);
		},
		setStyle : function() {
			this.getElement().className = "Rod";
			this.playerHolder.className = "holder";
		},
		arrange : function() {
			// var ph = this.getElement().parentNode.clientHeight * 0.2;
			// this.getElement().style.height = "calc(100% + "+ph+"px)";
		},
		onMouseOver : function(event) {
			this.startY = event.clientY;
		},
		onMouseMove : function(event) {

			var y = this.playerHolder.offsetTop;
			var ph = this.getElement().parentNode.clientHeight * 0.1;
			var pos = (y - (this.startY - event.clientY));
			
			if (pos < -this.players[0].getElement().offsetTop)
				pos = -this.players[0].getElement().offsetTop;
				
				
			var last = 	this.getElement().clientHeight - this.players[this.players.length-1].getElement().offsetTop;
			
			if(pos > last-this.players[this.players.length-1].getElement().clientHeight)
			{
				pos =last-this.players[this.players.length-1].getElement().clientHeight;
			}
			//if (pos < -ph)
			//	pos = -ph;
			this.playerHolder.style.top = pos + "px";
			this.startY = event.clientY;
		},
		onMouseDown : function() {
			for (var a = 0; a < this.players.length; a++) {
				this.players[a].kick();
			}
		},
		onMouseUp : function() {
			for (var a = 0; a < this.players.length; a++) {
				this.players[a].stopKick();
			}
		},
		onMouseOut : function() {
			this.onMouseUp();
		},
		hitTest : function(elem) {
				for (var a = 0; a < this.players.length; a++) {
				var is = this.isCollide(this.players[a].getElement(),elem);
				if(is)return this.players[a];
			}
			return null;
		},
		isCollide : function(a, b) {
			
			var rectA = a.getBoundingClientRect();
			var rectB= b.getBoundingClientRect();
	
			if(rectB.left<=rectA.left+a.clientWidth && rectB.left+b.clientWidth >= rectA.left && rectB.top+b.clientHeight>=rectA.top && rectB.top <=rectA.top+a.clientHeight)
			return true;
		return false;
		}
	};

	ClassUtil.proto(Rod, prototype);

	return Rod;

})();
