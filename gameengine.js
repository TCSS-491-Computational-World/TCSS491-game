window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() { 
    this.tanks = []
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.click = null;
    this.mouse = null;
    this.rightclick = null;
    // this.keyboard = null;
    this.keyboard = [W = false,A = false,S = false,D = false]

    this.camera = null;         // Brandi did Camera

    this.path = null            // path for all tanks or enemy vehicles and the path only stop when meeting buildings,trees, or walls, not all vehicles.
    this.map = null;            // the whole map   Jerry did
    this.walls = null           // the walls' location  Jerry did
    this.buildings = null;      // the buildings    Jerry did 
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();

    var health=100;
    ctx.fillStyle="#FF0000";
    ctx.fillRect(0,0,(health/100)*140,25);


    this.startInput();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        // if (x < 1024) {
        //     x = Math.floor(x / 32);
        //     y = Math.floor(y / 32);
        // }

        return { x: x, y: y };
    }
    var that = this;

    // event listeners are added here

    this.ctx.canvas.addEventListener("click", function (e) {
        that.click = getXandY(e);
        // console.log(e);
        // console.log("Left Click Event - X,Y " + e.clientX + ", " + e.clientY);
        // document.getElementById("ctx").onclick = function() {
        //      document.getElementById("ctx").innerHTML = ' YOU CLICKED ME';
        // }
    
        
        //BulletFire.prototype.mouseclick;
    }, false);


    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        that.click = getXandY(e);
        // console.log(e);
        // console.log("Right Click Event - X,Y " + e.clientX + ", " + e.clientY);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        //console.log(e);
        that.mouse = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("mousewheel", function (e) {
        // console.log(e);
        that.wheel = e;
        // console.log("wheeling Event - X,Y " + e.clientX + ", " + e.clientY + " Delta " + e.deltaY);
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        console.log(e);
        console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
        if(e.keyCode === 87){ //up
            that.keyboard[0] = true;
        } 
        if(e.keyCode === 68){ //right
            that.keyboard[3] = true;
        } 
        if(e.keyCode === 83){ //down
            that.keyboard[2] = true;
        } 
        if(e.keyCode === 65){//left
            that.keyboard[1] = true;
        } 
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keypress", function (e) {
        if (e.code === "KeyD") that.d = true;
        that.chars[e.code] = true;
        console.log(e);
        console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        console.log(e);
        console.log("Key Up Event - Char " + e.code + " Code " + e.keyCode);
        if(e.keyCode === 87){ //up
            that.keyboard[0] = false;
        }
        if(e.keyCode === 68){ //right
            that.keyboard[3] = false;
        }
        if(e.keyCode === 83){ //down
            that.keyboard[2] = false;
        }
        if(e.keyCode === 65){//left
            that.keyboard[1] = false;
        }
        e.preventDefault();
    }, false);

    console.log('Input started');
}














GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    //var tanksCount = this.tanks.length;
    
    // for (var i = 0; i < tanksCount; i++) {

    //     var tank = this.tanks[i];

    //     if(!tank.removeFromWorld){
    //         tank.update();
    //     }
        
    // }

    // for (var i = this.tanks.length - 1; i >= 0; --i) {
    //     if (this.tanks[i].removeFromWorld) {
    //         this.tanks.splice(i, 1);
    //         //console.log("removed from world");
    //     }
    // }

    for (var i = 0; i < entitiesCount; i++) {

        var entity = this.entities[i];

        if(!entity.removeFromWorld){
            entity.update();
        }
        
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
            //console.log("removed from world");
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.click = null;
    this.rightclick = null;
    this.mouse = null;
    // this.keyboard = null;
    this.keyboard = [this.keyboard[0], this.keyboard[1], this.keyboard[2], this.keyboard[3]];
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
    
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}