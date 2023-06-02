var death_scene =  {
    //Objeto que recoge el background
    background : null,
    //Objeto que recoge el score del player cuando muere
    scoreDeath : 0,
    //Objeto que recoge el sistema de partículas
    partycleSystem : null,
    //Segundos actuales para emitir el sistema de particulas
    secondsParticles : 0,
    //Segundos máximos para emitir el sistema de particulas
    secondsMaxParticles : .2,
    //La posición X donde se emitirá el sistema de partículas
    xParticle : -75,
    //La posición Y donde se emitirá el sistema de partículas
    yParticle : 0,
    //Objeto que recoge el sonido cuando el jugador muere en la partida
    deathSound : new Audio('music/deathSound.mp3'),

    //Función de Start - Que se ejecuta despues de crear el objeto
    Start : function()
    {
        //Inicia el objeto de background
        this.background = new Background_game();

        //Inicializa la score del jugador, y recoge la actual score
        this.scoreDeath = score;

        //Inicia la posición X
        this.xParticle = -75;
        //Inicia la posición Y
        this.yParticle = canvas.height;

        //Inicializa los segundos de Particulas para que se ejecute directamente
        this.secondsParticles = this.secondsMaxParticles;

        //Crea el sistema de particulas
        this.partycleSystem = new FireworksSystem(this.xParticle, this.yParticle, 50);

        //Suena el sonido 
        this.deathSound.play();
    },

    //Función de Update
    Update : function(deltaTime)
    {
        //Si se pulsa esta tecla (ESPACIO), se cargará de nuevo la página iniciando el juego de 0
        if(Input.IsKeyDown(KEY_SPACE))
        {
            location.reload();
        }

        //Aumenta los segundos con deltaTime
        this.secondsParticles += deltaTime;

        //Si los segundos actuales de las particulas es mayor o igual que el máximo, y la coordenada X del sistema de particulas sea menor que el ancho del canvas
        if(this.secondsParticles >= this.secondsMaxParticles && this.xParticle < canvas.width)
        {
            this.xParticle += 75;
            //Se activa el sistema de particulas
            this.partycleSystem.Activate(this.xParticle);
            //Se resetea los segundos
            this.secondsParticles = 0;
        }

        //Update del sistema de particulas
        this.partycleSystem.Update();
    },

    //Función del Draw
    Draw : function(ctx)
    {
        //Background oscuro
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Se pinta el sistema de particulas
        this.partycleSystem.Draw(ctx);    

        //Propiedades del texto a escribir
        ctx.font = 'bold 50px Comic Sans MC TitleFont';
        ctx.fillStyle = "white";
        
        ctx.fillText("Tu record es:    " + this.scoreDeath, canvas.width/3, canvas.height/2);
        ctx.fillText("Pulse SPACE para volver al menu", canvas.width/2 - canvas.width/3, canvas.height - canvas.height/3);
    }
}
