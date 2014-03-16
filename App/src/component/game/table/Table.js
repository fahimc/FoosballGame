var Table = (function() {

	function Table() {
	};

	ClassUtil.extend(Table, Element);

	var prototype = {
		ball : null,
		rod : {},
		currentRod : null,
		build : function() {
			this.buildAllRods();

			this.ball = new Ball();
			this.ball.setTable(this);
			this.ball.build();
			this.ball.setStyle();
			this.ball.arrange();
			this.getElement().appendChild(this.ball.getElement());

			document.addEventListener("mousemove", this.onMouseMove.bind(this));
			document.addEventListener("mousedown", this.onMouseDown.bind(this));
			document.addEventListener("mouseup", this.onMouseUp.bind(this));
		},
		buildAllRods : function() {
			this.rod.redGoalie = this.buildRod(1, "red", true);
			this.rod.redDefenders = this.buildRod(2, "red", true);
			this.rod.redMidfielders = this.buildRod(5, "red", true);
			this.rod.redStrikers = this.buildRod(3, "red", true);

			this.rod.buleGoalie = this.buildRod(1, "blue");
			this.rod.buleDefenders = this.buildRod(2, "blue");
			this.rod.buleMidfielders = this.buildRod(5, "blue");
			this.rod.buleStrikers = this.buildRod(3, "blue");
		},
		buildRod : function(type, color, isPlayer) {
			var rod = new Rod();
			rod.type = type;
			rod.isPlayer = isPlayer ? isPlayer : false;
			rod.color = color;
			rod.build();
			rod.setStyle();

			this.getElement().appendChild(rod.getElement());
			rod.arrange();

			return rod;
		},
		setStyle : function() {
			this.getElement().className = "Table";
		},
		arrange : function() {

			if (this.getElement().parentNode) {
				this.getElement().style.width = (((this.getElement().parentNode.clientWidth * 0.8) / 1196) * 1196) + "px";
				this.getElement().style.height = (((this.getElement().parentNode.clientHeight * 0.8) / 690) * 690) + "px";
			}
			this.rod.redGoalie.getElement().style.left = "11.11%";
			this.rod.redDefenders.getElement().style.left = "22.22%";

			this.rod.buleStrikers.getElement().style.left = "33.33%";

			this.rod.redMidfielders.getElement().style.left = "44.44%";

			this.rod.buleMidfielders.getElement().style.left = "55.55%";

			this.rod.redStrikers.getElement().style.left = "66.66%";

			this.rod.buleDefenders.getElement().style.left = "77.77%";

			this.rod.buleGoalie.getElement().style.left = "88.88%";
		},
		start : function() {
			this.ball.start();
		},
		hitTest : function(elem) {
			for (var name in this.rod) {
				var hit = this.rod[name].hitTest(elem);
				if (hit)
					return hit;
			}
			return null;
		},
		onMouseMove : function(event) {
			var y = event.clientY;
			var x = event.clientX;

			var perc = x / this.getElement().clientWidth;

			
			if (perc < 0.3) {
				this.currentRod = this.rod.redGoalie;
			} else if (perc < 0.41) {
				this.currentRod = this.rod.redDefenders;
			} else if (perc < 0.63) {
				this.currentRod = this.rod.redMidfielders;
			}else{
				this.currentRod = this.rod.redStrikers;
			}

			this.currentRod.onMouseMove(event);
		},
		onMouseDown : function(event) {
			this.currentRod.onMouseDown(event);
		},
		onMouseUp : function(event) {
			this.currentRod.onMouseUp(event);
		},
		resize : function() {
			this.arrange();
		}
	};

	ClassUtil.proto(Table, prototype);

	return Table;

})();
