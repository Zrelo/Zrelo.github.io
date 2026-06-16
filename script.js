const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const publicationItems = Array.from(document.querySelectorAll(".publication-item"));
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const publicationCount = document.querySelector("#publication-count");
const currentYear = document.querySelector("#current-year");
const placeholderLinks = document.querySelectorAll("[data-placeholder-link]");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedYear = button.dataset.filter || "all";
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    publicationItems.forEach((item) => {
      const shouldShow = selectedYear === "all" || item.dataset.year === selectedYear;
      item.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (publicationCount) {
      publicationCount.textContent = String(visibleCount);
    }
  });
});

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
