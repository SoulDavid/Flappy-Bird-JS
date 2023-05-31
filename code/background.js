class Background 
{
    constructor(position)
    {
        this.body = null;
        this.image = graphicAssets.background.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

class Background_game{
    constructor(position)
    {
        this.body = null;
        this.image = graphicAssets.background_game.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}