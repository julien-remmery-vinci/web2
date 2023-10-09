const btn1 = document.querySelector('#button');
const nbClicks = document.querySelector('#nbClicks');
const message = document.querySelector('#message');
const resetbtn = document.querySelector('#reset');

let clicks = 0;

btn1.addEventListener('click', () => {
    clicks++;
    display();
});

resetbtn.addEventListener('click', () => {
    clicks = 0;
    display();
});

function display(){
    nbClicks.innerHTML = "Nombre de clics : "+clicks;
    if(clicks == 0) {
        message.innerHTML = "";
        resetbtn.hidden = true;
    }
    else if(clicks>=5 && clicks <=9) {
        message.innerHTML = "Bravo, bel échauffement !";
        resetbtn.hidden = false;
    }
    else if(clicks>=10) message.innerHTML = "Vous êtes passé maître en l'art du clic !";
}