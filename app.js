document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById('book-upload');
  const header = document.getElementById('top-header');
  const touchZones = document.getElementById('touch-zones');
  const prevZone = document.getElementById('prev-zone');
  const nextZone = document.getElementById('next-zone');
  
  let book = null;
  let rendition = null;

  // Handle Book Loading
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (window.FileReader) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const bookData = event.target.result;
        renderBook(bookData);
      };
      reader.readAsArrayBuffer(file);
    }
  });

  // We need to store the filename to use as our unique localStorage key
  let currentBookKey = '';

  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Clean the filename to use as a safe storage key
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

    rendition.themes.default({
      body: { 
        "background": "#000000 !important",
        "color": "#e0e0e0 !important",
        "font-family": "system-ui, serif !important",
        "padding": "0 10px !important"
      },
      p: {
        "font-size": "24px !important", 
        "line-height": "1.5 !important"
      }
    });

    // --- NEW: Check localStorage for a saved position ---
    const savedLocation = localStorage.getItem(currentBookKey);
    
    // Display the book, passing the saved location if it exists
    rendition.display(savedLocation || undefined);

    // --- NEW: Listen for page turns and save the new position ---
    rendition.on("relocated", (location) => {
      // location.start.cfi is the exact coordinate of the top of the current page
      localStorage.setItem(currentBookKey, location.start.cfi);
    });

    document.querySelector('.upload-btn').style.display = 'none';
    touchZones.classList.remove('hidden');
  };
    // Force Dark Mode & Large Fonts via ePub.js Themes
    rendition.themes.default({
      body: { 
        "background": "#000000 !important",
        "color": "#e0e0e0 !important",
        "font-family": "system-ui, serif !important",
        "padding": "0 10px !important"
      },
      p: {
        "font-size": "24px !important", /* Massive font for 2.8" screen */
        "line-height": "1.5 !important"
      }
    });

    rendition.display();

    // Hide the upload button and activate touch zones
    document.querySelector('.upload-btn').style.display = 'none';
    touchZones.classList.remove('hidden');
  };

  // Pagination Logic
  prevZone.addEventListener('click', () => {
    if (rendition) rendition.prev();
  });

  nextZone.addEventListener('click', () => {
    if (rendition) rendition.next();
  });

  // Modal Logic (Same as Calculator)
  const aboutTrigger = document.getElementById('about-trigger');
  const aboutModal = document.getElementById('about-modal');
  const closeModal = document.getElementById('close-modal');

  aboutTrigger.addEventListener('click', () => aboutModal.classList.remove('hidden'));
  closeModal.addEventListener('click', () => aboutModal.classList.add('hidden'));
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.classList.add('hidden');
  });
});
