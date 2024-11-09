const learnMenu = document.querySelector(".learn");
const subMenu = document.querySelector(".submenu");
learnMenu.addEventListener("click", function(event){
    event.preventDefault();
    subMenu.classList.toggle("show");
});