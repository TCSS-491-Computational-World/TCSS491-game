// var display = document.getElementById("display").getContext("2d");

// drawHealthBar(display, 10, 10, 40, 4.5, 60, 100);
// drawHealthBar(display, 10, 60, 500, 50, 25, 100);
// drawHealthBar(display, 10, 110, 500, 50, 50, 100);
// drawHealthBar(display, 10, 160, 500, 50, 75, 100);
// drawHealthBar(display, 10, 210, 500, 50, 100, 100);

function drawHealthBar(canvas, x, y, width, height, health, max_health) {
    if (health >= max_health) {
        health = max_health;
    }
    if (health <= 0) {
        health = 0;
    }
    
    canvas.fillStyle = "#000000";
    canvas.fillRect(x, y, width, height);
    var colorNumber =
        Math.round((1 - health / max_health) * 0xff) * 0x10000 +
        Math.round((health / max_health) * 0xff) * 0x100;
    var colorString = colorNumber.toString(16);

    if (colorNumber >= 0x100000) {
        canvas.fillStyle = "#" + colorString;
    } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
        canvas.fillStyle = "#0" + colorString;
    } else if (colorNumber << 0x10000) {
        canvas.fillStyle = "#00" + colorString;
    }
    canvas.fillRect(
        x + 1,
        y + 1,
        (health / max_health) * (width - 2),
        height - 2
    );
}