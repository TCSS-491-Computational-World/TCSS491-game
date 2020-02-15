var AM = new AssetManager();
var grid = new Array(100);

function Cell(theX, theY, theContain) {
    this.x = theX;
    this.y = theY;
    this.contains = theContain;
}

function setUp() {
    for (let i = 0; i < 100; i++) {
        grid[i] = new Array(100);
        for (let j = 0; j < 100; j++) {
            grid[i][j] = new Cell(i, j, 0);
        }
    }
}

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________


//Animation Class
function Animation(
    spriteSheet,
    startX,
    startY,
    frameWidth,
    frameHeight,
    frameDuration,
    frames,
    loop,
    reverse
) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ?
        this.frames - this.currentFrame() - 1 :
        this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor(
            (this.spriteSheet.width - this.startX) / this.frameWidth
        );
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    //console.log(spriteSheet + "   ssdsddsds");
    ctx.drawImage(
        this.spriteSheet,
        index * this.frameWidth + offset,
        vindex * this.frameHeight + this.startY, // source from sheet
        this.frameWidth,
        this.frameHeight,
        locX,
        locY,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy
    );
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return this.elapsedTime >= this.totalTime;
};

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

// Background Class
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function () {
    //console.log(spriteSheet + " sssssss ");
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

Background.prototype.update = function () { };

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Barrell(game) {
    this.Downanimation = new Animation(
        AM.getAsset("./img/tank_red2Barrell.png"),
        0,
        0,
        50,
        50,
        1,
        1,
        true,
        false
    );
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.speed = 10;
    this.ctx = game.ctx;
    this.x = 100;
    this.y = 100;
    Entity.call(this, game, 300, 300);
}

Barrell.prototype = new Entity();
Barrell.prototype.constructor = Barrell;

Barrell.prototype.draw = function () {
    this.Downanimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y); //Banimation == Barrell Animation
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    Entity.prototype.draw.call(this);
};

Barrell.prototype.update = function () {
    // if (this.game.mouse) {

    // }

    if (this.game.keyboard === 38 || this.game.keyboard === 87) {
        //moving up
        this.up = true;
        this.down = false;
        this.right = false;
        this.left = false;
    }
    if (this.up === true) {
        this.y -= this.speed;
    }
    if (this.game.keyboard === 39 || this.game.keyboard === 68) {
        //moving right

        this.up = false;
        this.down = false;
        this.right = true;
        this.left = false;
    }
    if (this.right === true) {
        this.x += this.speed;
    }
    if (this.game.keyboard === 40 || this.game.keyboard === 83) {
        //moving down
        this.up = false;
        this.down = true;
        this.right = false;
        this.left = false;
    }
    if (this.down === true) {
        this.y += this.speed;
    }
    if (this.game.keyboard === 37 || this.game.keyboard === 65) {
        //moving left
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = true;
    }
    if (this.left === true) {
        this.x -= this.speed;
    }
    Entity.prototype.update.call(this);
};

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function BulletFire(game, image, fire, tankX, tankY, targetX, targetY, rotation) {
    this.theta = rotation;
    //this.distance = distance;
    this.targetX = targetX;
    this.targetY = targetY;
    this.image = image;
    this.cursorAnimation = new Animation(
        AM.getAsset("./img/cursor.png"),0,0,19,19,20,1,true,false);
    this.tankX = tankX + 25;
    this.tankY = tankY + 25;
    this.rotation = rotation;
    this.fire = false;
    this.speed = 10;
    this.ctx = game.ctx;
    this.fire = fire;
    this.timeA = null;
    this.cursor = false;
    this.cursorX;
    this.cursorY;
    this.endX = 500;
    this.endY = 0;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.tankX, this.tankY, 33, 24);
    Entity.call(this, game, this.tankX, this.tankY);
}

BulletFire.prototype = new Entity();
BulletFire.prototype.constructor = BulletFire;

BulletFire.prototype.update = function () {

    //if (this.game.click) {
        //this.fire = true;
        //this.endX = this.game.click.x;
        //this.endY = this.game.click.y;
        //this.x = 0;
        //this.y = 0;
        //this.timeA = Math.sqrt(
            //Math.pow(this.endX - this.x, 2) + Math.pow(this.endY - this.x, 2)
       // ); // the hypotneuse
        //console.log("TIMES :" + this.timeA);

        //this.animation.frameDuration = this.timeA * 1;
        //console.log("MY X:" , this.x);
        //this.y = this.game.click.y;
    //}



    // var targetX = input.mouseX - (this.localX + this.width/2);
    //  targetY = input.mouseY - (this.localY + this.height/2);

    // this.rotation = Math.atan2(targetY, targetX);

    // velocityInstance.x = Math.cos(this.rotation) * bulletSpeed;
    // velocityInstance.y = Math.sin(this.rotation) * bulletSpeed;

    if(this.boundingbox.collide(this.game.tanks[1].boundingbox)){
        //console.log("anyhintg hapalokhohiahskjdhakjdshlkdajhsjlkdahslkj");
        this.game.tanks[1].cleanShot = true;
        this.fire = false;
        this.x = this.tankX;
        this.y = this.tankY;
        this.boundingbox.x = this.tankX;
        this.boundingbox.y = this.tankY;
    }

    if (this.x > this.tankX + 10000|| this.y > this.tankY + 10000 || this.x < this.tankX - 10000 || this.y < this.tankY - 10000) {
        //console.log("IS ANYTHING HAPPENING HERE!??!?");
        this.fire = false;
        this.x = this.tankX;
        this.y = this.tankY;
        this.boundingbox.x = this.tankX;
        this.boundingbox.y = this.tankY;
    }

    //console.log(this.boundingbox.x);

    if (this.fire) {

        //this.x += this.speed;
            this.x -= Math.cos(this.theta) * 10;
            this.y -= Math.sin(this.theta) * 10;
            this.boundingbox.x -= Math.cos(this.theta) * 10;
            this.boundingbox.y -= Math.sin(this.theta) * 10;
        
       
    }

    if (this.game.mouse) {
        document.getElementById("gameWorld").style.cursor = "none";
        this.cursor = true;
        this.cursorX = this.game.mouse.x;
        this.cursorY = this.game.mouse.y;
    }

    Entity.prototype.update.call(this);
};

BulletFire.prototype.draw = function () {
    if (this.fire) {

        
        this.ctx.beginPath();
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "red";
        this.ctx.rect(this.boundingbox.x, this.boundingbox.y, 33, 24);
        this.ctx.stroke();


        this.ctx.drawImage(
            this.image,
            0,
            0,
            33,
            24,
            this.x,
            this.y,
            33,
            24
        );

        
        //this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        //Entity.prototype.draw.call(this);
    }
    if (this.cursor) {
        //this.cursorAnimation.drawFrame(this.game.clockTick, this.ctx, this.cursorX, this.cursorY );
        this.ctx.drawImage(
            AM.getAsset("./img/cursor.png"),
            0,
            0,
            19,
            19,
            this.cursorX,
            this.cursorY,
            19,
            19
        );
        // Entity.prototype.draw.call(this);
    }
    Entity.prototype.draw.call(this);
};


//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Desert(game) {
    this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false); 
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Desert.prototype = new Entity();
Desert.prototype.constructor = Desert;

Desert.prototype.update = function () { 
    Entity.prototype.update.call(this);
};

Desert.prototype.draw = function (ctx) {

   

    grid = new Array(100);
    for (let i = 0; i < 50; i++) {
        grid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            grid[i][j] = new Cell(i, j, 0);
        }
    }


    // drawing grid in the map. It is easy to look for a position to get the location of the tank.

    fillGrid(ctx);
    // drawGrid(ctx);
    setUpComponents(ctx); // It should install in environment.
    this.coinAnimation.drawFrame(this.game.clockTick, ctx, 100, 100, 1);
    Entity.prototype.draw.call(this);
};

function drawGrid(ctx) {
    var w = 50;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            ctx.strokeRect(i * w, j * w, w, w);
            // ctx.drawImage(AM.getAsset("./img/desert.jpg"),i*w, j*w, w, w);
        }
    }
}

function fillGrid(ctx) {
    var w = 50;
    var img = AM.getAsset("./img/background/desertTile.png");
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            ctx.drawImage(img, i * w, j * w, w, w);
        }
    }
}

function setUpComponents(ctx) {
    // let wallList = [];
    // for (let i = 0; i < 100; i++) {
    //     for (let j = 0; j< 100; j++) {
    //         wallList.push();
    //     }

    // }

    var w = 50;
    // var img = AM.getAsset("./img/background/crate.png");
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            // drawing walls (crate)
            if ((i === 5 && j === 3) 
                || (i === 5 && j === 4) 
                || (i === 5 && j === 5)
                || (i === 5 && j === 6)
                || (i === 5 && j === 7)
                || (i === 5 && j === 8)
                || (i === 5 && j === 9)
                || (i === 5 && j === 10)
                || (i === 5 && j === 11)
                || (i === 4 && j === 5)
                || (i === 4 && j === 6)
                || (i === 4 && j === 7)
                || (i === 4 && j === 8)
                
                // lower L
                || (i === 2 && j === 14)
                || (i === 3 && j === 14)
                || (i === 4 && j === 14)
                || (i === 5 && j === 14)
                || (i === 6 && j === 14)
                || (i === 7 && j === 14)
                || (i === 8 && j === 14)
                || (i === 2 && j === 13)
                || (i === 2 && j === 12)
                
                
                
                // // crossing
                // || (i === 20 && j === 22)
                // || (i === 21 && j === 23)
                // || (i === 22 && j === 24)
                // || (i === 23 && j === 25)
                // || (i === 24 && j === 26)
                // || (i === 25 && j === 27)
                // || (i === 26 && j === 28)
                // || (i === 27 && j === 29)
                // || (i === 28 && j === 30)
                // || (i === 29 && j === 31)

                // || (i === 29 && j === 22)
                // || (i === 28 && j === 23)
                // || (i === 27 && j === 24)
                // || (i === 26 && j === 25)
                // || (i === 25 && j === 26)
                // || (i === 24 && j === 27)
                // || (i === 23 && j === 28)
                // || (i === 22 && j === 29)
                // || (i === 21 && j === 30)
                // || (i === 20 && j === 31)

                // // three crates in a row
                // || (i === 34 && j === 25)
                // || (i === 34 && j === 26)
                // || (i === 34 && j === 27)

                || (i === 7 && j === 42)
                || (i === 7 && j === 41)
                || (i === 6 && j === 41)
                || (i === 7 && j === 43)
                || (i === 7 && j === 44)
                || (i === 8 && j === 42)

                || (i === 32 && j === 42) 
                || (i === 33 && j === 42) 
                || (i === 34 && j === 42) 
                || (i === 30 && j === 42) 
                || (i === 31 && j === 41) 
                || (i === 34 && j === 42) 

                || (i === 36 && j === 42) 
                || (i === 36 && j === 41) 
                || (i === 36 && j === 43) 
                || (i === 36 && j === 44) 
                || (i === 36 && j === 46) 
                || (i === 36 && j === 47) 
                || (i === 36 && j === 48) 
                || (i === 36 && j === 49)  
                ){
                ctx.drawImage(AM.getAsset("./img/background/crate.png"),i*w, j*w,w,w);
            }



            // // drawing tree 2
            // if  ((i === 0 && j == 10)
            //     || (i === 21 && j == 26)
            //     || (i === 41 && j == 28)
            //     || (i === 47 && j === 5)
            //     || (i === 48 && j == 36)
            //     ) {
            //     ctx.drawImage(AM.getAsset("./img/background/tree2.png"),i*w,j*w,100,100);
            // }




            // // drawing tree 1
            // if((i === 9 && j === 6)
            //     || (i === 11 && j === 40)
            //     || (i === 13 && j === 13)
            //     || (i === 15 && j === 9)
            //     || (i === 42 && j === 21)
            //     || (i === 47 && j === 13)
            //     || (i === 29 && j === 27)
            // ) {
            //     ctx.drawImage(AM.getAsset("./img/background/tree1.png"),i*w, j*w, 100,100);
            // }
            // // drawing tree 3
            // if (( i === 0 && j === 49)
            // ||  ( i  === 6 && j === 35 )
            // || ( i === 16 && j === 24)
            // || ( i === 40&& j === 34)
            // || ( i === 44 && j === 47)
            // ) {
            //     ctx.drawImage(AM.getAsset("./img/background/tree3.png"),i*w, j*w, 150,150);
            // }


            // // drawing rooftop
            // if ( i === 19 && j === 5) {
            //     ctx.drawImage(AM.getAsset("./img/rooftop.png"),i*w, j*w, 250, 250);
            // }

            // // drawing roof
            // if ( i === 19 && j === 12) {
            //     ctx.drawImage(AM.getAsset("./img/roof.png"),i*w, j*w, 250, 200);
            // }




        }
    }   
}



//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

// Everything are indestructible in this object 
function Enviornment(game) {
    //this.x = myX;
    //this.y = myY;
    //this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Enviornment.prototype.draw = function () {
    // draw a container
    // this.ctx.drawImage(AM.getAsset("./img/Decor_Items/Container_A.png"),600,380); 
    
    // draw a puddle
    this.ctx.drawImage(AM.getAsset("./img/Puddle_01.png"), 700, 220); 

    // draw a desert tree TYPE 1 
    // this.ctx.drawImage();

    // // draw a desert tree TYPE 2
    // this.ctx.drawImage();

    // // draw a desert tree TYPE 3
    // this.ctx.drawImage();





};

Enviornment.prototype.update = function () { };

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Explosion(game, image, fire, targetX, targetY) {
    this.image = image;
    this.fire = false;
    this.fire = fire;
    this.targetX = targetX;
    this.targetY = targetY;
    this.animation = new Animation(
        AM.getAsset("./img/Explosion_A.png"),
        0,
        0,
        256,
        256,
        0.1,
        5,
        false,
        false
    );

    this.explosionTwoAnimation = new Animation(
        AM.getAsset("./img/Explosion_C.png"),
        0,
        0,
        256,
        256,
        0.1,
        5,
        false,
        false
    );

    this.speed = 0;
    this.ctx = game.ctx;
    //console.log(game.entities[2]);
    //console.log("EEEEEE " + this.game.);
    // this.x = this.game.click.x;
    Entity.call(this, game, 0, 400 /*, myX, myY*/);
}

Explosion.prototype = new Entity();
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function () {

    Entity.prototype.update.call(this);

};

Explosion.prototype.draw = function () {

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.targetX, this.targetY, .3);
    //this.explosionTwoAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 200, this.y, .3);
    Entity.prototype.draw.call(this);
};

function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;

    //this.center = (this.x + width) / 2 + (this.y + height) / 2
}

BoundingBox.prototype.collide = function (other) {
    if (this.x < other.x + other.width 
        && this.x + this.width > other.x
         && this.y < other.y + other.height 
         && this.height + this.y > other.y){
        // collision detected!}) {
        //console.log("THERE WAS A COLLISION!!!!!!!!!!!!!!!!!!!!");
        return true;
    } else {
        //console.log("NOOOOOOOOOOOOOOOOOOOO");
        return false;
    }
}

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

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

    //For them wierd Angles...
<<<<<<< Updated upstream
    if (this.game.keyboard[0] === true && this.game.keyboard[3] === true) {
=======
    /*if (this.game.keyboard.includes(87) && this.game.keyboard.includes(68)) {
>>>>>>> Stashed changes
        //moving up and right
        this.TankState = 6;
    }
    if (this.TankState == 6) {
        this.y -= this.speed;
        this.boundingbox.y += this.speed;
        this.x -= this.speed;
        this.boundingbox.x += this.speed;
    }*/

<<<<<<< Updated upstream
    if (this.game.keyboard[0] === true) {
=======
    if (this.game.keyboard[0] == true) {
>>>>>>> Stashed changes
        //moving up
        this.TankState = 5;
    }
    if (this.TankState == 5) {
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
    }
    if (this.game.keyboard[3] === true) {
        //moving right
        this.TankState = 3;
    }
    if (this.TankState == 3) {
        this.x += this.speed;
        this.boundingbox.x += this.speed;
    }
    if (this.game.keyboard[2] === true) {
        //moving down
        this.TankState = 1;
    }
    if (this.TankState == 1) {
        this.y += this.speed;
        this.boundingbox.y += this.speed;
    }
    if (this.game.keyboard[1] === true) {
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
    this.currentHealth = 300;
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
        this.currentHealth -= 10;
        this.cleanShot = false;
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
    drawHealthBar(this.ctx, this.x+12.5, this.y-5, 50, 5, this.currentHealth, this.maxHealth)
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
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();

    Entity.prototype.draw.call(this);
};

// // Vehicles class
function Vehicles(game) {
    console.log("Where is my vehicles");
    this.firstAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleA.png"), 256, 256, 4, 0.10, 4, true, 1);
    // this.secondAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleB.png"), 256,256,4,0.1, 4, true,1);
    // this.thirdAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleC.png"), 256,256,4,0.1, 4, true,1);
    this.x = 240;
    this.y = 285;
    this.speed = 0; 
    this.game = game;
    this.ctx = game.ctx;

    // Entity.call(this, game, 240, 285);
}

Vehicles.prototype.draw = function () {
    this.firstAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    // this.secondAnimation.drawImage(this.game.clockTick, this.ctx,this.x+100,this.y);
    // this.thirdAnimation.drawImage(this.game.clockTick,this.ctx, this.x+200, this.y);
    Entity.prototype.draw.call(this);
}

Vehicles.prototype.update = function () {
    if (this.firstAnimation.elapsedTime < this.firstAnimation.totalTime * 8 / 4)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}









AM.queueDownload("./img/background/desertTile.png");
AM.queueDownload("./img/background/crate.png");

AM.queueDownload("./img/background/tree1.png");
AM.queueDownload("./img/background/tree2.png");
AM.queueDownload("./img/background/tree3.png");
AM.queueDownload("./img/rooftop.png");
AM.queueDownload("./img/roof.png");

AM.queueDownload("./img/background/HP_Bonus.png");

AM.queueDownload("./img/cursor.png");
AM.queueDownload("./img/grass.png");
AM.queueDownload("./img/Explosion_A.png");
AM.queueDownload("./img/Explosion_C.png");
AM.queueDownload("./img/tank_red8D.png");
AM.queueDownload("./img/Puddle_01.png");
AM.queueDownload("./img/coin2.png");
AM.queueDownload("./img/bullet_red_2.png");
AM.queueDownload("./img/Decor_Items/Container_A.png");
AM.queueDownload("./img/robot.png");
AM.queueDownload("./img/tank_red2Barrell.png");
AM.queueDownload("./img/snowball_01.png");


AM.queueDownload("./img/TankSprites/vehicleA.png")
AM.queueDownload("./img/TankSprites/vehicleB.png")
AM.queueDownload("./img/TankSprites/vehicleC.png")


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    var tanks = [];
    var background = new Background(gameEngine, AM.getAsset("./img/grass.png"));
    var barrell = new Barrell(gameEngine);
    //var bulletfire = new BulletFire(gameEngine);

    var desert = new Desert(gameEngine);                                                  // the map----desert Jerry did

    var explosion = new Explosion(                                                        
        gameEngine /*, AM.getAsset("./img/Explosion_A.png") */
    );

    var tank = new Tank(gameEngine);                                                      // the tank Roman and Ross did
    var enemy = new Enemy(gameEngine);                                                    // the enemy robot Roman did
    // var enviornment = new Enviornment(gameEngine);


    // var vehicle = new Vehicles(gameEngine);

    gameEngine.addEntity(desert);
    gameEngine.addEntity(tank);
    tanks.push(tank);
    gameEngine.addEntity(enemy);
    tanks.push(enemy);


    gameEngine.tanks = tanks;

    // gameEngine.addEntity(barrell);

    // gameEngine.addEntity(vehicle);
    // gameEngine.addEntity(enviornment); // block the way

    //var enviornment2 = new Enviornment(gameEngine);

    //  gameEngine.addEntity(explosion);
    //  gameEngine.addEntity(bulletfire);



    

    console.log("All Done!");
});