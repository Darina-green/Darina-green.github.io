$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });

  class mySky
{
    constructor(image, x)
    {
        this.x = x;
        this.y = 0;
        this.loaded = false;

        this.image = new Image();
        
        var obj = this;

        /*if (image.complete) {
            alert("ФОН ОК!");
          } else {
            alert("ФОН плохо!");
          }*/

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    Update(sky) 
    {
        this.x += speed; 

        if(this.x > window.innerWidth) 
        {
            this.x = sky.x - canvas.width + speed; 
        }
    }
}

class myFly
{
    constructor(image, x, y, isPlayer)
    {
        this.x = x;
        this.y = y;
        this.loaded = false;
        this.dead = false;
        this.isPlayer = isPlayer;

        this.image = new Image();

        var obj = this;

        /*if (image.complete) {
            alert("рисунок ОК!");
          } else {
            alert("рисунок плохо!");
          }*/

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    Update()
    {
        if(!this.isPlayer)
        {
            this.x += speed;
        }

        if(this.x > canvas.width + 50)
        {
            this.dead = true;
        }
    }

    Collide(car)
    {
        var hit = false;

        if(this.y < car.y + car.image.height * scale && this.y + this.image.height * scale > car.y) 
        {
            if(this.x + this.image.width * scale > car.x && this.x < car.x + car.image.width * scale) 
            {
                hit = true;
            }
        }

        return hit;
    }

    Move(v, d) 
    {
        if(v == "x") 
        {
            d *= 2;

            this.x += d; 

            
            if(this.x + this.image.width * scale > canvas.width)
            {
                this.x -= d; 
            }
    
            if(this.x < 0)
            {
                this.x = 0;
            }
        }
        else 
        {
            this.y += d;

            if(this.y + this.image.height * scale > canvas.height)
            {
                this.y -= d;
            }

            if(this.y < 0)
            {
                this.y = 0;
            }
        }
        
    }
}

const UPDATE_TIME = 1000 / 60;

var timer = null;

var canvas = document.getElementById("game1-canvas"); 
var ctx = canvas.getContext("2d"); 

var scale = 0.5; 

Resize(); 

window.addEventListener("resize", Resize); 

canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 

window.addEventListener("keydown", function (e) { KeyDown(e); }); 

var objects = []; 

var roads = 
[
    new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 0),
    new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 1000),
]; 

var player = new myFly("images/logos.png", canvas.width / 2, canvas.height / 2, true); 

var speed = 2;

var score = 0;

//Start();

function Start()
{
    if(!player.dead)
    {
        clearInterval(timer); 
        timer = null;
        timer = setInterval(Update, UPDATE_TIME); 
    }
    else{
        Resize(); 

        window.addEventListener("resize", Resize); 
        
        canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 
        
        window.addEventListener("keydown", function (e) { KeyDown(e); }); 
        
        objects = []; 
        
        roads = 
        [
            new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 0),
            new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 1000),
        ]; 
        
        player = new myFly("images/logos.png", canvas.width / 2, canvas.height / 2, true); 
        
        speed = 2;
        
        score = 0;
        timer = setInterval(Update, UPDATE_TIME); 
    }
    
}

function Stop()
{
    clearInterval(timer); 
    timer = null;
}

function Update() 
{
    score += 1;

    roads[0].Update(roads[1]);
    roads[1].Update(roads[0]);

    if(RandomInteger(0, 10000) > 9700) 
    {
        objects.push(new myFly("images/logos.png", RandomInteger(250, 400) * -1, RandomInteger(30, canvas.height - 50), false));
    }

    player.Update();

    if(player.dead)
    {
        alert("Game over!");
        Stop();
    }

    var isDead = false; 

    for(var i = 0; i < objects.length; i++)
    {
        objects[i].Update();

        if(objects[i].dead)
        {
            isDead = true;
        }
    }

    if(isDead)
    {
        objects.shift();
    }

    var hit = false;

    for(var i = 0; i < objects.length; i++)
    {
        hit = player.Collide(objects[i]);

        if(hit)
        {
            alert("Game over!" + "Your score = "+score);
            Stop();
            player.dead = true;
            break;
        }
    }

    Draw();
}

function Draw() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for(var i = 0; i < roads.length; i++)
    {
        ctx.drawImage
        (
            roads[i].image, 
            0, 
            0, 
            roads[i].image.width, 
            roads[i].image.height, 
            roads[i].x, 
            roads[i].y, 
            canvas.width, 
            canvas.height 
        );
    }

    DrawFlyingObgect(player);

    for(var i = 0; i < objects.length; i++)
    {
        DrawFlyingObgect(objects[i]);
    }
}

function DrawFlyingObgect(car)
{
    ctx.drawImage
    (
        car.image, 
        0, 
        0, 
        car.image.width, 
        car.image.height, 
        car.x, 
        car.y, 
        car.image.width * scale, 
        car.image.height * scale 
    );
}

function KeyDown(e)
{
    switch(e.keyCode)
    {
        case 37: //Left
            player.Move("x", -speed);
            break;

        case 39: //Right
            player.Move("x", speed);
            break;

        case 38: //Up
            player.Move("y", -speed);
            break;

        case 40: //Down
            player.Move("y", speed);
            break;

        case 27: //Esc
            if(timer == null)
            {
                Start();
            }
            else
            {
                Stop();
            }
            break;
    }
}

function Resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
