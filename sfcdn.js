  // Theme configuration
  const THEME_KEY = 'blog-theme-preference';
  const DEFAULT_THEME = 'default';
  const VALID_THEMES = ['default', 'dark', 'light'];

  // Cache DOM elements
  let blogElement = document.querySelector('.nB');

  // Initialize theme system
  function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    requestAnimationFrame(() => setTheme(savedTheme, false));
  }

  // Set theme
  function setTheme(theme, savePreference = true) {
    requestAnimationFrame(() => {
      blogElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    });

    if (savePreference) {
      localStorage.setItem(THEME_KEY, theme);
    }
  }

  // Initialize theme when DOM is ready
  document.addEventListener('DOMContentLoaded', () => requestIdleCallback(initializeTheme));

  // Export theme functions for external use
  window.setTheme = setTheme;
