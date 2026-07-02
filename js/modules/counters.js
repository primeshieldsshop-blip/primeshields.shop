/**
 * Counters — animated stat numbers on scroll
 */
import { stats } from '../data/site.js';
import { PLACEHOLDER_IMAGE } from '../data/products.js';

export function initCounters() {
  const statsContainer = document.getElementById('stats-grid');
  const aboutImage = document.getElementById('about-image');

  if (aboutImage) {
    aboutImage.src = 'assets/images/Plate1.jpeg';
    aboutImage.alt = 'Prime Shields modern glass awards';
    aboutImage.loading = 'lazy';
  }

  if (!statsContainer) return;

  statsContainer.innerHTML = stats
    .map(
      (stat, i) => `
    <div class="stat-card" data-animate="scale" style="animation-delay: ${i * 0.1}s">
      <div class="text-4xl lg:text-5xl font-heading font-bold text-navy dark:text-white mb-2">
        <span class="counter" data-target="${stat.value}" data-suffix="${stat.suffix}">0</span>
      </div>
      <p class="text-navy/60 dark:text-white/60 font-medium">${stat.label}</p>
    </div>`
    )
    .join('');

  const counters = statsContainer.querySelectorAll('.counter');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = `${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = `${target}${suffix}`;
  }

  requestAnimationFrame(update);
}
