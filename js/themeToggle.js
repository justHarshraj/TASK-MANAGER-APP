/**
 * Theme Toggle Module
 * Feature 4️⃣: Implements Dark Mode / Light Mode
 * Demonstrates use of classList, dataset, and setAttribute()
 */

const ThemeToggle = {
    toggleBtn: document.getElementById('theme-toggle'),
    body: document.body,

    init() {
        if (!this.toggleBtn) return;
        
        // Load saved theme or use default 'dark'
        const savedTheme = window.AppStorage ? window.AppStorage.loadTheme() : null;
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Check system preference if no saved theme
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            if (prefersLight) {
                this.setTheme('light');
            }
        }

        this.setupListener();
    },

    setupListener() {
        this.toggleBtn.addEventListener('click', () => {
            // Using dataset to get the current theme (DOM property reflecting data-theme)
            const currentTheme = this.body.dataset.theme || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            this.setTheme(newTheme);
            
            // Using classList to animate the toggle button
            this.toggleBtn.classList.add('toggling');
            setTimeout(() => {
                this.toggleBtn.classList.remove('toggling');
            }, 300);
        });
    },

    setTheme(themeName) {
        // Feature requirement: Use setAttribute() to change theme
        this.body.setAttribute('data-theme', themeName);
        
        // Save preference
        if (window.AppStorage) {
            window.AppStorage.saveTheme(themeName);
        }
    }
};

window.ThemeToggle = ThemeToggle;
