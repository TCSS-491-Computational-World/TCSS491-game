var hFunction = function(start, end) {
    var deltaX = Math.abs(start.x- end.x);
    var deltaY = Math.abs(start.y- end.y);
    return deltaX+deltaY;
}

function Node(value, locationX, locationY) {
    this.value = value;

    this.x = locationX;
    this.y = locationY;
    // this.searched = false;
    this.parent = null;
  }

function Agent(game, tankIndex) {
    this.game = game; 
    this.tankIndex = tankIndex;
}


Agent.prototype.selectAction = function () {

}

Agent.prototype.AStarSearch = function(start, target, h) {
    var visited = new Set();                    // checked
    var queue = [];                             // checked
    var element = new Node(GAMEBOARD[start.x][start.y],start.x, start.y); // checked
    queue.push(element);                        // checked
    while (queue.length > 0) {
      var current = queue.shift();              // checked
      visited.add(GAMEBOARD[current.x][current.y]); // unchecked
      directions = checkValidDirection({x:current.x,y:current.y});
      if (!current.value.eaten && ((current.value.bubble) || (current.value.superBubble))) {
        // console.log("Found");
        var path = [];                          // checked
        var temp = current;                     // checked
        while (!((temp.x === element.x) && (temp.y === element.y))){
          path.push(temp);
          temp = temp.parent;
          // console.log(temp.parent === null);
  
        }
        path.push(temp);                        // checked
        path.reverse();                         // checked
        return path;                            // checked
      }
      var list = getNeighors(current,directions);          // checked
      for (var i = 0; i < list.length; i++) {   // checked
        if(!visited.has(GAMEBOARD[list[i].x][list[i].y])) {
          list[i].parent = current;
          queue.push(list[i]);
        }
      }
      
    }
    return [] // not FOUND!!
}