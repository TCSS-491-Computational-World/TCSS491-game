//create camera for the scrolling feature.
function Camera(game, tank_x, tank_y, width, height) {
    // console.log("ddd");
    // console.log(tank_x);
    this.game = game;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;

    this.walls;
    this.buildings;
    this.tanks;
    

    if (tank_x < 300) {
        this.x = 0;
    }
    else if (tank_x > 2000) {
        this.x = 2000;
    }
    else {
        this.x = tank_x - width / 2; // the start x-coordinate
    }

    if (tank_y < 300) {
        this.y = 0;
    }
    else if (tank_y > 2200) {
        this.y = 2200;
    }
    else {
        this.y = tank_y - height / 2; // the start x-coordinate
    }

    


    // this.endX = tank_x + width / 2; // the start x-coordinate
    // this.y = tank_y - height / 2; // the end x-coordinate
    // this.endY = tank_y + height / 2; // the end y-coordinate
    this.width = width; // the end x-coordinate
    this.height = height; // the end y-coordinate
    this.type = "camera";

    Entity.call(this, game, this.x, this.y, this.width, this.height);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.draw = function() {
    // //select Map 
    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(this.x-this.game.camera.x, this.y - this.game.camera.y, 1000,600);

    // // desert map seleciton.
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillRect(this.x - this.game.camera.x+225, this.y - this.game.camera.y+150, 250,250);
    // // forest map selection.
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillRect(this.x - this.game.camera.x+525, this.y - this.game.camera.y+150, 250,250);




    // console.log(this.game.tanks[0].y);
    // console.log(this.x);
    // this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(
    //     this.x - this.game.camera.x,
    //     this.y - this.game.camera.y,
    //     this.width,
    //     this.height
    // );

    


    if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
        
        this.ctx.strokeStyle = 'blue';
        this.ctx.font = 'bold';
        this.ctx.strokeRect(this.x - this.game.camera.x,this.y-this.game.camera.y + 400,200,200);
        this.ctx.fillStyle = 'transparent';
        this.ctx.fillRect(this.x - this.game.camera.x,this.y-this.game.camera.y + 400,200,200);
    }
    else{
        this.ctx.strokeStyle = 'blue';
        this.ctx.font = 'bold';
        this.ctx.strokeRect(this.x - this.game.camera.x + 800,this.y-this.game.camera.y + 400,200,200);

        this.ctx.fillStyle = 'transparent';
        this.ctx.fillRect(this.x - this.game.camera.x + 800,this.y-this.game.camera.y + 400,200,200);
    }
    var pixel = 4;
    // walls drawing on the minimap
    for (let i = 0; i < this.walls.length; i++){
        // draw a rectangle for walls with black;
        if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.x-this.game.camera.x + (this.walls[i].x * pixel),
                                this.y-this.game.camera.y + 400 + (this.walls[i].y * pixel),
                                pixel,pixel);
        }
        else {
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.x-this.game.camera.x + 800 + (this.walls[i].x * pixel),
                                this.y-this.game.camera.y + 400 + (this.walls[i].y * pixel),
                                pixel,pixel);
        }

    }
    // buildings drawing on the minimap
    for (let i = 0; i < this.buildings.length; i++){
        // draw a rectangle for a building using brown and a tree using green
        // draw buildings
        if (this.buildings[i].contains.type === 'r') {
            if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
                this.ctx.fillStyle = 'brown';
                this.ctx.fillRect(this.x-this.game.camera.x + (this.buildings[i].x * pixel),
                                    this.y-this.game.camera.y + 400 + (this.buildings[i].y * pixel),
                                    pixel*5,pixel*5);
            }
            else {
                this.ctx.fillStyle = 'brown';
                this.ctx.fillRect(this.x-this.game.camera.x + 800 + (this.buildings[i].x * pixel),
                                    this.y-this.game.camera.y + 400 + (this.buildings[i].y * pixel),
                                    pixel*5,pixel*5);
            }
        }
        else {
            // draw trees
            if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
                this.ctx.strokeStyle = 'green';
                this.ctx.strokeRect(this.x-this.game.camera.x + (this.buildings[i].x * pixel),
                                    this.y-this.game.camera.y + 400 + (this.buildings[i].y * pixel),
                                    pixel*2,pixel*2);
            }
            else {
                this.ctx.strokeStyle = 'green';
                this.ctx.strokeRect(this.x-this.game.camera.x + 800 + (this.buildings[i].x * pixel),
                                    this.y-this.game.camera.y + 400 + (this.buildings[i].y * pixel),
                                    pixel*2,pixel*2);
            }
        }
    }

    // console.log(this.tanks[0]);
    for (let i = 0; i < this.tanks.length; i++) {
        // draw our tank using blue index 0 using a circle;
        if (i === 0) {
            if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
                this.ctx.strokeStyle = 'blue';
                this.ctx.strokeRect(this.x-this.game.camera.x + (this.tanks[i].x / 50 * pixel),
                this.y-this.game.camera.y + 400 + (this.tanks[i].y / 50 * pixel),
                pixel,pixel);                                
            }
            else {
                this.ctx.strokeStyle = 'blue';
                this.ctx.strokeRect(this.x-this.game.camera.x + 800 + (this.tanks[i].x / 50 * pixel),
                                    this.y-this.game.camera.y + 400 + (this.tanks[i].y / 50 * pixel),
                                    pixel,pixel);
            }
        }
        // draw enemy tanks or vehicles using red circle.
        else {
            if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
                this.ctx.strokeStyle = 'red';
                this.ctx.strokeRect(this.x-this.game.camera.x + (this.tanks[i].x / 50 * pixel),
                this.y-this.game.camera.y + 400 + (this.tanks[i].y / 50 * pixel),
                pixel,pixel);                                
            }
            else {
                this.ctx.strokeStyle = 'red';
                this.ctx.strokeRect(this.x-this.game.camera.x + 800 + (this.tanks[i].x / 50 * pixel),
                                    this.y-this.game.camera.y + 400 + (this.tanks[i].y / 50 * pixel),
                                    pixel,pixel);
            }
        }
    }

    if (this.game.tanks[0].x >= 2250 && this.game.tanks[0].y >=2250) {
        this.ctx.strokeStyle = 'orange';
        this.ctx.strokeRect(this.x-this.game.camera.x + this.game.camera.x / 50 * pixel , this.y-this.game.camera.y + 400 + this.game.camera.y / 50 * pixel , 20*pixel, 12 * pixel);    
    }
    else {
        this.ctx.strokeStyle = 'orange';
        this.ctx.strokeRect(this.x-this.game.camera.x + 800 + this.game.camera.x / 50 * pixel , this.y-this.game.camera.y + 400 + this.game.camera.y / 50 * pixel , 20*pixel, 12 * pixel);


    }

    


    // this.ctx.rect(this.startX, this.endX, this.startY, this.endY);
    // this.ctx.stroke();

    Entity.prototype.draw.call(this);
};

Camera.prototype.update = function() {
    if ((this.game.tanks[0].x < 500 || this.game.tanks[0].x > 2000) && 
        (this.game.tanks[0].y < 300 || this.game.tanks[0].y > 2200)) {
            this.x = this.x;
            this.y = this.y;
    }
    else if (this.game.tanks[0].x < 500 || this.game.tanks[0].x > 2000) {
        this.y = this.game.tanks[0].y - this.height / 2;
    }
    else if (this.game.tanks[0].y < 300 || this.game.tanks[0].y > 2200) {
        this.x = this.game.tanks[0].x - this.width / 2;
    }
    else {
        this.x = this.game.tanks[0].x - this.width / 2;
        this.y = this.game.tanks[0].y - this.height / 2;
    }

    // update all components from actual map and tanks
    this.walls = this.game.walls;
    this.buildings = this.game.buildings;
    this.tanks = this.game.tanks;





    // this.endX = this.game.tanks[0].x + this.width / 2;
    
    // this.endY = this.game.tanks[0].y + this.height / 2;
    //this.x = Entity.prototype.update.call(this);



    Entity.prototype.update.call(this);
};