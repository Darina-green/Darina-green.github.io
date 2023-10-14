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

const canvas = document.getElementById('game2-canvas');
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
                        item.style.background = 'none'; 

                        if (currentKey === key) {
                            item.style.background = 'rgba(0, 250, 0, 0.5)';
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
                            item.style.background = 'none'; 
                            if (!isScoring) {
                                console.log(score)
                                item.style.background = 'rgba(0, 250, 0, 0.5)';
                                score ++; 
                                scoreElement.innerHTML = 'Tree power: ' + score;   
                                isScoring = true;
                                
                            }
                        
                        }
                        
                });
                
                        
            });
            isScoring = false;
            
        });
        if(windowWidth < 550){
            if (score == 10) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/contacts.png")';
            }
            if (score == 30) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/question_small.png")';
            }
    
        }
        else{
            if (score == 10) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/about.png")';
            }
            if (score == 30) {
                // Змінюємо фонове зображення, наприклад, коли досягнуто 10 очок
                canvas.style.backgroundImage = 'url("../images/quest.png")';
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










