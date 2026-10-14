const nav = document.querySelector('#mainNav');
const navLinks = document.querySelectorAll('#navbarMenu .nav-link');
const menu = document.querySelector('#navbarMenu');

const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const collapse = bootstrap.Collapse.getInstance(menu);
    if (collapse) collapse.hide();
  });
});

const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -58% 0px' });
sections.forEach((section) => observer.observe(section));

document.querySelector('#consultForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const modalEl = document.querySelector('#consultModal');
  bootstrap.Modal.getInstance(modalEl).hide();
  bootstrap.Toast.getOrCreateInstance(document.querySelector('#successToast')).show();
  event.currentTarget.reset();
});

