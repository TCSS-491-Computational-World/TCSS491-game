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
