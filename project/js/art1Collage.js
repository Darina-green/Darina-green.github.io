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
    getName(number){}
    constructor(canvas) {
      this.canvas = canvas;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.rotationAngle = 0;
      this.scaleSizeX = 10;
      this.scaleSizeY = 10;
    }
  
    setRotation(angle) {
      ctx.save();
      this.rotationAngle = angle;
    }
    setScaleX(scale_size){
      this.scaleSizeX = scale_size;
    }
    setScaleY(scale_size){
      this.scaleSizeY = scale_size;
    }
}

class Rectangle extends Figure{
  name = "Rectangle"
  x=0
  y=0
  size = 50; //Math.random() * 100 + 50; 
  
  constructor(canvas){
      super(canvas);
      this.x = canvas.width / 2 
      this.y = canvas.height / 2 
  }
  addFigure(ctx, my_color) {
      
      ctx.save()
      ctx.translate(this.x+this.size / 2, this.y+this.size / 2);
      console.log("this.x, this.y =", this.x, this.y);
      ctx.rotate((this.rotationAngle * Math.PI) / 180);
      ctx.scale(this.scaleSizeY/10, this.scaleSizeX/10)
      ctx.translate(-this.x-this.size / 2, -this.y-this.size / 2);
      
      
      ctx.fillStyle = my_color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      
      ctx.restore();
  }
  getName(number){
      return number +" "+ this.name 
  }


}

class Heart extends Figure{
    name = "Heart"
    x=0
    y=0
    size = 50; //Math.random() * 100 + 50; 
    
    constructor(canvas){
        super(canvas);
        this.x = canvas.width / 2 
        this.y = canvas.height / 2 
    }
    addFigure(ctx, my_color) {
        
        ctx.save()
        ctx.translate(this.x, this.y+this.size / 2);
        console.log("this.x, this.y =", this.x, this.y);
        ctx.rotate((this.rotationAngle * Math.PI) / 180);
        ctx.scale(this.scaleSizeY/10, this.scaleSizeX/10)
        ctx.translate(-this.x, -this.y-this.size / 2);
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4); 
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + this.size / 4);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + this.size / 2, this.x, this.y + this.size / 2 + this.size / 4, this.x, this.y + this.size / 2 + this.size / 4);
        ctx.bezierCurveTo(this.x, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 4);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + this.size / 4);
        ctx.closePath();
        ctx.fillStyle = my_color;
        ctx.fill();
        
        ctx.restore();
        //this.setRotation(this.rotationAngle);
        
        //console.log("rotationAngle =", this.rotationAngle);
    }
    getName(number){
        return number +" "+ this.name 
    }

}

class Circle extends Figure{
  name = "Circle"
  x=0
  y=0
  size = 50; 
  
  constructor(canvas){
      super(canvas);
      this.x = canvas.width / 2 
      this.y = canvas.height / 2 
  }
  addFigure(ctx, my_color) {
      
      ctx.save()
      ctx.translate(this.x, this.y);
      console.log("this.x, this.y =", this.x, this.y);
      ctx.rotate((this.rotationAngle * Math.PI) / 180);
      ctx.scale(this.scaleSizeY/10, this.scaleSizeX/10)
      ctx.translate(-this.x, -this.y);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
      ctx.fillStyle = my_color;
      ctx.fill();
      ctx.closePath();
      
      ctx.restore();
  }
  getName(number){
      return number +" "+ this.name 
  }


}

class Photo extends Figure{
  name = "Your photo"
  x=0
  y=0
  size_x = 50; 
  size_y = 80;
  
  constructor(canvas, image){
      super(canvas);
      this.image = image;      
      this.size_x = (this.image.naturalWidth)/4;
      this.size_y = (this.image.naturalHeight)/4;
      this.x = canvas.width /2;
      this.y = canvas.height / 2;
  }
  addFigure(ctx, my_color) {
      
      ctx.save()
      ctx.translate(this.x, this.y);
      console.log("this.x, this.y =", this.x, this.y);
      ctx.rotate((this.rotationAngle * Math.PI) / 180);
      ctx.scale(this.scaleSizeY/10, this.scaleSizeX/10)
      ctx.translate(-this.x, -this.y);


      ctx.drawImage(this.image, this.x - this.size_x / 2, this.y - this.size_y / 2, this.size_x, this.size_y);
      
      ctx.restore();
  }
  getName(number){
      return number +" "+ this.name 
  }

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
    let selected1 = ul.querySelector(".selected")
    if (selected1) {
      selected1.classList.remove("selected")
    }
    li.textContent = element
    li.id = fig_id
    current_figure_index = figure_name_arr.indexOf(element)
    li.classList.add("selected")
    li.addEventListener("click", function() {
        let selected2 = ul.querySelector(".selected")
        if (selected2) {
          selected2.classList.remove("selected")
        }
        li.classList.add("selected")
        current_figure_index = figure_name_arr.indexOf(element)
        console.log("Індекс елементу:", figure_name_arr.indexOf(element))
        console.log("fig_id" ,li.id)
    });
    ul.appendChild(li)

    //my_catalogue.appendChild(ul)
    
}


function addRect(){
  let rect = new Rectangle(canvas)
  let fig_id = "figure"+number
  rect.addFigure(ctx, figure_color)
  number++
  figure_arr.push(rect)
  figure_name_arr.push(rect.getName(number))
  color_arr.push(figure_color)
  console.log(figure_name_arr)
  addToCatalogue(rect.getName(number), fig_id )

  my_catalogue.innerHTML = ""
  my_catalogue.appendChild(ul)
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

    my_catalogue.innerHTML = ""
    my_catalogue.appendChild(ul)
}

function addCircle(){
  let circle = new Circle(canvas)
  let fig_id = "figure"+number
  circle.addFigure(ctx, figure_color)
  number++
  figure_arr.push(circle)
  figure_name_arr.push(circle.getName(number))
  color_arr.push(figure_color)
  console.log(figure_name_arr)
  addToCatalogue(circle.getName(number), fig_id )

  my_catalogue.innerHTML = ""
  my_catalogue.appendChild(ul)
}


function addPhoto(){

  const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function (event) {
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            const img = new Image();
            img.onload = function () {
                let photo = new Photo(canvas, img);
                let fig_id = 'figure' + number;
                photo.addFigure(ctx, figure_color);
                number++;
                figure_arr.push(photo);
                figure_name_arr.push(photo.getName(number));
                color_arr.push(figure_color);
                console.log(figure_name_arr);
                addToCatalogue(photo.getName(number), fig_id);
                my_catalogue.innerHTML = ""
                my_catalogue.appendChild(ul)
            };
            img.src = URL.createObjectURL(uploadedImage);
        }
    });
    input.click();
}


function  deleteFigure(){
    
    if(figure_arr.length>0 && current_figure_index != undefined){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        console.log("del_current_figure_index", current_figure_index)
        
        let id_number = parseInt(figure_name_arr[current_figure_index])-1
        if(!isNaN(id_number)){
          console.log("del_id_number", id_number)
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
        else{
          alert("You didn`t choose the figure")
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

let rotationSlider = document.getElementById('rotationSlider');

rotationSlider.addEventListener('input', (event) => {
  let angle = parseFloat(event.target.value);
  console.log("Angle =", angle)

  figure_arr[current_figure_index].setRotation(angle);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  
  for (let i = 0; i < figure_arr.length; i++) {
      figure_arr[i].addFigure(ctx, color_arr[i]);
  }
});

let scaleSlider = document.getElementById('scaleSlider');
const height_scale = document.getElementById('x_scale');
const width_scale = document.getElementById('y_scale');

scaleSlider.addEventListener('input', (event) => {
  let scale_size = parseFloat(event.target.value);
  console.log("Scale =", scale_size)

  const isHeightChecked = height_scale.checked;
  const isWidthChecked = width_scale.checked;
  console.log("Scale X =", scale_size, isWidthChecked)
  console.log("Scale Y =", scale_size, isHeightChecked)

  if (isWidthChecked && isHeightChecked) {
    //console.log("Scale X =", scale_size, isWidthChecked)
    figure_arr[current_figure_index].setScaleX(scale_size);
    figure_arr[current_figure_index].setScaleY(scale_size);
  } else if (isHeightChecked && !isWidthChecked) {
    //console.log("Scale Y =", scale_size, isHeightChecked)
    figure_arr[current_figure_index].setScaleY(scale_size);
  } else if (isWidthChecked && !isHeightChecked) {
    //console.log("Scale Y =", scale_size, isHeightChecked)
    figure_arr[current_figure_index].setScaleX(scale_size);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < figure_arr.length; i++) {
    figure_arr[i].addFigure(ctx, color_arr[i]);
  }
});

  

// Завантаження 
const downloadButton = document.getElementById('downloadButton');

function getCanvasDataURL() {
    return canvas.toDataURL('image/png'); 
}


function downloadCanvasImage() {
    const dataURL = getCanvasDataURL();
    
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'collage_image.png';
    downloadLink.click();
}


downloadButton.addEventListener('click', downloadCanvasImage); 
  

