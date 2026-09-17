let QuizStarter = 0;
let StartQuiz = document.getElementById("startQuiz");
let random;

StartQuiz.addEventListener("click",function(){
let seconds = 4;
QuizStarter++;

if (QuizStarter === 1) {
  let timer = setInterval(function () {
    seconds--;
    document.querySelector(".countdown").innerHTML = seconds;
    if (seconds === 0) {
      clearInterval(timer);
      if (currentQuiz === "english") {
        random = Math.floor(Math.random() * english.length);
        document.getElementById("question").innerHTML = english[random][0];
        document.getElementById("op1").innerHTML = english[random][1];
        document.getElementById("op2").innerHTML = english[random][2];
        document.getElementById("op3").innerHTML = english[random][3];
        document.getElementById("op4").innerHTML = english[random][4];
      } else if (currentQuiz === "science") {
        random = Math.floor(Math.random() * science.length);
        document.getElementById("question").innerHTML = science[random][0];
        document.getElementById("op1").innerHTML = science[random][1];
        document.getElementById("op2").innerHTML = science[random][2];
        document.getElementById("op3").innerHTML = science[random][3];
        document.getElementById("op4").innerHTML = science[random][4];
      } else if (currentQuiz === "math") {
        random = Math.floor(Math.random() * math.length);
        document.getElementById("question").innerHTML = math[random][0];
        document.getElementById("op1").innerHTML = math[random][1];
        document.getElementById("op2").innerHTML = math[random][2];
        document.getElementById("op3").innerHTML = math[random][3];
        document.getElementById("op4").innerHTML = math[random][4];
      }
      
      document.querySelector(".hide-btn").style.display = "none";
      document.getElementById("hide").style.display = "none";
      document.querySelector(".countdown").style.display = "none";
      document.querySelector(".none").classList.remove("none"); //new concept super ez
      let QuizSeconds = 0;
      setInterval(function () {
        QuizSeconds = QuizSeconds + 1;

        document.getElementById("timer").innerHTML = QuizSeconds;

        if (QuizSeconds === 59) {
          alert("fail");
        }
      }, 1000);
    }
  }, 1000);
} else if (QuizStarter === 2) {
}

})

import data from "./quiz-data.json" with { type: "json" };

let math = data.math;
let english = data.english;
let science = data.science;
let currentQuiz = "english";

console.log(math[0][1]);
console.log(english[3][2]);
console.log(science[10][3]);

let EnglishQuiz = document.getElementById("english");

EnglishQuiz.addEventListener("click",function(){
  currentQuiz = "english";
  document.getElementById("quiz-hding").innerHTML = "English Quiz 📖";
  document.getElementById("hide").innerHTML = "Test Your Grammar and Speaking Skills";
});

let ScienceQuiz = document.getElementById("science");

ScienceQuiz.addEventListener("click",function(){
  currentQuiz = "science";
  document.getElementById("quiz-hding").innerHTML = "Science Quiz 🧪";
  document.getElementById("hide").innerHTML =
    "Test Your Reasoning and Understanding Skills";
});

let QuizMath = document.getElementById("math");

QuizMath.addEventListener("click",function(){
  currentQuiz = "math";
 document.getElementById("quiz-hding").innerHTML = "Math Quiz 🔢"; 
 document.getElementById("hide").innerHTML =
   "Test Your Operating and Mental Math Skills";


});

let options = document.querySelectorAll(".box");
let random2 = [];

for(let i = 0; i < options.length;i++){
}