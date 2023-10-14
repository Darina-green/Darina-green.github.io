$(function () { 

    
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });
//---------------------------------------------------------------------------------------------------------------------------------

let princess_image = document.getElementById('Princess');
let knight_image = document.getElementById('Knight');
let dragon_image = document.getElementById('Dragon');
let story_zone = document.getElementById('text_zone');



var txt_princess_files = ["story/Princess/act1.txt","story/Princess/act1var11.txt", "story/Princess/act1var12.txt", 
                          "story/Princess/act11/act11.txt", "story/Princess/act12/act12.txt", 
                          "story/Princess/act11/act11var111.txt", "story/Princess/act11/act11var112.txt",
                          "story/Princess/act12/act12var121.txt", "story/Princess/act12/act12var122.txt",
                          "story/Princess/act11/act111/act111.txt", "story/Princess/act11/act112/act112.txt", 
                          "story/Princess/act12/act121/act121.txt", "story/Princess/act12/act122/act122.txt"];

let princess_array = [];
let story_in_progress = true;
let level_of_plot = 0;

function loadTextFile(index) {
  var xhr = new XMLHttpRequest();

  // Встановлюємо метод запиту на GET для конкретного файлу
  xhr.open("GET", txt_princess_files[index], true);

  // Встановлюємо обробник події для завантаження
  xhr.onreadystatechange = function () {
    // Перевіряємо, чи запит завершений і стан запиту є 4 (завершено)
    if (xhr.readyState === 4) {
      // Перевіряємо статус відповіді
      if (xhr.status === 200) {
        // Отримуємо весь текст файлу
        var text = xhr.responseText;

        // Зберігаємо текст як окремий елемент масиву
        princess_array.push(text);

        // Перевіряємо, чи завершилися всі запити
        if (index === txt_princess_files.length - 1) {
          // Всі файли завантажені
          console.log(princess_array);
        } else {
          // Запускаємо завантаження наступного файлу
          loadTextFile(index + 1);
        }
      } else {
        console.error('Request failed with status:', xhr.status);
      }
    }
  };

  // Надсилаємо запит
  xhr.send();
}

// Запускаємо завантаження першого файлу
loadTextFile(0);

function continueStory(paragraph, choice1Text , choice2Text){

  level_of_plot = level_of_plot+1;
  if(story_in_progress){
    var par = document.createElement('p');
    par.textContent = paragraph;

    var choice1 = document.createElement('p');
    choice1.textContent = choice1Text;

    var choice2 = document.createElement('p');
    choice2.textContent = choice2Text;

    story_zone.innerHTML = '';

    story_zone.appendChild(par);
    story_zone.appendChild(choice1);
    story_zone.appendChild(choice2);

    choice1.addEventListener('click', function () {
      var nextParagraphIndex = princess_array.indexOf(choice1Text) + Math.pow(2, level_of_plot);
      var nextChoice1Index = nextParagraphIndex + Math.pow(2, level_of_plot);
      var nextChoice2Index = nextChoice1Index + 1;

      console.log("nextParagraphIndex", nextParagraphIndex)

      if (nextParagraphIndex >= 0 && nextChoice1Index < princess_array.length) {
        
        continueStory(princess_array[nextParagraphIndex], princess_array[nextChoice1Index], princess_array[nextChoice2Index]);
      } else {
        story_in_progress = false;
        continueStory(princess_array[nextParagraphIndex], "-", "-"); // Якщо немає наступного параграфа, історія завершена
      }
    });

    choice2.addEventListener('click', function () {
      var nextParagraphIndex = princess_array.indexOf(choice2Text) + Math.pow(2, level_of_plot);
      var nextChoice1Index = nextParagraphIndex + 3*Math.pow(2, level_of_plot-1);
      var nextChoice2Index = nextChoice1Index + 1;

      console.log("nextParagraphIndex", nextParagraphIndex)
      if (nextParagraphIndex >= 0 && nextChoice1Index < princess_array.length) {
        continueStory(princess_array[nextParagraphIndex], princess_array[nextChoice1Index], princess_array[nextChoice2Index]);
      } 
      else {
        story_in_progress = false;
        continueStory(princess_array[nextParagraphIndex], "-", "-"); // Якщо немає наступного параграфа, історія завершена
      }
    });
  }
  else if(!story_in_progress){
    console.log("End")
    let final_paragraph = document.createElement('p');
    final_paragraph.textContent = paragraph;
  
    var back_to_menu = document.createElement('p');
    back_to_menu.textContent = 'Back to menu';
  
    story_zone.innerHTML = '';
    story_zone.appendChild(final_paragraph);
  
    story_zone.appendChild(back_to_menu); 
    back_to_menu.addEventListener('click', function () {
      location.reload(); // Перезавантажує поточну сторінку
    });
  }

}

princess_image.addEventListener('click', function() {

  continueStory(princess_array[0], princess_array[1], princess_array[2]);

});

