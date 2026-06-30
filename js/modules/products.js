/**
 * Products — masonry grid, filter, search, modal
 */
import { products, categories } from '../data/products.js';
import { siteConfig } from '../data/site.js';

let activeCategory = 'All';
let searchQuery = '';
let focusTrapHandler = null;

export function initProducts() {
  const filterContainer = document.getElementById('product-filters');
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('product-search');
  const modal = document.getElementById('product-modal');

  if (filterContainer) renderFilters(filterContainer);
  if (grid) renderProducts(grid);

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts(grid);
      }, 250);
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function renderFilters(container) {
  container.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-pill ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>`
    )
    .join('');

  container.querySelectorAll('.filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      activeCategory = pill.dataset.category;
      container.querySelectorAll('.filter-pill').forEach((p) => p.classList.toggle('active', p.dataset.category === activeCategory));
      renderProducts(document.getElementById('product-grid'));
    });
  });
}

function getFilteredProducts() {
  return products.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.tags.some((t) => t.includes(searchQuery));
    return matchCategory && matchSearch;
  });
}

function renderProducts(grid) {
  if (!grid) return;
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-navy/50 dark:text-white/50 py-12">No products found matching your search.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product, i) => `
    <article
      class="product-card group cursor-pointer card-hover-lift bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-navy/5 dark:border-white/10 ${i % 3 === 1 ? 'lg:mt-8' : ''}"
      data-animate="fade-up"
      style="animation-delay: ${(i % 6) * 0.08}s"
      data-product-id="${product.id}"
      tabindex="0"
      role="button"
      aria-label="View ${product.title}"
    >
      <div class="img-hover-zoom aspect-[4/3]">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover" loading="lazy" width="400" height="300" />
      </div>
      <div class="p-6">
        <span class="text-xs font-semibold uppercase tracking-wider text-gold">${product.category}</span>
        <h3 class="text-lg font-heading font-bold text-navy dark:text-white mt-1 group-hover:text-gold transition-colors">${product.title}</h3>
      </div>
    </article>`
    )
    .join('');

  grid.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.productId));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.productId);
      }
    });
  });
}

function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-body');
  if (!modal || !content) return;

  const waMessage = encodeURIComponent(`Hello, I'm interested in ${product.title}. Please send me a quote.`);
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`;

  content.innerHTML = `
    <div class="img-hover-zoom rounded-xl overflow-hidden mb-6">
      <img src="${product.image}" alt="${product.title}" class="w-full aspect-video object-cover" width="800" height="450" />
    </div>
    <span class="section-label">${product.category}</span>
    <h3 class="text-2xl font-heading font-bold text-navy dark:text-white mb-4">${product.title}</h3>
    <p class="text-navy/70 dark:text-white/70 leading-relaxed mb-8">${product.description}</p>
    <div class="flex flex-wrap gap-4">
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-ripple">Send Enquiry</a>
      <a href="#contact" class="btn-ghost btn-ripple modal-contact-link">Contact Us</a>
    </div>`;

  content.querySelector('.modal-contact-link')?.addEventListener('click', closeModal);

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');
  document.getElementById('modal-close')?.focus();
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
  if (focusTrapHandler) {
    modal.removeEventListener('keydown', focusTrapHandler);
    focusTrapHandler = null;
  }
}

function trapFocus(modal) {
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  focusTrapHandler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  modal.addEventListener('keydown', focusTrapHandler);
}
