const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = [...document.querySelectorAll('.section-anchor')];

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);

    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActiveSection(id);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible[0]) setActiveSection(visible[0].target.id);
  },
  {
    root: null,
    rootMargin: '-18% 0px -62% 0px',
    threshold: [0, 0.1, 0.25, 0.5],
  },
);

sections.forEach((section) => observer.observe(section));

const initialSection = window.location.hash.slice(1);
if (sections.some((section) => section.id === initialSection)) {
  setActiveSection(initialSection);
}
