/**
 * Hero — image slider, floating badges, parallax
 */
import { heroSlides } from '../data/products.js';
import { heroBadges, siteConfig } from '../data/site.js';

export function initHero() {
  const sliderContainer = document.getElementById('hero-slider');
  const badgesContainer = document.getElementById('hero-badges');
  const heroSection = document.getElementById('home');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (sliderContainer) {
    renderSlider(sliderContainer);
    if (!reducedMotion) startAutoSlide(sliderContainer);
  }

  if (badgesContainer) {
    badgesContainer.innerHTML = heroBadges
      .map(
        (badge, i) => `
      <div class="glass-badge pointer-events-auto absolute ${getBadgePosition(i)}" data-animate="fade-up" style="animation-delay: ${0.3 + i * 0.15}s">
        <svg class="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
        <span>${badge}</span>
      </div>`
      )
      .join('');
  }

  // Parallax on hero image
  if (heroSection && !reducedMotion) {
    const parallaxEl = document.getElementById('hero-parallax');
    if (parallaxEl) {
      window.addEventListener(
        'scroll',
        () => {
          const scrollY = window.scrollY;
          const heroHeight = heroSection.offsetHeight;
          if (scrollY < heroHeight) {
            parallaxEl.style.transform = `translateY(${scrollY * 0.15}px)`;
          }
        },
        { passive: true }
      );
    }
  }

  // Populate hero text from site config
  const subtitle = document.getElementById('hero-subtitle');
  if (subtitle) subtitle.textContent = siteConfig.description;
}

function getBadgePosition(index) {
  const positions = [
    '-top-4 -left-4 lg:-left-8',
    'top-1/3 -right-4 lg:-right-8',
    'bottom-8 left-8 lg:left-12',
  ];
  return positions[index] || 'top-4 left-4';
}

function renderSlider(container) {
  container.innerHTML = `
    <div id="hero-parallax" class="relative w-full aspect-[4/5] lg:aspect-square max-h-[600px]">
      ${heroSlides
      .map(
        (slide, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
          <div class="img-hover-zoom h-full rounded-3xl shadow-premium-lg">
            <img
              src="${slide.image}"
              alt="${slide.title} — Prime Shields premium awards"
              class="w-full h-full object-cover object-center rounded-3xl"
              ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              width="600"
              height="600"
            />
          </div>
        </div>`
      )
      .join('')}
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" id="hero-dots" role="tablist" aria-label="Hero slides">
        ${heroSlides.map((_, i) => `<button class="w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-gold w-6' : 'bg-white/60'}" data-dot="${i}" role="tab" aria-label="Slide ${i + 1}" aria-selected="${i === 0}"></button>`).join('')}
      </div>
    </div>`;

  // Dot navigation
  container.querySelectorAll('[data-dot]').forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(container, parseInt(dot.dataset.dot, 10)));
  });

  // Touch swipe
  let touchStartX = 0;
  const parallax = container.querySelector('#hero-parallax');
  if (parallax) {
    parallax.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    parallax.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      const current = getCurrentSlide(container);
      if (Math.abs(diff) > 50) {
        goToSlide(container, diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });
  }
}

let slideInterval;

function startAutoSlide(container) {
  slideInterval = setInterval(() => {
    const current = getCurrentSlide(container);
    goToSlide(container, current + 1);
  }, 5000);
}

function getCurrentSlide(container) {
  const active = container.querySelector('.hero-slide.active');
  return active ? parseInt(active.dataset.index, 10) : 0;
}

function goToSlide(container, index) {
  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('[data-dot]');
  const total = slides.length;
  const next = ((index % total) + total) % total;

  slides.forEach((s, i) => s.classList.toggle('active', i === next));
  dots.forEach((d, i) => {
    d.classList.toggle('bg-gold', i === next);
    d.classList.toggle('w-6', i === next);
    d.classList.toggle('bg-white/60', i !== next);
    d.classList.toggle('w-2', i !== next);
    d.setAttribute('aria-selected', i === next);
  });

  clearInterval(slideInterval);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAutoSlide(container);
  }
}
