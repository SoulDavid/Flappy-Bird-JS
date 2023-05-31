var menu = {
    background : null,
    secondsColor : 0,
    secondsColorMax : 2,
    swapColor : false,
    color : null,
    player : null,
    music_Menu : new Audio('music/musicMenu.mp3'),

    Start : function()
    {
        this.secondsColor = this.secondsColorMax;
        this.player = new PlayerMenu(150, 500);
        this.player.Start();
        this.music_Menu.play();
    },

    Update : function(deltaTime)
    {
        if(Input.IsKeyDown(KEY_SPACE))
        {
            this.music_Menu.pause(); 
            actualScene = gameScene;
            actualScene.Start();
        }

        this.secondsColor += deltaTime;
        if(this.secondsColor >= this.secondsColorMax)
        {
            this.color = randomColor();
            this.secondsColor = 0;
        }

        this.player.Update(deltaTime);
    },

    Draw : function(ctx)
    {
        ctx.font = 'bold 200px TitleFont';

        ctx.fillStyle = this.color;

        ctx.fillText("Flappy", canvas.width/4, 300);
        ctx.fillText("Bird", canvas.width/3, 550);

        ctx.fillStyle = 'black';
        ctx.font = 'bold 50px TitleFont';
        ctx.fillText("Pulse SPACE para continuar", canvas.width/5, canvas.height-100);

        this.player.Draw(ctx);

    }
}

function randomColor()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + "," + g + "," + b + ")";
}