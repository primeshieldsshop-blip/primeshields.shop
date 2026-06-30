/**
 * Clients — infinite marquee logo slider
 */
import { clientLogos } from '../data/site.js';

export function initClients() {
  const track = document.getElementById('clients-track');
  if (!track) return;

  const logos = clientLogos
    .map((client) => `<div class="client-logo" title="${client.name}"><img src="${client.image}" alt="${client.name} logo" loading="lazy" width="120" height="80" /></div>`)
    .join('');

  // Duplicate for seamless loop
  track.innerHTML = logos + logos;
}
