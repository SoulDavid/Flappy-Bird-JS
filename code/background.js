//Clase Background que recoge sus propiedades como el body y la imagen
class Background 
{
    //Constructor por defecto
    constructor(position)
    {
        //Propiedad del cuerpo
        this.body = null;
        //Propiedad de la imagen
        this.image = graphicAssets.background.image;
    }

    //Propiedad para pintar por canvas el background
    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

//Clase Background del juego que recoge sus propiedades como el body y la imagen
class Background_game
{
    //Constructor por defecto
    constructor(position)
    {
        //Propiedad del cuerpo
        this.body = null;
        //Propiedad de la imagen
        this.image = graphicAssets.background_game.image;
    }
    
    //Propiedad para pintar por canvas el background
    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}
