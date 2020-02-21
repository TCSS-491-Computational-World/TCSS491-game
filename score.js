function score(game, gameScore) {
    this.game = game;
    this.game.gameScore = gameScore;
    this.ctx = game.ctx;
}

score.prototype.draw = function() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.strokeText("Score: " + this.game.gameScore, 8, 20);
};

score.prototype.update = function() {
    Entity.prototype.update.call(this);
};