/**
 * Gallery — Pinterest masonry grid + lightbox
 */
import { galleryItems } from '../data/products.js';

let currentIndex = 0;

export function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');

  if (grid) renderGallery(grid);

  if (lightbox) {
    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => navigateLightbox(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.getElementById('lightbox-image')?.addEventListener('click', toggleZoom);
  }

  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function renderGallery(grid) {
  const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/5]', 'aspect-[5/4]'];

  grid.innerHTML = galleryItems
    .map(
      (item, i) => `
    <div
      class="masonry-item group cursor-pointer"
      data-animate="fade-up"
      style="animation-delay: ${(i % 8) * 0.05}s"
      data-gallery-index="${i}"
      tabindex="0"
      role="button"
      aria-label="View ${item.title} in lightbox"
    >
      <div class="img-hover-zoom ${heights[i % heights.length]} rounded-2xl shadow-premium overflow-hidden relative bg-white/70">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover object-center" loading="lazy" width="400" height="500" />
        <div class="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-end p-4">
          <span class="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">${item.title}</span>
        </div>
      </div>
    </div>`
    )
    .join('');

  grid.querySelectorAll('[data-gallery-index]').forEach((item) => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.galleryIndex, 10)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.galleryIndex, 10));
      }
    });
  });
}

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const item = galleryItems[currentIndex];

  if (!lightbox || !img || !item) return;

  img.src = item.image;
  img.alt = item.title;
  img.classList.remove('zoomed');
  if (caption) caption.textContent = item.title;

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');
  document.getElementById('lightbox-close')?.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
  document.getElementById('lightbox-image')?.classList.remove('zoomed');
}

function navigateLightbox(direction) {
  currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const item = galleryItems[currentIndex];

  if (!img || !item) return;

  img.style.opacity = '0';
  img.style.transform = 'scale(0.95)';

  setTimeout(() => {
    img.src = item.image;
    img.alt = item.title;
    img.classList.remove('zoomed');
    if (caption) caption.textContent = item.title;
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 200);
}

function toggleZoom() {
  document.getElementById('lightbox-image')?.classList.toggle('zoomed');
}
