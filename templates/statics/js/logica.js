var canvasWidth = 600;
var canvasHeight = 400;

function starGame(){
    gameCanvas.start();
    player=new createPlayer(30,30,10);
}

var gameCanvas={
    canvas:document.createElement("canvas"),
    start: function(){
        this.canvas.width=canvasWidth;
        this.canvas.height=canvasHeight;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
}

var player;

var playerYposition = 200;

function createPlayer(width, height, x){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=playerYposition;

    ctx=gameCanvas.context;
    ctx.fillStyle="blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}