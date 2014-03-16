var Ball = (function() {

	function Ball() {
	};

	ClassUtil.extend(Ball, Element);

	Ball.CONST = {
		GRAVITY : new Vector(0, 0),
		FRICTION : 0.35
	};

	var prototype = {
		velocity : new Vector(-1, -5),
		position : new Point(500, 200),
		table : null,
		interval : null,
		previousX : 0,
		previousY : 0,
		build : function() {

		},
		setStyle : function() {
			this.getElement().className = "Ball";
		},
		start : function() {
			this.interval = setInterval(this.move.bind(this), 25);
		},
		move : function() {
			// apply gravity
			this.velocity = this.velocity.add(Ball.CONST.GRAVITY.scale(0.1));

			// collision detection against world
			if (this.position.y > this.table.getElement().clientHeight) {
				this.velocity.x2 = -this.velocity.x2 * Ball.CONST.FRICTION;
				this.position.y = this.table.getElement().clientHeight;
			} else if (this.position.y < 0) {
				this.velocity.x2 = -this.velocity.x2 * Ball.CONST.FRICTION;
				this.position.y = 0;
			}
			if (this.position.x < 0) {
				this.velocity.x1 = -this.velocity.x1 * Ball.CONST.FRICTION;
				this.position.x = 0;
			} else {
				if (this.position.x > this.table.getElement().clientWidth) {
					this.velocity.x1 = -this.velocity.x1 * Ball.CONST.FRICTION;
					this.position.x = this.table.getElement().clientWidth;
				}
			}

			// update position

			this.previousX = this.position.x;
			this.previousY = this.position.y;
			this.position.x += this.velocity.x1;
			this.position.y += this.velocity.x2;

			var hitElement = this.table.hitTest(this.getElement());

			if (hitElement) {
				this.velocity = this.velocity.add(Ball.CONST.GRAVITY.scale(0.1));
				var obstacle = hitElement.getElement().getBoundingClientRect();
				var ball = this.getElement().getBoundingClientRect();

				var x = (ball.left-obstacle.left) * 0.5;
				var y = (ball.top-obstacle.top) * 0.5;
				var ballX = this.getElement().offsetLeft;
				var ballY = this.getElement().offsetTop;
				var bw = this.getElement().clientWidth;
				var bh = this.getElement().clientHeight;
				var playerX = hitElement.getElement().parentNode.parentNode.offsetLeft;
				var playerY = hitElement.getElement().offsetTop;
				var ph = hitElement.getElement().clientHeight;
				var pw = hitElement.getElement().clientWidth;
				
				var direction = "";
				
				//if top
				if ((playerY > ballY) && (playerY < ballY +bh)) {
					direction="top";
					this.velocity.x2 = -this.velocity.x2 * Ball.CONST.FRICTION;
					this.position.y=playerY-bh;
					//if bottom
				}else if ((ballY > playerY) && (ballY < playerY +ph)) {
					direction="bottom";
					this.velocity.x2 = -this.velocity.x2 * Ball.CONST.FRICTION;
					this.position.y=playerY+ph;
				}else if ((playerX > ballX) && (playerX < ballX +bw)) {
					direction="back";
					this.velocity.x1 = -this.velocity.x1 * Ball.CONST.FRICTION;
					this.position.x=playerX-bw;
				}else if ((ballX > playerX) && (ballX < playerX +pw)) {
					direction="front";
					this.velocity.x1 = -this.velocity.x1 * Ball.CONST.FRICTION;
					this.position.x=playerX+pw;
				}

				if (!hitElement.state && hitElement.color == "red" && ball.top + ball.height >= obstacle.top && ball.top <= obstacle.top + (obstacle.height * 0.5) && ball.left > obstacle.left) {

					//this.velocity.x1 = (-(this.velocity.x1) * Ball.CONST.FRICTION);
					//this.velocity.x2 = (-this.velocity.x2 * Ball.CONST.FRICTION);

				} else if (hitElement.state == FoosballPlayer.STATE.KICKING && direction=="front") {
					this.velocity = this.velocity.add(new Vector(x, y));
				} else {
					//	this.velocity.x1 =  x *Ball.CONST.FRICTION;
					//this.velocity.x2 = y * Ball.CONST.FRICTION;
					//this.velocity.x1 = -this.velocity.x1 * Ball.CONST.FRICTION;
					//this.velocity.x2 = -this.velocity.x2 * Ball.CONST.FRICTION;
				}

			} else {

			}

			this.getElement().style.left = this.position.x + "px";
			this.getElement().style.top = this.position.y + "px";
			// // render
			// this.output.css({
			// left : this.position.x,
			// top : this.position.y
			// });
		},
		setTable : function(table) {
			this.table = table;
		}
	};
	ClassUtil.proto(Ball, prototype);

	return Ball;

})();
