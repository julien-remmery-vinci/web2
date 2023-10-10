const souhait = document.getElementById("souhait");
const form = document.getElementById("form");
const text = document.getElementById("text");

form.addEventListener('submit', (event) => {
    form.hidden = true;
    souhait.textContent = text.value;
    event.preventDefault();
});