var canvasWidth = 600;//variable para el ancho del lienzo/escenario

var canvasHeight = 400;//variable para el alto del lienzo/escenario

var player;//variable para crear al avatar/jugador

var playerYposition = 200;//variable par la posicion vertical del jugador (la unica sujeta a cambios)

var fallSpeed = 0;//variable para el control de caida (descenso en Y)

var interval = setInterval(updateCanvas, 20);

var isJumping = false;//variable para el salto del jugador actualzible por teclado

var jumpSpeed = 0;//variable para la velocidad de salto del jugador

var block;//variable para la creacion de bloques

var score = 0; //variable para la etiqueta del puntaje

var scoreLabel;//variable para la etiqueta del puntaje

function starGame(){//funcion que inicializa el juego en valores iniciales
    gameCanvas.start();//variable que plasma el contenido en el html
    player=new createPlayer(30,30,10);//variable para crear al avatar/jugador con ubicacion en el espacio
    block = new createBlock();//variable para la creacion de bloques con un valor asignado por su funcion
    scoreLabel = new createScoreLabel(10, 30);//variable para la creacion de bloques con un valor asignado por su funcion
}

var gameCanvas={//variable cuyo valor es una funcion para plasmar el contenido en el html
    canvas:document.createElement("canvas"),
    start: function(){
        this.canvas.width=canvasWidth;//inicializar el ancho del escenario
        this.canvas.height=canvasHeight;//inicializar el alto del escenario
        this.context=this.canvas.getContext("2d");//escenario en 2d
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
}

function createPlayer(width, height, x){//funcion para la creacion del jugador con parametros
    this.width = width;//pasar parametro a valor de la funcion
    this.height= height;//pasar parametro a valor de la funcion
    this.x = x;//pasar parametro a valor de la funcion
    this.y = playerYposition;//obtener valor y de nuestra variable

    this.draw=function(){//funcion que plasma al jugador
        ctx=gameCanvas.context;
        ctx.fillStyle="blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.makeFall=function(){//funcion para la caida del juagador
        if(!isJumping){//si no esta operativa la funcion de salto se ejecuta el conteido
            this.y += fallSpeed;//definicion para la velocidad a la que cae el jugador
            fallSpeed += 0.1;//definicion para la velocidad a la que cae el jugador
            this.stopPlayer();//funcion para la colision del jugador contra el suelo
        }
    }
    
    this.stopPlayer=function(){//funcion para la colision del suelo
        var ground = canvasHeight - this.height;// ubicacio del suelo 
        if (this.y > ground){//if para frenar al jugador al llegar a colisionar con el suelo
            this.y = ground
        }
    } 

    this.jump = function() {//funcion para la velocidad de salto del jugador
        if (isJumping) {// verificacion del valor de variable
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
    
}

function createBlock() {//funcion para la creacion de bloques
    var width = randomNumber(10, 50);//variable ancho aleatorio del obstaculo
    var height = randomNumber(10, 200);//variable alto ancho aleatorio del obstaculo
    var speed = randomNumber(2, 6);//variable velocidad aleatoria del obstaculo
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    this.draw = function() {//funcion para asignar caracteristicas del bloque
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {//funcion par simular el acercamiento al jugador
        this.x -= speed;//reduccion del valor en el eje x
        this.returnToAttackPosition();
    }
    //funcion para reiniciar los valores de distancia del bloque
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);//ancho del bloque
            height = randomNumber(50, 200);//alto del bloque
            speed = randomNumber(4, 6);//velocidad del bloque
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            score++;
        }
    }
}

function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}

function createScoreLabel(x, y) {//funcion para editar la etiqueta
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";//fuente de letra
        ctx.fillStyle = "black";//color de letra
        ctx.fillText(this.text, this.x, this.y);//posicion de la etiqueta
    }
}

function updateCanvas(){//funcion para resetear el juego
    detectCollision();

    ctx=gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player.makeFall();
    player.draw();
    player.jump();

    block.draw();
    block.attackPlayer();

    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {//funcion para numeros random
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {//resio de variables, evita el salto infinito
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) { //funcionamiento de acciones por medio del teclado
    if (e.keyCode == 32) {//barra espacidora
        isJumping = true;//cambio de valor de variable al presionar una tecla
        setTimeout(function() { resetJump(); }, 1000);
    }
}


