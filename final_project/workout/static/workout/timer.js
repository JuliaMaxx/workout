const start = document.querySelector('.start');
const stopp = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.timer');
const work = start.dataset.work;
const rest = start.dataset.rest;
const time = start.dataset.time;
let progress = 0;
const timeLeft = document.querySelector('.time_left');
let secondsPassed = 0;
let formattedTime = `${String(time).padStart(2, '0')}:00`;
let secondsRatio = Math.round((parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]))/100);

function calcTime(){
    let seconds = parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]);
    console.log(seconds);
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    timeLeft.innerHTML = formattedTime;
    secondsPassed ++;
    console.log(secondsRatio, secondsPassed);
    if ((secondsPassed % secondsRatio) === 0){
        progress++;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        document.querySelector('.progress-bar').innerHTML = `${progress}%`;
    }
    console.log(formattedTime);
}

function playSound() {
    const audio = document.querySelector('.b1');
    audio.play();
  }
function playSound2() {
    const audio = document.querySelector('.b2');
    audio.play();
  }

let currentRepetition = 1;
let is_paused = false;

function inCount(){
    console.log('initial count')
    let num = 3;
    inter = setInterval(() => {
        if (!is_paused){

            console.log(num);
            timer.innerHTML = num;
            if (num === 0){
              playSound();
            }
            else{
              playSound2();
            }
            num--;
        }
        if (num<0){
            clearInterval(inter);
            console.log('innitial complete')
            let iterations = time;
            if (work === 20){
                iterations = time*2;
            }
            countdownTimer(work, rest, iterations);
        }
    }, 1000)
}

function countdownTimer(initialCount, secondaryCount, repeatCount) {
    console.log('repetition' + currentRepetition);
  
    // Start the initial countdown
    inter = setInterval(() => {
      if (!is_paused){
        if (initialCount === 0){
            playSound();
        }
        else if(initialCount < 4){
            playSound2();
        }
        calcTime();
        console.log(initialCount);
        timer.innerHTML = initialCount;
        initialCount--;

      }
  
      if (initialCount < 0) {
        clearInterval(inter);
  
        // Start the secondary countdown after the initial countdown ends
        inter = setInterval(() => {
          if (!is_paused){
            if (secondaryCount === 0){
                playSound();
            }
            else if(secondaryCount < 4){
                playSound2();
            }
            calcTime();
            timer.innerHTML = secondaryCount;
            console.log(secondaryCount);
            secondaryCount--;
          }  
  
          if (secondaryCount < 0) {
            clearInterval(inter);
            currentRepetition++;
  
            // Check if all repetitions are completed
            if (currentRepetition > repeatCount) {
              console.log('Countdown complete!');
              timer.innerHTML = 'done'
              start.disabled = false;
            } else {
              // Start the next repetition
              initialCount = initialCountReset;
              secondaryCount = secondaryCountReset;
              countdownTimer(initialCount, secondaryCount, repeatCount);
            }
          }
        }, 1000);
      }
    }, 1000);
  
    // Store the initial countdown values to reset them for each repetition
    const initialCountReset = initialCount;
    const secondaryCountReset = secondaryCount;
  }
  

document.addEventListener('DOMContentLoaded', ()=>{

    pause.addEventListener('click', () => {
        is_paused = !is_paused;
        console.log('paused')
    });
    stopp.addEventListener('click', () => {
        clearInterval(inter);
        document.querySelector('.progress-bar').style.width = `0%`;
        document.querySelector('.progress-bar').innerHTML = `0%`;
        timer.innerHTML = 0;
        timeLeft.innerHTML = '00:00';
        formattedTime = `${String(time).padStart(2, '0')}:00`;
        console.log('stopped');
        start.disabled = false;
        });
    start.addEventListener('click', ()=>{
        start.disabled = true;
        inCount();
        console.log(work, rest, time);
    })
    
})