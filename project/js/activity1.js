$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });

  //-----------------------------------------------------------------------------------

const container = document.getElementById("pdfContainer");
container.style.width = "100%";
container.style.height = "500px";

let pdfUrl = "../articles/one.pdf";

const pdfjsLib = window['pdfjs-dist/build/pdf'];
let scale = 1.5;

if (window.innerWidth <= 768) { // 768px - ваша власна ширина, де ви хочете застосовувати змінений масштаб
  pdfUrl = "../articles/one2.pdf";
  scale = 0.5;
} else if(window.innerWidth <= 1100){
  scale = 1;
}


pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
  const numPages = pdf.numPages;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    pdf.getPage(pageNum).then(function(page) {
      
      
      const viewport = page.getViewport({ scale });

      //scale = containerHeight / viewport.height;
    
    // Встановіть положення вертикально для центрування
      

      const canvas = document.createElement("canvas");
      container.appendChild(canvas);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.marginRight = "auto";
      canvas.style.marginLeft = "auto";
      

      const context = canvas.getContext("2d");
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render(renderContext);
    });
  }
});