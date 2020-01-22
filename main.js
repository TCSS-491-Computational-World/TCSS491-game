var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

MushroomDude.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

MushroomDude.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}


// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

Cheetah.prototype = new Entity();
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Cheetah.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
// function Guy(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 154, 215, 4, 0.15, 8, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
// }

// Guy.prototype = new Entity();
// Guy.prototype.constructor = Guy;

// Guy.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Guy.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

function Tank(game, spritesheet) {
    this.animation = new Animation(spritesheet, 44, 75, 1, 0.15, 1, true, 1.2);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 400);
}

Tank.prototype = new Entity();
Tank.prototype.constructor = Tank;

Tank.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Tank.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


function Enviornment(game, spritesheet, myX, myY) {
    this.x = myX;
    this.y = myY;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    
};


Enviornment.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                  this.x, this.y);
};


Enviornment.prototype.update = function () {
};

//AM.queueDownload("./img/RobotUnicorn.png");
//AM.queueDownload("./img/guy.jpg");
//AM.queueDownload("./img/mushroomdude.png");
//AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/Metal_001_Diffuse.png");

//AM.queueDownload("./img/tank_red.png")
AM.queueDownload("./img/Tank_fire_red.png")
AM.queueDownload("./img/Puddle_01.png")

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();


    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Metal_001_Diffuse.png")));
    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    //gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));
    //gameEngine.addEntity(new Tank(gameEngine, AM.getAsset("./img/tank_red.png")));
    gameEngine.addEntity(new Tank(gameEngine, AM.getAsset("./img/Tank_fire_red.png")));
    gameEngine.addEntity(new Enviornment(gameEngine, AM.getAsset("./img/Puddle_01.png"), 100, 200));

    console.log("All Done!");
});