var myGamePieces = [];
var squaresHit = 0;
var squaresGenerated = 0;
var forgivnessFactor = 1.45;

var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.canvas.addEventListener('click', function (event) {
            var area = document.getElementById("myCanvas");
            var hitX = event.pageX - area.offsetLeft - area.clientLeft;
            var hitY = event.pageY - area.offsetTop - area.clientTop;

            for (var i = myGamePieces.length - 1; i >= 0; i--) {
                var isInX = hitX >= myGamePieces[i].x - (myGamePieces[i].width / 2) * forgivnessFactor
                    && hitX <= myGamePieces[i].x + (myGamePieces[i].width / 2) * forgivnessFactor;
                var isInY = hitY >= myGamePieces[i].y - (myGamePieces[i].height / 2) * forgivnessFactor
                    && hitY <= myGamePieces[i].y + (myGamePieces[i].height / 2) * forgivnessFactor;
                if (isInX && isInY) {
                    squaresHit += 1;
                    myGamePieces.splice(i, 1);
                    if (squaresHit == squaresGenerated) {
                        myGameArea.stop();
                        myGameArea.clear();
                        area.getContext("2d").fillText("You win!", 265, 175);
                        area.getContext("2d").fillText("Generated squares: " + squaresGenerated, 5, 20);
                        area.getContext("2d").fillText("Squares hit: " + squaresHit, 5, 45);
                    }
                }
            }
        });
        this.context = this.canvas.getContext("2d");
        this.context.font = "20px Arial";
        this.context.textAlign = "start";
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillText("Generated squares: " + squaresGenerated, 5, 20);
        this.context.fillText("Squares hit: " + squaresHit, 5, 45);;
    }
}

var baseSpeed = 2;
var maxRandomSpeedAddition = 4;

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    var startDirectionX;
    var startDirectionY;
    if (Math.random() > 0.5) {
        startDirectionX = 1;
    }
    else {
        startDirectionX = -1;
    }
    if (Math.random() > 0.5) {
        startDirectionY = 1;
    }
    else {
        startDirectionY = -1;
    }
    this.speed_x = (baseSpeed + Math.random() * maxRandomSpeedAddition) * startDirectionX;
    this.speed_y = (baseSpeed + Math.random() * maxRandomSpeedAddition) * startDirectionY;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function () {
        if (this.x - this.width / 2 < 0)
            this.speed_x = baseSpeed + Math.random() * maxRandomSpeedAddition;
        else if ((this.x + this.width / 2) >= myGameArea.context.canvas.width)
            this.speed_x = -baseSpeed - Math.random() * maxRandomSpeedAddition;
        if (this.y - this.height / 2 < 0)
            this.speed_y = -baseSpeed - Math.random() * maxRandomSpeedAddition;
        else if ((this.y + this.height / 2) >= myGameArea.context.canvas.height)
            this.speed_y = baseSpeed + Math.random() * maxRandomSpeedAddition;
        this.x += this.speed_x;
        this.y -= this.speed_y;
    }
}

var minSpawnNumber = 4;
var maxSpawnNumber = 12;
var componentWidth = 30;
var componentHeight = 30;

function startGame() {
    myGameArea.start();
    squaresGenerated = Math.floor(Math.random() * (maxSpawnNumber - minSpawnNumber + 1) + minSpawnNumber);
    for (var i = 1; i <= squaresGenerated; i++) {
        var randomXCoordinate = Math.floor(Math.random() * (myGameArea.context.canvas.width - componentWidth) + componentWidth / 2);
        var randomYCoordinate = Math.floor(Math.random() * (myGameArea.context.canvas.height - componentHeight) + componentHeight / 2);
        myGamePieces.push(new component(componentWidth, componentHeight, "red", randomXCoordinate, randomYCoordinate));
    }
}

function updateGameArea() {
    myGameArea.clear();
    for (var i = 0; i < myGamePieces.length; i++) {
        myGamePieces[i].newPos();
        myGamePieces[i].update();
    }
}

startGame()