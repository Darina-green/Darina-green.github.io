$(function () { 

    
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });
//---------------------------------------------------------------------------------------------------------------------------------



let figure_color = "red"
const colorElements = document.querySelectorAll('.color');


colorElements.forEach(color => {
  color.addEventListener('click', () => {
    const selectedColor = color.style.backgroundColor;
    figure_color = selectedColor
    console.log('Selected color:', selectedColor);
  });
});

class Figure{
    addFigure(ctx, my_color){}
    setColor(){}
    getName(){}
    getFigureSize(){}

}

class Rectangle extends Figure{
    name = "Rectangle"


    addFigure(ctx){
        
    }
    setColor(ctx){}
    getName(number){
        return number +" "+ this.name 
    }
    
    getFigureSize(){}

}

class Heart extends Figure{
    name = "Heart"
    x=0
    y=0
    size = Math.random() * 100 + 50; 
    constructor(canvas){
        super(canvas);
        this.x = canvas.width / 2 
        this.y = canvas.height / 2 
    }
    addFigure(ctx, my_color) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4); 
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + this.size / 4);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + this.size / 2, this.x, this.y + this.size / 2 + this.size / 4, this.x, this.y + this.size / 2 + this.size / 4);
        ctx.bezierCurveTo(this.x, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 4);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + this.size / 4);
        ctx.closePath();
        ctx.fillStyle = my_color;
        ctx.fill();
    }
    setColor(){}
    getName(number){
        return number +" "+ this.name 
    }

    getFigureSize(){}

}

class Circle extends Figure{
    name = "Circle"


    addFigure(ctx){}
    setColor(ctx){}
    getName(number){
        return number +" "+ this.name 
    }

    getFigureSize(){}

}

var canvas = document.getElementById("art1-canvas");
var ctx = canvas.getContext("2d");

var windowWidth = window.innerWidth;

if (windowWidth < 550) {
  canvas.width = 350
  canvas.height = 450
}

let figure_arr = []
let figure_name_arr = []
let number = 0
let color_arr = []

let my_catalogue = document.getElementById("figure-catalogue");

let ul = document.createElement("ul");
let current_figure_index = 0 

var isMoving = false; 

window.addEventListener("mousemove", function (e) {
  moveFigure(e);
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
  moveFigure(touch);
});


function addToCatalogue(element, fig_id){

    let li = document.createElement("li")
    li.textContent = element
    li.id = fig_id
    li.addEventListener("click", function() {
        let selected = ul.querySelector(".selected")
        if (selected) {
          selected.classList.remove("selected")
        }
        li.classList.add("selected")
        current_figure_index = figure_name_arr.indexOf(element)
        console.log("Індекс елементу:", figure_name_arr.indexOf(element))
        console.log("fig_id" ,li.id)
    });
    ul.appendChild(li)

    my_catalogue.appendChild(ul)
}


function addRect(){
    let rect = new Rectangle()
    rect .addFigure(ctx)
    number++
    figure_arr.push(rect)
    figure_name_arr.push(rect.getName(number))
    console.log(figure_name_arr)
}

function addHeart(){
    let heart = new Heart(canvas)
    let fig_id = "figure"+number
    heart.addFigure(ctx, figure_color)
    number++
    figure_arr.push(heart)
    figure_name_arr.push(heart.getName(number))
    color_arr.push(figure_color)
    console.log(figure_name_arr)
    addToCatalogue(heart.getName(number), fig_id )
}


function  deleteFigure(){
    
    if(figure_arr.length>0 && current_figure_index != undefined){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    
        let id_number = parseInt(figure_name_arr[current_figure_index][0])-1
        let del_id = "figure"+id_number
        console.log("del_id", del_id)

        let catalogue_fig_remove = document.getElementById(del_id)
        catalogue_fig_remove.remove()

        figure_arr.splice(current_figure_index, 1)
        figure_name_arr.splice(current_figure_index, 1)
        color_arr.splice(current_figure_index, 1)
      
        
        for (let i = 0; i < figure_arr.length; i++) {
          figure_arr[i].addFigure(ctx, color_arr[i]);
          console.log(figure_name_arr[i])
          console.log(figure_arr[i].x)
        }
    }

  }



  function moveFigure(e){
    if(figure_arr.length>0){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      var rect = canvas.getBoundingClientRect();
      var mouseX, mouseY;
    
      if (e.clientX !== undefined && e.clientY !== undefined) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      } else if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    
      if (e.type === 'mousedown' || e.type === 'touchstart') {
        isMoving = true;
      } else if (e.type === 'mouseup' || e.type === 'touchend') {
        isMoving = false;
      }
    
      if (isMoving) {
        figure_arr[current_figure_index].x = mouseX 
        figure_arr[current_figure_index].y = mouseY 
      }


      for (let i = 0; i < figure_arr.length; i++) {
        figure_arr[i].addFigure(ctx, color_arr[i]);
        console.log(figure_name_arr[i])
        console.log(figure_arr[i].x)
      }
      
  }
  }


 
  
  

