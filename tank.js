function Tank(game) {
    //Barrell Code
    //________________________________________________________________________________________________________
    this.barrell = new Barrell(game, AM.getAsset("./img/tank_green2Barrell.png"));
    this.BB = AM.getAsset("./img/tank_green2Barrell.png");
    
    this.bullet = AM.getAsset("./img/bullet_red_2.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    
    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),  0, 0, 60, 60, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"), 120,0, 60,60,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_green8D.png"),240,0,60,60,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),360,0,60, 60,1,1,true, false);

    this.moveDownRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),  60, 0, 60, 60, 1,1,true,false);
    this.moveUpRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"), 180,0, 60,60,1,1, true,false);
    this.moveUpLeftAnimation = new Animation(AM.getAsset("./img/tank_green8D.png"),300,0,60,60,1,1,true,false);
    this.moveDownLeftAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),420,0,60, 60,1,1,true, false);

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
    this.keyboardInputArray = [];


    this.cooldown = 200;
    this.lastMove = "none";
    this.hero = false;
    this.velocity = 4; //set the speed of tank 
    this.speed = this.velocity;
    this.ctx = game.ctx;
    this.x = 250;
    this.y = 450;
    this.counter = 0;
    this.random = this.random = Math.floor(Math.random() * 100);


    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.triggerbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.distance = 1;
    this.maxHealth = 200;
    this.currentHealth = 200;
    this.collision;
    this.tankIndex;
    this.tempList;



    this.lastState;


    this.moveRight = true;
    this.moveLeft = true;
    this.moveDown = true;
    this.moveUp = true;
    this.moveUpRight = true;
    this.moveUpLeft = true;
    this.moveDownRight = true;
    this.moveDownLeft = true;
    
    
    Entity.call(this, game, this.x, this.y);
}

Tank.prototype = new Entity();
Tank.prototype.constructor = Tank;

Tank.prototype.update = function() {
    var bool = true;

    this.tempList = this.game.tanks;
    for(j = 0; j < this.game.tanks.length; j++){
        if(this.tempList[j].x === this.x){
            this.tankIndex = j;
            //this.tempList.splice(this.tankIndex, 1);
        }
    }

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
            AM.getAsset("./img/tank_green2Barrell.png"),
            theta
        );
        //console.log(this.spritesheet);
    } else {
        //console.log("fhdfhfdh");
        var dy = this.y - this.cursorY;
        var dx = this.x - this.cursorX;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI;
        //this.cursorX = this.game.mouse.x;
        //this.cursorY = this.game.mouse.y;
        this.BB = this.rotateAndCache(
            AM.getAsset("./img/tank_green2Barrell.png"),
            theta
        );
    }
    //_____________________________________________________________________________________________________

    var mySound = new Audio("./Sounds/TankFiringSound.mp3");

    if (this.game.click) {
        this.shooting = true;
    }
    if (this.shooting) {

        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta, this.tankIndex, null);
        this.game.addEntity(bulletShot);
        mySound.play();
        this.shooting = false;
        
        //this.bullet.fire = true;
    }

    if (this.cleanShot) {
        //this.shooting = false;
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.cleanShot = false;
        this.currentHealth -= 10;

        //this.game.entities[this.game.entities.length - 1].removeFromWorld = true;

        if(this.currentHealth === 0){

            this.game.tanks[this.tankIndex].removeFromWorld = true;
            
        }
        //this.bullet.fire = true;
    }

    console.log("WASD: " + this.game.keyboard);

    
    for(i = 0; i < this.game.tanks.length; i++){

        if(i != this.tankIndex && this.boundingbox.collide(this.game.tanks[i].boundingbox)){
            this.collision = true;
            if(this.lastMove === "down"){
                this.moveDown = false;
                this.moveDownLeft = false;
                this.moveDownRight = false;
            } 
            if(this.lastMove === "up"){
                this.moveUp = false;
                this.moveUpRight = false;
                this.moveUpLeft = false;
            }
            if(this.lastMove === "right"){
                this.moveRight = false;
                this.moveUpRight = false;
                this.moveUpLeft = false;
            } 
            if(this.lastMove === "left"){
                this.moveLeft = false;
                this.moveUpLeft = false;
                this.moveUpRight = false;
            }
            if(this.lastMove === "DownRight"){
                this.moveDownRight = false;
                this.moveDown = false;
                this.moveDownLeft = false;
                this.moveRight = false;
            } 
            if(this.lastMove === "DownLeft"){
                this.moveDownLeft = false;
                this.moveDownRight = false;
                this.moveLeft = false;
                this.moveDown = false;
            }
            if(this.lastMove === "UpRight"){
                this.moveUpRight = false;
                this.moveUpLeft = false;
                this.moveUp = false;
                this.moveRight = false;
            } 
            if(this.lastMove === "UpLeft"){
                this.moveUpLeft = false;
                this.moveUpRight = false;
                this.moveUp = false;
                this.moveLeft = false;
            }
        } 
    }

    if(this.collision === false){
        //do nothing
    } else {
        //this.speed *= -1;
    }

    this.collision = false;

    var diagnol = false

    //For them wierd Angles...
    if (this.game.keyboard[0] === true && this.game.keyboard[3] === true && this.moveUpRight) {
        //moving up and right
        this.TankState = 4;
        this.lastState = 4;
        diagnol = true;
    }
    if (this.TankState == 4) {

        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.triggerbox.y -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
        this.x += this.speed;
        this.boundingbox.x += this.speed;
        this.triggerbox.x += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    if (this.game.keyboard[0] === true && this.game.keyboard[1] === true && this.moveUpLeft) {
        //moving up and left
        this.TankState = 6;
        this.lastState = 6;
        diagnol = true;
    }
    if (this.TankState == 6) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.triggerbox.y -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
        this.triggerbox.x -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    if (this.game.keyboard[1] === true && this.game.keyboard[2] === true && this.moveDownLeft) {
        //moving down and left
        this.TankState = 8;
        this.lastState = 8;
        diagnol = true;
    }
    if (this.TankState == 8) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
        this.triggerbox.y += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
        this.triggerbox.x -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    if (this.game.keyboard[2] === true && this.game.keyboard[3] === true && this.moveDownRight) {
        //moving down and right
        this.TankState = 2;
        this.lastState = 2;
        diagnol = true;
    }
    if (this.TankState == 2) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
        this.triggerbox.y += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
        this.x += this.speed;
        this.boundingbox.x += this.speed;
        this.triggerbox.x += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    if (this.game.keyboard[0] === true  && diagnol==false && this.moveUp) {
        //moving up
        this.TankState = 5;
        this.lastState = 5;
    }
    if (this.TankState == 5) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.triggerbox.y -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    if (this.game.keyboard[3] === true && diagnol==false && this.moveRight) {
        //moving right
        this.TankState = 3;
        this.lastState = 3;
    }
    if (this.TankState == 3) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
        this.triggerbox.x += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    if (this.game.keyboard[2] === true && diagnol==false && this.moveDown) {
        //moving down
        this.TankState = 1;
        this.lastState = 1;
    }
    if (this.TankState == 1) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
        this.triggerbox.y += this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    if (this.game.keyboard[1] === true && diagnol==false && this.moveLeft) {
        //moving left
        this.TankState = 7;
        this.lastState = 7;
    }
    if (this.TankState == 7) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
        this.triggerbox.x -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    this.speed = this.velocity;

    this.moveRight = true;
    this.moveLeft = true;
    this.moveDown = true;
    this.moveUp = true;
    this.moveUpRight = true;
    this.moveUpLeft = true;
    this.moveDownRight = true;
    this.moveDownLeft = true;

    Entity.prototype.update.call(this);
};

Tank.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5, this.y-5, 40, 4, this.currentHealth, this.maxHealth);
    if(this.TankState != 0){
        console.log("TankState: " + this.TankState);
    }
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

    //Diagnol Movements
    if (this.TankState == 4) {
        this.moveUpRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "UpRight";
    }

    if (this.TankState == 6) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "UpLeft";
    }

    if (this.TankState == 8) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "DownLeft";
    }

    if (this.TankState == 2) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.TankState == 0;
        this.lastMove = "DownRight";
    }


    this.TankState = 0;
    if (this.TankState == 0) {
        //if tank isnt moving then stay at most recent direction.
        if (this.lastMove === "DownRight")
            this.moveDownRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "UpRight")
            this.moveUpRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "UpLeft")
            this.moveUpLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "DownLeft")
            this.moveDownLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
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
    this.ctx.drawImage(this.BB, this.x + 6, this.y + 5);


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    //if(this == this.game.tanks[this.distance])
    this.ctx.strokeStyle = "pink";
    this.ctx.rect(this.triggerbox.x - 50, this.triggerbox.y - 50 , this.triggerbox.width + 100, this.triggerbox.height + 100);
    this.ctx.stroke();

    


    Entity.prototype.draw.call(this);
};