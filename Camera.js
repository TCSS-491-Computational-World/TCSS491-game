//create camera for the scrolling feature.
function Camera(game, tank_x, tank_y, width, height) {
    // console.log("ddd");
    this.game = game;
    this.ctx = game.ctx;
    this.x = tank_x - width / 2; // the start x-coordinate
    // this.endX = tank_x + width / 2; // the start x-coordinate
    this.y = tank_y - height / 2; // the end x-coordinate
    // this.endY = tank_y + height / 2; // the end y-coordinate
    this.width = width; // the end x-coordinate
    this.height = height; // the end y-coordinate
    this.type = "camera";

    Entity.call(this, game, this.x, this.y, this.width, this.height);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.draw = function() {
    // console.log(this.game.tanks[0].x);

    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        this.width,
        this.height
    );

    //this.ctx.rect(this.startX, this.endX, this.startY, this.endY);
    //this.ctx.stroke();

    Entity.prototype.draw.call(this);
};

Camera.prototype.update = function() {
    this.x = this.game.tanks[0].x - this.width / 2;
    // this.endX = this.game.tanks[0].x + this.width / 2;
    this.y = this.game.tanks[0].y - this.height / 2;
    // this.endY = this.game.tanks[0].y + this.height / 2;
    //this.x = Entity.prototype.update.call(this);

    Entity.prototype.update.call(this);
};