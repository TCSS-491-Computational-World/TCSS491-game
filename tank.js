function Tank(game) {
    //Barrell Code
    //________________________________________________________________________________________________________
    this.BB = AM.getAsset("./img/tank_red2Barrell.png");
    this.bullet = AM.getAsset("./img/bullet_red_2.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    
    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_red.png"),  0, 0, 50, 50, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_red.png"), 50,0, 50,50,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_red.png"),100,0,50,50,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_red.png"),150,0,50, 50,1,1,true, false);

    this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.lastMove = "none";
    this.hero = false;
    this.speed = 10;
    this.ctx = game.ctx;
    this.x = 300;
    this.y = 300;
    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.maxHealth = 200;
    this.currentHealth = 200;
    
    
    Entity.call(this, game, 300, 300);
}

Tank.prototype = new Entity();
Tank.prototype.constructor = Tank;

Tank.prototype.update = function() {
    var bool = true;
    //Barrell Code
    //____________________________________________________________________________________________________
    if (this.game.mouse) {
        console.log("fhdfhfdh");
        var dy = this.y - this.cursorY;
        var dx = this.x - this.cursorX;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI;
        this.cursorX = this.game.mouse.x;
        this.cursorY = this.game.mouse.y;
        this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
        this.BB = this.rotateAndCache(
            AM.getAsset("./img/tank_red2Barrell.png"),
            theta
        );
        //console.log(this.spritesheet);
    } else {

        var dy = this.y - this.cursorY;
        var dx = this.x - this.cursorX;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI;
        //this.cursorX = this.game.mouse.x;
        //this.cursorY = this.game.mouse.y;
        this.BB = this.rotateAndCache(
            AM.getAsset("./img/tank_red2Barrell.png"),
            theta
        );
    }
    //_____________________________________________________________________________________________________

    if (this.game.click) {
        this.shooting = true;
    }
    if (this.shooting) {
        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta);
        this.game.addEntity(bulletShot);
        this.shooting = false;
        //this.bullet.fire = true;
    }

    //if(this.boundingbox.collide())

    if (this.cleanShot) {
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.cleanShot = false;
        //this.bullet.fire = true;
    }

    if (this.game.keyboard === 38 || this.game.keyboard === 87) {
        //moving up
        this.up = true;
        this.down = false;
        this.right = false;
        this.left = false;
    }
    if (this.up === true && this.y >= 2) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
    }
    if (this.game.keyboard === 39 || this.game.keyboard === 68) {
        //moving right

        this.up = false;
        this.down = false;
        this.right = true;
        this.left = false;
    }
    if (this.right === true && this.x <= 2498) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }
    if (this.game.keyboard === 40 || this.game.keyboard === 83) {
        //moving down
        this.up = false;
        this.down = true;
        this.right = false;
        this.left = false;
    }
    if (this.down === true && this.y <= 2498) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
    }
    if (this.game.keyboard === 37 || this.game.keyboard === 65) {
        //moving left
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = true;
    }
    if (this.left === true && this.x >= 2 ) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }

    Entity.prototype.update.call(this);
};

Tank.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5, this.y-5, 40, 4, this.currentHealth, this.maxHealth);
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.up) {
        this.moveUpAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.up = false;
        this.lastMove = "up";
    }
    if (this.down) {
        this.moveDownAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.down = false;
        this.lastMove = "down";
    }
    if (this.right) {
        this.moveRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.right = false;
        this.lastMove = "right";
    }
    if (this.left) {
        this.moveLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.left = false;
        this.lastMove = "left";
    }
    if (!this.left && !this.right && !this.up && !this.down) {
        //if tank isnt moving then stay at most recent direction.
        if (this.lastMove === "left")
            this.moveLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "right")
            this.moveRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "down")
            this.moveDownAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "up")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "none")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
    }

    //Barrell Code
    this.ctx.drawImage(this.BB, this.x, this.y);


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();


    Entity.prototype.draw.call(this);
};