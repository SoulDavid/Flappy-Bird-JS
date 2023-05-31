var death_scene =  {
    background : null,
    scoreDeath : 0,
    //objeto que recoge el sistema de partículas
    partycleSystem : null,
    secondsParticles : 0,
    secondsMaxParticles : .2,
    xParticle : -75,
    yParticle : 0,
    deathSound : new Audio('music/deathSound.mp3'),

    Start : function()
    {
        this.background = new Background_game();

        this.scoreDeath = score;

        this.xParticle = -75;

        this.yParticle = canvas.height;

        this.secondsParticles = this.secondsMaxParticles;

        this.partycleSystem = new FireworksSystem(this.xParticle, this.yParticle, 50);

        this.deathSound.play();
    },

    Update : function(deltaTime)
    {
        if(Input.IsKeyDown(KEY_SPACE))
        {
            location.reload();
        }

        this.secondsParticles += deltaTime;

        if(this.secondsParticles >= this.secondsMaxParticles && this.xParticle < canvas.width)
        {
            this.xParticle += 75;
            this.partycleSystem.Activate(this.xParticle);
            this.secondsParticles = 0;
        }

        this.partycleSystem.Update();
    },

    Draw : function(ctx)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.partycleSystem.Draw(ctx);    

        ctx.font = 'bold 50px Comic Sans MC TitleFont';
        ctx.fillStyle = "white";
        
        ctx.fillText("Tu record es:    " + this.scoreDeath, canvas.width/3, canvas.height/2);
        ctx.fillText("Pulse SPACE para volver al menu", canvas.width/2 - canvas.width/3, canvas.height - canvas.height/3);
    }
}