// const cards = document.querySelectorAll('.card');
let userName =document.getElementById('username');
const startBtn = document.getElementById('startButton');
const restartBtn = document.getElementById('restartButton');
function ask(){
   let savedName = localStorage.getItem("username");
  if (savedName) {
  alert(`Welcome back, ${savedName}! 😎`);
  userName.textContent = savedName;
} else {
  let name = prompt("What's your name?");
  if (name && name.trim() !== "") {
    localStorage.setItem("username", name.trim());
   userName.textContent = name;
  } else {
    alert("You didn’t enter a name!");
  }
}
}

ask();
const timerDisplay = document.getElementById("timer");
  const highscoreDisplay = document.getElementById("high-score");
  const timeScore = document.getElementById('score');
    let bestTime = localStorage.getItem("highscore");
    let finalTime;
    if (bestTime) highscoreDisplay.textContent = bestTime;

   //    clearInterval(interval); 
   //   interval = setInterval(updateTimer, 1000);
   //  } function time(){
    
      let seconds = 0;
      let interval;
    function updateTimer() {
      const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      timerDisplay.textContent = `${mins}:${secs}`;
      seconds++;
    }

const itemHolder = document.querySelector('.game-grid');
let moves = document.getElementById("moveCount");
let score = document.getElementById("score");

const createElement = function(value){
   const container = document.createElement('div');
   const card = document.createElement('div');
   const front = document.createElement('div');
   const back = document.createElement('div');
   const img = document.createElement('img');
   img.src = 'images/game.png';

   
   container.classList.add('card-container');
   card.classList.add('card');
   front.classList.add('card-front');
   back.classList.add('card-back');
   back.innerText = value;
   
   itemHolder.appendChild(container);
   container.appendChild(card);
   card.appendChild(front);
   card.appendChild(back);
   front.appendChild(img);

startBtn.addEventListener('click', () => {
  // Flip every 2s
  const timer = setInterval(() => {
    if (card.classList.contains('flipped')) {
      card.classList.remove('flipped');
    } else {
      card.classList.add('flipped');
    }
  }, 2000);

  // Stop flipping after 3s, start updateTimer interval
  setTimeout(() => {
    clearInterval(timer);
    clearInterval(interval); // stop old timer if any
    interval = setInterval(updateTimer, 1000);
  }, 4000);
});


};




function shuffleCards(){
   var cardArray = [];
   var fil = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F','G','G','H','H'];

   for (;;) {
      let cardId = Math.floor(Math.random()*16);
      
      if(!(cardArray.includes(cardId))){
         cardArray.push(cardId);
         
         createElement(fil[cardId]);
      }

      if(cardArray.length == 16) return cardArray;
   }
}

console.log(shuffleCards());
let clickCount = 0;
var cardValue = [];
let indexHolder = [];
let clickedCards = [];
let i = 0;
let moveCount = 0;
let scoreCount = 0;
const back = document.querySelectorAll('.card');
const front = document.querySelectorAll('.card-back');


back.forEach( (data, index) => {
   data.addEventListener("click", function handler() {
      if(!data.classList.contains('yes') && !data.classList.contains('flipped')){
         data.classList.add('flipped');
      }
      cardValue.push(this.innerText);
      indexHolder.push(index);
     clickCount++;
     if(clickCount > 1){
      i++;
     }
     
      if(clickCount === 2){
         moveCount++;
         moves.textContent = moveCount;
         if(cardValue[i] === cardValue[i-1]){
            if(!(indexHolder[i] === indexHolder[i-1])){
                const img = document.createElement('img');
                img.src = 'images/check.png';
               front[indexHolder[0]].innerText ='';
               front[indexHolder[1]].innerText ='';
               front[indexHolder[0]].appendChild(img);
               front[indexHolder[1]].appendChild(img.cloneNode(true));
               data.classList.add('yes');
               data.style.transform = 'rotateY(180deg)';
               back[indexHolder[0]].style.transform = 'rotateY(180deg)';
               data.classList.remove('flipped');
               back[indexHolder[0]].classList.add('yes');
               back[indexHolder[0]].classList.remove('flipped');
            
               indexHolder = [];
               clickCount = 0;
               cardValue = [];
               i = 0;
            }else{
               if(!(data.classList.contains('flipped'))){
                 data.classList.add('flipped')
               }else{
                 data.classList.remove('flipped')
               }
               cardValue = [];
            }
              indexHolder = [];
               clickCount = 0;
               i = 0;
               
         }else{

             const timer = setInterval(() =>{
               if (data.classList.contains('flipped') && back[indexHolder[i-1]].classList.contains('flipped')){
                  data.classList.remove('flipped');
                  back[indexHolder[i-1]].classList.remove('flipped');
               }else{
                  data.classList.add('flipped');
                  back[indexHolder[i-1]].classList.add('flipped')
               }
               indexHolder = [];
               clickCount = 0;
               cardValue = [];
               i = 0;
            }, 500);
            setTimeout(() => {
               clearInterval(timer);
            }, 500);
         }
      }


      const allCorrect = [...back].every(el => el.classList.contains('yes'))
      if(allCorrect){
         console.log('correct');
           clearInterval(interval);
          finalTime = timerDisplay.textContent;
         timeScore.textContent = finalTime;
          const [mins, secs] = finalTime.split(":").map(Number);
         const totalSeconds = mins * 60 + secs;
     const finish =  setInterval(()=>{

         if (!bestTime || totalSeconds < bestTime.split(":")[0] * 60 + Number(bestTime.split(":")[1])) {
           localStorage.setItem("highscore", finalTime);
           highscoreDisplay.textContent = finalTime;
           alert(`New High Score! 🏆 ${finalTime}`);
         }
         addScore(userName.textContent, finalTime);
      }, 1000);
      setTimeout(() =>{
         clearInterval(finish);
      },1000)
      }
       
   })

})
function restartGame() {

 location.reload(); 
}

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// display leaderboard immediately on page load
showLeaderboard();

function addScore(name, score) {
  leaderboard.push({ name, score });
  
  leaderboard.sort((a, b) => {
    const [am, as] = a.score.split(':').map(Number);
    const [bm, bs] = b.score.split(':').map(Number);
    return am*60 + as - (bm*60 + bs); // sort by seconds
  });
  
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  showLeaderboard(); // always update display
}


function showLeaderboard() {
  const list = document.querySelector('#leaderboard');
  list.innerHTML = leaderboard
    .map((p, i) => `<li>${i + 1}. ${p.name} - ${p.score}</li>`)
    .join('');
}
showLeaderboard();
     