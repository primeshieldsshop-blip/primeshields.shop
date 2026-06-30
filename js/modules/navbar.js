/**
 * Navbar — sticky scroll, mobile menu, smooth scroll, active section
 */
import { navLinks } from '../data/site.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinksContainer = document.getElementById('nav-links');
  const mobileNavLinks = document.getElementById('mobile-nav-links');

  if (!navbar) return;

  // Render desktop nav links
  if (navLinksContainer) {
    navLinksContainer.innerHTML = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="nav-link text-sm font-medium text-navy/70 dark:text-white/70 hover:text-gold transition-colors duration-300" data-section="${link.href.slice(1)}">${link.label}</a>`
      )
      .join('');
  }

  // Render mobile nav links
  if (mobileNavLinks) {
    mobileNavLinks.innerHTML = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="block py-3 text-lg font-medium text-navy dark:text-white hover:text-gold transition-colors mobile-nav-link">${link.label}</a>`
      )
      .join('');
  }

  // Scroll background change
  let lastScroll = 0;
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('glass-nav', 'py-3');
      navbar.classList.remove('py-5', 'bg-transparent');
    } else {
      navbar.classList.remove('glass-nav', 'py-3');
      navbar.classList.add('py-5', 'bg-transparent');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden');
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      document.body.classList.toggle('overflow-hidden', !isOpen);
    });

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Active section highlight
  const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.toggle('text-gold', link.dataset.section === id);
            link.classList.toggle('text-navy/70', link.dataset.section !== id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}
