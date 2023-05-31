class Pipe {
    constructor(new_x, new_y, width, height, positionBoolean, new_groupOfPipe)
    {
        this.type = "pipe";

        this.width = width;
        this.height = height;

        this.position = {x: new_x, y: new_y};

        this.physicsOptions = {
            user_data: this,
            type: b2Body.b2staticBody,
        };

        this.physicsOptionsDynamic = {
            user_data: this,
            type: b2Body.b2_dynamicBody,
            fixedRotation: false,
            restitution: 0.0,
            friction: 0.0
        };

        this.body = null;

        // movement attr - mecánica de salto
        this.maxHorizontalVel = 3;

        this.image = graphicAssets.pipe.image;

        this.positionBoolean = positionBoolean

        this.groupOfPipe = new_groupOfPipe;
    }

    Start()
    {
        if(this.positionBoolean)
            this.body = CreateBox(world, this.position.x, this.position.y, this.width, this.height, this.physicsOptions);
        else
            this.body = CreateBox(world, this.position.x, this.position.y, this.width, this.height, this.physicsOptionsDynamic);


        this.body.SetUserData(this);
    }  

    Update(deltaTime)
    {
        this.ApplyVelocity(new b2Vec2(-10, 0));
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
    }

    Draw(ctx)
    {
        ctx.save();

        let widthScaled = this.width * scale;

        if(this.positionBoolean)
        {
            let heightScaled = this.height * scale + scale/1.5;

            ctx.scale(1, -1);
            ctx.drawImage(this.image, this.position.x - widthScaled, this.position.y - heightScaled, widthScaled*2, heightScaled*2 + scale/3);
        }
        else
        {
            let heightScaled = (this.height * 2) * scale + scale/4;
            ctx.drawImage(this.image, this.position.x - widthScaled, canvas.height - heightScaled, widthScaled*2, heightScaled*2 + (scale/2));
        }

        ctx.restore();
    }

    ApplyVelocity(vel)
    {
        let bodyVel = this.body.GetLinearVelocity();
        bodyVel.Add(vel);
        
        // horizontal movement cap
        if (Math.abs(bodyVel.x) > this.maxHorizontalVel)
            bodyVel.x = this.maxHorizontalVel * bodyVel.x / Math.abs(bodyVel.x);

        this.body.SetLinearVelocity(bodyVel);
    }

    DeleteObject()
    {
        this.groupOfPipe.toDelete = true;
    }
}

class Pipe_Group
{
    constructor(x, y, width, height)
    {
        this.pipeUp = new Pipe(x, y, width, height, true, this);

        this.toDelete = false;

        if(height < 2)
            this.pipeDown = new Pipe(x, y-6, width, (4-height) - 1, false, this);
        else if(height<3)
            this.pipeDown = new Pipe(x, y-6, width, (4.5-height) - 1, false, this);
        else
            this.pipeDown = new Pipe(x, y-6, width, (5.5-height) - 1, false, this);
    }

    Start()
    {
        this.pipeUp.Start();
        this.pipeDown.Start();
    }

    Update(deltaTime)
    {
        this.pipeUp.Update(deltaTime);
        this.pipeDown.Update(deltaTime);
    }

    Draw(ctx)
    {
        this.pipeUp.Draw(ctx);
        this.pipeDown.Draw(ctx);
    }

    DeletePipes()
    {
        world.DestroyBody(this.pipeUp.body);
        world.DestroyBody(this.pipeDown.body);
    }
}