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

var backgroundMusic = document.getElementById("backgroundMusic");
var musicCheckbox = document.getElementById("musicCheckbox");

backgroundMusic.pause();
musicCheckbox.checked = false;

musicCheckbox.addEventListener("change", function() {
  if (musicCheckbox.checked) {
    // Увімкнути музику
    backgroundMusic.play();
  } else {
    // Вимкнути музику
    backgroundMusic.pause();
  }
});
//----------------------------------------------------------------------------------------------------------


class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
    }
  
    draw(ctx) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
  
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  
    move() {
      this.x += this.dx;
      this.y += this.dy;
    }
  
    isInsideItem(item, canvas) {
      const itemRect = item.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      const itemRelativeToCanvas = {
        x: itemRect.left - canvasRect.left,
        y: itemRect.top - canvasRect.top,
        width: itemRect.width,
        height: itemRect.height
    };

  
      return (
        this.x > itemRelativeToCanvas.x &&
        this.x < itemRelativeToCanvas.x + itemRelativeToCanvas.width &&
        this.y > itemRelativeToCanvas.y &&
        this.y < itemRelativeToCanvas.y + itemRelativeToCanvas.height 
      );
    }
  }
  
  class Game {
    constructor(canvas, scoreElement, startButton, pauseButton, items) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.scoreElement = scoreElement;
      this.startButton = startButton;
      this.pauseButton = pauseButton;
      this.items = items;
  
      this.circleRadius = 20;
      this.circleSpeed = 0.7;
      this.score = 0;
      this.isGameRunning = false;
      this.isScoring = false;
      this.currentKey = null;
  
      this.circles = [];
      this.generateCirclesInterval = null;
  
      this.initListeners();
      this.initCanvasSize();
      this.update();
    }
  
    initListeners() {

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
      
        this.items.forEach(item => {
            item.addEventListener('click', this.handleItemClick.bind(this, item, this.canvas));
        });
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.pauseButton.addEventListener('click', this.pauseGame.bind(this));
    }
  
    initCanvasSize() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 550) {
        this.canvas.width = 350;
        this.canvas.height = 600;
        this.items.forEach(item => {
          item.textContent = " ";
        });
      }
    }
  
    handleKeyDown(event, item) {
        const key = event.key.toUpperCase();
        if (['A', 'S', 'D', 'J', 'K', 'L'].includes(key)) {
            this.currentKey = key;
        }
        else if(key==='Ф'){
            this.currentKey = 'A'
        }
        else if(key==='І' || key==='Ы'){
            this.currentKey = 'S'
        }    
        else if(key==='В'){
            this.currentKey = 'D'
        }    
        else if(key==='О'){
            this.currentKey = 'J'
        }    
        else if(key==='Л'){
            this.currentKey = 'K'
        }    
        else if(key==='Д'){
            this.currentKey = 'L'
        }
        console.log("currentKey", this.currentKey);


        this.items.forEach(item => {
        this.circles.forEach(circle => {
            if (circle.isInsideItem(item, canvas)) {
                console.log("isInside")
                let key = item.getAttribute('data-key');
                if (!this.isScoring && this.currentKey===key) {
                    this.score++;
                    this.scoreElement.innerHTML = 'Tree power: ' + this.score;
                    this.isScoring = true;
                }
            }
          });
          this.isScoring = false;
        });

    }
  
    handleItemClick(item, canvas) {
        console.log("click")
      this.circles.forEach(circle => {
        if (circle.isInsideItem(item, canvas)) {
            console.log(item)
          if (!this.isScoring) {
            this.score++;
            this.scoreElement.innerHTML = 'Tree power: ' + this.score;
            this.isScoring = true;
          }
        }
      });
      this.isScoring = false;
    }
  
    update() {
      if (this.isGameRunning) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        const circlesToRemove = [];
        this.circles.forEach((circle, index) => {
          circle.move();
          circle.draw(this.ctx);
  
          if (circle.x + circle.radius < 0 || circle.x - circle.radius > this.canvas.width ||
            circle.y + circle.radius < 0 || circle.y - circle.radius > this.canvas.height) {
            circlesToRemove.push(index);
          }
        });
  
        circlesToRemove.forEach(index => {
          this.circles.splice(index, 1);
        });
  
        if (this.score == 5) {
          this.updateBackgroundImage('tree_small2.png', 'tree_big2.png');
        } else if (this.score == 10) {
          this.updateBackgroundImage('tree_small3.png', 'tree_big3.png');
        }
  
        requestAnimationFrame(this.update.bind(this));
      }
    }
  
    updateBackgroundImage(imageName, imageName2) {
      if (window.innerWidth < 550) {
        this.canvas.style.backgroundImage = `url("../images/${imageName}")`;
      }
      else{
        this.canvas.style.backgroundImage = `url("../images/${imageName2}")`;
      }
    }
  
    generateCircle() {
      if (this.isGameRunning) {
        const circle = new Circle(
          this.canvas.width / 2,
          Math.random() * (this.canvas.height - 2 * this.circleRadius) + this.circleRadius,
          (Math.random() > 0.5 ? 1 : -1) * this.circleSpeed,
          0,
          this.circleRadius
        );
        this.circles.push(circle);
      }
    }
  
    startGame() {
      this.isGameRunning = true;
      this.generateCirclesInterval = setInterval(() => this.generateCircle(), 2000);
      this.update();
      
    }
  
    pauseGame() {
      this.isGameRunning = false;
      clearInterval(this.generateCirclesInterval);
    }
  }
  
  const canvas = document.getElementById('game2-canvas');
  const scoreElement = document.getElementById('score');
  const startButton = document.getElementById('butStart');
  const pauseButton = document.getElementById('butStop');
  const items = document.querySelectorAll('.item_game');
  
  const game = new Game(canvas, scoreElement, startButton, pauseButton, items);

//-------------------------------------------------------------------------------------------
/*const canvas = document.getElementById('game2-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('butStart');
const pauseButton = document.getElementById('butStop');

const circleRadius = 20;
const circleSpeed = 0.7;
//const circleColor = 'rgba(0, 0, 255, 0.5)';



let score = 0;
scoreElement.innerHTML = 'Tree power: ' + score;

const circles = [];

let currentKey = null;
let isGameRunning = false;
let isScoring = false;


const items = document.querySelectorAll('.item_game');

var windowWidth = window.innerWidth;

if (windowWidth < 550) {
    canvas.width = 350;
    canvas.height = 600;
    items.forEach(item => {
        item.textContent = " ";
    });
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    //const item = Array.from(items).find(item => item.getAttribute('data-key') === key);

    if (['A', 'S', 'D', 'J', 'K', 'L'].includes(key)) {
        currentKey = key;
        console.log("currentKey", currentKey)
    }
    else if(key==='Ф'){
        currentKey = 'A'
    }
    else if(key==='І' || key==='Ы'){
        currentKey = 'S'
    }    
    else if(key==='В'){
        currentKey = 'D'
    }    
    else if(key==='О'){
        currentKey = 'J'
    }    
    else if(key==='Л'){
        currentKey = 'K'
    }    
    else if(key==='Д'){
        currentKey = 'L'
    }
});

function update() {
    if (isGameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const circlesToRemove = []; // Масив для видалення кружечків

        circles.forEach((circle, index) => {
            circle.x += circle.dx;
            circle.y += circle.dy;

            ctx.beginPath();
            var gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circleRadius);

            gradient.addColorStop(0, 'rgba(255, 255, 0, 1)'); // Початковий колір з повною непрозорістю
            gradient.addColorStop(1, 'rgba(255, 255, 0, 0)'); // Зовнішній колір з повною прозорістю

            ctx.fillStyle = gradient;
            ctx.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2);
            //ctx.fillStyle = circleColor;
            ctx.fill();
            ctx.closePath();

            if (
                circle.x - circleRadius > 0 &&
                circle.x + circleRadius < canvas.width &&
                circle.y - circleRadius > 0 &&
                circle.y + circleRadius < canvas.height
            ) {
                const items = document.querySelectorAll('.item_game');

                items.forEach(item => {
                    const canvasRect = canvas.getBoundingClientRect();
                    const itemRect = item.getBoundingClientRect();

                    const itemRelativeToCanvas = {
                        x: itemRect.left - canvasRect.left,
                        y: itemRect.top - canvasRect.top,
                        width: itemRect.width,
                        height: itemRect.height
                    };

                    if (
                        circle.x > itemRelativeToCanvas.x &&
                        circle.x < itemRelativeToCanvas.x + itemRelativeToCanvas.width &&
                        circle.y > itemRelativeToCanvas.y &&
                        circle.y < itemRelativeToCanvas.y + itemRelativeToCanvas.height
                    ) {
                        //console.log("click")
                        let key = item.getAttribute('data-key');
                        //console.log(key)
                        //console.log("currentKey", currentKey)

                        if (currentKey === key) {
                            score++;
                            scoreElement.innerHTML = 'Tree power: ' + score;
                            currentKey = null;
                            
                        }
                    }
                    
                    
                });
            }

            // Перевірка, чи кружечок виходить за межі канвасу
            if (
                circle.x + circleRadius < 0 ||
                circle.x - circleRadius > canvas.width ||
                circle.y + circleRadius < 0 ||
                circle.y - circleRadius > canvas.height
            ) {
                circlesToRemove.push(index); // Додайте індекс для видалення
            }
        });

        // Видалення кружечків, які вийшли за межі канвасу
        circlesToRemove.forEach(index => {
            circles.splice(index, 1);
        });

        // Обробка кліку на .item_game
        items.forEach(item => {
            item.addEventListener('click', () => {
  
                
                circles.forEach(circle => {

                        const canvasRect = canvas.getBoundingClientRect();
                        const itemRect = item.getBoundingClientRect();
                        
                        const itemRelativeToCanvas = {
                            x: itemRect.left - canvasRect.left,
                            y: itemRect.top - canvasRect.top,
                            width: itemRect.width,
                            height: itemRect.height
                        };

                        if (
                            circle.x > itemRelativeToCanvas.x &&
                            circle.x < itemRelativeToCanvas.x + itemRelativeToCanvas.width &&
                            circle.y > itemRelativeToCanvas.y &&
                            circle.y < itemRelativeToCanvas.y + itemRelativeToCanvas.height 
                        ) {
                            
                            if (!isScoring) {
                                console.log(score)
                                score ++; 
                                scoreElement.innerHTML = 'Tree power: ' + score;   
                                isScoring = true;
                                
                            }
                        
                        }
                        
                });
                
                        
            });
            isScoring = false;
            
        });
        if(score == 5){
            if (windowWidth < 550) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/tree_small2.png")';
            }
            else {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/tree_big2.png.png")';
            }
    
        }
        if(score == 10){
            if (windowWidth < 550) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/tree_small3.png")';
            }
            else{
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/tree_big3.png")';
            }
    
        }


        requestAnimationFrame(update);
    }
}

function generateCircle() {
    if (isGameRunning) {
        const circle = {
            x: canvas.width / 2,
            y: Math.random() * (canvas.height - 2 * circleRadius) + circleRadius,
            dx: (Math.random() > 0.5 ? 1 : -1) * circleSpeed,
            dy: 0,
        };
        circles.push(circle);
    }
}


let generateCirclesInterval;
function startGame() {
    isGameRunning = true;
    generateCirclesInterval = setInterval(generateCircle, 2000);

    //startButton.disabled = true; // Деактивуємо кнопку "Старт"
    //pauseButton.disabled = false; // Активуємо кнопку "Пауза"
    update();
}

function pauseGame() {
    isGameRunning = false;
    clearInterval(generateCirclesInterval); 
    //startButton.disabled = false; // Активуємо кнопку "Старт"
    //pauseButton.disabled = true; // Деактивуємо кнопку "Пауза"
}

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);

*/




