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