function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;

    //this.center = (this.x + width) / 2 + (this.y + height) / 2
}

BoundingBox.prototype.collide = function (other) {
    // console.log(other.x);
    if (this.x < other.x + other.width 
        && this.x + this.width > other.x
         && this.y < other.y + other.height 
         && this.height + this.y > other.y){
        // collision detected!}) {
        //console.log("THERE WAS A COLLISION!!!!!!!!!!!!!!!!!!!!");
        return true;
    } else {
        //console.log("NOOOOOOOOOOOOOOOOOOOO");
        return false;
    }
}