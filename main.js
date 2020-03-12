var AM = new AssetManager();

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
function Background(game) {
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
    // this.clicked = false;
}

Background.prototype.draw = function () {
    //console.log(spriteSheet + " sssssss ");
    // this.ctx.drawImage(this.spritesheet, this.x, this.y);
    if (MapSelection) {
        //select Map 
        this.ctx.fillStyle = 'black';
        // console.log(this.game.camera.x);
        this.ctx.fillRect(this.x, this.y, 1000,600);

        // desert map seleciton.
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x +200, this.y+180, 250,200);
        this.ctx.drawImage(AM.getAsset("./img/background/desert.jpg"),this.x+200, this.y +180, 250,200);
        // forest map selection.
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x +550, this.y+180, 250,200);
        this.ctx.drawImage(AM.getAsset("./img/background/forest.jpg"),this.x+550, this.y +180, 250,200);

    }

    // if (gameOver) {
    //     this.ctx.fillStyle = 'black';
    //     this.ctx.fillRect(0,0,2500,2500);
    //     this.ctx.font = "56px Arial";
    //     // this.ctx.strokeStyle = "#F5E616";

    // }

};

Background.prototype.update = function () {
    // for (var i = 0; i < this.game.entities.length; i++) {
    //     console.log(this.game.entities[i].constructor.name);
    // }
    if (!updatedMap) {
        for (var i = 0; i < this.game.entities.length; i++) {
            if (this.game.entities[i].constructor.name === MapType) {
                this.game.entities.splice(i,1);
            }
            // if (this.game.) {

            // }
        }
        
        updatedMap = true;
    }
};

//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________
//________________________________________________________________________________________________________









AM.queueDownload("./img/forest/grass03.png"); //grass background for forest
AM.queueDownload("./img/forest/forest1.png"); // forest1
AM.queueDownload("./img/forest/forest2.png"); // forest2
AM.queueDownload("./img/forest/forest3.png"); // forest3
AM.queueDownload("./img/forest/castle.png");

AM.queueDownload("./img/background/desert.jpg");
AM.queueDownload("./img/background/forest.jpg");

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
// merge
AM.queueDownload("./img/tank_red8D.png");
AM.queueDownload("./img/tank_green8D.png");

AM.queueDownload("./img/tank_red.png");
AM.queueDownload("./img/Puddle_01.png");
AM.queueDownload("./img/coin2.png");
AM.queueDownload("./img/healthPack.png");
AM.queueDownload("./img/bullet_red_2.png");
AM.queueDownload("./img/Decor_Items/Container_A.png");
AM.queueDownload("./img/robot.png");
AM.queueDownload("./img/tank_red2Barrell.png");
//merge
AM.queueDownload("./img/tank_green2Barrell.png");

AM.queueDownload("./img/snowball_01.png");


AM.queueDownload("./img/TankSprites/vehicleA.png")
AM.queueDownload("./img/TankSprites/vehicleB.png")
AM.queueDownload("./img/TankSprites/vehicleC.png")



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    // var url = canvas.toDataURL();
    // console.log(url);
    var ctx = canvas.getContext("2d");
    // Level
    canvas.level = parseInt(location.search.split('level=')[1]);
    // console.log(canvas.level);                           // passing the level

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();


    var tanks = [];



    var tank = new Tank(gameEngine);                                                        // the tank Roman and Ross did
    var enemytank1 = new EnemyTank(gameEngine, 2200, 700);
    var enemytank2 = new EnemyTank(gameEngine , 500, 2200);
    var enemytank3 = new EnemyTank(gameEngine , 400, 400);  
    var enemytank4 = new EnemyTank(gameEngine, 1700, 500);
    var enemytank5 = new EnemyTank(gameEngine , 1000, 1400);
    var enemytank6 = new EnemyTank(gameEngine , 800, 1300);  
    // var enemyRobot = new Robot(gameEngine, 400, 400);                                                       // the enemy robot Roman did

    tanks.push(tank);
    tanks.push(enemytank1);
    tanks.push(enemytank2);
    tanks.push(enemytank3);
    tanks.push(enemytank4);
    tanks.push(enemytank5);
    tanks.push(enemytank6);


    // tanks.push(enemy);
    gameEngine.tanks = tanks;
    var gameScore = new Score(gameEngine, 0); //game score for player
    var camera = new Camera(gameEngine,gameEngine.tanks[0].x,gameEngine.tanks[0].y,1000,600);   // camera on our tank
    var desert = new Desert(gameEngine);  
    var background = new Background(gameEngine);
    // var forest = new Forest(gameEngine);
    gameEngine.map = desert.grid;                                                           // the map----desert Jerry did
    // gameEngine.map = forest.grid;
    gameEngine.camera = camera;

    gameEngine.addEntity(desert);                                                           // desert map Jerry did
    // gameEngine.addEntity(forest);
    gameEngine.addEntity(tank);
    gameEngine.addEntity(enemytank1);
    gameEngine.addEntity(enemytank2);
    gameEngine.addEntity(enemytank3);
    gameEngine.addEntity(enemytank4);
    gameEngine.addEntity(enemytank5);
    gameEngine.addEntity(enemytank6);
    // gameEngine.addEntity(enemyRobot);
    // gameEngine.addEntity(enemy);
    gameEngine.addEntity(camera);
    gameEngine.addEntity(gameScore);
    gameEngine.addEntity(background);



    

    console.log("All Done!");
});