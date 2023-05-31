var gameScene = {
    background : null,
    player : null,
    limitTop : null,
    seconds : 0,
    secondsBetweenPipes : 2,
    pipesOnScreen : [],
    deathPlayer : false,
    game_music : new Audio('music/FlappyBirdThemeSong.mp3'),

    Start : function()
    {
        this.limitTop = new LimitVertical(.2, 0, 8.4);
        this.limitTop.Start();

        this.limitBottom = new LimitVertical(.2, 0, -0.2);
        this.limitBottom.Start();

        this.limitLeft = new LimitHorizontal(.2, -2, 0);
        this.limitLeft.Start();

        this.player = new Player();
        this.player.Start();

        this.background = new Background_game();

        this.game_music.play();
    },

    Update : function(deltaTime)
    {
        this.player.Update(deltaTime);
        
        for(let i = 0; i < this.pipesOnScreen.length; i++)
        {
            this.pipesOnScreen[i].Update(deltaTime);

            if(this.pipesOnScreen[i].toDelete)
            {
                this.pipesOnScreen[i].DeletePipes();
                RemoveElementAt(this.pipesOnScreen, i);

                i--;
            }
        }

        this.seconds+=deltaTime;

        if(this.seconds >= this.secondsBetweenPipes)
        {
            let newPipeGroup = new Pipe_Group(20,8,0.5, randomBetween(1.0, 5.0));
            newPipeGroup.Start();
            this.pipesOnScreen.push(newPipeGroup);
            this.seconds = 0;
        }
    },

    Draw : function(ctx)
    {
        DrawWorld(ctx, world);

        this.background.Draw(ctx);

        for(let i = 0; i < this.pipesOnScreen.length; i++)
          this.pipesOnScreen[i].Draw(ctx);

        this.player.Draw(ctx);

        this.limitLeft.Draw(ctx);

        ctx.font = "24px Comic Sans MC";
        ctx.fillStyle = "white";
        ctx.fillText(score, 1200, 40);
    }
}