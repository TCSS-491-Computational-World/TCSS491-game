


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

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),  0, 0, 50, 50, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"), 120,0, 50,50,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_green8D.png"),240,0,50,50,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),360,0,50, 50,1,1,true, false);

    this.moveDownRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),  60, 0, 50, 50  , 1,1,true,false);
    this.moveUpRightAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"), 180,0, 50,50,1,1, true,false);
    this.moveUpLeftAnimation = new Animation(AM.getAsset("./img/tank_green8D.png"),300,0,50,50,1,1,true,false);
    this.moveDownLeftAnimation = new Animation( AM.getAsset("./img/tank_green8D.png"),420,0,50, 50,1,1,true, false);

    // this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    // this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    // this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    // this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);




    //Before merge
    // //Barrell Code
    // //________________________________________________________________________________________________________
    // this.BB = AM.getAsset("./img/tank_red2Barrell.png");
    // this.bullet = AM.getAsset("./img/bullet_red_2.png");
    // this.explosionA = AM.getAsset("./img/Explosion_A.png")
    // this.cursorX;
    // this.cursorY;
    
    // //_________________________________________________________________________________________________________

    // this.moveDownAnimation = new Animation(AM.getAsset("./img/tank_red.png"),  0, 0, 50, 50, 1,1,true,false);
    // this.moveRightAnimation = new Animation(AM.getAsset("./img/tank_red.png"), 50,0, 50,50,1,1, true,false);
    // this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_red.png"),100,0,50,50,1,1,true,false);
    // this.moveLeftAnimation = new Animation(AM.getAsset("./img/tank_red.png"),150,0,50, 50,1,1,true, false);

    // this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    // this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    // this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    // this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    // this.up = false;
    // this.down = false;
    // this.left = false;
    // this.right = false;

    //TankState 1 = Down, 2 = DownRight, 3 = Right, 4 = UpRight, 5 = Up, 6 = UpRight, 7 = Left, 8 = DownLeft
    this.TankState = 0;
    this.keyboardInputArray = [];


    this.cooldown = 200;
    this.lastMove = "none";
    this.hero = false;
    this.velocity = 4; //set the speed of tank  // after merge
    this.speed = this.velocity;
    this.game = game;
    console.log(game);
    this.ctx = game.ctx;
    this.x = 550;
    this.y = 300;
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
    // console.log(findPath(this.game, this.x, this.y));

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
        // console.log("fhdfhfdh");
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
        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta);
        this.game.addEntity(bulletShot);
        mySound.play();
        this.shooting = false;
        //this.bullet.fire = true;
    }

    //if(this.boundingbox.collide())

    if (this.cleanShot) {
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.cleanShot = false;
        this.currentHealth -= 10;
        //this.bullet.fire = true;

        if(this.currentHealth === 0){

            this.game.tanks[this.tankIndex].removeFromWorld = true;
            this.game.tanks = removeCurrentTank(this.game.tanks, this.tankIndex);
            
        }
    }

    // console.log("WASD: " + this.game.keyboard);

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
    if (this.TankState == 4  && this.x <= 2450 && this.y >=0 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {

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
    if (this.TankState == 6   && this.x >=0 && this.y >=0 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
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
    if (this.TankState == 8  && this.x >= 0 && this.y <= 2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
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

    if (this.game.keyboard[2] === true && this.game.keyboard[3] === true ) {
        //moving down and right
        this.TankState = 2;
        this.lastState = 2;
        diagnol = true;
    }
    if (this.TankState == 2  && this.x <= 2450 && this.y <= 2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
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
    if (this.TankState == 5  && this.y >=0  && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
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
    if (this.TankState == 3    && this.x <= 2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
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
    if (this.TankState == 1  && this.y <=2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed) ) {
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
    if (this.TankState == 7   && this.x >=0 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
        this.triggerbox.x -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }




    // Jerry added with three keys pressed. from 8 to 11

    // // move Left
    // if (this.game.keyboard[1] === true && this.game.keyboard[0] === true && this.game.keyboard[2] === true && diagnol==false && this.moveLeft) {
    //     //moving left
    //     this.TankState = 8;
    //     this.lastState = 8;
    // }
    // if (this.TankState == 8  && this.x >=0 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
    //     this.x -= this.speed;
    //     this.boundingbox.x -= this.speed;
    //     this.triggerbox.x -= this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // // move Down
    // if (this.game.keyboard[2] === true && this.game.keyboard[1] === true && this.game.keyboard[3] === true && diagnol==false && this.moveDown) {
    //     //moving down
    //     this.TankState = 9;
    //     this.lastState = 9;
    // }
    // if (this.TankState == 9  && this.y <=2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
    //     this.y += this.speed;
    //     this.boundingbox.y += this.speed;
    //     this.triggerbox.y += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // // move up
    // if (this.game.keyboard[0] === true  && this.game.keyboard[1] === true && this.game.keyboard[3] === true &&diagnol==false && this.moveUp) {
    //     //moving up
    //     this.TankState = 10;
    //     this.lastState = 10;
    // }
    // if (this.TankState == 5  && this.y >=0  && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
    //     this.y -= this.speed;
    //     this.boundingbox.y -= this.speed;
    //     this.triggerbox.y -= this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // // move right
    // if (this.game.keyboard[3] === true && this.game.keyboard[0] === true &&this.game.keyboard[2] === true && diagnol==false && this.moveRight) {
    //     //moving right
    //     this.TankState = 11;
    //     this.lastState = 11;
    // }
    // if (this.TankState == 11    && this.x <= 2450 && findPath(this.game, this.x, this.y, this.TankState, this.speed)) {
    //     this.x += this.speed;
    //     this.boundingbox.x += this.speed;
    //     this.triggerbox.x += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }









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


//     if (this.game.keyboard === 38 || this.game.keyboard === 87) {
//         //moving up
//         this.up = true;
//         this.down = false;
//         this.right = false;
//         this.left = false;
//     }
//     if (this.up === true && this.y >= 2 ) {                                  // 有些地方走不了，比如建筑
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
//     if (this.right === true && this.x <= 2448) {
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
//     if (this.down === true && this.y <= 2448) {
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
//     if (this.left === true && this.x >= 2 ) {
//         this.x -= this.speed;
//         this.boundingbox.x -= this.speed;
//     }

//     Entity.prototype.update.call(this);
// };

Tank.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5 -this.game.camera.x, this.y-5 - this.game.camera.y, 40, 4, this.currentHealth, this.maxHealth);
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if(this.TankState != 0){
        console.log("TankState: " + this.TankState);
    }
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.TankState == 5) {
        this.moveUpAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "up";
    }
    if (this.TankState == 1) {
        this.moveDownAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "down";
    }
    if (this.TankState == 3) {
        this.moveRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "right";
    }
    if (this.TankState == 7) {
        this.moveLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "left";
    }

    //Diagnol Movements
    if (this.TankState == 4) {
        this.moveUpRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "UpRight";
    }

    if (this.TankState == 6) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "UpLeft";
    }

    if (this.TankState == 8) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
        );
        this.TankState == 0;
        this.lastMove = "DownLeft";
    }

    if (this.TankState == 2) {
        this.moveUpLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y
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
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "UpRight")
            this.moveUpRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "UpLeft")
            this.moveUpLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "DownLeft")
            this.moveDownLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "left")
            this.moveLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "right")
            this.moveRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "down")
            this.moveDownAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "up")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
        if (this.lastMove === "none")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
    }
    // if (this.up) {
    //     this.moveUpAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y - this.game.camera.y
    //     );
    //     this.up = false;
    //     this.lastMove = "up";
    // }
    // if (this.down) {
    //     this.moveDownAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y - this.game.camera.y
    //     );
    //     this.down = false;
    //     this.lastMove = "down";
    // }
    // if (this.right) {
    //     this.moveRightAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y - this.game.camera.y
    //     );
    //     this.right = false;
    //     this.lastMove = "right";
    // }
    // if (this.left) {
    //     this.moveLeftAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x  - this.game.camera.x,
    //         this.y   - this.game.camera.y
    //     );
    //     this.left = false;
    //     this.lastMove = "left";
    // }
    // if (!this.left && !this.right && !this.up && !this.down) {
    //     //if tank isnt moving then stay at most recent direction.
    //     if (this.lastMove === "left")
    //         this.moveLeftAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y - this.game.camera.y
    //         );
    //     if (this.lastMove === "right")
    //         this.moveRightAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y - this.game.camera.y
    //         );
    //     if (this.lastMove === "down")
    //         this.moveDownAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y - this.game.camera.y
    //         );
    //     if (this.lastMove === "up")
    //         this.moveUpAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y - this.game.camera.y
    //         );
    //     if (this.lastMove === "none")
    //         this.moveUpAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y - this.game.camera.y
    //         );
    // }

    //Barrell Code
    this.ctx.drawImage(this.BB, this.x + 6 - this.game.camera.x, this.y + 5 - this.game.camera.y);


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x - this.game.camera.x,
                     this.boundingbox.y - this.game.camera.y, 
                     this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    //if(this == this.game.tanks[this.distance])
    this.ctx.strokeStyle = "pink";
    this.ctx.rect(this.triggerbox.x - 50- this.game.camera.x, this.triggerbox.y - 50 -this.game.camera.y , this.triggerbox.width + 100, this.triggerbox.height + 100);
    this.ctx.stroke();


    Entity.prototype.draw.call(this);
};



function findPath(game, tank_x, tank_y, direction, speed) {
    // console.log(game.buildings);
    // console.log(game.map);
    if (direction === 4) {
        tank_x  +=  speed;
        tank_y  -=  speed;
        
    }
    else if (direction === 6) {
        tank_x  -=  speed;
        tank_y  -=  speed;
    }
    else if (direction === 8) {
        tank_x  -=  speed;
        tank_y  +=  speed;
    }
    else if (direction === 2) {
        tank_x  +=  speed;
        tank_y  +=  speed;
    }
    else if (direction === 5) {
        tank_y  -=  speed;
    }
    else if (direction === 3) {
        tank_x  +=  speed;
    }
    else if (direction === 1) {
        tank_y  +=  speed;
    }
    else{
        tank_x -= speed;
    }

    // Using walls list
    for (let i = 0; i < game.walls.length; i++) {
        var startX  =   game.walls[i].x * 50;
        var startY  =   game.walls[i].y * 50;
        var endX    =   game.walls[i].x * 50 + 50;
        var endY    =   game.walls[i].y * 50 + 50;
        if (tank_x + 40 > startX && tank_x < endX  
            && tank_y + 40 > startY && tank_y < endY) {
            return false;
        }
    }
    // console.log(game.buildings);
    // debugger;
    // Using 
    for (let i = 0; i < game.buildings.length; i++) {
        if (game.buildings[i].contains.type === 't') {
            var startX  =   game.buildings[i].x * 50;
            var startY  =   game.buildings[i].y * 50;
            var endX    =   game.buildings[i].x * 50 + 100;
            var endY    =   game.buildings[i].y * 50 + 100;
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }
        else if (game.buildings[0].contains.type === 'r') {
            var startX  =   game.buildings[0].x * 50 + 10;
            var startY  =   game.buildings[0].y * 50 + 60;
            var endX    =   game.buildings[0].x * 50 + 220;
            var endY    =   game.buildings[0].y * 50 + 170;
            
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }
        else if (game.buildings[23].contains.type === 'r') {
            var startX  =   game.buildings[23].x * 50 + 10;
            var startY  =   game.buildings[23].y * 50 + 60;
            var endX    =   game.buildings[23].x * 50 + 220;
            var endY    =   game.buildings[23].y * 50 + 170;
            
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }

        

    }
    return true;

}




// Jerry did
function removeCurrentTank(tanks, index) {
    let next = [];
    for (let i = 0; i < tanks.length; i++) {
        if (i !== index) {
            next.push(tanks[i]);
        }
    }
    return next;
}