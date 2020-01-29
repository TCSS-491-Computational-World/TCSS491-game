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

function BulletFire(game) {
    //this.distance = distance;

    this.cursorAnimation = new Animation(
        AM.getAsset("./img/cursor.png"),
        0,
        0,
        19,
        19,
        20,
        1,
        true,
        false
    );

    this.speed = 10;
    this.ctx = game.ctx;
    this.fire = false;
    this.timeA = null;
    this.cursor = false;
    this.cursorX;
    this.cursorY;
    this.endX = 0;
    this.endY = 0;
    Entity.call(this, game, 0, 400);
}

BulletFire.prototype = new Entity();
BulletFire.prototype.constructor = BulletFire;

BulletFire.prototype.update = function () {
    if (this.game.click) {
        this.fire = true;
        // this.currentX = this.game.click.x;
        // this.currentY = this.game.click.y;
        this.endX = this.game.click.x;
        this.endY = this.game.click.y;
        this.x = 0;
        this.y = 0;
        this.timeA = Math.sqrt(
            Math.pow(this.endX - this.x, 2) + Math.pow(this.endY - this.x, 2)
        ); // the hypotneuse
        //console.log("TIMES :" + this.timeA);

        //this.animation.frameDuration = this.timeA * 1;
        //console.log("MY X:" , this.x);
        //this.y = this.game.click.y;
    }
    if (this.fire) {

        this.x += this.speed;

        if (this.x > this.endX) {
            this.fire = false;
            this.x = 0;
        }

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
        this.ctx.drawImage(
            AM.getAsset("./img/bullet_onlyred.png"),
            0,
            0,
            25,
            7,
            this.x,
            this.y,
            25,
            7
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

BulletFire.prototype.mouseclick = function () {
    //console.log("hahahah");
    //this.update;
    // document.getElementById("ctx").onclick = function() {
    //     myFunction();
    // }
    // function myFunction(){
    //     document.getElementById("ctx").innerHTML = ' YOU CLICKED ME';
    // }
};

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Desert(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Desert.prototype = new Entity();
Desert.prototype.constructor = Desert;

Desert.prototype.update = function () { };

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
    drawGrid(ctx);
    setUpComponents(ctx); // It should install in environment.

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
            if (i % 10 === 2 && j % 7 === 4) {
                ctx.drawImage(
                    AM.getAsset("./img/background/crate.png"),
                    i * w,
                    j * w,
                    w,
                    w
                );
            }

            // drawing health bonus
            if (i === 1 && j === 1) {
                ctx.drawImage(
                    AM.getAsset("./img/background/HP_Bonus.png"),
                    i * w,
                    j * w,
                    150 * 0.25,
                    200 * 0.25
                );
            }

            // drawing big tree
            if (i === 5 && j === 5) {
                ctx.drawImage(
                    AM.getAsset("./img/background/tree2.png"),
                    i * w,
                    j * w,
                    150,
                    200
                );
            }
            // drawing small tree
            if (i === 9 && j === 6) {
                ctx.drawImage(
                    AM.getAsset("./img/background/tree1.png"),
                    i * w,
                    j * w,
                    100,
                    150
                );
            }
        }
    }
}

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Enviornment(game) {
    //this.x = myX;
    //this.y = myY;
    //this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Enviornment.prototype.draw = function () {
    this.ctx.drawImage(
        AM.getAsset("./img/Decor_Items/Container_A.png"),
        600,
        380
    );

    this.ctx.drawImage(AM.getAsset("./img/Puddle_01.png"), 700, 220);
};

Enviornment.prototype.update = function () { };

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Explosion(game /*spritesheet /*, myX, myY */) {
    this.animation = new Animation(
        AM.getAsset("./img/Explosion_A.png"),
        0,
        0,
        256,
        256,
        0.1,
        5,
        true,
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
        true,
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

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, .3);
    this.explosionTwoAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 200, this.y, .3);
    Entity.prototype.draw.call(this);
};

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________

function Tank(game, spritesheet) {
    //this.animation = new Animation(spritesheet, 44, 75, 1, 0.15, 1, true, 1.0);

    this.moveDownAnimation = new Animation(
        AM.getAsset("./img/tank_red.png"),
        0,
        0,
        50,
        50,
        1,
        1,
        true,
        false
    );
    this.moveRightAnimation = new Animation(
        AM.getAsset("./img/tank_red.png"),
        50,
        0,
        50,
        50,
        1,
        1,
        true,
        false
    );
    this.moveUpAnimation = new Animation(
        AM.getAsset("./img/tank_red.png"),
        100,
        0,
        50,
        50,
        1,
        1,
        true,
        false
    );
    this.moveLeftAnimation = new Animation(
        AM.getAsset("./img/tank_red.png"),
        150,
        0,
        50,
        50,
        1,
        1,
        true,
        false
    );

    //this.moveRightTankAnimation = new Animation(AM.getAsset("./img/tank_red.png"), 0, 0, 44, 75, 1, 1, true, false);

    this.moveDownRobotAnimation = new Animation(
        AM.getAsset("./img/robot.png"),
        0,
        0,
        73,
        60,
        1,
        1,
        true,
        false
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
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.lastMove = "none";
    this.hero = false;
    this.speed = 10;
    this.ctx = game.ctx;
    this.x = 100;
    this.y = 100;
    Entity.call(this, game, 300, 300);
}

Tank.prototype = new Entity();
Tank.prototype.constructor = Tank;

Tank.prototype.update = function () {
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
    //if(this.game.click){
    //this.x += this.game.clockTick * this.speed;
    //console.log("Location of tank: " + this.x);
    //if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
    //}
};

Tank.prototype.draw = function () {
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

    Entity.prototype.draw.call(this);
};

AM.queueDownload("./img/background/desertTile.png");
AM.queueDownload("./img/background/crate.png");
AM.queueDownload("./img/background/tree2.png");
AM.queueDownload("./img/background/tree1.png");
AM.queueDownload("./img/background/HP_Bonus.png");

AM.queueDownload("./img/cursor.png");
AM.queueDownload("./img/grass.png");
AM.queueDownload("./img/Explosion_A.png");
AM.queueDownload("./img/Explosion_C.png");
AM.queueDownload("./img/tank_red.png");
AM.queueDownload("./img/Puddle_01.png");
AM.queueDownload("./img/bullet_onlyred.png");
AM.queueDownload("./img/Decor_Items/Container_A.png");
AM.queueDownload("./img/robot.png");
AM.queueDownload("./img/tank_red2Barrell.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    var background = new Background(gameEngine, AM.getAsset("./img/grass.png"));
    var barrell = new Barrell(gameEngine);
    var bulletfire = new BulletFire(gameEngine);

    var desert = new Desert(gameEngine);

    var explosion = new Explosion(
        gameEngine /*, AM.getAsset("./img/Explosion_A.png") */
    );

    var tank = new Tank(gameEngine);
    var enviornment = new Enviornment(gameEngine);

    //var enviornment2 = new Enviornment(gameEngine);

    gameEngine.addEntity(desert);
    //  gameEngine.addEntity(background);
    gameEngine.addEntity(tank);
    gameEngine.addEntity(barrell);
    gameEngine.addEntity(enviornment); // block the way
    //gameEngine.addEntity(enviornment2); // can cross
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