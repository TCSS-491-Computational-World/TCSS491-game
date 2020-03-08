// var grid = new Array(50); 

//尝试知道每个格子都有什么 contains for each c
function Cell(theX, theY, theContain) {
    this.x = theX;
    this.y = theY;
    this.contains = theContain;
}


// Map setting
function setUp() {
    this.healthPack = AM.queueDownload("./img/healthPack.png");
    this.wall = AM.getAsset("./img/background/crate.png");
    this.roofFirst = AM.getAsset("./img/rooftop.png");    // first roofTop
    this.roofSecond = AM.getAsset("./img/roof.png");      // second roof
    this.tree = AM.getAsset("./img/background/tree1.png");           // first tree     
    var w = 50;
    var grid = new Array(50);
    for (let i = 0; i < 50; i++) {
        grid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            // In this if statement, it will set all walls and create a new componet with 'w' as signal for wall
            if ( // Symmetry desert map  
                (i === 1 && j === 0)  // top left and bottom right corners
            ||  (i === 2 && j === 0)
            ||  (i === 47 && j === 49) 
            ||  (i === 48 && j === 49)

                                        // second part
            ||  (i === 10 && j === 0)
            ||  (i === 11 && j === 0)
            ||  (i === 12 && j === 0)

            ||  (i === 12 && j === 4)
            ||  (i === 12 && j === 5)
            ||  (i === 11 && j === 5)

            ||  (i === 12 && j === 11)
            ||  (i === 12 && j === 12)
            ||  (i === 11 && j === 12)

            ||  (i === 12 && j === 18)
            ||  (i === 12 && j === 19)
            ||  (i === 11 && j === 19)

            ||  (i === 12 && j === 26)
            ||  (i === 12 && j === 27)
            ||  (i === 11 && j === 27)
            ||  (i === 10 && j === 27)

            ||  (i === 1 && j === 27)
            ||  (i === 2 && j === 27)


            ||  (i === 36 && j === 49)
            ||  (i === 38 && j === 49)
            ||  (i === 37 && j === 49)

            ||  (i === 37 && j === 45)
            ||  (i === 36 && j === 45)
            ||  (i === 36 && j === 44)

            ||  (i === 37 && j === 40)
            ||  (i === 36 && j === 40)
            ||  (i === 36 && j === 39)

            ||  (i === 37 && j === 33)
            ||  (i === 36 && j === 33)
            ||  (i === 36 && j === 32)

            ||  (i === 36 && j === 25)
            ||  (i === 37 && j === 24)
            ||  (i === 36 && j === 24)
            ||  (i === 38 && j === 24)

            ||  (i === 47 && j === 24)
            ||  (i === 48 && j === 24)


            // Third Part
            ||  (i === 1 && j === 8)
            ||  (i === 3 && j === 8)
            ||  (i === 4 && j === 8)
            ||  (i === 5 && j === 8)
            ||  (i === 6 && j === 8)
            ||  (i === 7 && j === 8)

            ||  (i === 48 && j === 41)
            ||  (i === 46 && j === 41)
            ||  (i === 45 && j === 41)
            ||  (i === 44 && j === 41)
            ||  (i === 43 && j === 41)
            ||  (i === 42 && j === 41)

            // Fourth Part
            ||  (i === 1 && j === 48)
            ||  (i === 1 && j === 49)

            ||  (i === 12 && j === 47)
            ||  (i === 12 && j === 48)
            ||  (i === 12 && j === 49)
            ||  (i === 13 && j === 49)
            ||  (i === 14 && j === 49)
            ||  (i === 15 && j === 49)
            ||  (i === 16 && j === 49)
            ||  (i === 17 && j === 49)
            ||  (i === 18 && j === 49)
            ||  (i === 18 && j === 48)
            ||  (i === 18 && j === 47)
            

            ||  (i === 48 && j === 1)
            ||  (i === 48 && j === 0)

            ||  (i === 39 && j === 2)
            ||  (i === 39 && j === 1)
            ||  (i === 39 && j === 0)
            ||  (i === 38 && j === 0)
            ||  (i === 37 && j === 0)
            ||  (i === 36 && j === 0)
            ||  (i === 35 && j === 0)
            ||  (i === 34 && j === 0)
            ||  (i === 33 && j === 0)
            ||  (i === 33 && j === 1)
            ||  (i === 33 && j === 2)


            // fifth part
            ||  (i === 8 && j === 37)
            ||  (i === 8 && j === 38)
            ||  (i === 8 && j === 39)
            ||  (i === 9 && j === 37)
            ||  (i === 9 && j === 38)
            ||  (i === 9 && j === 39)
            ||  (i === 10 && j === 38)
            ||  (i === 10 && j === 37)
            ||  (i === 11 && j === 37)

            ||  (i === 41 && j === 12)
            ||  (i === 41 && j === 11)
            ||  (i === 41 && j === 10)
            ||  (i === 40 && j === 12)
            ||  (i === 40 && j === 11)
            ||  (i === 40 && j === 10)
            ||  (i === 39 && j === 11)
            ||  (i === 39 && j === 10)
            ||  (i === 38 && j === 10)

            // sixth part
            ||  (i === 28 && j === 26)
            ||  (i === 28 && j === 27)
            ||  (i === 29 && j === 26)
            ||  (i === 29 && j === 27)

            ||  (i === 18 && j === 20)
            ||  (i === 18 && j === 21)
            ||  (i === 19 && j === 20)
            ||  (i === 19 && j === 21)

                ) {
                grid[i][j] = new Cell(i,j,new Component(this.wall,i*w, j*w, 50,50,'w'));
            }

            else if ( // draw a roof
                (i === 13 && j === 44)
            ) {
                grid[i][j] = new Cell(i,j,new Component(this.roofSecond, i* w, j *w +50, 250,200,'r'));
            }   
            else if ( // draw a roof
                (i === 34 && j === 1)
            ) {
                grid[i][j] = new Cell(i,j,new Component(this.roofSecond, i* w, j *w, 250,200,'r'));
            }
            else if ( i === 5 && j === 5){
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
            else if ( i === 25 && j === 25){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 30 && j === 30){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if ( i === 35 && j === 35){
                grid[i][j] = new Cell(i, j, new Component(this.healthPack, i*w, j*w, 16, 16, 'hp'))
            }
            else if (
                (i === 18 && j === 16) 
            ||  (i === 20 && j === 16)
            ||  (i === 22 && j === 16)
            ||  (i === 24 && j === 16)
            ||  (i === 26 && j === 16)
            ||  (i === 28 && j === 16)
            ||  (i === 28 && j === 18)
            ||  (i === 28 && j === 20)
            ||  (i === 28 && j === 22)
            ||  (i === 28 && j === 24)
            // ||  (i === 28 && j === 26)
            ||  (i === 28 && j === 28)
            ||  (i === 28 && j === 30)
            ||  (i === 26 && j === 30)
            ||  (i === 24 && j === 30)
            ||  (i === 22 && j === 30)
            ||  (i === 20 && j === 30)
            ||  (i === 18 && j === 30)
            ||  (i === 18 && j === 28)
            ||  (i === 18 && j === 26)
            ||  (i === 18 && j === 24)
            ||  (i === 18 && j === 22)
            // ||  (i === 18 && j === 20)
            ||  (i === 18 && j === 18)
            ||  (i === 18 && j === 16)

            ) {
                grid[i][j] = new Cell(i,j, new Component(this.tree,i*w ,j*w, 100,100,'t'));
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


function checkWalls(game){
    var walls = [];
    for (let i = 0; i < game.map.length; i++) {
        for (let j = 0; j < game.map[i].length; j++) {
            // console.log(grid[i][j].contains);
            if (game.map[i][j].contains.type === 'w') {
                walls.push(game.map[i][j]);
            }
        }
    }
    // console.log(walls.length);                                           // double checked the amount of walls
    return walls;
}

function removeWalls(game){
    var next = [];
    var newPath = game.path;
    // console.log("Before "+ game.path.length);
    for (let i = 0; i < game.walls.length; i++) {
        // console.log(game.walls[i] === wall);
        if (!game.walls[i].contains.removed) {
            next.push(game.walls[i]);
        }
        else {
            newPath.push(new Cell(game.walls[i].x,game.walls[i].y,0));
        }
    }
    return {walls:next,path:newPath};
}


function checkBuilding(game) {
    var buildings = [];
    for (let i = 0; i < game.map.length; i++) {
        for (let j = 0; j < game.map[i].length; j++) {
            // console.log(grid[i][j].contains);
            if (game.map[i][j].contains.type === 'r' || game.map[i][j].contains.type === 't') {
                buildings.push(game.map[i][j]);
            }
        }
    }
    // console.log(buildings);
    return buildings;
}
// log all the powerups
function checkPowerups(game){
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
function removePowerup(game){
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






// component on map
function Component(image,x,y,width,height,type) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width; // limit width
    this.height = height;   // limit height
    this.type = type;   // check the type of the component, like wall, building or tree etc.

    if(this.type === 'hp') {
        
        this.healthPackAnimation = new Animation(AM.getAsset("./img/healthPack.png"), 0 , 0, 16, 16, 0.5, true, false);
        this.boundingbox = new BoundingBox(this.x + 18, this.y + 18,this.width,this.height);
    } else {
        this.boundingbox = new BoundingBox(this.x,this.y,this.width,this.height);
    }



       // bounding box
    this.cleanShot = false;                                                     // working for bullet fire
    this.removed = false;                                                       // check if it needs to draw on the map
}
Component.prototype = new Entity();
Component.prototype.constructor = Component;

Component.prototype.draw = function () {
    // if(this.type === 'gp'){
    //     console.log("ISSSS DRAWWWWWING");
    //     this.healthBarAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    // }

};

Component.prototype.update = function () {

};




// Desert object
function Desert(game) {
  // this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false); 

  this.desertTile = AM.getAsset("./img/background/desertTile.png");
  this.healthPackAnimation = new Animation(AM.getAsset("./img/healthPack.png"), 0 , 0, 16, 16, .9, 4, true, false);
  this.radius = 200;
  this.game = game;
  this.ctx = game.ctx
  this.grid = setUp();
//   console.log(this.grid);

  this.game.map = this.grid;        // passing the whole map to gameEngine Jerry did
  this.game.path = checkPath(game); // the path of the tank, except other vehicles Jerry did
  this.game.walls = checkWalls(game); // the path of the tank, except other vehicles Jerry did, work for bullet shot
  this.game.powerups = checkPowerups(game);

  this.game.buildings = checkBuilding(game);
  Entity.call(this, game, 0, 400);

}

Desert.prototype = new Entity();
Desert.prototype.constructor = Desert;

//更新 update
Desert.prototype.update = function () {
    // console.log(this.game.path.length);
    // var deleteElement;
    // walls removed and animation
    for (let i = 0; i < this.game.walls.length; i++) {
        if (this.game.walls[i].contains.cleanShot) {
            this.game.walls[i].contains.cleanShot = new Explosion(this.game,AM.getAsset("./img/Explosion_A.png"), true, 
                                                        this.game.walls[i].x * 50, 
                                                        this.game.walls[i].y * 50);
            this.game.addEntity(this.game.walls[i].contains.cleanShot);
            this.game.walls[i].contains.cleanShot = false;
            // console.log("I changed");
            this.game.walls[i].contains.removed = true;
            this.game.gameScore ++;
        }       
    }
    // buildings explosion // Something wrong
    for (let i = 0; i < this.game.buildings.length; i++) {
        if (this.game.buildings[i].contains.cleanShot) {
            this.game.buildings[i].contains.cleanShot = new Explosion(this.game,AM.getAsset("./img/Explosion_A.png"), true, 
                                                        this.game.buildings[i].x * 50, 
                                                        this.game.buildings[i].y * 50);
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




    var tempP = removePowerup(this.game);
    this.game.powerups = tempP.powerups;


    var temp = removeWalls(this.game);
    // console.log(temp);                       // checked
    this.game.walls = temp.walls;               // this method will remove wall from walls list 
    this.game.path  = temp.path;                // add it to path list.
  Entity.prototype.update.call(this);
};


// draw the map
Desert.prototype.draw = function () {
  var w = 50;
  /* Draw all tiles on the map.
  */
  grid = new Array(50);
  for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
          this.ctx.drawImage(this.desertTile, 
            i * w - this.game.camera.x, 
            j * w - this.game.camera.y,
             w, w);
      }
  };

    /* 
    *  Draw all components on the map 
    */

  // draw walls
   for (let i = 0; i < this.game.walls.length; i++) {
       if (this.game.walls[i].contains !== 0 && !(this.game.walls[i].contains.removed)){
            this.ctx.drawImage(this.game.walls[i].contains.image, this.game.walls[i].contains.x - this.game.camera.x, 
                this.game.walls[i].contains.y - this.game.camera.y, 
                this.game.walls[i].contains.width,
                this.game.walls[i].contains.height);
       }

   }
   // draw buildings and trees
   for (let i = 0; i < this.game.buildings.length; i++) {
        if (this.game.buildings[i].contains !== 0 && this.game.buildings[i].contains.type === 'r'){
            this.ctx.drawImage(this.game.buildings[i].contains.image, this.game.buildings[i].contains.x- this.game.camera.x, 
             this.game.buildings[i].contains.y- this.game.camera.y, 
             this.game.buildings[i].contains.width,
             this.game.buildings[i].contains.height);
        }
        else if (this.game.buildings[i].contains !== 0 && this.game.buildings[i].contains.type === 't'){
            this.ctx.drawImage(this.game.buildings[i].contains.image, this.game.buildings[i].contains.x- this.game.camera.x, 
            this.game.buildings[i].contains.y- this.game.camera.y, 
            this.game.buildings[i].contains.width,
            this.game.buildings[i].contains.height);
        }

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

     
    



    // Using for loop.
//   for (let i = 0; i < 50; i++) {
//       for (let j = 0; j < 50; j++) {
//         if (this.grid[i][j].contains !== 0 && !(this.grid[i][j].contains.removed)) {
//             this.ctx.drawImage(this.grid[i][j].contains.image, i * w, j * w, w, w);
//         }
//       }
//   }

//   drawGrid(this.game);
//   this.setUpComponents(); // It should install in environment.
  // this.coinAnimation.drawFrame(this.game.clockTick, ctx, 100, 100, 1);
  Entity.prototype.draw.call(this);
};







// 就是画格子
function drawGrid(game) {
    var w = 50;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            game.ctx.strokeRect(i * w - game.camera.x, j * w - game.camera.y, w, w);
        }
    }
  }























// setting everything on the map
Desert.prototype.setUpComponents = function () {
  var w = 50;
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

              // // 1   crossing
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

              
              // // 2  lower L 
              // || (i === 2 && j === 14)
              // || (i === 3 && j === 14)
              // || (i === 4 && j === 14)
              // || (i === 5 && j === 14)
              // || (i === 6 && j === 14)
              // || (i === 7 && j === 14)
              // || (i === 8 && j === 14)
              // || (i === 2 && j === 13)
              // || (i === 2 && j === 12)

              // 3 lower L
              // || (i === 2 && j === 12)
              // || (i === 3 && j === 12)
              // || (i === 4 && j === 12)
              // || (i === 5 && j === 12)
              // || (i === 6 && j === 12)
              // || (i === 7 && j === 12)
              // || (i === 7 && j === 13)
              // || (i === 7 && j === 14)
              
              // // 4  L
              // || (i === 2 && j === 12)
              // || (i === 3 && j === 12)
              // || (i === 4 && j === 12)
              // || (i === 5 && j === 12)
              // || (i === 6 && j === 12)
              // || (i === 7 && j === 12)
              // || (i === 2 && j === 13)
              // || (i === 2 && j === 14)

              // 5 L
              // || (i === 2 && j === 14)
              // || (i === 3 && j === 14)
              // || (i === 4 && j === 14)
              // || (i === 5 && j === 14)
              // || (i === 6 && j === 14)
              // || (i === 2 && j === 13)
              // || (i === 2 && j === 12)


              // // 8 three crates in a row
              // || (i === 34 && j === 25)
              // || (i === 34 && j === 26)
              // || (i === 34 && j === 27)

              // 9   
              // || (i === 10 && j === 10) 
              // || (i === 10 && j === 9) 
              // || (i === 10 && j === 8)
              // || (i === 11 && j === 8)
              // || (i === 12 && j === 8)
              // || (i === 13 && j === 8)
              // || (i === 14 && j === 8)
              // || (i === 14 && j === 9)
              // || (i === 14 && j === 10) 

              // 10 
              // || (i === 10 && j === 6) 
              // || (i === 10 && j === 7) 
              // || (i === 10 && j === 8)
              // || (i === 11 && j === 8)
              // || (i === 12 && j === 8)
              // || (i === 13 && j === 8)
              // || (i === 14 && j === 8)
              // || (i === 14 && j === 7)
              // || (i === 14 && j === 6) 


              

              // 我也不知道这些是什么鬼
              // || (i === 7 && j === 42)
              // || (i === 7 && j === 41)
              // || (i === 6 && j === 41)
              // || (i === 7 && j === 43)
              // || (i === 7 && j === 44)
              // || (i === 8 && j === 42)

              // || (i === 32 && j === 42) 
              // || (i === 33 && j === 42) 
              // || (i === 34 && j === 42) 
              // || (i === 30 && j === 42) 
              // || (i === 31 && j === 41) 
              // || (i === 34 && j === 42) 

              // || (i === 36 && j === 42) 
              // || (i === 36 && j === 41) 
              // || (i === 36 && j === 43) 
              // || (i === 36 && j === 44) 
              // || (i === 36 && j === 46) 
              // || (i === 36 && j === 47) 
              // || (i === 36 && j === 48) 
              // || (i === 36 && j === 49)  
              ){
              
              this.ctx.drawImage(this.wall,i*w, j*w,w,w);
              grid[i][j].contains = 'w';
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
//   console.log(grid);
//   debugger;
};


