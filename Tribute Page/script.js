const navItems = document.querySelectorAll("nav ul li");

// active list item
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});

const menu = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

menu.onclick = () => {
  nav.classList.toggle("active");
};
