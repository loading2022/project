const learnMenu = document.querySelectorAll(".learn");
const subMenus = document.querySelectorAll(".submenu");
learnMenu.forEach((menu, index) => {
    menu.addEventListener("click", function(event) {
        event.preventDefault();
        subMenus[index].classList.toggle("show");
    });
});