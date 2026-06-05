// script.js

(function () {
  const backToTopBtn = document.getElementById('backToTop');

  // Back to top
  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active nav link highlighting (requires section ids)
  const navLinks = Array.from(document.querySelectorAll('.nav a[data-target]'));
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute('data-target')))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach((a) => {
      const target = a.getAttribute('data-target');
      a.classList.toggle('active', target === id);
    });
  }

  const io = new IntersectionObserver(
    (entries) => {
      // pick the most visible intersecting section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
      if (visible.length) setActive(visible[0].target.id);
    },
    { threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((s) => io.observe(s));
})();

