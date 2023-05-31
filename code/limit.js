class LimitVertical {
    constructor(new_height, position_x, position_y)
    {
        this.type = "limitVertical";

        this.width = canvas.width;
        this.height = new_height;

        this.position = {x: position_x, y: position_y};

        this.physicsOptions = {
            user_data: this,
            type: b2Body.b2_staticBody
        };

        this.body = null;
    }

    Start()
    {
        CreateBox(world, this.position.x, this.position.y, this.width, this.height, this.physicsOptions);
    }  
}

class LimitHorizontal {
    constructor(new_width, position_x, position_y)
    {
        this.type = "limitHorizontal";

        this.width = new_width;
        this.height = canvas.height;

        this.image = graphicAssets.wall.image;

        this.position = {x: position_x, y: position_y};

        this.physicsOptions = {
            user_data: this,
            type: b2Body.b2_staticBody
        };

        this.body = null;
    }

    Start()
    {
        CreateBox(world, this.position.x, this.position.y, this.width, this.height, this.physicsOptions);
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, 100, this.height);
    }
}