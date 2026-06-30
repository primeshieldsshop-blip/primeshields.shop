/**
 * Timeline — horizontal process steps with animated progress
 */
import { processSteps } from '../data/site.js';

export function initTimeline() {
  const container = document.getElementById('process-timeline');
  if (!container) return;

  container.innerHTML = `
    <div class="timeline-track relative">
      <div class="timeline-progress hidden lg:block" id="timeline-progress" style="width: 0%"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
        ${processSteps
          .map(
            (step, i) => `
          <div class="process-step text-center" data-animate="fade-up" style="animation-delay: ${i * 0.12}s" data-step="${step.step}">
            <div class="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy text-white font-heading font-bold text-xl mb-4 shadow-premium mx-auto z-10">
              ${step.step}
            </div>
            <h3 class="font-heading font-bold text-navy dark:text-white mb-2">${step.title}</h3>
            <p class="text-sm text-navy/60 dark:text-white/60 leading-relaxed">${step.description}</p>
          </div>`
          )
          .join('')}
      </div>
    </div>`;

  const progress = document.getElementById('timeline-progress');
  const section = document.getElementById('process');

  if (section && progress) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          progress.style.width = '100%';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }
}
