function Component(
    image,
    x,
    y,
    width,
    height,
    type,
    boundingX,
    boundingY,
    boundingWidth,
    boundingHeight
) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width; // limit width
    this.height = height; // limit height
    this.boundingX = boundingX || x;
    this.boundingY = boundingY || y;
    this.boundingWidth = boundingWidth || width;
    this.boundingHeight = boundingHeight || height;
    // console.log({ width: this.boundingWidth, height: this.boundingWidth });
    this.type = type; // check the type of the component, like wall, building or tree etc.

    this.boundingbox = new BoundingBox(
        this.boundingX,
        this.boundingY,
        this.boundingWidth,
        this.boundingHeight
    ); // bounding box
    this.cleanShot = false; // working for bullet fire
    this.removed = false; // check if it needs to draw on the map
}
Component.prototype = new Entity();
Component.prototype.constructor = Component;

Component.prototype.draw = function() {};

Component.prototype.update = function() {};

// Forest object
function Forest(game) {
    // this.coinAnimation = new Animation(AM.getAsset("./img/coin2.png"), 0, 0, 16, 16, 0.2, 8, true, false);

    this.forestGrass = AM.getAsset("./img/forest/grass03.png");
    this.radius = 200;
    this.game = game;
    this.ctx = game.ctx;
    this.grid = setUpForest();
    //   console.log(this.grid);

    this.game.map = this.grid; // passing the whole map to gameEngine Jerry did
    this.game.path = checkPath(game); // the path of the tank, except other vehicles Jerry did
    this.game.walls = checkWalls(game); // the path of the tank, except other vehicles Jerry did, work for bullet shot

    this.game.buildings = checkBuilding(game);
    Entity.call(this, game, 0, 400);
}