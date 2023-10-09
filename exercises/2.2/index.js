const btn1 = document.querySelector('#button');
const nbClicks = document.querySelector('#nbClicks');
const message = document.querySelector('#message');

let clicks = 0;

btn1.addEventListener('click', () => {
    clicks++;
    nbClicks.innerHTML = "Nombre de clics : "+clicks;
    if(clicks>=5 && clicks <=9) message.innerHTML = "Bravo, bel échauffement !";
    else if(clicks>=10) message.innerHTML = "Vous êtes passé maître en l'art du clic !";
});