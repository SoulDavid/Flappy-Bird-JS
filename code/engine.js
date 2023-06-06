//Objeto que recoge el elemento canvas de HTML
var canvas;
//Recoge el contexto del canvas, usado para renderizar en este
var ctx;

var targetDT = 1/60;
var globalDT;
var time = 0,
    FPS = 0,
    acumDelta = 0,
    contadorTime = 0,
    frames = 0;

//La puntuación del jugador
var score = 0;

//variable que recoge la escena que debería estar reproduciendose
var actualScene = null;

window.requestAnimationFrame = (function (event){
    return window.requestAnimationFrame     ||
        window.mozRequestAnimationFrame     ||
        window.webkitRequestAnimationFrame  ||
        window.msRequestAnimationFrame      ||
        window.oRequestAnimationFrame       ||
        function (callback) {
            window.setTimeout(callback, targetDT * 1000);
        };
}) ();


window.onload = BodyLoaded;

//Array que recoge los gráficos del juego entero
var graphicAssets = {
    background : {
        path: "./assets/background.jpg",
        image: null
    },

    background_game : {
        path: "./assets/background_game.png",
        image: null
    },

    player : {
        path: "./assets/playerSpritesheet.png",
        image: null
    },

    pipe : {
        path: "./assets/pipe.png",
        image: null
    },

    wall : {
        path: "./assets/wall.png",
        image: null
    },

    playerMenu : {
        path: "./assets/playerMenu.png",
        image: null
    }
};

//Función para cargar todos los archivos de imagen
function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;

    const onload = () => --imagesToLoad === 0 && onloaded();

    for (let asset in assets)
    {
        if(assets.hasOwnProperty(asset))
        {
            imagesToLoad++;

            //Crea la imagen a partir de las propiedades de cada elemento del array
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
    }
    return assets;
}

//Cargar la escena en el canvas
function BodyLoaded()
{
    //Asigna las variables de canvas y del contexto de este
    canvas = document.getElementById("MyCanvas");
    ctx = canvas.getContext("2d");

    //Inicia los controles, a traves de las funciones de estos scripts
    SetupKeyboardEvents();
    SetupMouseEvents();
    
    //Prepara las fisicas del mundo, pues usamos las fisicas de box2D
    PreparePhysics(ctx);

    //Carga las imagenes
    LoadImages(graphicAssets, function() {
        Start();
        Loop();
    });
}

//Inicio del juego, iniciamos con la escena de menu
function Start()
{
    actualScene = menu;
    actualScene.Start();
}

//Bucle del engine
function Loop()
{
    //DeltaTime - Tiempo que ha transcurrido
    let now = Date.now();
    let deltaTime = now - time;
    globalDT = deltaTime;

    if(deltaTime > 1000)
        deltaTime = 0;

    time = now;

    //framesCounter
    frames++;
    acumDelta += deltaTime;

    if(acumDelta > 1000)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= acumDelta;
    }

    requestAnimationFrame(Loop);

    //Game Logic --------------------
    Input.Update();
    Update(deltaTime/1000);

    //Draw the game .................
    Draw(ctx)

    Input.PostUpdate();
}

//Update del juego
function Update(deltaTime)
{
    contadorTime += deltaTime;

    //Limpia las fisicas para que no se buguee el juego
    world.Step(deltaTime, 8, 3);
    world.ClearForces();

    actualScene.Update(deltaTime);
}

//Escena de pintar la escena actual
function Draw(ctx)
{
    ctx.clearRect(0,0,canvas.width, canvas.height);

    actualScene.Draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = "10px Comic Sans MS";
    ctx.fillText("FPS: " + FPS, 10, 16);
    ctx.fillText("DT: " + Math.round(1000 / globalDT), 10, 28);
    ctx.fillText("TimePlay: " + contadorTime.toFixed(2), 10, 40);
}

//Escena de pintar el mundo de box2D (Colliders)
function DrawWorld(ctx, world)
{
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
}

