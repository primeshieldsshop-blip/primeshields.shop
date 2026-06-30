/**
 * Animations — Intersection Observer for scroll reveals
 */
import { whyUs, icons } from '../data/site.js';

export function initAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('animated');
      el.style.opacity = '1';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

  // Re-observe dynamically added elements
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.hasAttribute?.('data-animate')) observer.observe(node);
        node.querySelectorAll?.('[data-animate]').forEach((el) => {
          if (!el.classList.contains('animated')) observer.observe(el);
        });
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

/** Why Us — render icon cards */
export function initWhyUs() {
  const grid = document.getElementById('why-us-grid');
  if (!grid) return;

  grid.innerHTML = whyUs
    .map(
      (item, i) => `
    <div class="why-card" data-animate="fade-up" style="animation-delay: ${i * 0.08}s">
      <svg class="why-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        ${icons[item.icon] || ''}
      </svg>
      <h3 class="font-heading font-bold text-lg text-navy dark:text-white mt-6 mb-3">${item.title}</h3>
      <p class="text-navy/60 dark:text-white/60 leading-relaxed text-sm">${item.description}</p>
    </div>`
    )
    .join('');
}
