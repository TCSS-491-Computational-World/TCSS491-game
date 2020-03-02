

function Turret(game, x, y) {
    //Barrell Code
    //___________________________
    this.barrell = new Barrell(game, AM.getAsset("./img/tank_red2Barrell.png"));
    this.BB = AM.getAsset("./img/tank_red2Barrell.png");
    
    this.bullet = AM.getAsset("./img/bulletc.png");
    this.bullet1 = AM.getAsset("./img/bulletc.png");
    this.bullet2 = AM.getAsset("./img/bulletc.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    

    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation(AM.getAsset("./img/turret.png"),  0, 0, 23, 33, 1,1,true,true);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/turret.png"), 23,0, 23,33,1,1, true,true);
    this.moveUpRightAnimation = new Animation(AM.getAsset("./img/turret.png"),46,0,23,33,1,1,true,true);
    this.moveDownRightAnimation = new Animation(AM.getAsset("./img/turret.png"),69,0,23, 33,1,1,true, true);

    this.moveRightAnimation = new Animation(AM.getAsset("./img/turret.png"),92,0,23,33,1, 1,true,true); //quick note{:}
    this.moveUpLeftAnimation = new Animation(AM.getAsset("./img/turret.png"),115,0,23,33,1,1,true,true);
    this.moveDownLeftAnimation = new Animation(AM.getAsset("./img/turret.png"),138,0,23,33,1,1,true,true);
    this.moveLeftAnimation = new Animation(AM.getAsset("./img/turret.png"),161,0,23,33,1,1,true,true);

    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    this.cooldown = 100;
    this.counter = 0;
    this.random = this.random = Math.floor(Math.random() * 100);
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.lastMove = "none";
    this.hero = false;
    this.speed = 1;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveDownAnimation.frameWidth + 17, this.moveDownAnimation.frameHeight + 19);
    this.triggerbox = new BoundingBox(this.x, this.y, this.moveDownAnimation.frameWidth + 17, this.moveDownAnimation.frameHeight + 19);
    this.distance = 1;
    this.maxHealth = 500;
    this.currentHealth = 500;
    this.theta = 0;
    this.collision;
    this.tankIndex;
    this.tempList;

    
    
    Entity.call(this, game, x, y);
}

Turret.prototype = new Entity();
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {

    this.tempList = this.game.tanks;
    for(j = 0; j < this.game.tanks.length; j++){
        if(this.tempList[j].x === this.x){
            this.tankIndex = j;
            //this.tempList.splice(this.tankIndex, 1);
        }
    }
    console.log("MY TANKK INDEX:    " + this.tankIndex);


    var bool = true;
    //Barrell Code
    
    var closestTank = null;
    var temp = 0;
    var min = 0;
    
    for(i = 1; i < this.game.tanks.length; i++){

        //for(j = 1; j < this.list.size; j++){
            
            temp = Math.sqrt(Math.pow((this.game.tanks[i].triggerbox.midpointx - this.game.tanks[0].triggerbox.midpointx), 2) +
                             Math.pow((this.game.tanks[i].triggerbox.midpointy - this.game.tanks[0].triggerbox.midpointy), 2));
        //}
            if(i === 1){
                //console.log("HHEHEHEHEHEHEHEHEHEHEH    " + vehicle.length);
                min = temp;
                closestTank = 1;
            }

            if(temp < min){

                min = temp;
                closestTank = i;
            }
        
    }

    
    this.distance = Math.sqrt(Math.pow((this.triggerbox.midpointx - this.game.tanks[0].triggerbox.midpointx), 2) +
                             Math.pow((this.triggerbox.midpointy - this.game.tanks[0].triggerbox.midpointy), 2));
     
    if (this.distance < 350) {
        //console.log("fhdfhfdh");
        var dy = this.y - this.game.tanks[0].y;
        var dx = this.x - this.game.tanks[0].x;
        this.theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI;
        //this.cursorX = this.game.mouse.x;
        //this.cursorY = this.game.mouse.y;
        this.bullet = this.rotateAndCache(AM.getAsset("./img/bulletc.png"), this.theta);
        this.bullet1 = this.rotateAndCache(AM.getAsset("./img/bulletc.png"), this.theta);
        this.bullet2 = this.rotateAndCache(AM.getAsset("./img/bulletc.png"), this.theta);
        this.BB = this.rotateAndCache(
            AM.getAsset("./img/tank_red2Barrell.png"),
            this.theta
        );
        
        this.shooting = true;
        //console.log(this.spritesheet);
     } else {
         //console.log("fhdfhfdh");
         var dy = this.y;
         var dx = this.x;
         this.theta = Math.atan2(dy, dx); // range (-PI, PI]
         //theta *= 180 / Math.PI;
         //this.cursorX = this.game.mouse.x;
         //this.cursorY = this.game.mouse.y;
         //this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
         this.BB = this.rotateAndCache(
             AM.getAsset("./img/tank_red2Barrell.png"),
             this.theta
         );
         this.shooting = false;
     }
    //_____________________________________________________________________________________________________

    if (this.shooting && this.cooldown === 100 ) {
        console.log("fhdfhfdh "+ this.theta);
        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, this.theta, this.tankIndex, null, 5);
        bulletShot1 = new BulletFire(this.game, this.bullet1, true, this.x - 16, this.y - 16, this.cursorX , this.cursorY, this.theta + 200, this.tankIndex, null, 5);
        bulletShot2 = new BulletFire(this.game, this.bullet2, true, this.x - 16, this.y - 16, this.cursorX , this.cursorY, this.theta - 200, this.tankIndex, null, 5);
        this.game.addEntity(bulletShot);
        this.game.addEntity(bulletShot1);
        this.game.addEntity(bulletShot2);
        this.shooting = false;
        //this.bullet.fire = true;
    }

    this.cooldown--;

    if(this.cooldown === 0){
        this.cooldown = 100;
    }


    if (this.cleanShot) {
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.cleanShot = false;
        this.currentHealth -= 50;
        this.game.gameScore += 10;

       // this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
        
        if(this.currentHealth === 0){

            this.game.gameScore += 50;
            this.game.tanks[this.tankIndex].removeFromWorld = true;
            this.game.tanks = removeEnemyTank(this.game.tanks, this.tankIndex);
            

            var newTank = new Turret(this.game, 
                this.game.path[Math.floor(Math.random() * this.game.path.length)].x * 50,
                this.game.path[Math.floor(Math.random() * this.game.path.length)].y * 50);

            this.game.tanks.push(newTank);
            this.game.addEntity(newTank);
        }
        
        //this.bullet.fire = true;
    }

    // if(this.x - this.game.camera.x >= 800){
    //     //this.lastMove = "left";
    //     this.random = 76;
    // }
    // if(this.x - this.game.camera.x <= 0){
    //     //this.lastMove = "right";
    //     this.random = 26;
    // }
    // if(this.y - this.game.camera.y <= 0){
    //     //this.lastMove = "down";
    //     this.random = 51;
    // }
    // if(this.y - this.game.camera.y >= 800){
    //     //this.lastMove = "up";
    //     this.random = 1;
    // }

    this.collision = false;

    for(i = 0; i < this.game.tanks.length; i++){

        if(i != this.tankIndex && this.boundingbox.collide(this.game.tanks[i].boundingbox)){
            this.collision = true;
        } 
    }
    

    // here is a bug   Jerry fixed the enmey bank will reset on the top left of corner.

    //     // console.log(this.game.walls[0].contains.boundingbox);
    for (let i = 0; i < this.game.walls.length; i++) {
        if(this.boundingbox.collide(this.game.walls[i].contains.boundingbox)){

            this.game.walls[i].contains.cleanShot = true;
            this.fire = false;
            // this.x = this.game.walls[i].x;
            // this.y = this.game.walls[i].y;
            this.boundingbox.x =    this.game.walls[i].x;
            this.boundingbox.y =    this.game.walls[i].y;
        }
    }

    for (let i = 0; i < this.game.buildings.length; i++) {
        if(this.boundingbox.collide(this.game.buildings[i].contains.boundingbox)){

            this.game.buildings[i].contains.cleanShot = true;
            this.fire = false;
            // this.x = this.game.buildings[i].x;
            // this.y = this.game.buildings[i].y;
            this.boundingbox.x =    this.game.buildings[i].x;
            this.boundingbox.y =    this.game.buildings[i].y;
        }
    }

    // if(this.collision === false){
    //     //do nothing
    //     //this.speed = 1;
    // } else {
    //     this.speed *= -1;
    // }
    // if (this.random <= 25) {
    //     //moving up
    //     this.up = true;
    //     this.down = false;
    //     this.right = false;
    //     this.left = false;
        
    // }
    // // console.log(this.x);

    // if (this.up === true  && this.y >=0   && findEnemyPath(this.game, this.x, this.y, 5, this.speed)) {
    if(this.speed === 1){
        this.y -= this.speed;
        this.boundingbox.y -= this.speed;
        this.triggerbox.y -= this.speed;
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
        this.speed = 2;
    }
        
    // }
    // if (this.random <= 50 && this.random > 25) {
    //     //moving right

    //     this.up = false;
    //     this.down = false;
    //     this.right = true;
    //     this.left = false;
    // }
    // if (this.right === true  && this.x <= 2450&& findEnemyPath(this.game, this.x, this.y, 3, this.speed)  ) { 
    //     this.x += this.speed;
    //     this.boundingbox.x += this.speed;
    //     this.triggerbox.x += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // if (this.random <= 75 && this.random > 50) {
    //     //moving down
        
    //     this.up = false;
    //     this.down = true;
    //     this.right = false;
    //     this.left = false;
    // }
    // if (this.down === true  &&  this.y <=2450 && findEnemyPath(this.game, this.x, this.y, 1, this.speed)) { 
    //     this.y += this.speed;
    //     this.boundingbox.y += this.speed;
    //     this.triggerbox.y += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // if (this.random <= 100 && this.random > 75) {
    //     //moving left
    //     this.up = false;
    //     this.down = false;
    //     this.right = false;
    //     this.left = true;
    // }
    // if (this.left === true  &&  this.x >=0  && findEnemyPath(this.game, this.x, this.y, 7, this.speed)) { 

    //     this.x -= this.speed;
    //     this.boundingbox.x -= this.speed;
    //     this.triggerbox.x -= this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }


    //console.log("CLOSEST TANK IS AT INDEX:   " + closestTank);
    Entity.prototype.update.call(this);
};

Turret.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5 - this.game.camera.x, this.y-5-this.game.camera.y, 40, 4, this.currentHealth, this.maxHealth);


    if(this.game.tanks[0].y < this.y && this.game.tanks[0].x < this.x){
        this.moveUpLeftAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.6);
    }
    else if(this.game.tanks[0].y > this.y && this.game.tanks[0].x > this.x){
        this.moveDownRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.6);
    }
    else if(this.game.tanks[0].y > this.y && this.game.tanks[0].x < this.x){
        this.moveDownLeftAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.6);
    }
    else if(this.game.tanks[0].y < this.y && this.game.tanks[0].x > this.x){
        this.moveUpRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.6);
    }
  
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    // if (this.up) {
    //     this.moveUpAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y  - this.game.camera.y
    //     );
    //     this.counter ++;
    //     if(this.counter === 100){
    //         this.up = false;
    //         this.counter = 0;
    //         this.random = Math.floor(Math.random() * 100);
    //     }
    //     this.up = false;
    //     this.lastMove = "up";
    // }
    // if (this.down) {
    //     this.moveDownAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y  - this.game.camera.y
    //     );
    //     this.counter ++;
    //     if(this.counter === 100){
    //         this.up = false;
    //         this.counter = 0;
    //         this.random = Math.floor(Math.random() * 100);
    //     }
    //     this.down = false;
    //     this.lastMove = "down";
    // }
    // if (this.right) {
    //     this.moveRightAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y  - this.game.camera.y
    //     );
    //     this.counter ++;
    //     if(this.counter === 100){
    //         this.up = false;
    //         this.counter = 0;
    //         this.random = Math.floor(Math.random() * 100);
    //     }
    //     this.right = false;
    //     this.lastMove = "right";
    // }
    // if (this.left) {
    //     this.moveLeftAnimation.drawFrame(
    //         this.game.clockTick,
    //         this.ctx,
    //         this.x - this.game.camera.x,
    //         this.y  - this.game.camera.y
    //     );
    //     this.counter ++;
    //     if(this.counter === 100){
    //         this.up = false;
    //         this.counter = 0;
    //         this.random = Math.floor(Math.random() * 100);
    //     }
    //     this.left = false;
    //     this.lastMove = "left";
    // }
    // if (!this.left && !this.right && !this.up && !this.down) {
    //     //if tank isnt moving then stay at most recent direction.
    //     if (this.lastMove === "left")
    //         this.moveLeftAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y  - this.game.camera.y
    //         );
    //     if (this.lastMove === "right")
    //         this.moveRightAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y  - this.game.camera.y
    //         );
    //     if (this.lastMove === "down")
    //         this.moveDownAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y  - this.game.camera.y
    //         );
    //     if (this.lastMove === "up")
    //         this.moveUpAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y  - this.game.camera.y
    //         );
    //     if (this.lastMove === "none")
    //         this.moveUpAnimation.drawFrame(
    //             this.game.clockTick,
    //             this.ctx,
    //             this.x - this.game.camera.x,
    //             this.y  - this.game.camera.y
    //         );
    // }


    // //Barrell Code
    // this.ctx.drawImage(this.BB, this.x + 6 - this.game.camera.x, this.y + 5 - this.game.camera.y);

    //Bounding box helper.
    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x - this.game.camera.x, this.triggerbox.y - this.game.camera.y, this.triggerbox.width, this.triggerbox.height);
    this.ctx.stroke();

    // this.ctx.beginPath();
    // this.ctx.lineWidth = "1";
    // //if(this == this.game.tanks[this.distance])
    // this.ctx.strokeStyle = "white";
    // this.ctx.rect(this.triggerbox.x - 250 -this.game.camera.x, this.triggerbox.y - 250 - this.game.camera.y , this.triggerbox.width + 500, this.triggerbox.height + 500);
    // this.ctx.stroke();

    
    // if(this.game.tanks.length > 3){
    //     this.ctx.beginPath();
    //     this.ctx.lineWidth = "2";
    //     this.ctx.strokeStyle = "yellow";
    //     this.ctx.rect(this.game.tanks[this.distance].triggerbox.x - 55, this.game.tanks[this.distance].triggerbox.y - 55 , this.game.tanks[this.distance].triggerbox.width + 110, this.game.tanks[this.distance].triggerbox.height + 110);
    //     this.ctx.stroke();
    // }
    
    

    Entity.prototype.draw.call(this);
};





function findEnemyPath(game, tank_x, tank_y, direction, speed) {
    // console.log(game.map);
    if (direction === 4) {
        tank_x  +=  speed;
        tank_y  -=  speed;
        
    }
    else if (direction === 6) {
        tank_x  -=  speed;
        tank_y  -=  speed;
    }
    else if (direction === 8) {
        tank_x  -=  speed;
        tank_y  +=  speed;
    }
    else if (direction === 2) {
        tank_x  +=  speed;
        tank_y  +=  speed;
    }
    else if (direction === 5) {
        tank_y  -=  speed;
    }
    else if (direction === 3) {
        tank_x  +=  speed;
    }
    else if (direction === 1) {
        tank_y  +=  speed;
    }
    else{
        tank_x -= speed;
    }

    // Using walls list
    for (let i = 0; i < game.walls.length; i++) {
        var startX  =   game.walls[i].x * 50;
        var startY  =   game.walls[i].y * 50;
        var endX    =   game.walls[i].x * 50 + 50;
        var endY    =   game.walls[i].y * 50 + 50;
        if (tank_x + 40 > startX && tank_x < endX  
            && tank_y + 40 > startY && tank_y < endY) {
            return false;
        }
    }
    // console.log(game.buildings);
    // debugger;
    // Using 
    for (let i = 0; i < game.buildings.length; i++) {
        if (game.buildings[i].contains.type === 't') {
            var startX  =   game.buildings[i].x * 50;
            var startY  =   game.buildings[i].y * 50;
            var endX    =   game.buildings[i].x * 50 + 100;
            var endY    =   game.buildings[i].y * 50 + 100;
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }
        if (game.buildings[23].contains.type === 'r') {
            var startX  =   game.buildings[23].x * 50 + 10;
            var startY  =   game.buildings[23].y * 50 + 60;
            var endX    =   game.buildings[23].x * 50 + 220;
            var endY    =   game.buildings[23].y * 50 + 170;
            
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }
        if (game.buildings[0].contains.type === 'r') {
            var startX  =   game.buildings[0].x * 50 + 10;
            var startY  =   game.buildings[0].y * 50 + 60;
            var endX    =   game.buildings[0].x * 50 + 220;
            var endY    =   game.buildings[0].y * 50 + 170;
            
            if (tank_x + 40 > startX && tank_x < endX  
                && tank_y + 40 > startY && tank_y < endY) {
                return false;
            }
        }      
    }
    return true;

}






// Jerry did
function removeEnemyTank(tanks, index) {
    let next = [];
    for (let i = 0; i < tanks.length; i++) {
        if (i !== index) {
            next.push(tanks[i]);
        }
    }
    return next;
}

