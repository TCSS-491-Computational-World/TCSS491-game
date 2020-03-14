//尝试知道每个格子都有什么 contains for each c
function Cell(theX, theY, theContain) {
    this.x = theX;
    this.y = theY;
    this.contains = theContain;
}

// Map setting
function setUpForest() {
    this.wall = AM.getAsset("./img/background/crate.png");
    this.healthPack = AM.queueDownload("./img/healthPack.png");
    // this.roofFirst = AM.getAsset("./img/rooftop.png"); // first roofTop
    //this.roofSecond = AM.getAsset("./img/roof.png"); // second roof
    this.castle = AM.getAsset("./img/forest/castle.png"); // castle 
    this.forestOne = AM.getAsset("./img/forest/forest1.png"); // forest1
    this.forestTwo = AM.getAsset("./img/forest/forest2.png"); // forest1
    this.forestThree = AM.getAsset("./img/forest/forest3.png"); // forest1

    this.tree = AM.getAsset("./img/background/tree1.png"); // first tree
    var w = 50;
    var grid = new Array(50);
    for (let i = 0; i < 50; i++) {
        grid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            // In this if statement, it will set all walls and create a new componet with 'w' as signal for wall
            if (
                // border with 2 small trees
                (i === 0 && j === 7) ||
                (i === 0 && j === 17) ||
                (i === 0 && j === 25) ||
                (i === 48 && j === 22) ||
                (i === 2 && j === 48) ||
                (i === 20 && j === 29) ||
                (i === 26 && j === 32) ||
                (i === 27 && j === 35) ||
                (i === 42 && j === 44) ||
                (i === 47 && j === 0)
            ) {
                grid[i][j] = new Cell(
                    i,
                    j,
                    new Component(this.forestTwo, i * w, j * w, 100, 100, "t",i*w,j*w,72,68) // checked
                );
            } else if (
                // draw tree border West
                (i === 0 && j === 5) ||
                (i === 0 && j === 6) ||
                (i === 0 && j === 8) ||
                (i === 0 && j === 15) ||
                (i === 0 && j === 16) ||
                (i === 0 && j === 19) ||
                (i === 0 && j === 22) ||
                (i === 0 && j === 24) ||
                (i === 0 && j === 28) ||
                (i === 0 && j === 29) ||
                (i === 0 && j === 30) ||
                (i === 0 && j === 33) ||
                (i === 0 && j === 34) ||
                (i === 0 && j === 38) ||
                (i === 0 && j === 49) ||
                (i === 0 && j === 48) ||
                //draw a tree border North
                (i === 5 && j === 0) ||
                (i === 5 && j === 1) ||
                (i === 6 && j === 0) ||
                (i === 17 && j === 0) ||
                (i === 19 && j === 0) ||
                (i === 20 && j === 0) ||
                (i === 25 && j === 0) ||
                (i === 26 && j === 0) ||
                (i === 28 && j === 0) ||
                (i === 32 && j === 0) ||
                (i === 34 && j === 0) ||
                (i === 35 && j === 0) ||
                (i === 45 && j === 0) ||
                (i === 46 && j === 0) ||
                (i === 48 && j === 0) ||
                (i === 49 && j === 0) ||
                //draw a tree border East
                (i === 49 && j === 0) ||
                (i === 48 && j === 1) ||
                (i === 48 && j === 12) ||
                (i === 48 && j === 21) ||
                (i === 48 && j === 33) ||
                (i === 48 && j === 48) ||
                (i === 48 && j === 49) ||
                //Tree border south
                (i === 1 && j === 48) ||
                (i === 11 && j === 48) ||
                (i === 12 && j === 49) ||
                (i === 22 && j === 49) ||
                (i === 24 && j === 48) ||
                (i === 28 && j === 49) ||
                (i === 31 && j === 48) ||
                (i === 32 && j === 48) ||
                (i === 36 && j === 48) ||
                (i === 40 && j === 46) ||
                (i === 41 && j === 46) ||
                (i === 42 && j === 45) ||
                (i === 43 && j === 46) ||
                (i === 44 && j === 45) ||
                (i === 48 && j === 48) ||
                //around objects
                (i === 20 && j === 30) ||
                (i === 20 && j === 29) ||
                (i === 40 && j === 42) ||
                (i === 20 && j === 26) ||
                (i === 20 && j === 23) || 
                (i === 22 && j === 24) || 
                (i === 24 && j === 24) ||
                (i === 26 && j === 24)

            ) {
                // Forest Tree One
                grid[i][j] = new Cell(
                    i,
                    j,
                    // new Component(this.forestOne, i * w, j * w, 200, 150, "t",i*w,j*w,10,10) // checked
                    new Component(this.forestOne, i * w, j * w, 200, 150, "t",i*w,j*w,165,130) // checked
                );
            } 
            else if (
                // draw a big tree  !!!!!NO BOUNDING BOX
                (i === 0 && j === 1) ||
                (i === 1 && j === 0) ||
                (i === 44 && j === 1) ||
                (i === 46 && j === 2) ||
                (i === 46 && j === 4) ||
                (i === 43 && j === 1) ||
                (i === 41 && j === 0) ||
                (i === 11 && j === 3) ||
                (i === 13 && j === 4) ||
                (i === 15 && j === 7) ||
                (i === 36 && j === 30) ||
                (i === 37 && j === 31) ||
                (i === 33 && j === 48) ||
                (i === 40 && j === 43) ||
                (i === 43 && j === 42) ||
                (i === 15 && j === 33)
            ) {
                //draw a bigger tree
                grid[i][j] = new Cell(
                    i,
                    j,
                    new Component(this.forestOne, i * w, j * w, 250-30, 200-30, "t", i * w, j*w,190,140) // checked
                );
            } else if (
                // Jerry trees

                // (i === 18 && j === 16) ||
                i === 17 &&
                j === 17
            ) {
                grid[i][j] = new Cell(
                    i,
                    j,
                    // image,
                    // x,
                    // y,
                    // width,
                    // height,
                    // type,
                    // boundingX,
                    // boundingY,
                    // boundingWidth,
                    // boundingHeight
                    new Component(this.forestTwo, i * w, j * w, 100, 100, "t" , i * w, j * w, 72, 68) // checked
                );
            } else if (i === 24 && j === 26) {
                //castle roof
                grid[i][j] = new Cell(
                    i,
                    j,
                    new Component(this.castle, i * w, j * w, 250,200, "r",i * w, j * w, 250,200) // checked
                );
            } else if ( i === 5 && j === 5){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 10 && j === 10){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 15 && j === 15){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 20 && j === 20){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 30 && j === 30){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 35 && j === 35){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else {
                grid[i][j] = new Cell(i, j, 0);
            }
        }
    }

    return grid;
}

// check where is path only for the buildings or walls
function checkPath(game) {
    // console.log(grid);
    // console.log(game.map.length);
    var path = [];
    for (let i = 0; i < game.map.length; i++) {
        for (let j = 0; j < game.map[i].length; j++) {
            // console.log(game.map[i][j]);
            if (game.map[i][j].contains === 0) {
                path.push(game.map[i][j]);
                // console.log(game.map[i][j]);
            }
        }
    }

    // console.log(path.length);
    return path;
}

function checkWalls(game) {
    var walls = [];
    for (let i = 0; i < game.map.length; i++) {
        for (let j = 0; j < game.map[i].length; j++) {
            // console.log(grid[i][j].contains);
            if (game.map[i][j].contains.type === "w") {
                walls.push(game.map[i][j]);
            }
        }
    }
    // console.log(walls.length);                                           // double checked the amount of walls
    return walls;
}

function removeWalls(game) {
    var next = [];
    var newPath = game.path;
    // console.log("Before "+ game.path.length);
    for (let i = 0; i < game.walls.length; i++) {
        // console.log(game.walls[i] === wall);
        if (!game.walls[i].contains.removed) {
            next.push(game.walls[i]);
        } else {
            newPath.push(new Cell(game.walls[i].x, game.walls[i].y, 0));
        }
    }
    return { walls: next, path: newPath };
}

function checkBuilding(game) {
    var buildings = [];
    for (let i = 0; i < game.map.length; i++) {
        for (let j = 0; j < game.map[i].length; j++) {
            // console.log(grid[i][j].contains);
            if (
                game.map[i][j].contains.type === "r" ||
                game.map[i][j].contains.type === "t"
            ) {
                buildings.push(game.map[i][j]);
            }
        }
    }
    // console.log(buildings);
    return buildings;
}

function checkDesertPowerups(game){
    var powerups = [];
    for(let i = 0; i < game.map.length; i++){
        for(let j = 0; j < game.map[i].length; j++){
            if(game.map[i][j].contains.type === 'hp' || game.map[i][j].contains.type === 'ap'){
                //console.log("checks for POOOOOOWEEEEER");
                powerups.push(game.map[i][j]);
            }
        }
        
    }
    return powerups;
}
// once a powerup is drove over we remove it
function removeDesertPowerup(game){
    var next = [];
    //var newPath = game.path;
    // console.log("Before "+ game.path.length);
    for (let i = 0; i < game.powerups.length; i++) {
        // console.log(game.walls[i] === wall);
        if (!game.powerups[i].contains.removed) {
            next.push(game.powerups[i]);
        }
    }
    return {powerups:next};
}


// // Forest object
function Forest(game) {
    // this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false);
    this.healthPackAnimation = new Animation(AM.getAsset("./img/healthPack.png"), 0 , 0, 16, 16, 70, 4, true, false);
    this.forestGrass = AM.getAsset("./img/forest/grass03.png");
    this.radius = 200;
    this.game = game;
    this.ctx = game.ctx;
    this.grid = setUpForest(); // map

    //   console.log(this.grid);

    this.game.map = this.grid; // passing the whole map to gameEngine Jerry did
    this.path = checkPath(game);
    this.walls = checkWalls(game);
    this.buildings = checkBuilding(game);
    this.powerups = checkDesertPowerups(game);
    this.game.path = checkPath(game); // the path of the tank, except other vehicles Jerry did
    this.game.walls = checkWalls(game); // the path of the tank, except other vehicles Jerry did, work for bullet shot

    this.game.buildings = checkBuilding(game);
    Entity.call(this, game, 0, 400);
}

Forest.prototype = new Entity();
Forest.prototype.constructor = Forest;

//update
Forest.prototype.update = function() {
    // console.log(this.game.path.length);
    // var deleteElement;
    // walls removed and animation
    for (let i = 0; i < this.game.walls.length; i++) {
        if (this.game.walls[i].contains.cleanShot) {
            this.game.walls[i].contains.cleanShot = new Explosion(
                this.game,
                AM.getAsset("./img/Explosion_A.png"),
                true,
                this.game.walls[i].x * 50,
                this.game.walls[i].y * 50
            );
            this.game.addEntity(this.game.walls[i].contains.cleanShot);
            this.game.walls[i].contains.cleanShot = false;
            // console.log("I changed");
            this.game.walls[i].contains.removed = true;
            this.game.gameScore++;
        }
    }
    // buildings explosion // Something wrong
    for (let i = 0; i < this.game.buildings.length; i++) {
        if (this.game.buildings[i].contains.cleanShot) {
            this.game.buildings[i].contains.cleanShot = new Explosion(
                this.game,
                AM.getAsset("./img/Explosion_A.png"),
                true,
                this.game.buildings[i].x * 50,
                this.game.buildings[i].y * 50
            );
            this.game.addEntity(this.game.buildings[i].contains.cleanShot);
            this.game.buildings[i].contains.cleanShot = false;
            // console.log("I changed");
        }
    }

    for (let i = 0; i < this.game.powerups.length; i++) {
        if (this.game.powerups[i].contains.boundingbox.collide(this.game.tanks[0].boundingbox) && this.game.tanks[0].currentHealth != 200) {
            console.log("I changed");
            this.game.tanks[0].currentHealth += 50;
            this.game.powerups[i].contains.removed = true;
            //ADD LATER TO CHECK FOR COLLISION 
             
        }       
    }
    var tempP = removeDesertPowerup(this.game);
    this.game.powerups = tempP.powerups;

    var temp = removeWalls(this.game);
    // console.log(temp);                       // checked
    this.game.walls = temp.walls; // this method will remove wall from walls list
    this.game.path = temp.path; // add it to path list.
    Entity.prototype.update.call(this);
};

// draw the map
Forest.prototype.draw = function() {
    var w = 50;
    /* Draw all tiles on the map.
     */
    grid = new Array(50);
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            this.ctx.drawImage(
                this.forestGrass,
                i * w - this.game.camera.x,
                j * w - this.game.camera.y,
                w,
                w
            );
        }
    }

    /*
     *  Draw all components on the map
     */

    // draw walls // unneccesary
    // for (let i = 0; i < this.game.walls.length; i++) {
    //     if (
    //         this.game.walls[i].contains !== 0 &&
    //         !this.game.walls[i].contains.removed
    //     ) {
    //         this.ctx.drawImage(
    //             this.game.walls[i].contains.image,
    //             this.game.walls[i].contains.x - this.game.camera.x,
    //             this.game.walls[i].contains.y - this.game.camera.y,
    //             this.game.walls[i].contains.width,
    //             this.game.walls[i].contains.height
    //         );
    //     }
    // }
    // draw buildings and trees
    for (let i = 0; i < this.game.buildings.length; i++) {
        if (
            this.game.buildings[i].contains !== 0 &&
            this.game.buildings[i].contains.type === "r"
        ) {
            this.ctx.drawImage(
                this.game.buildings[i].contains.image,
                this.game.buildings[i].contains.x - this.game.camera.x,
                this.game.buildings[i].contains.y - this.game.camera.y,
                this.game.buildings[i].contains.width,
                this.game.buildings[i].contains.height
            );
    
            // this.ctx.strokeRect(this.game.buildings[i].contains.boundingX-this.game.camera.x, this.game.buildings[i].contains.boundingY-this.game.camera.y,
                                // this.game.buildings[i].contains.boundingWidth, this.game.buildings[i].contains.boundingHeight) ;

        } else if (
            this.game.buildings[i].contains !== 0 &&
            this.game.buildings[i].contains.type === "t"
        ) {
            this.ctx.drawImage(
                this.game.buildings[i].contains.image,
                this.game.buildings[i].contains.x - this.game.camera.x,
                this.game.buildings[i].contains.y - this.game.camera.y,
                this.game.buildings[i].contains.width,
                this.game.buildings[i].contains.height
            );

            // this.ctx.strokeRect(this.game.buildings[i].contains.boundingX-this.game.camera.x, this.game.buildings[i].contains.boundingY-this.game.camera.y,
                // this.game.buildings[i].contains.boundingWidth, this.game.buildings[i].contains.boundingHeight) ;

        }

        for (let i = 0; i < this.game.powerups.length; i++) {
            if (this.game.powerups[i].contains.type === 'hp'){
                // console.log("ISSSSS GOING PPPPP");
                this.healthPackAnimation.drawFrame(this.game.clockTick, this.ctx, this.game.powerups[i].contains.x - this.game.camera.x  + 20 ,
                     this.game.powerups[i].contains.y - this.game.camera.y + 20);
    
                    //  this.ctx.beginPath();
                    //  this.ctx.lineWidth = "2";
                    //  //if(this == this.game.tanks[this.distance])
                    //  this.ctx.strokeStyle = "pink";
                    //  this.ctx.rect(this.game.powerups[i].contains.boundingbox.x- this.game.camera.x, this.game.powerups[i].contains.boundingbox.x -this.game.camera.y , this.game.powerups[i].contains.boundingbox.width , this.game.powerups[i].contains.boundingbox.height );
                    //  this.ctx.stroke();
            }
     
        }
    }
    Entity.prototype.draw.call(this);
};

function drawGrid(game) {
    var w = 50;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            game.ctx.strokeRect(i * w - game.camera.x, j * w - game.camera.y, w, w);
        }
    }
}

// setting everything on the map
Forest.prototype.setUpComponents = function() {
    var w = 50;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            // drawing walls (crate)
            if (
                (i === 5 && j === 3) ||
                (i === 5 && j === 4) ||
                (i === 5 && j === 5) ||
                (i === 5 && j === 6) ||
                (i === 5 && j === 7) ||
                (i === 5 && j === 8) ||
                (i === 5 && j === 9) ||
                (i === 5 && j === 10) ||
                (i === 5 && j === 11) ||
                (i === 4 && j === 5) ||
                (i === 4 && j === 6) ||
                (i === 4 && j === 7) ||
                (i === 4 && j === 8)
            ) {
                this.ctx.drawImage(this.wall, i * w, j * w, w, w);
                grid[i][j].contains = "w";
            }
        }
    }
};


// //尝试知道每个格子都有什么 contains for each c
// function Cell(theX, theY, theContain) {
//     this.x = theX;
//     this.y = theY;
//     this.contains = theContain;
// }

// // Map setting
// function setUpForest() {
//     this.wall = AM.getAsset("./img/background/crate.png");
//     // this.roofFirst = AM.getAsset("./img/rooftop.png"); // first roofTop
//     //this.roofSecond = AM.getAsset("./img/roof.png"); // second roof
//     this.castle = AM.getAsset("./img/forest/castle.png"); // castle 
//     this.forestOne = AM.getAsset("./img/forest/forest1.png"); // forest1
//     this.forestTwo = AM.getAsset("./img/forest/forest2.png"); // forest1
//     this.forestThree = AM.getAsset("./img/forest/forest3.png"); // forest1

//     this.tree = AM.getAsset("./img/background/tree1.png"); // first tree
//     var w = 50;
//     var grid = new Array(50);
//     for (let i = 0; i < 50; i++) {
//         grid[i] = new Array(50);
//         for (let j = 0; j < 50; j++) {
//             // In this if statement, it will set all walls and create a new componet with 'w' as signal for wall
//             if (
//                 // border with 2 small trees
//                 (i === 0 && j === 7) ||
//                 (i === 0 && j === 17) ||
//                 (i === 0 && j === 25) ||
//                 (i === 48 && j === 22) ||
//                 (i === 2 && j === 48) ||
//                 (i === 20 && j === 29) ||
//                 (i === 26 && j === 32) ||
//                 (i === 27 && j === 35) ||
//                 (i === 42 && j === 44) ||
//                 (i === 47 && j === 0)
//             ) {
//                 grid[i][j] = new Cell(
//                     i,
//                     j,
//                     new Component(this.forestTwo, i * w, j * w, 100, 100, "t")
//                 );
//             } else if (
//                 // draw tree border West
//                 (i === 0 && j === 5) ||
//                 (i === 0 && j === 6) ||
//                 (i === 0 && j === 8) ||
//                 (i === 0 && j === 15) ||
//                 (i === 0 && j === 16) ||
//                 (i === 0 && j === 19) ||
//                 (i === 0 && j === 22) ||
//                 (i === 0 && j === 24) ||
//                 (i === 0 && j === 28) ||
//                 (i === 0 && j === 29) ||
//                 (i === 0 && j === 30) ||
//                 (i === 0 && j === 33) ||
//                 (i === 0 && j === 34) ||
//                 (i === 0 && j === 38) ||
//                 (i === 0 && j === 49) ||
//                 (i === 0 && j === 48) ||
//                 //draw a tree border North
//                 (i === 5 && j === 0) ||
//                 (i === 5 && j === 1) ||
//                 (i === 6 && j === 0) ||
//                 (i === 17 && j === 0) ||
//                 (i === 19 && j === 0) ||
//                 (i === 20 && j === 0) ||
//                 (i === 25 && j === 0) ||
//                 (i === 26 && j === 0) ||
//                 (i === 28 && j === 0) ||
//                 (i === 32 && j === 0) ||
//                 (i === 34 && j === 0) ||
//                 (i === 35 && j === 0) ||
//                 (i === 45 && j === 0) ||
//                 (i === 46 && j === 0) ||
//                 (i === 48 && j === 0) ||
//                 (i === 49 && j === 0) ||
//                 //draw a tree border East
//                 (i === 49 && j === 0) ||
//                 (i === 48 && j === 1) ||
//                 (i === 48 && j === 12) ||
//                 (i === 48 && j === 21) ||
//                 (i === 48 && j === 33) ||
//                 (i === 48 && j === 48) ||
//                 (i === 48 && j === 49) ||
//                 //Tree border south
//                 (i === 1 && j === 48) ||
//                 (i === 11 && j === 48) ||
//                 (i === 12 && j === 49) ||
//                 (i === 22 && j === 49) ||
//                 (i === 24 && j === 48) ||
//                 (i === 28 && j === 49) ||
//                 (i === 31 && j === 48) ||
//                 (i === 32 && j === 48) ||
//                 (i === 36 && j === 48) ||
//                 (i === 40 && j === 46) ||
//                 (i === 41 && j === 46) ||
//                 (i === 42 && j === 45) ||
//                 (i === 43 && j === 46) ||
//                 (i === 44 && j === 45) ||
//                 (i === 48 && j === 48) ||
//                 //around objects
//                 (i === 20 && j === 30) ||
//                 (i === 20 && j === 29) ||
//                 (i === 40 && j === 42) ||
//                 (i === 20 && j === 26)
//             ) {
//                 // Forest Tree One
//                 grid[i][j] = new Cell(
//                     i,
//                     j,
//                     new Component(this.forestOne, i * w, j * w, 200, 150, "t")
//                 );
//             } else if (
//                 // draw a big tree  !!!!!NO BOUNDING BOX
//                 (i === 0 && j === 1) ||
//                 (i === 1 && j === 0) ||
//                 (i === 44 && j === 1) ||
//                 (i === 46 && j === 2) ||
//                 (i === 46 && j === 4) ||
//                 (i === 43 && j === 1) ||
//                 (i === 41 && j === 0) ||
//                 (i === 11 && j === 3) ||
//                 (i === 13 && j === 4) ||
//                 (i === 15 && j === 7) ||
//                 (i === 36 && j === 30) ||
//                 (i === 37 && j === 31) ||
//                 (i === 33 && j === 48) ||
//                 (i === 40 && j === 43) ||
//                 (i === 43 && j === 42) ||
//                 (i === 15 && j === 33)
//             ) {
//                 //draw a bigger tree
//                 grid[i][j] = new Cell(
//                     i,
//                     j,
//                     new Component(this.forestOne, i * w, j * w, 250, 200, "t")
//                 );
//             } else if (
//                 // Jerry trees

//                 // (i === 18 && j === 16) ||
//                 i === 17 &&
//                 j === 17
//             ) {
//                 grid[i][j] = new Cell(
//                     i,
//                     j,
//                     // image,
//                     // x,
//                     // y,
//                     // width,
//                     // height,
//                     // type,
//                     // boundingX,
//                     // boundingY,
//                     // boundingWidth,
//                     // boundingHeight
//                     new Component(this.forestTwo, i * w, j * w, 100, 100, "t")
//                 );
//             } else if (i === 24 && j === 26) {
//                 //castle roof
//                 grid[i][j] = new Cell(
//                     i,
//                     j,
//                     new Component(this.castle, i * w, j * w, 250,200, "r")
//                 );
//             } else {
//                 grid[i][j] = new Cell(i, j, 0);
//             }
//         }
//     }

//     return grid;
// }

// // check where is path only for the buildings or walls
// function checkPath(game) {
//     // console.log(grid);
//     // console.log(game.map.length);
//     var path = [];
//     for (let i = 0; i < game.map.length; i++) {
//         for (let j = 0; j < game.map[i].length; j++) {
//             // console.log(game.map[i][j]);
//             if (game.map[i][j].contains === 0) {
//                 path.push(game.map[i][j]);
//                 // console.log(game.map[i][j]);
//             }
//         }
//     }

//     // console.log(path.length);
//     return path;
// }

// function checkWalls(game) {
//     var walls = [];
//     for (let i = 0; i < game.map.length; i++) {
//         for (let j = 0; j < game.map[i].length; j++) {
//             // console.log(grid[i][j].contains);
//             if (game.map[i][j].contains.type === "w") {
//                 walls.push(game.map[i][j]);
//             }
//         }
//     }
//     // console.log(walls.length);                                           // double checked the amount of walls
//     return walls;
// }

// function removeWalls(game) {
//     var next = [];
//     var newPath = game.path;
//     // console.log("Before "+ game.path.length);
//     for (let i = 0; i < game.walls.length; i++) {
//         // console.log(game.walls[i] === wall);
//         if (!game.walls[i].contains.removed) {
//             next.push(game.walls[i]);
//         } else {
//             newPath.push(new Cell(game.walls[i].x, game.walls[i].y, 0));
//         }
//     }
//     return { walls: next, path: newPath };
// }

// function checkBuilding(game) {
//     var buildings = [];
//     for (let i = 0; i < game.map.length; i++) {
//         for (let j = 0; j < game.map[i].length; j++) {
//             // console.log(grid[i][j].contains);
//             if (
//                 game.map[i][j].contains.type === "r" ||
//                 game.map[i][j].contains.type === "t"
//             ) {
//                 buildings.push(game.map[i][j]);
//             }
//         }
//     }
//     // console.log(buildings);
//     return buildings;
// }

// // component on map
// // function Component(
// //     image,
// //     x,
// //     y,
// //     width,
// //     height,
// //     type,
// //     boundingX,
// //     boundingY,
// //     boundingWidth,
// //     boundingHeight
// // ) {
// //     this.image = image;
// //     this.x = x;
// //     this.y = y;
// //     this.width = width; // limit width
// //     this.height = height; // limit height
// //     this.boundingX = boundingX || x;
// //     this.boundingY = boundingY || y;
// //     this.boundingWidth = boundingWidth || width;
// //     this.boundingHeight = boundingHeight || height;
// //     console.log({ width: this.boundingWidth, height: this.boundingWidth });
// //     this.type = type; // check the type of the component, like wall, building or tree etc.

// //     this.boundingbox = new BoundingBox(
// //         this.boundingX,
// //         this.boundingY,
// //         this.boundingWidth,
// //         this.boundingHeight
// //     ); // bounding box
// //     this.cleanShot = false; // working for bullet fire
// //     this.removed = false; // check if it needs to draw on the map
// // }
// // Component.prototype = new Entity();
// // Component.prototype.constructor = Component;

// // Component.prototype.draw = function() {};

// // Component.prototype.update = function() {};

// // // Forest object
// function Forest(game) {
//     // this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false);

//     this.forestGrass = AM.getAsset("./img/forest/grass03.png");
//     this.radius = 200;
//     this.game = game;
//     this.ctx = game.ctx;
//     this.grid = setUpForest();
//     //   console.log(this.grid);

//     this.game.map = this.grid; // passing the whole map to gameEngine Jerry did
//     this.game.path = checkPath(game); // the path of the tank, except other vehicles Jerry did
//     this.game.walls = checkWalls(game); // the path of the tank, except other vehicles Jerry did, work for bullet shot

//     this.game.buildings = checkBuilding(game);
//     Entity.call(this, game, 0, 400);
// }

// Forest.prototype = new Entity();
// Forest.prototype.constructor = Forest;

// //update
// Forest.prototype.update = function() {
//     // console.log(this.game.path.length);
//     // var deleteElement;
//     // walls removed and animation
//     for (let i = 0; i < this.game.walls.length; i++) {
//         if (this.game.walls[i].contains.cleanShot) {
//             this.game.walls[i].contains.cleanShot = new Explosion(
//                 this.game,
//                 AM.getAsset("./img/Explosion_A.png"),
//                 true,
//                 this.game.walls[i].x * 50,
//                 this.game.walls[i].y * 50
//             );
//             this.game.addEntity(this.game.walls[i].contains.cleanShot);
//             this.game.walls[i].contains.cleanShot = false;
//             // console.log("I changed");
//             this.game.walls[i].contains.removed = true;
//             this.game.gameScore++;
//         }
//     }
//     // buildings explosion // Something wrong
//     for (let i = 0; i < this.game.buildings.length; i++) {
//         if (this.game.buildings[i].contains.cleanShot) {
//             this.game.buildings[i].contains.cleanShot = new Explosion(
//                 this.game,
//                 AM.getAsset("./img/Explosion_A.png"),
//                 true,
//                 this.game.buildings[i].x * 50,
//                 this.game.buildings[i].y * 50
//             );
//             this.game.addEntity(this.game.buildings[i].contains.cleanShot);
//             this.game.buildings[i].contains.cleanShot = false;
//             // console.log("I changed");
//         }
//     }

//     var temp = removeWalls(this.game);
//     // console.log(temp);                       // checked
//     this.game.walls = temp.walls; // this method will remove wall from walls list
//     this.game.path = temp.path; // add it to path list.
//     Entity.prototype.update.call(this);
// };

// // draw the map
// Forest.prototype.draw = function() {
//     var w = 50;
//     /* Draw all tiles on the map.
//      */
//     grid = new Array(50);
//     for (let i = 0; i < 50; i++) {
//         for (let j = 0; j < 50; j++) {
//             this.ctx.drawImage(
//                 this.forestGrass,
//                 i * w - this.game.camera.x,
//                 j * w - this.game.camera.y,
//                 w,
//                 w
//             );
//         }
//     }

//     /*
//      *  Draw all components on the map
//      */

//     // draw walls // unneccesary
//     // for (let i = 0; i < this.game.walls.length; i++) {
//     //     if (
//     //         this.game.walls[i].contains !== 0 &&
//     //         !this.game.walls[i].contains.removed
//     //     ) {
//     //         this.ctx.drawImage(
//     //             this.game.walls[i].contains.image,
//     //             this.game.walls[i].contains.x - this.game.camera.x,
//     //             this.game.walls[i].contains.y - this.game.camera.y,
//     //             this.game.walls[i].contains.width,
//     //             this.game.walls[i].contains.height
//     //         );
//     //     }
//     // }
//     // draw buildings and trees
//     for (let i = 0; i < this.game.buildings.length; i++) {
//         if (
//             this.game.buildings[i].contains !== 0 &&
//             this.game.buildings[i].contains.type === "r"
//         ) {
//             this.ctx.drawImage(
//                 this.game.buildings[i].contains.image,
//                 this.game.buildings[i].contains.x - this.game.camera.x,
//                 this.game.buildings[i].contains.y - this.game.camera.y,
//                 this.game.buildings[i].contains.width,
//                 this.game.buildings[i].contains.height
//             );
    
//             this.ctx.strokeRect(this.game.buildings[i].contains.boundingX-this.game.camera.x, this.game.buildings[i].contains.boundingY-this.game.camera.y,
//                                 this.game.buildings[i].contains.boundingWidth, this.game.buildings[i].contains.boundingHeight) ;

//         } else if (
//             this.game.buildings[i].contains !== 0 &&
//             this.game.buildings[i].contains.type === "t"
//         ) {
//             this.ctx.drawImage(
//                 this.game.buildings[i].contains.image,
//                 this.game.buildings[i].contains.x - this.game.camera.x,
//                 this.game.buildings[i].contains.y - this.game.camera.y,
//                 this.game.buildings[i].contains.width,
//                 this.game.buildings[i].contains.height
//             );

//             this.ctx.strokeRect(this.game.buildings[i].contains.boundingX-this.game.camera.x, this.game.buildings[i].contains.boundingY-this.game.camera.y,
//                 this.game.buildings[i].contains.boundingWidth, this.game.buildings[i].contains.boundingHeight) ;

//         }
//     }
//     Entity.prototype.draw.call(this);
// };

// function drawGrid(game) {
//     var w = 50;
//     for (let i = 0; i < 50; i++) {
//         for (let j = 0; j < 50; j++) {
//             game.ctx.strokeRect(i * w - game.camera.x, j * w - game.camera.y, w, w);
//         }
//     }
// }

// // setting everything on the map
// Forest.prototype.setUpComponents = function() {
//     var w = 50;
//     for (let i = 0; i < 50; i++) {
//         for (let j = 0; j < 50; j++) {
//             // drawing walls (crate)
//             if (
//                 (i === 5 && j === 3) ||
//                 (i === 5 && j === 4) ||
//                 (i === 5 && j === 5) ||
//                 (i === 5 && j === 6) ||
//                 (i === 5 && j === 7) ||
//                 (i === 5 && j === 8) ||
//                 (i === 5 && j === 9) ||
//                 (i === 5 && j === 10) ||
//                 (i === 5 && j === 11) ||
//                 (i === 4 && j === 5) ||
//                 (i === 4 && j === 6) ||
//                 (i === 4 && j === 7) ||
//                 (i === 4 && j === 8)
//             ) {
//                 this.ctx.drawImage(this.wall, i * w, j * w, w, w);
//                 grid[i][j].contains = "w";
//             }
//         }
//     }
// };