/**
 * Contact — form validation and submit UX
 */
import { siteConfig } from '../data/site.js';
import { showToast } from './ui.js';

export function initContact() {
  const form = document.getElementById('contact-form');
  const infoContainer = document.getElementById('contact-info');

  if (infoContainer) {
    infoContainer.innerHTML = `
      <div class="space-y-8">
        <div>
          <h3 class="font-heading font-bold text-2xl text-navy dark:text-white mb-6">${siteConfig.name}</h3>
        </div>
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
          </div>
          <div>
            <p class="font-semibold text-navy dark:text-white mb-1">Address</p>
            <p class="text-navy/70 dark:text-white/70">${siteConfig.address.street}<br>${siteConfig.address.city}, ${siteConfig.address.country}</p>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
          </div>
          <div>
            <p class="font-semibold text-navy dark:text-white mb-1">Phone</p>
            ${siteConfig.phone.map((p) => `<a href="tel:${p.replace(/-/g, '')}" class="block text-navy/70 dark:text-white/70 hover:text-gold transition-colors">${p}</a>`).join('')}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
          </div>
          <div>
            <p class="font-semibold text-navy dark:text-white mb-1">Email</p>
            <a href="mailto:${siteConfig.email}" class="text-navy/70 dark:text-white/70 hover:text-gold transition-colors">${siteConfig.email}</a>
          </div>
        </div>
      </div>`;
  }

  const mapFrame = document.getElementById('contact-map');
  if (mapFrame) {
    mapFrame.src = siteConfig.mapEmbed;
    mapFrame.title = 'Prime Shields location on Google Maps';
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    let valid = true;

    [name, phone, email, message].forEach((field) => {
      field.classList.remove('border-red-400');
      if (!field.value.trim()) {
        field.classList.add('border-red-400');
        valid = false;
      }
    });

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('border-red-400');
      valid = false;
    }

    if (!valid) {
      showToast('Please fill in all required fields correctly.');
      return;
    }

    const waText = encodeURIComponent(
      `New enquiry from ${name.value}\nPhone: ${phone.value}\nEmail: ${email.value}\nMessage: ${message.value}`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${waText}`, '_blank');
    showToast('Thank you! Opening WhatsApp to send your message.');
    form.reset();
  });
}
