function BulletFire(game, image, fire, tankX, tankY, targetX, targetY, rotation) {
    this.theta = rotation;
    //this.distance = distance;
    this.targetX = targetX;
    this.targetY = targetY;
    this.image = image;
    this.cursorAnimation = new Animation(
        AM.getAsset("./img/cursor.png"),0,0,19,19,20,1,true,false);
    this.tankX = tankX + 25;
    this.tankY = tankY + 25;
    this.rotation = rotation;
    this.fire = false;
    this.speed = 10;
    this.ctx = game.ctx;
    this.fire = fire;
    this.timeA = null;
    this.cursor = false;
    this.cursorX;
    this.cursorY;
    this.endX = 500;
    this.endY = 0;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.tankX, this.tankY, 33, 24);
    Entity.call(this, game, this.tankX, this.tankY);
}

BulletFire.prototype = new Entity();
BulletFire.prototype.constructor = BulletFire;

BulletFire.prototype.update = function () {

    //if (this.game.click) {
        //this.fire = true;
        //this.endX = this.game.click.x;
        //this.endY = this.game.click.y;
        //this.x = 0;
        //this.y = 0;
        //this.timeA = Math.sqrt(
            //Math.pow(this.endX - this.x, 2) + Math.pow(this.endY - this.x, 2)
       // ); // the hypotneuse
        //console.log("TIMES :" + this.timeA);

        //this.animation.frameDuration = this.timeA * 1;
        //console.log("MY X:" , this.x);
        //this.y = this.game.click.y;
    //}



    // var targetX = input.mouseX - (this.localX + this.width/2);
    //  targetY = input.mouseY - (this.localY + this.height/2);

    // this.rotation = Math.atan2(targetY, targetX);

    // velocityInstance.x = Math.cos(this.rotation) * bulletSpeed;
    // velocityInstance.y = Math.sin(this.rotation) * bulletSpeed;

    if(this.boundingbox.collide(this.game.tanks[1].boundingbox)){
        // console.log("anyhintg hapalokhohiahskjdhakjdshlkdajhsjlkdahslkj");
        this.game.tanks[1].cleanShot = true;
        this.fire = false;
        this.x = this.tankX;
        this.y = this.tankY;
        this.boundingbox.x = this.tankX;
        this.boundingbox.y = this.tankY;
    }


    // console.log(this.game.walls[0].contains.boundingbox);
    for (let i = 0; i < this.game.walls.length; i++) {
        if(this.boundingbox.collide(this.game.walls[i].contains.boundingbox)){
            console.log("anyhintg hapalokhohiahskjdhakjdshlkdajhsjlkdahslkj");
            this.game.walls[i].cleanShot = true;
            this.fire = false;
            this.x = this.game.walls[i].x;
            this.y = this.game.walls[i].y;
            this.boundingbox.x =    this.game.walls[i].x;
            this.boundingbox.y =    this.game.walls[i].y;
        }
    }


    if (this.x > this.tankX + 10000|| this.y > this.tankY + 10000 || this.x < this.tankX - 10000 || this.y < this.tankY - 10000) {
        //console.log("IS ANYTHING HAPPENING HERE!??!?");
        this.fire = false;
        this.x = this.tankX;
        this.y = this.tankY;
        this.boundingbox.x = this.tankX;
        this.boundingbox.y = this.tankY;
    }

    //console.log(this.boundingbox.x);

    if (this.fire) {

        //this.x += this.speed;
            this.x -= Math.cos(this.theta) * 10;
            this.y -= Math.sin(this.theta) * 10;
            this.boundingbox.x -= Math.cos(this.theta) * 10;
            this.boundingbox.y -= Math.sin(this.theta) * 10;
        
       
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

        
        this.ctx.beginPath();
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "red";
        this.ctx.rect(this.boundingbox.x, this.boundingbox.y, 33, 24);
        this.ctx.stroke();


        this.ctx.drawImage(
            this.image,
            0,
            0,
            33,
            24,
            this.x,
            this.y,
            33,
            24
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