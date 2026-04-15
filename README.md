# eBook | Digital Native (Sidephone Edition)

A minimalist, distraction-free Progressive Web App (PWA) designed for reading `.epub` files on the Sidephone and other small-form-factor devices.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Why This Exists
Reading on a 2.8-inch display is often frustrating because standard reading applications clutter the screen with menus, progress bars, and poorly scaled typography. 

This reader strips away the traditional UI. Once a book is loaded, the interface disappears into pure text. Navigation is handled through invisible touch zones, and the app forces custom, high-legibility formatting that overrides the publisher's default styles to ensure a perfect reading experience on tiny screens.

## Features
- **Invisible UI:** Tap the left 35% of the screen to go back, and the right 65% to go forward. No visible buttons to distract from the text.
- **Persistent Progress:** Automatically saves your exact reading location (CFI) locally. Switch between different books without losing your place.
- **Accessible Typography:** Features a built-in theme toggle (Dark/Light mode) and custom font selection, including dedicated support for OpenDyslexic.
- **100% Local:** Powered by `epub.js`. Books are parsed and rendered entirely within the browser. No servers, no tracking, no data usage.

## Live Demo & Installation
You can use the reader directly in your browser:
**[Launch eBook | Digital Native](https://justindavis882.github.io/eBook-DigitalNative)**

**To install on a Sidephone:**
1. Open the Live Demo link in your Sidephone's web browser (e.g., Vivaldi or Firefox).
2. Open the browser menu and select **"Add to Home screen"** or **"Install App"**.
3. Launch directly from your home screen for a fullscreen, native reading experience.

## Local Development
Since this is a vanilla stack, no build tools are required. 
1. Clone the repository: `git clone https://github.com/justindavis882/sidephone-epub.git`
2. Open `index.html` in your browser.

## About Digital Native
This application is part of the **Digital Native** suite of tools, focused on building clean, responsive, and functional digital environments. 

Check out more of our apps, projects, and custom web tools here:
**[Digital Native Website](https://justindavis882.github.io/DigitalNative)**

---
*Built for the minimalist tech community. If you find this helpful, consider checking out the main site and supporting the project!*
