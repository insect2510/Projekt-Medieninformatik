
// call scroll to top button

scrollToTop();


function openNav() {
  document.getElementById("navigation-side").classList.add("menu-open");
}

function closeNav() {
  document.getElementById("navigation-side").classList.remove("menu-open");
}

function mobileMenu(openTheMenu) {
  var menu = document.getElementById("navigation-side");
  var hamburgerButton = document.getElementById("hamburger-button");
  var hamburgerIcon = document.getElementById("hamburger-icon");
  const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';

  // mobile menu not visibale

  if (!isExpanded && openTheMenu) {

    menu.classList.add("menu-open")
    hamburgerButton.setAttribute("aria-expanded", "true");
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-x");
    console.log(open);
  }

  // mobile menu visible

  else {

    menu.classList.remove("menu-open")
    hamburgerButton.setAttribute("aria-expanded", "false");
    hamburgerIcon.classList.add("fa-bars");
    hamburgerIcon.classList.remove("fa-x");

  }
}


function scrollToTop() {

  const scrollToTopBtn = document.getElementById("ScrollToTopButton");

  // show botton after scrolling 300px down

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // smooth scroll to top

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}