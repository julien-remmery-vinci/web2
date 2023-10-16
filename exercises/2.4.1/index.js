const button = document.getElementById('button');
const nbClicks = document.getElementById('clicks');
const message = document.getElementById('message');

let clicks = 0;
let nbSeconds = 5;
let timeout;
let startTime;
let neededClicks = 10;

button.addEventListener("mouseover", (e) => {
    start();
});

button.addEventListener("click", (e) => {
    clicks++;
    if(clicks===neededClicks){
        end();
    }
    nbClicks.textContent = `Clicks : ${clicks}`
});

function start(){
    startTime = new Date();
    timeout = setTimeout(() => {
        message.textContent = 'Game over, you did not click 10 times within 5s !';
    }, nbSeconds*1000);
}

function end(){
    clearTimeout(timeout);
    button.style.display = 'none'
    message.textContent = `You win ! You clicked ${neededClicks} times within ${new Date().getTime()-startTime.getTime()} ms`;
}