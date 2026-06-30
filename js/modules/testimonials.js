/**
 * Testimonials — auto-sliding card carousel
 */
import { testimonials } from '../data/site.js';

export function initTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let interval;

  track.innerHTML = testimonials
    .map(
      (t) => `
    <div class="testimonial-slide min-w-full px-4">
      <div class="testimonial-card max-w-2xl mx-auto text-center">
        <div class="flex justify-center gap-1 mb-6">
          ${Array(t.rating).fill('<svg class="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>').join('')}
        </div>
        <blockquote class="text-lg lg:text-xl text-navy/80 dark:text-white/80 leading-relaxed mb-8 italic">"${t.text}"</blockquote>
        <div>
          <p class="font-heading font-bold text-navy dark:text-white">${t.name}</p>
          <p class="text-sm text-navy/50 dark:text-white/50 mt-1">${t.role}</p>
        </div>
      </div>
    </div>`
    )
    .join('');

  if (dotsContainer) {
    dotsContainer.innerHTML = testimonials
      .map((_, i) => `<button class="w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-gold w-8' : 'bg-navy/20 dark:bg-white/20'}" data-testimonial-dot="${i}" aria-label="Testimonial ${i + 1}"></button>`)
      .join('');

    dotsContainer.querySelectorAll('[data-testimonial-dot]').forEach((dot) => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.testimonialDot, 10)));
    });
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer?.querySelectorAll('[data-testimonial-dot]').forEach((d, i) => {
      d.classList.toggle('bg-gold', i === current);
      d.classList.toggle('w-8', i === current);
      d.classList.toggle('bg-navy/20', i !== current);
      d.classList.toggle('dark:bg-white/20', i !== current);
      d.classList.toggle('w-2.5', i !== current);
    });
  }

  function startAuto() {
    if (reducedMotion) return;
    interval = setInterval(() => goTo((current + 1) % testimonials.length), 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  const wrapper = track.parentElement;
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  startAuto();
}
