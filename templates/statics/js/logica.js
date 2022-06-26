var canvasWidth = 600;

var canvasHeight = 400;

var player;

var playerYposition = 200;

var fallSpeed = 0;

var interval = setInterval(updateCanvas, 20);

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

function createPlayer(width, height, x){
    this.width = width;
    this.height= height;
    this.x = x;
    this.y = playerYposition;

    this.draw=function(){
        ctx=gameCanvas.context;
        ctx.fillStyle="blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    
    this.makeFall=function(){
        this.y += fallSpeed;
        fallSpeed += 0.1;
        this.stopPlayer();
    }
    
    this.stopPlayer=function(){
        var ground = canvasHeight - this.height;
        if (this.y > ground){
            this.y = ground
        }
    } 
    
}

function updateCanvas(){
    ctx=gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player.makeFall();
    player.draw();
}

