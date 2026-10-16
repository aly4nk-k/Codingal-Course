let QuizStarter = 0;
let StartQuiz = document.getElementById("startQuiz");
let random;
let QuestionTracker = 0;

StartQuiz.addEventListener("click", function () {
  let seconds = 4;
  QuizStarter++;

  if (QuizStarter === 1) {
    let timer = setInterval(function () {
      seconds--;
      document.querySelector(".countdown").innerHTML = seconds;
      if (seconds === 0) {
        clearInterval(timer);
        random = Math.floor(Math.random() * currentQuiz.length);

        document.getElementById("question").innerHTML = currentQuiz[random][0];
        document.getElementById("op1").innerHTML = currentQuiz[random][1];
        document.getElementById("op2").innerHTML = currentQuiz[random][2];
        document.getElementById("op3").innerHTML = currentQuiz[random][3];
        document.getElementById("op4").innerHTML = currentQuiz[random][4];
        document.querySelector(".hide-btn").style.display = "none";
        document.getElementById("hide").style.display = "none";
        document.querySelector(".countdown").style.display = "none";
        document.querySelector(".none").classList.remove("none"); //new concept super ez
        console.log(currentQuiz);
        let QuizSeconds = 0;
      let ending = setInterval(function () {
          QuizSeconds = QuizSeconds + 1;

          document.getElementById("timer").innerHTML = QuizSeconds;

          if (QuizSeconds === 59) {
            QuestionTracker++;

            if (QuestionTracker === 5) {
              clearInterval(ending)
              
            }
            
            QuizFlow();
            QuizSeconds = 0;
          }
        }, 1000);
      }
    }, 1000);
  } else if (QuizStarter === 2) {
  }
});

import data from "./quiz-data.json" with { type: "json" };

let math = data.math;
let english = data.english;
let science = data.science;
let currentQuiz = english;

console.log(math[0][1]);
console.log(english[3][2]);
console.log(science[10][3]);

let EnglishQuiz = document.getElementById("english");

EnglishQuiz.addEventListener("click", function () {
  currentQuiz = english;
  document.getElementById("quiz-hding").innerHTML = "English Quiz 📖";
  document.getElementById("hide").innerHTML =
    "Test Your Grammar and Speaking Skills";
});

let ScienceQuiz = document.getElementById("science");

ScienceQuiz.addEventListener("click", function () {
  currentQuiz = science;
  document.getElementById("quiz-hding").innerHTML = "Science Quiz 🧪";
  document.getElementById("hide").innerHTML =
    "Test Your Reasoning and Understanding Skills";
});

let QuizMath = document.getElementById("math");

QuizMath.addEventListener("click", function () {
  currentQuiz = math;
  document.getElementById("quiz-hding").innerHTML = "Math Quiz 🔢";
  document.getElementById("hide").innerHTML =
    "Test Your Operating and Mental Math Skills";
});

let options = document.querySelectorAll(".box");
let selected = 0;

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    
    if (selected === 1) {
      return;
    }

    QuestionTracker++;

    if (QuestionTracker === 5) {
      alert("done");
    }

    if (options[i].innerHTML === currentQuiz[random][5]) {
      options[i].style.backgroundColor = "green";
      options[i].style.borderColor = "black";
      options[i].style.color = "white";
      selected++;
      document.getElementById("display").innerHTML = QuestionTracker + "/5";
    } else {
      options[i].style.backgroundColor = "red";
      options[i].style.borderColor = "black";
      options[i].style.color = "white";
      selected++;
      document.getElementById("display").innerHTML = QuestionTracker + "/5";
    }

    setTimeout(function () {
      options[i].style.backgroundColor = "var(--primary)";
      options[i].style.borderColor = "var(--primary)";
      options[i].style.color = "white";
      QuizFlow();
      selected = 0;
    }, 3000);
  });
}

function QuizFlow() {
  random = Math.floor(Math.random() * currentQuiz.length);

  for(let i = 0; i < options.length; i++){
  options[i].style.backgroundColor = "";
  options[i].style.borderColor = "";
  options[i].style.color = "";
  }

  document.getElementById("question").innerHTML = currentQuiz[random][0];
  document.getElementById("op1").innerHTML = currentQuiz[random][1];
  document.getElementById("op2").innerHTML = currentQuiz[random][2];
  document.getElementById("op3").innerHTML = currentQuiz[random][3];
  document.getElementById("op4").innerHTML = currentQuiz[random][4];
  document.getElementById("display").innerHTML = QuestionTracker + "/5";
}

