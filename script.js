// Scrollspy: highlight sidebar link for the section in view
const navLinks = Array.from(document.querySelectorAll(".navlist a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

const setActive = (id) => {
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("data-nav") === id)
  );
};

const observer = new IntersectionObserver(
  (entries) => {
    // Pick the most visible intersecting section
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  },
  {
    root: null,
    threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
  }
);

sections.forEach((sec) => observer.observe(sec));

// Keep active state correct when clicking nav links (instant feedback)
navLinks.forEach((a) => {
  a.addEventListener("click", () => setActive(a.getAttribute("data-nav")));
});
