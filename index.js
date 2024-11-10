const learnMenu = document.querySelectorAll(".learn");
const subMenus = document.querySelectorAll(".submenu");
const hamburgerMenu = document.querySelector(".fa-bars");
const more = document.querySelectorAll(".more");
const moreText = document.querySelectorAll(".more-text");
const authorName = document.querySelectorAll(".experience h3");
const menu = document.querySelector(".menu");
const closeBtn = document.querySelector('.close-btn');

learnMenu.forEach((menu, index) => {
    menu.addEventListener("click", function(event) {
        event.preventDefault();
        subMenus.forEach(subMenu => {
            subMenu.classList.remove("show");
        });
        subMenus[index].classList.toggle("show");
    });
});
hamburgerMenu.addEventListener("click", function(event){
    event.preventDefault();
    menu.classList.toggle("show");
});
closeBtn.addEventListener("click", function() {
    menu.classList.remove("show"); 
});

more.forEach((more, index)=>{
    more.addEventListener("click", function(event){
        console.log("click");
        event.preventDefault();
        const overlay = document.getElementById('overlay');
        const content = document.getElementById('content');
        const author = document.getElementById('author');
        const moreTextContent = moreText[index].innerHTML;
        const authorNameContent = authorName[index].innerHTML;
        content.innerHTML = moreTextContent;
        author.innerHTML = authorNameContent;
        overlay.classList.add('show'); 
    })
});
function closeOverlay() {
    document.getElementById('overlay').classList.remove('show'); 
}