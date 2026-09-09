// =================================
// SECTION HIDE / SHOW
// =================================

const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

function showSection(id) {

  sections.forEach(sec => {
    sec.classList.toggle(
      "is-active",
      sec.id === id
    );
  });

  navBtns.forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.target === id
    );
  });

  // Scroll back to top when changing sections
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Navigation buttons
navBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    showSection(
      btn.dataset.target
    );

  });

});



// =================================
// SLIDESHOW
// =================================

const slides = document.querySelectorAll(".slide");

let slideIndex = 0;


// Only run slideshow if images exist
if (slides.length > 0) {

  setInterval(() => {

    slides[slideIndex].classList.remove("active");

    slideIndex =
      (slideIndex + 1) % slides.length;

    slides[slideIndex].classList.add("active");

  }, 3000);

}



// =================================
// SHOP FILTER
// =================================

const search =
  document.getElementById("search");

const category =
  document.getElementById("category");

const items =
  document.querySelectorAll(".item");


function filter() {

  // Stop if search or category does not exist
  if (!search || !category) {
    return;
  }


  const s =
    search.value
      .trim()
      .toLowerCase();


  const c =
    category.value;


  items.forEach(item => {

    const text =
      item.innerText
        .toLowerCase();


    const cat =
      item.dataset.cat;


    const matchesSearch =
      !s ||
      text.includes(s);


    const matchesCategory =
      c === "all" ||
      c === cat;


    const show =
      matchesSearch &&
      matchesCategory;


    // IMPORTANT:
    // Do NOT use "flex" here.
    // This keeps the original CSS product-card layout.
    if (show) {

      item.style.display = "";

    } else {

      item.style.display = "none";

    }

  });

}



// Search box
if (search) {

  search.addEventListener(
    "input",
    filter
  );

}


// Category dropdown
if (category) {

  category.addEventListener(
    "change",
    filter
  );

}



// =================================
// INTRODUCTION LINKS
// OPEN SHOP + SET CATEGORY
// =================================

document
  .querySelectorAll(".intro-link")
  .forEach(link => {

    link.addEventListener(
      "click",
      e => {

        e.preventDefault();


        // Open shop section
        showSection("shop");


        // Set requested category
        if (category) {

          category.value =
            link.dataset.cat || "all";

        }


        // Clear search box
        if (search) {

          search.value = "";

        }


        // Apply filter
        filter();

      }
    );

  });
