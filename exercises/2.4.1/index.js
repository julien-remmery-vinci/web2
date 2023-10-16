const button = document.getElementById('button');
const nbClicks = document.getElementById('clicks');
const message = document.getElementById('message');

let clicks = 0;
let running = false;
let nbSeconds = 5;
let timeout;
nbClicks.textContent = `Clicks : ${clicks}`

button.addEventListener("mouseover", (e) => {
    start();
});

button.addEventListener("click", (e) => {
    clicks++;
    if(running && clicks===10){
        end();
    }
    nbClicks.textContent = `Clicks : ${clicks}`
});

function start(){
    running = true;
    timeout = setTimeout(() => {
        message.textContent = 'Game over, you did not click 10 times within 5s !';
    }, nbSeconds*1000);
}

function end(){
    clearTimeout(timeout);
    running = false;
    message.textContent = `You win ! You clicked 10 times within ${nbSeconds} ms`;
}