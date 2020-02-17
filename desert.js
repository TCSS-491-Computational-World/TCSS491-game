// var grid = new Array(100);

//尝试知道每个格子都有什么
function Cell(theX, theY, theContain) {
    this.x = theX;
    this.y = theY;
    this.contains = theContain;
}
//地图设置
function setUp() {
    this.wall = AM.getAsset("./img/background/crate.png");
    this.roofFirst = AM.getAsset("./img/rooftop.png");    // 第一个roofTop
    this.roofSecond = AM.getAsset("./img/roof.png");      // 第二个roof
    var w = 50;
    var grid = new Array(50);
    for (let i = 0; i < 50; i++) {
        grid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            if (      
                (i === 5 && j === 3) 
            ||  (i === 5 && j === 4) 
            ||  (i === 5 && j === 5)
            ||  (i === 5 && j === 6)
            ||  (i === 5 && j === 7)
            ||  (i === 5 && j === 8)
            ||  (i === 5 && j === 9)
            ||  (i === 5 && j === 10)
            ||  (i === 5 && j === 11)
            ||  (i === 4 && j === 5)
            ||  (i === 4 && j === 6)
            ||  (i === 4 && j === 7)
            ||  (i === 4 && j === 8)) {
                grid[i][j] = new Cell(i,j,new Component(this.wall,i*w, j*w, 50,50));

            }

            else {
                grid[i][j] = new Cell(i, j, 0);
            }
            
        }
    }

    
    return grid;
}

// check where is path only for the buildings or walls
function checkPath(grid) {
    // console.log(grid);
    var path = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            // console.log(grid[i][j].contains);
            if (grid[i][j].contains === 0) {
                path.push(grid[i][j]);
            }
        }
    }
    // console.log(path.length);
    return path;
}

// component on map
function Component(image,x,y,width,height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width; // limit width
    this.height = height;   // limit height
    this.boundingbox = new BoundingBox(this.x,this.y,this.width,this.height);
    this.cleanShot = false;
    this.removed = false;
}
Component.prototype = new Entity();
Component.prototype.constructor = Component;

Component.prototype.draw = function () {

};

Component.prototype.update = function () {

};













// Desert object
function Desert(game) {
  // this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false); 

  this.desertTile = AM.getAsset("./img/background/desertTile.png");
  this.radius = 200;
  this.game = game;
  this.ctx = game.ctx
  this.grid = setUp();
//   console.log(this.grid);
  this.game.path = checkPath(this.grid); // the path of the tank
  this.game.map = this.grid;
//   console.log(this.game.map);
  Entity.call(this, game, 0, 400);

}

Desert.prototype = new Entity();
Desert.prototype.constructor = Desert;
//更新 update
Desert.prototype.update = function () {
    for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].cleanShot) {
                this.grid[i][j].cleanShot = new Explosion(this.game,AM.getAsset("./img/Explosion_A.png"), true, i * 50, j * 50);
                this.game.addEntity(cleanshot);
                this.grid[i][j].cleanShot = false;
                this.grid[i][j].removed = true;
                //this.bullet.fire = true;
            }
        }
    } 



  Entity.prototype.update.call(this);
};


Desert.prototype.draw = function () {
  var w = 50;
  for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
          this.ctx.drawImage(this.desertTile, i * w, j * w, w, w);
      }
  };

  for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        if (this.grid[i][j].contains !== 0 && !(this.grid[i][j].contains.removed)) {
            this.ctx.drawImage(this.grid[i][j].contains.image, i * w, j * w, w, w);
        }
      }
  }

  // drawGrid();
//   this.setUpComponents(); // It should install in environment.
  // this.coinAnimation.drawFrame(this.game.clockTick, ctx, 100, 100, 1);
  Entity.prototype.draw.call(this);
};






























// 就是设置地图上的所有的东西
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



// 就是画格子
function drawGrid(ctx) {
  var w = 50;
  for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
          ctx.strokeRect(i * w, j * w, w, w);
      }
  }
}