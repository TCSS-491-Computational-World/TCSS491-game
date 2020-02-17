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