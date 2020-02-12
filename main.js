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
        console.log("anyhintg hapalokhohiahskjdhakjdshlkdajhsjlkdahslkj");
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



//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________





// // // Vehicles class
// function Vehicles(game) {
//     console.log("Where is my vehicles");
//     this.firstAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleA.png"), 256, 256, 4, 0.10, 4, true, 1);
//     // this.secondAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleB.png"), 256,256,4,0.1, 4, true,1);
//     // this.thirdAnimation = new Animation(AM.getAsset("./img/TankSprites/vehicleC.png"), 256,256,4,0.1, 4, true,1);
//     this.x = 240;
//     this.y = 285;
//     this.speed = 0; 
//     this.game = game;
//     this.ctx = game.ctx;

//     // Entity.call(this, game, 240, 285);
// }

// Vehicles.prototype.draw = function () {
//     this.firstAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     // this.secondAnimation.drawImage(this.game.clockTick, this.ctx,this.x+100,this.y);
//     // this.thirdAnimation.drawImage(this.game.clockTick,this.ctx, this.x+200, this.y);
//     Entity.prototype.draw.call(this);
// }

// Vehicles.prototype.update = function () {
//     if (this.firstAnimation.elapsedTime < this.firstAnimation.totalTime * 8 / 4)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }









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
AM.queueDownload("./img/tank_red.png");
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