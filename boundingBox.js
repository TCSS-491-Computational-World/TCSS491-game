function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;

    topCollision = false;
    botCollision = false;
    rigCollision = false;
    lefCollision = false;

    //this.center = (this.x + width) / 2 + (this.y + height) / 2
}

BoundingBox.prototype.collide = function (other) {
    if (this.x < other.x + other.width 
        && this.x + this.width > other.x
         && this.y < other.y + other.height 
         && this.height + this.y > other.y){
        // collision detected!}) {
        //console.log("THERE WAS A COLLISION!!!!!!!!!!!!!!!!!!!!");

        var bCollision = other.bottom - this.y;
        var tCollision = this.bottom - other.y;
        var lCollision = this.right - other.x;
        var rCollision = other.right - this.x;

        if (tCollision < bCollision && tCollision < lCollision && tCollision < rCollision ) {  
            //console.log("TOP COLLOSION");
            this.topCollision = true;
        }
        if (bCollision < tCollision && bCollision < lCollision && tCollision < rCollision ) {  
            console.log("BOT COLLISION");
            this.botCollision = true;
        }
        if (lCollision < rCollision && lCollision < tCollision && lCollision < bCollision ) {  
            //console.log("LEFT COLLOSION");
            this.lefCollision = true;
        }
        if (rCollision < lCollision && rCollision < tCollision && rCollision < bCollision ) {  
            //console.log("RIGHT COLLOSION");
            this.rigCollision = true;
        }

        return true;

    } else {
        //console.log("NOOOOOOOOOOOOOOOOOOOO");
        return false;
    }
}