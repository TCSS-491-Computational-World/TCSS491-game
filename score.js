function Score(game, gameScore) {
    this.game = game;
    this.game.gameScore = gameScore;
    this.ctx = game.ctx;
}

Score.prototype.draw = function() {
    this.ctx.font = "28px Arial";
    this.ctx.strokeStyle = "#F5E616";
    this.ctx.strokeText("Score: " + this.game.gameScore, 8, 24);
};

Score.prototype.update = function() {
    Entity.prototype.update.call(this);
};