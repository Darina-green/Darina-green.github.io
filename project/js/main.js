$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });

  function randomRelax() {
    var propose = ['main.html','main.html','main.html','main.html'];
    var get_rand = Math.floor(Math.random() * propose.length);
    var rand_propose = propose[get_rand];
    window.location.href = rand_propose;
  }
  function randomActivity() {
    var propose = ['main.html','main.html','main.html','main.html'];
    var get_rand = Math.floor(Math.random() * propose.length);
    var rand_propose = propose[get_rand];
    window.location.href = rand_propose;
  }

let questionNum = 0;

let ansver = 0;
let rand_timespendig =0;

let give_propose = "Код гиас";
let link = 'somelink'
let ques = document.getElementById('question');

let atr311 =["первый311","второй311","третий311"];
let music312 =["первый312","второй312","третий312"];
let games321 =["первый321","второй321","третий321"];
let activity322 =["первый322","второй322","третий322"];

let link311 =['main.html','main.html','main.html'];
let link312 =['main.html','main.html','main.html'];
let link321 =['main.html','main.html','main.html'];
let link322 =['main.html','main.html','main.html'];

function getFilm(arrayAnsver, arrayLink){
    rand_timespendig = Math.floor(Math.random() * arrayAnsver.length);
    give_propose = arrayAnsver[rand_timespendig];
    link = arrayLink[rand_timespendig]
}



function ansversYes(){

    if(questionNum == 0){
        ques.textContent = "У вас є бажання подумати?";
        questionNum = 1;
    }
    else if(questionNum == 1){
        ques.textContent = "У вас е можливість зайнятися чимось активним?";
        questionNum = 21;
    }
    else if(questionNum == 21){
        getFilm(activity322, link322);
        ques.textContent = give_propose;
        questionNum = 311;
    }
    else if(questionNum == 22){
        getFilm(games321, link321);
        ques.textContent = give_propose;
        questionNum = 321;
    }
    else if(questionNum == 311 || questionNum == 321 || questionNum == 312 || questionNum == 322){
      window.location.href = link;
    }
    else if(questionNum == 999){
      ques.textContent = "Ще раз?";
      questionNum = 0;
    }

}

function ansversNo(){
    if(questionNum == 0){
        ques.textContent = "/('^')\\";
        alert("Прикро!");
        questionNum = 999;
    }
    else if(questionNum == 1){
        ques.textContent = "Ви хочете зайняти чимось свій час?";
        questionNum = 22;
    }
    else if(questionNum == 21){
        getFilm(atr311, link311);
        ques.textContent = give_propose;
        questionNum = 312;
    }
    else if(questionNum == 22){
        getFilm(music312, link312);
        ques.textContent = give_propose;
        questionNum = 322;
    }
    else if(questionNum == 311 || questionNum == 321 || questionNum == 312 || questionNum == 322 || questionNum == 999){
      ques.textContent = "Ще раз?";
      questionNum = 0;
    }
}

