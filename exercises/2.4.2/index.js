const rouge = document.getElementById('rouge');
const orange = document.getElementById('orange');
const vert = document.getElementById('vert');

const lights = [rouge, orange, vert, orange];
const colors = ['red', 'orange', 'green', 'orange'];
let lIndex = 0;
let current = lights[lIndex];
let cIndex = 0;
rouge.style.backgroundColor = colors[cIndex];
setInterval(displayColor, 2000);
function displayColor(){
    current.style.backgroundColor = 'white';
    if(lIndex === lights.length-1) lIndex = 0;
    else lIndex++;
    if(cIndex === colors.length-1) cIndex = 0;
    else cIndex++;
    current=lights[lIndex];
    current.style.backgroundColor = colors[cIndex];
}