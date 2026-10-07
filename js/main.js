// Mobile nav
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close on link click (mobile)
  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInside = menu.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Active nav link (IntersectionObserver)
const links = [...document.querySelectorAll(".nav__link")].filter((a) => a.getAttribute("href")?.startsWith("#"));
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach((a) => {
    const isActive = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("is-active", isActive);
  });
};

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      // pick the most visible entry
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
  );

  sections.forEach((s) => io.observe(s));
}
