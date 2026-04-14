/* ============================================================
   PORTFOLIO – script.js
   ============================================================ */

'use strict';

/* ---- Navbar: scroll class + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled class for navbar background
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let currentSection = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });

  // Back-to-top visibility
  const backToTop = document.getElementById('back-to-top');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---- Typed text animation ---- */
const typedTextEl = document.getElementById('typed-text');
const phrases = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeWriter() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedTextEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Pause at end of word
      typingTimeout = setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, 2000);
      return;
    }
  } else {
    typedTextEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  typingTimeout = setTimeout(typeWriter, speed);
}

typeWriter();

/* ---- Scroll-reveal (fade-in) for elements ---- */
function addFadeInClass() {
  const targets = [
    '.section-title',
    '.section-subtitle',
    '.about-text',
    '.about-details',
    '.skill-category',
    '.project-card',
    '.contact-info',
    '.contact-form',
  ];

  targets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('fade-in');
    });
  });
}

function revealOnScroll() {
  document.querySelectorAll('.fade-in').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

addFadeInClass();
window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll(); // run once

/* ---- Contact form ---- */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with real API call as needed)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    submitBtn.textContent = 'Send Message 🚀';
    submitBtn.disabled = false;
  }, 1200);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---- Animated number counter in About stats ---- */
function animateCounter(el, target, duration) {
  const start = performance.now();
  const startVal = 0;

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(startVal + (target - startVal) * easeOut(progress));
    el.textContent = value + '+';
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Trigger counters when about section scrolls into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach((el) => {
          const raw = el.textContent;
          const num = parseInt(raw, 10);
          if (!isNaN(num)) {
            animateCounter(el, num, 1200);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const aboutStatsEl = document.querySelector('.about-stats');
if (aboutStatsEl) {
  statsObserver.observe(aboutStatsEl);
}
