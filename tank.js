// function Tank(game) {
//     //Barrell Code
//     //________________________________________________________________________________________________________
//     this.BB = AM.getAsset("./img/tank_red2Barrell.png");
//     this.bullet = AM.getAsset("./img/bullet_red_2.png");
//     this.explosionA = AM.getAsset("./img/Explosion_A.png")
//     this.cursorX;
//     this.cursorY;
    
//     //_________________________________________________________________________________________________________

//     this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_red.png"),  0, 0, 50, 50, 1,1,true,false);
//     this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_red.png"), 50,0, 50,50,1,1, true,false);
//     this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_red.png"),100,0,50,50,1,1,true,false);
//     this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_red.png"),150,0,50, 50,1,1,true, false);

//     this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
//     this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
//     this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
//     this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
//     //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
//     this.up = false;
//     this.down = false;
//     this.left = false;
//     this.right = false;
//     this.lastMove = "none";
//     this.hero = false;
//     this.speed = 10;
//     this.ctx = game.ctx;
//     this.x = 300;
//     this.y = 300;
//     this.shooting = false;
//     this.cleanShot = false;
//     this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
//     this.maxHealth = 200;
//     this.currentHealth = 200;
    
    
//     Entity.call(this, game, 300, 300);
// }

// Tank.prototype = new Entity();
// Tank.prototype.constructor = Tank;

// Tank.prototype.update = function() {
//     var bool = true;
//     //Barrell Code
//     //____________________________________________________________________________________________________
//     if (this.game.mouse) {
//         console.log("fhdfhfdh");
//         var dy = this.y - this.cursorY;
//         var dx = this.x - this.cursorX;
//         var theta = Math.atan2(dy, dx); // range (-PI, PI]
//         //theta *= 180 / Math.PI;
//         this.cursorX = this.game.mouse.x;
//         this.cursorY = this.game.mouse.y;
//         this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
//         this.BB = this.rotateAndCache(
//             AM.getAsset("./img/tank_red2Barrell.png"),
//             theta
//         );
//         //console.log(this.spritesheet);
//     } else {
//         console.log("fhdfhfdh");
//         var dy = this.y - this.cursorY;
//         var dx = this.x - this.cursorX;
//         var theta = Math.atan2(dy, dx); // range (-PI, PI]
//         //theta *= 180 / Math.PI;
//         //this.cursorX = this.game.mouse.x;
//         //this.cursorY = this.game.mouse.y;
//         this.BB = this.rotateAndCache(
//             AM.getAsset("./img/tank_red2Barrell.png"),
//             theta
//         );
//     }
//     //_____________________________________________________________________________________________________

//     if (this.game.click) {
//         this.shooting = true;
//     }
//     if (this.shooting) {
//         bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta);
//         this.game.addEntity(bulletShot);
//         this.shooting = false;
//         //this.bullet.fire = true;
//     }

//     //if(this.boundingbox.collide())

//     if (this.cleanShot) {
//         cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
//         this.game.addEntity(cleanshot);
//         this.cleanShot = false;
//         //this.bullet.fire = true;
//     }

//     if (this.game.keyboard === 38 || this.game.keyboard === 87) {
//         //moving up
//         this.up = true;
//         this.down = false;
//         this.right = false;
//         this.left = false;
//     }
//     if (this.up === true) {
//         this.y -= this.speed;
//         this.boundingbox.y -= this.speed;
//     }
//     if (this.game.keyboard === 39 || this.game.keyboard === 68) {
//         //moving right

//         this.up = false;
//         this.down = false;
//         this.right = true;
//         this.left = false;
//     }
//     if (this.right === true) {
//         this.x += this.speed;
//         this.boundingbox.x += this.speed;
//     }
//     if (this.game.keyboard === 40 || this.game.keyboard === 83) {
//         //moving down
//         this.up = false;
//         this.down = true;
//         this.right = false;
//         this.left = false;
//     }
//     if (this.down === true) {
//         this.y += this.speed;
//         this.boundingbox.y += this.speed;
//     }
//     if (this.game.keyboard === 37 || this.game.keyboard === 65) {
//         //moving left
//         this.up = false;
//         this.down = false;
//         this.right = false;
//         this.left = true;
//     }
//     if (this.left === true) {
//         this.x -= this.speed;
//         this.boundingbox.x -= this.speed;
//     }

//     Entity.prototype.update.call(this);
// };

// Tank.prototype.draw = function() {
//     drawHealthBar(this.ctx, this.x+5, this.y-5, 40, 4, this.currentHealth, this.maxHealth);
//     //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     if (this.up) {
//         this.moveUpAnimation.drawFrame(
//             this.game.clockTick,
//             this.ctx,
//             this.x,
//             this.y
//         );
//         this.up = false;
//         this.lastMove = "up";
//     }
//     if (this.down) {
//         this.moveDownAnimation.drawFrame(
//             this.game.clockTick,
//             this.ctx,
//             this.x,
//             this.y
//         );
//         this.down = false;
//         this.lastMove = "down";
//     }
//     if (this.right) {
//         this.moveRightAnimation.drawFrame(
//             this.game.clockTick,
//             this.ctx,
//             this.x,
//             this.y
//         );
//         this.right = false;
//         this.lastMove = "right";
//     }
//     if (this.left) {
//         this.moveLeftAnimation.drawFrame(
//             this.game.clockTick,
//             this.ctx,
//             this.x,
//             this.y
//         );
//         this.left = false;
//         this.lastMove = "left";
//     }
//     if (!this.left && !this.right && !this.up && !this.down) {
//         //if tank isnt moving then stay at most recent direction.
//         if (this.lastMove === "left")
//             this.moveLeftAnimation.drawFrame(
//                 this.game.clockTick,
//                 this.ctx,
//                 this.x,
//                 this.y
//             );
//         if (this.lastMove === "right")
//             this.moveRightAnimation.drawFrame(
//                 this.game.clockTick,
//                 this.ctx,
//                 this.x,
//                 this.y
//             );
//         if (this.lastMove === "down")
//             this.moveDownAnimation.drawFrame(
//                 this.game.clockTick,
//                 this.ctx,
//                 this.x,
//                 this.y
//             );
//         if (this.lastMove === "up")
//             this.moveUpAnimation.drawFrame(
//                 this.game.clockTick,
//                 this.ctx,
//                 this.x,
//                 this.y
//             );
//         if (this.lastMove === "none")
//             this.moveUpAnimation.drawFrame(
//                 this.game.clockTick,
//                 this.ctx,
//                 this.x,
//                 this.y
//             );
//     }

//     //Barrell Code
//     this.ctx.drawImage(this.BB, this.x, this.y);


//     this.ctx.beginPath();
//     this.ctx.lineWidth = "2";
//     this.ctx.strokeStyle = "red";
//     this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
//     this.ctx.stroke();


//     Entity.prototype.draw.call(this);
// };

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
    this.keyboardInputArray = [];

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
        //console.log("fhdfhfdh");
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

    console.log("WASD: " + this.game.keyboard);

    var diagnol = false

    //For them wierd Angles...
    if (this.game.keyboard[0] === true && this.game.keyboard[3] === true) {
        //moving up and right
        this.TankState = 4;
        diagnol = true;
    }
    if (this.TankState == 4) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }

    if (this.game.keyboard[0] === true && this.game.keyboard[1] === true) {
        //moving up and left
        this.TankState = 6;
        diagnol = true;
    }
    if (this.TankState == 6) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }

    if (this.game.keyboard[1] === true && this.game.keyboard[2] === true) {
        //moving down and left
        this.TankState = 8;
        diagnol = true;
    }
    if (this.TankState == 8) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }

    if (this.game.keyboard[2] === true && this.game.keyboard[3] === true) {
        //moving down and right
        this.TankState = 2;
        diagnol = true;
    }
    if (this.TankState == 2) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }

    if (this.game.keyboard[0] === true  && diagnol==false) {
        //moving up
        this.TankState = 5;
    }
    if (this.TankState == 5) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
    }
    if (this.game.keyboard[3] === true && diagnol==false) {
        //moving right
        this.TankState = 3;
    }
    if (this.TankState == 3) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }
    if (this.game.keyboard[2] === true && diagnol==false) {
        //moving down
        this.TankState = 1;
    }
    if (this.TankState == 1) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
    }
    if (this.game.keyboard[1] === true && diagnol==false) {
        //moving left
        this.TankState = 7;
    }
    if (this.TankState == 7) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
    }


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
    this.ctx.drawImage(this.BB, this.x, this.y);


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();


    Entity.prototype.draw.call(this);
};