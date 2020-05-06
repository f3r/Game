const GRAVITY = 0.5;

var Obstacle = function (x, y, w, h) {
    this.h = h;                    // Obstacle height
    this.w = w;                    // Obstacle width
    this.x = x;                    // Starting horizontal position
    this.y = y - this.h;                  // Starting vertical position
}

// Game Class - Handles world creation
var Game = function () {
    this.keyLeft = false;
    this.keyRight = false;
    this.keyJump = false;
    this.obstacle; 
    this.player = new Player ();

    this.init = function () {
        loadGround();
    }

    this.loadObstacle = function () {
        this.obstacle = new Obstacle (600, GROUND, 32, 32);
        drawObstacle(this.obstacle);
    }

    this.movePlayer = function (direction) {
        if (direction === "left") this.player.moveLeft();
        if (direction === "right") this.player.moveRight();
        if (direction === "jump") {
            if (!this.player.jumping) {
                this.player.jumping = true;
                this.player.vSpeed = -10;
            }
            this.player.jump();
            if (this.collideVertical()) this.player.land(this.obstacle.y);
            else this.player.land(GROUND);
        }
    }

    this.isObjectInFront = function () {
        return this.obstacle && this.player.x + this.player.w < this.obstacle.x + this.obstacle.w;
    }

    this.isObjectBehind = function () {
        return this.obstacle && this.player.x > this.obstacle.x;
    }

    this.collideLeft = function () {
        return this.player.x < this.obstacle.x + this.obstacle.w &&
               this.player.y < this.obstacle.y + this.obstacle.h &&
               this.player.y + this.player.h > this.obstacle.y;
    }

    this.collideRight = function () {
        return this.player.x + this.player.w > this.obstacle.x &&
               this.player.y < this.obstacle.y + this.obstacle.h &&
               this.player.y + this.player.h > this.obstacle.y;
    }

    this.collideVertical = function () {
        return (this.player.x > this.obstacle.x &&
                this.player.x < this.obstacle.x + this.obstacle.w ||
                this.player.x + this.player.w > this.obstacle.x &&
                this.player.x + this.player.w < this.obstacle.x + this.obstacle.w) &&
                this.player.y + this.player.h > this.obstacle.y; 
    }
}