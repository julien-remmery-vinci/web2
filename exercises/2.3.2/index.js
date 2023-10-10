const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
  div.addEventListener("mouseover", (e) => {
    div.style.width = "150px"
    div.style.height = "150px"
  });

  div.addEventListener("mouseout", (e) => {
    div.style.width = "50px"
    div.style.height = "50px"     
  });
});
