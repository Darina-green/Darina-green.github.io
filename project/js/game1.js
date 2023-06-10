$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });
//---------------------------------------------------------------------------------------------------------
class mySky {
    constructor(image, x) {
      this.x = x;
      this.y = 0;
      this.loaded = false;
      this.image = new Image();
      var obj = this;
      this.image.addEventListener("load", function () {
        obj.loaded = true;
      });
      this.image.src = image;
    }
  
    Update(sky) {
      this.x += speed;
      if (this.x > window.innerWidth) {
        this.x = sky.x - canvas.width + speed;
      }
    }
  }
  
  class myFly {
    constructor(image, x, y, isPlayer) {
      this.x = x;
      this.y = y;
      this.loaded = false;
      this.dead = false;
      this.isPlayer = isPlayer;
      this.image = new Image();
      var obj = this;
      this.image.addEventListener("load", function () {
        obj.loaded = true;
      });
      this.image.src = image;
    }
  
    Update() {
      if (!this.isPlayer) {
        this.x += speed;
      }
      if (this.x > canvas.width + 50) {
        this.dead = true;
      }
    }
  
    Collide(my_object) {
      var hit = false;
      if (
        this.y < my_object.y + my_object.image.height * scale &&
        this.y + this.image.height * scale > my_object.y
      ) {
        if (
          this.x + this.image.width * scale > my_object.x &&
          this.x < my_object.x + my_object.image.width * scale
        ) {
          hit = true;
        }
      }
      return hit;
    }
  
    MoveTo(x, y) {
      this.x = x - (this.image.width * scale) / 2;
      this.y = y - (this.image.height * scale) / 2;
    }
  }
  
  const UPDATE_TIME = 1000 / 60;
  var timer = null;
  var canvas = document.getElementById("game1-canvas");
  var ctx = canvas.getContext("2d");
  var scale = 0.5;
  var isMoving = false; // Доданий прапор для визначення руху гравця
  Resize();
  window.addEventListener("resize", Resize);
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  window.addEventListener("mousemove", function (e) {
    MovePlayer(e);
  });
  canvas.addEventListener("mousedown", function () {
    isMoving = true;
  });

  canvas.addEventListener("mouseup", function () {
    isMoving = false;
  });

  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    isMoving = true;
    var touch = e.touches[0];
    MovePlayer(touch);
  });

  canvas.addEventListener("touchend", function () {
    isMoving = false;
  });

canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
  var touch = e.touches[0];
  MovePlayer(touch);
});


  var objects = [];
  var fly_path = [
    new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 0),
    new mySky("images/7742f8792365cedd9a598049c4a2be3d.png", 1000),
  ];
  var player = new myFly(
    "images/logos.png",
    canvas.width / 2,
    canvas.height / 2,
    true
  );
  var speed = 2;
  var score = 0;
  var mousePos = { x: 0, y: 0 };
  
  function Start() {
    if (!player.dead) {
      clearInterval(timer);
      timer = null;
      timer = setInterval(Update, UPDATE_TIME);
    } else {
      ResetGame();
      timer = setInterval(Update, UPDATE_TIME);
    }
  }
  
  function Stop() {
    clearInterval(timer);
    timer = null;
  }
  
  function Update() {
    score += 1;
    fly_path[0].Update(fly_path[1]);
    fly_path[1].Update(fly_path[0]);
    if (RandomInteger(0, 10000) > 9700) {
      objects.push(
        new myFly(
          "images/logos.png",
          RandomInteger(250, 400) * -1,
          RandomInteger(30, canvas.height - 50),
          false
        )
      );
    }
    player.Update();
    if (player.dead) {
      StopGame();
      alert("Game over! Your score = " + score);
    }
    var isDead = false;
    for (var i = 0; i < objects.length; i++) {
      objects[i].Update();
      if (objects[i].dead) {
        isDead = true;
      }
    }
    if (isDead) {
      objects.shift();
    }
    var hit = false;
    for (var i = 0; i < objects.length; i++) {
      hit = player.Collide(objects[i]);
      if (hit) {
        StopGame();
        alert("Game over! Your score = " + score);
        player.dead = true;
        break;
      }
    }
    Draw();
  }
  
  function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < fly_path.length; i++) {
      ctx.drawImage(
        fly_path[i].image,
        0,
        0,
        fly_path[i].image.width,
        fly_path[i].image.height,
        fly_path[i].x,
        fly_path[i].y,
        canvas.width,
        canvas.height
      );
    }
    DrawFlyingObject(player);
    for (var i = 0; i < objects.length; i++) {
      DrawFlyingObject(objects[i]);
    }
  }
  
  function DrawFlyingObject(my_object) {
    ctx.drawImage(
      my_object.image,
      0,
      0,
      my_object.image.width,
      my_object.image.height,
      my_object.x,
      my_object.y,
      my_object.image.width * scale,
      my_object.image.height * scale
    );
  }
  
  function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function RandomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  
  function MovePlayer(e) {
      var rect = canvas.getBoundingClientRect();
      var mouseX, mouseY;
    
      if (e.clientX !== undefined && e.clientY !== undefined) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      } else if (e.pageX !== undefined && e.pageY !== undefined) {
        mouseX = e.pageX - rect.left;
        mouseY = e.pageY - rect.top;
      } else if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    
      if (e.buttons === 1) {
        player.x = mouseX - player.image.width * scale / 2;
        player.y = mouseY - player.image.height * scale;
    
        if (player.x < 0) {
          player.x = 0;
        } else if (player.x + player.image.width * scale > canvas.width) {
          player.x = canvas.width - player.image.width * scale;
        }
        if (player.y < 0) {
          player.y = 0;
        } else if (player.y + player.image.height * scale > canvas.height) {
          player.y = canvas.height - player.image.height * scale;
        }
      }
  }
  
  function ResetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.dead = false;
    score = 0;
    objects = [];
  }
  
  function StopGame() {
    Stop();
    player.dead = true;
  }
  