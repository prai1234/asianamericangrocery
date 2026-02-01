// SECTION HIDE/SHOW (your "hidden menu" meaning)
const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

function showSection(id){
  sections.forEach(sec => {
    sec.classList.toggle("is-active", sec.id === id);
  });
  navBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === id);
  });
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => showSection(btn.dataset.target));
});

// SLIDESHOW
const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 3000);

// SHOP FILTER (stays same size; images locked)
const search = document.getElementById("search");
const category = document.getElementById("category");
const items = document.querySelectorAll(".item");

function filter(){
  const s = search.value.trim().toLowerCase();
  const c = category.value;

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    const cat = item.dataset.cat;
    const show = (!s || text.includes(s)) && (c === "all" || c === cat);
    item.style.display = show ? "flex" : "none";
  });
}

search.addEventListener("input", filter);
category.addEventListener("change", filter);

// INTRO LINKS -> open shop + set category
document.querySelectorAll(".intro-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("shop");
    category.value = link.dataset.cat || "all";
    search.value = "";
    filter();
  });
});
