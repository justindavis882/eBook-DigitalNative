document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById('book-upload');
  const uploadLabel = document.getElementById('upload-label');
  const touchZones = document.getElementById('touch-zones');
  const prevZone = document.getElementById('prev-zone');
  const nextZone = document.getElementById('next-zone');
  const settingsTrigger = document.getElementById('settings-trigger');
  
  let book = null;
  let rendition = null;
  let currentBookKey = '';

  // --- Load User Preferences ---
  let userTheme = localStorage.getItem('dn_theme') || 'dark';
  let userFont = localStorage.getItem('dn_font') || 'sans-serif';

  // Apply UI Theme immediately
  if (userTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('theme-toggle').innerText = "Switch to Dark Mode";
  }

  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    currentBookKey = 'dn_epub_' + file.name.replace(/[^a-zA-Z0-9]/g, '_');

    if (window.FileReader) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const bookData = event.target.result;
        renderBook(bookData);
      };
      reader.readAsArrayBuffer(file);
    }
  });

  const renderBook = (bookData) => {
    document.getElementById('viewer').innerHTML = '';
    book = ePub(bookData);
    
    rendition = book.renderTo("viewer", {
      width: "100%",
      height: "100%",
      spread: "none",
      manager: "continuous",
      flow: "paginated"
    });

    // Register Themes with ePub.js
    rendition.themes.register("dark", {
      body: { "background": "#000000 !important", "color": "#e0e0e0 !important", "padding": "0 10px !important" },
      p: { "font-size": "24px !important", "line-height": "1.5 !important" }
    });
    
    rendition.themes.register("light", {
      body: { "background": "#ffffff !important", "color": "#121212 !important", "padding": "0 10px !important" },
      p: { "font-size": "24px !important", "line-height": "1.5 !important" }
    });

    // Inject OpenDyslexic into the iframe
    rendition.hooks.content.register((contents) => {
      contents.addStylesheet("https://cdn.jsdelivr.net/npm/opendyslexic@2.0.3/fonts-otf/opendyslexic.css");
    });

    // Apply saved preferences
    rendition.themes.select(userTheme);
    rendition.themes.font(userFont);

    const savedLocation = localStorage.getItem(currentBookKey);
    rendition.display(savedLocation || undefined);

    rendition.on("relocated", (location) => {
      localStorage.setItem(currentBookKey, location.start.cfi);
    });

    // Swap UI elements
    uploadLabel.style.display = 'none';
    settingsTrigger.classList.remove('hidden');
    touchZones.classList.remove('hidden');
    updateActiveFontButton();
  };

  // --- Pagination ---
  prevZone.addEventListener('click', () => { if (rendition) rendition.prev(); });
  nextZone.addEventListener('click', () => { if (rendition) rendition.next(); });

  // --- Settings & UI Logic ---
  const settingsModal = document.getElementById('settings-modal');
  const themeToggle = document.getElementById('theme-toggle');
  const fontButtons = document.querySelectorAll('.font-select');

  settingsTrigger.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  document.getElementById('close-settings').addEventListener('click', () => settingsModal.classList.add('hidden'));

  themeToggle.addEventListener('click', () => {
    if (userTheme === 'dark') {
      userTheme = 'light';
      document.body.classList.add('light-theme');
      themeToggle.innerText = "Switch to Dark Mode";
    } else {
      userTheme = 'dark';
      document.body.classList.remove('light-theme');
      themeToggle.innerText = "Switch to Light Mode";
    }
    localStorage.setItem('dn_theme', userTheme);
    if (rendition) rendition.themes.select(userTheme);
  });

  fontButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      userFont = e.target.dataset.font;
      localStorage.setItem('dn_font', userFont);
      if (rendition) rendition.themes.font(userFont);
      updateActiveFontButton();
    });
  });

  function updateActiveFontButton() {
    fontButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.font-select[data-font="${userFont}"]`)?.classList.add('active');
  }

  // --- About Modal Logic ---
  const aboutTrigger = document.getElementById('about-trigger');
  const aboutModal = document.getElementById('about-modal');
  
  aboutTrigger.addEventListener('click', () => aboutModal.classList.remove('hidden'));
  document.getElementById('close-modal').addEventListener('click', () => aboutModal.classList.add('hidden'));
});
