function Enemy(game) {

    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.snowballAnimation = new Animation(AM.getAsset("./img/snowball_01.png"),0 , 0, 512, 386, .05, 6, true, true);

    this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"), 0, 0, 73, 60, 1, 1, true, false
    ); //quick note{:}
    this.moveUpRobotAnimation = new Animation(
        AM.getAsset("./img/robot.png"),
        73,
        0,
        73,
        60,
        1,
        1,
        true,
        false
    );
    this.moveRightRobotAnimation = new Animation(
        AM.getAsset("./img/robot.png"),
        146,
        0,
        73,
        60,
        1,
        1,
        true,
        false
    );
    this.moveLeftRobotAnimation = new Animation(
        AM.getAsset("./img/robot.png"),
        219,
        0,
        73,
        60,
        1,
        1,
        true,
        false
    );
    this.ctx = game.ctx;
    this.counter = 0;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.lastMove = "none";
    this.hero = false;
    this.speed = 2;
    this.random = this.random = Math.floor(Math.random() * 100);
    // this.canvasWidth = game.ctx.width;
    // this.canvasHeight = game.ctx.height;
    this.x = 100;
    this.y = 200;
    this.projectileX = 1000;
    this.projectileY = 600;
    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpRobotAnimation.frameWidth, this.moveUpRobotAnimation.frameHeight);
    this.maxHealth = 400;
    this.currentHealth = 200;
    Entity.call(this, game, 100, 200);
}

Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    // this.boundingbox.width = this.moveUpRobotAnimation.frameWidth;
    // this.boundingbox.height = this.moveUpRobotAnimation.frameHeight;

    if (this.cleanShot) {
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.cleanShot = false;
        
        if(this.currentHealth === 0){
            this.removeFromWorld = true;
        } else {
            this.currentHealth -= 10;
        }
        //this.bullet.fire = true;
    }

    if(this.x >= 999){
        //this.lastMove = "left";
        this.random = 76;
    }
    if(this.x <= 1){
        //this.lastMove = "right";
        this.random = 26;
    }
    if(this.y <= 1){
        //this.lastMove = "down";
        this.random = 51;
    }
    if(this.y >= 799){
        //this.lastMove = "up";
        this.random = 1;
    }

    if (this.random <= 25) {
        //moving up
        this.up = true;
        this.down = false;
        this.right = false;
        this.left = false;
        
    }
    if (this.up === true) {
        
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
    }
    if (this.random <= 50 && this.random > 25) {
        //moving right

        this.up = false;
        this.down = false;
        this.right = true;
        this.left = false;
    }
    if (this.right === true) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }
    if (this.random <= 75 && this.random > 50) {
        //moving down
        
        this.up = false;
        this.down = true;
        this.right = false;
        this.left = false;
    }
    if (this.down === true) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
    }
    if (this.random <= 100 && this.random > 75) {
        //moving left
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = true;
    }
    if (this.left === true) {

        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }
    
    if(this.projectileX > 0){
        this.projectileX -= 3;
    } else {
        this.projectileX = 1000;
    }
    Entity.prototype.update.call(this);
};

Enemy.prototype.draw = function () { //CHANGE BACK TO THIS.CTX, DEFINE CTX FOR TANK GAME
    drawHealthBar(this.ctx, this.x+12, this.y-5, 40, 5, this.currentHealth, this.maxHealth) // 我要改掉， 不好，不好
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.up) {
        this.moveUpRobotAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.up = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100);
        }
        
        this.lastMove = "up";
    }
    if (this.down) {
        this.moveDownRobotAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.down = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100)
        }
        this.lastMove = "down";
    }
    if (this.right) {
        this.moveRightRobotAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.right = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100)
        }
        this.lastMove = "right";
    }
    if (this.left) {
        this.moveLeftRobotAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.left = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100)
        }
        this.lastMove = "left";
    }
    if (!this.left && !this.right && !this.up && !this.down) {
        //if tank isnt moving then stay at most recent direction.
        if (this.lastMove === "left")
            this.moveLeftRobotAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "right")
            this.moveRightRobotAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "down")
            this.moveDownRobotAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "up")
            this.moveUpRobotAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "none")
            this.moveUpRobotAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
    }
    this.snowballAnimation.drawFrame(this.game.clockTick, this.ctx, this.projectileX, this.projectileY, .1);

    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();

    Entity.prototype.draw.call(this);
};