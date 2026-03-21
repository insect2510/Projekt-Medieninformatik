
// call scroll to top button

scrollToTop();

function openNav() {
  document.getElementById("navigation-side").classList.add("menu-open");
}

function closeNav() {
  document.getElementById("navigation-side").classList.remove("menu-open");
}

function scrollToTop() {

  const scrollToTopBtn = document.getElementById("ScrollToTopButton");
  scrollToTopBtn.getElementsByTagName("i")[0].classList.add("fa", "fa-angle-up");

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