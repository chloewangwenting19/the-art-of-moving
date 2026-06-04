const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".nav a")];

const sectionOrder = [
  "about",
  "journey",
  "art",
  "gallery",
  "shanghai",
  "motherhood",
  "journal",
  "contact"
];

sectionOrder.forEach((id) => {
  const section = document.getElementById(id);
  if (section) document.querySelector("main").appendChild(section);
});

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.toggle("is-active", link === active));
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
