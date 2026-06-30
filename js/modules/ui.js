/**
 * UI — loader, scroll progress, back-to-top, ripple, sticky CTA
 */
import { siteConfig } from '../data/site.js';

export function initUI() {
  initLoader();
  initScrollProgress();
  initBackToTop();
  initRipple();
  initStickyCTA();
}

function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    },
    { passive: true }
  );
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ripple');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

function initStickyCTA() {
  const stickyCta = document.getElementById('sticky-cta');
  if (!stickyCta) return;

  const hero = document.getElementById('home');
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyCta.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);

  // Populate sticky CTA buttons
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Prime Shields, I would like to get a quote.')}`;
  stickyCta.innerHTML = `
    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary flex-1 text-sm py-3 btn-ripple">WhatsApp</a>
    <a href="tel:${siteConfig.phone[0].replace(/-/g, '')}" class="btn-navy flex-1 text-sm py-3 btn-ripple">Call Now</a>
  `;
}

/** Show toast notification */
export function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
