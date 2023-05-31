class Player {
    constructor()
    {
        this.type = 'player';

        this.position = {x : 200, y: 200};
        this.width = 0.24;
        this.height = 0.36;

        this.animation = null;

        this.physicsOptions = {
            density: 1,
            fixedRotation: false,
            linearDamping: 1,
            user_data: this,
            type: b2Body.b2_dynamicBody,
            restitution: 0.0,
            friction: 0.0
        };
        
        // movement attr - mecánica de salto
        this.maxVerticalVel = 10;

        this.body = null;
    }

    Start()
    {
        this.animation = new SSAnimation(graphicAssets.player.image, 71, 60, [5], 1/8);

        this.body = CreateBox(world, this.position.x/scale, this.position.y/scale, this.width, this.height, this.physicsOptions);
        this.body.SetUserData(this);
    }

    Update(deltaTime)
    {
        this.animation.Update(deltaTime);

        if(Input.IsKeyDown(KEY_SPACE))
        {
            this.ApplyVelocity(new b2Vec2(0, 5));
        }

        let bodyPosition = this.body.GetPosition();
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
    }

    Draw(ctx)
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);

        this.animation.Draw(ctx);

        ctx.restore();
    }

    ApplyVelocity(vel)
    {
        let bodyVel = this.body.GetLinearVelocity();
        bodyVel.Add(vel);
        
        if(Math.abs(bodyVel.y) > this.maxVerticalVel)
            bodyVel.y = this.maxVerticalVel * bodyVel.y / Math.abs(bodyVel.y);

        this.body.SetLinearVelocity(bodyVel);
    }
}

class PlayerMenu
{   
    constructor(xPosition = 200, yPosition = 500)
    {
        this.type = 'player';

        this.position = {x : xPosition, y: yPosition};
        this.width = 0.24;
        this.height = 0.36;

        this.animation = null;

        this.body = null;
    }
    
    Start()
    {
        this.animation = new SSAnimation(graphicAssets.playerMenu.image, 142, 120, [5], 1/8);
    }

    Update(deltaTime)
    {        
        this.animation.Update(deltaTime);
    }

    Draw(ctx)
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);

        this.animation.Draw(ctx);

        ctx.restore();
    }
}