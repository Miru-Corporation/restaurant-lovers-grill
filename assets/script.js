/* LOVER'S GRILL — Interactions JS */

document.addEventListener('DOMContentLoaded', () => {

  /* Header scroll effect */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile burger menu */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Menu tabs (page Buffet) */
  const tabs = document.querySelectorAll('.menu-tab');
  const sections = document.querySelectorAll('.menu-section');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  }

  /* Reservation form (frontend only) */
  const reservForm = document.getElementById('reservation-form');
  if (reservForm) {
    reservForm.addEventListener('submit', (e) => {
      e.preventDefault();
      reservForm.style.display = 'none';
      document.getElementById('reservation-success')?.classList.add('show');
      window.scrollTo({ top: reservForm.offsetTop - 100, behavior: 'smooth' });
    });
  }

  /* Contact form */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      document.getElementById('contact-success')?.classList.add('show');
    });
  }

  /* Group form */
  const groupForm = document.getElementById('group-form');
  if (groupForm) {
    groupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      groupForm.style.display = 'none';
      document.getElementById('group-success')?.classList.add('show');
    });
  }

  /* Set min date for reservation */
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  /* Year in footer */
  document.querySelectorAll('.year').forEach(y => y.textContent = new Date().getFullYear());

  /* Lucide SVG icons */
  if (typeof lucide !== 'undefined') lucide.createIcons();
});
