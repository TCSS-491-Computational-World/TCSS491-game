var AM = new AssetManager();

// function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
//     this.spriteSheet = spriteSheet;
//     this.frameWidth = frameWidth;
//     this.frameDuration = frameDuration;
//     this.frameHeight = frameHeight;
//     this.sheetWidth = sheetWidth;
//     this.frames = frames;
//     this.totalTime = frameDuration * frames;
//     this.elapsedTime = 0;
//     this.loop = loop;
//     this.scale = scale;
// }

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
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
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
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
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}
// Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//     this.elapsedTime += tick;
//     if (this.isDone()) {
//         if (this.loop) this.elapsedTime = 0;
//     }
//     var frame = this.currentFrame();
//     var xindex = 0;
//     var yindex = 0;
//     xindex = frame % this.sheetWidth;
//     yindex = Math.floor(frame / this.sheetWidth);

//     ctx.drawImage(this.spriteSheet,
//                  xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
//                  this.frameWidth, this.frameHeight,
//                  x, y,
//                  this.frameWidth * this.scale,
//                  this.frameHeight * this.scale);
// }

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game , spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    //console.log(spriteSheet + " sssssss ");
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};


function Explosion(game, /*spritesheet /*, myX, myY */) {
    this.animation = new Animation(AM.getAsset("./img/Explosion_A.png"), 0, 0, 256, 256, .1, 5, true, false);
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

    //if(this.game.click){
        //console.log(this.game.click.x + "jheehehhehe")
        //console.log("xxxxxxx " + this.game.click.x);
        //this.x += this.game.clockTick * this.speed
        //this.x += this.game.clockTick * this.speed;
        //if (this.x > 800) this.x = -230;
        Entity.prototype.update.call(this);
    //}
    
}

Explosion.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Tank(game /*, spritesheet */ ) {
    //this.animation = new Animation(spritesheet, 44, 75, 1, 0.15, 1, true, 1.0);

    this.animation = new Animation(AM.getAsset("./img/Tank_fire_red.png"), 0, 0, 44, 75, 1, 1, true, false);
    this.speed = 50;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 300);
}

Tank.prototype = new Entity();
Tank.prototype.constructor = Tank;

Tank.prototype.update = function () {

    //if(this.game.click){
        this.x += this.game.clockTick * this.speed;
        //console.log("Location of tank: " + this.x);
        if (this.x > 800) this.x = -230;
        Entity.prototype.update.call(this);
    //}
    
    
}

Tank.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function BulletFire(game/*, distance */) {
    //this.distance = distance;
    //AM.getAsset("./img/bullet_red.png")
    //this.animation = new Animation(AM.getAsset("./img/bullet_red.png"), 95, 68, 1, (800 * .00265), 1, false, 1.0);
    this.animation = new Animation(AM.getAsset("./img/bullet_red.png"),0 ,0, 95, 68, (800 * 0.00265), 1, false, false); //takes 2.12 seconds to go 800pixels right (0.00265) = constant at speed 350
    //this.animation = new Animation(spritesheet, 95, 68, 1, (800 * 0.00265), 1, true, 1.0); //takes 2.12 seconds to go 800pixels right (0.00265) = constant at speed 350
    this.speed = 350;
    this.ctx = game.ctx;
    this.fire = false;
    //this.x = 200;
    //this.startX = 0;
    //this.startY = 0;
    Entity.call(this, game, 0, 400);
}

BulletFire.prototype = new Entity();
BulletFire.prototype.constructor = BulletFire;

BulletFire.prototype.update = function () {

    if(this.game.click) this.fire = true;
    if(this.fire){

        //console.log("hahaha");
        if (this.animation.isDone()) {
            this.animation.elapsedTime = 0;
            this.fire = false;
        }
        
        this.x += this.game.clockTick * this.speed;
        //this.x += 350;
        if (this.x > 800) this.x = -230;
        Entity.prototype.update.call(this);
    }
    
    
}

BulletFire.prototype.draw = function () {
    if(this.fire){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    
    }
       
       
}

BulletFire.prototype.mouseclick = function(){
    //console.log("hahahah");
    //this.update;

    // document.getElementById("ctx").onclick = function() {
    //     myFunction();
    // }

    // function myFunction(){
    //     document.getElementById("ctx").innerHTML = ' YOU CLICKED ME';
    // }
}




function Enviornment(game) {
    //this.x = myX;
    //this.y = myY;
    //this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    
};


Enviornment.prototype.draw = function () {
    this.ctx.drawImage(AM.getAsset("./img/Decor_Items/Container_A.png"),
                  500, 380);
                  
     this.ctx.drawImage(AM.getAsset("./img/Puddle_01.png"),
                  100, 150);
        
};


Enviornment.prototype.update = function () {
};



AM.queueDownload("./img/grass.png");
AM.queueDownload("./img/Explosion_A.png");
AM.queueDownload("./img/Explosion_C.png");
AM.queueDownload("./img/Tank_fire_red.png");
AM.queueDownload("./img/Puddle_01.png");
AM.queueDownload("./img/bullet_red.png");
AM.queueDownload("./img/Decor_Items/Container_A.png");

AM.downloadAll(function () {
    
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    var background =  new Background(gameEngine, AM.getAsset("./img/grass.png"));
    var tank = new Tank(gameEngine);
    var enviornment = new Enviornment(gameEngine);
    //var enviornment2 = new Enviornment(gameEngine);
    var explosion  =  new Explosion(gameEngine /*, AM.getAsset("./img/Explosion_A.png") */);
    var bulletfire = new BulletFire(gameEngine);

     gameEngine.addEntity(background);
     gameEngine.addEntity(tank);
     gameEngine.addEntity(enviornment);
     //gameEngine.addEntity(enviornment2);

     gameEngine.addEntity(explosion);
     gameEngine.addEntity(bulletfire);


    // gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/grass.png")));
    // gameEngine.addEntity(new Tank(gameEngine, AM.getAsset("./img/Tank_fire_red.png")));
    // gameEngine.addEntity(new BulletFire(gameEngine, AM.getAsset("./img/bullet_red.png"), 800));
    // gameEngine.addEntity(new Enviornment(gameEngine, AM.getAsset("./img/Puddle_01.png"), 100, 200));
    // gameEngine.addEntity(new Enviornment(gameEngine, AM.getAsset("./img/Decor_Items/Container_A.png"), 100, 500));
    // gameEngine.addEntity(new Explosion(gameEngine, AM.getAsset("./img/Explosion_A.png"), 0, 400));
    // gameEngine.addEntity(new Explosion(gameEngine, AM.getAsset("./img/Explosion_C.png"), 150, 400));
    // console.log(gameEngine.entities[2].x);
    

    console.log("All Done!");
});