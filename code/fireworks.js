class Fireworks {
    constructor(x, y, hue)
    {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.radius = Math.random() * 8;
        this.speedX = Math.random();
        this.speedY = Math.random() * 20;
        this.color = `hsl(${this.hue}, 100%, 50%)`;
    }

    Draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
        
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    Update()
    {
        this.x += this.speedX;
        this.y += -1 * this.speedY;
    }
}

class FireworksSystem{
    constructor(x, y, maxParticles = 2)
    {
        this.origin = new Vector2();
        this.x = x;
        this.y = y;
        this.maxParticleCount = maxParticles;
        this.hue = 0;
        this.particles = new Array();

    }

    Activate(x)
    {
        for(let i = 0; i < this.maxParticleCount; i++)
        {
            const newParticle = new Fireworks(x,this.y,this.hue);
            this.particles.push(newParticle);
        }
    }

    Update()
    {
        this.hue++;
        this.particles.forEach(particle => {
            particle.Update();
        })
    }

    Draw(ctx)
    {
        this.particles.forEach(particle => {
            particle.Draw(ctx);
        });
    }

    //Función que resetea la posición, para que no salieran dos partículas al mismo tiempo.
    ResetPosition(position)
    {
        this.x = position.x;
    }
}

class Vector2
{
    constructor (x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}
