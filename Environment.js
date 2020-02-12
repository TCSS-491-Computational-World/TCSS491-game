function Component(game,decoration,width,height) {
    this.decoration = decoration;
    this.width = width; // limit width
    this.height = height;   // limit height
    this.boundingBox = new BoundingBox();
    this.removed = false;
    this.game = game;
    this.ctx = game.ctx;
}

// 需要思考下
Component.prototype.draw = function(){
    this.ctx.drawImage();
};

Component.prototype.update = function() {

};


// Everything are indestructible in this object 
function Enviornment(game) {
    //this.x = myX;
    //this.y = myY;
    //this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Enviornment.prototype.draw = function () {
    // draw a container
    // this.ctx.drawImage(AM.getAsset("./img/Decor_Items/Container_A.png"),600,380); 
    
    // draw a puddle
    this.ctx.drawImage(AM.getAsset("./img/Puddle_01.png"), 700, 220); 

    // draw a desert tree TYPE 1 
    // this.ctx.drawImage();

    // // draw a desert tree TYPE 2
    // this.ctx.drawImage();

    // // draw a desert tree TYPE 3
    // this.ctx.drawImage();





};

Enviornment.prototype.update = function () { };