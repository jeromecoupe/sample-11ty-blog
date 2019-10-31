const body = document.querySelector("body");
const openBtn = document.querySelector(".js-openbutton");
const closeBtn = document.querySelector(".js-closebutton");
const allBtn = [openBtn, closeBtn];
const mobileMenu = document.querySelector(".js-mobilemenu");
const noscrollClass = "u-yscroll-none";
const activeClass = "is-active";

function init() {
  allBtn.forEach(el => {
    el.addEventListener(
      "click",
      event => {
        event.preventDefault();
        toggleNav();
      },
      false
    );
  });
}

function toggleNav() {
  body.classList.toggle(noscrollClass);
  mobileMenu.classList.toggle(activeClass);
}

export { init };
