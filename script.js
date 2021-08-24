const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", hamburgerMenu)


function hamburgerMenu() {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
}