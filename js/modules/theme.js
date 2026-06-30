/**
 * Theme — dark/light mode toggle with localStorage persistence
 */
export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    html.classList.add('dark');
    updateMeta(true);
  }

  if (toggle) {
    updateToggleIcon(html.classList.contains('dark'));

    toggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateToggleIcon(isDark);
      updateMeta(isDark);
    });
  }

  function updateMeta(isDark) {
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#040E24' : '#FFFFFF');
    }
  }

  function updateToggleIcon(isDark) {
    if (!toggle) return;
    toggle.innerHTML = isDark
      ? `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>`
      : `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>`;
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}
