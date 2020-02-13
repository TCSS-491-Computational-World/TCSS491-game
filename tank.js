function Tank(game) {
    //Barrell Code
    //________________________________________________________________________________________________________
    this.BB = AM.getAsset("./img/tank_red2Barrell.png");
    this.bullet = AM.getAsset("./img/bullet_red_2.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    
    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"),  0, 0, 60, 60, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"), 120,0, 60,60,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_red8D.png"),240,0,60,60,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"),360,0,60, 60,1,1,true, false);

    this.moveDownRightAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"),  60, 0, 60, 60, 1,1,true,false);
    this.moveUpRightAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"), 180,0, 60,60,1,1, true,false);
    this.moveUpLeftAnimation = new Animation(AM.getAsset("./img/tank_red8D.png"),300,0,60,60,1,1,true,false);
    this.moveDownLeftAnimation = new Animation( AM.getAsset("./img/tank_red8D.png"),420,0,60, 60,1,1,true, false);

    this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    //this.up = false;
    //this.down = false;
    //this.left = false;
    //this.right = false;

    //TankState 1 = Down, 2 = DownRight, 3 = Right, 4 = UpRight, 5 = Up, 6 = UpRight, 7 = Left, 8 = DownLeft
    this.TankState = 0;

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


Tank.prototype.update = function() {
    var bool = true;

    //TankState 1 = Down, 2 = DownRight, 3 = Right, 4 = UpRight, 5 = Up, 6 = UpRight, 7 = Left, 8 = DownLeft
    //var TankState = 0;

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
        console.log("fhdfhfdh");
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


    if (this.game.keyboard === 87) {
        //moving up
        this.TankState = 5;
    }
    if (this.TankState == 5) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
    }
    if (this.game.keyboard === 68) {
        //moving right
        this.TankState = 3;
    }
    if (this.TankState == 3) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }
    if (this.game.keyboard === 83) {
        //moving down
        this.TankState = 1;
    }
    if (this.TankState == 1) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
    }
    if (this.game.keyboard === 65) {
        //moving left
        this.TankState = 7;
    }
    if (this.TankState == 7) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }

    //For them wierd Angles...
    //if (this.game.keyboard === 87) {
        //moving up
        //this.TankState = 5;
    //}
    //if (this.TankState == 5) {
        //this.y -= this.speed;
        //this.boundingbox.y -= this.speed;
    //}

    Entity.prototype.update.call(this);
};

Tank.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5, this.y-5, 40, 4, this.currentHealth, this.maxHealth);
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.TankState == 5) {
        this.moveUpAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "up";
    }
    if (this.TankState == 1) {
        this.moveDownAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "down";
    }
    if (this.TankState == 3) {
        this.moveRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "right";
    }
    if (this.TankState == 7) {
        this.moveLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "left";
    }
    this.TankState = 0;
    if (this.TankState == 0) {
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