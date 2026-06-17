/**
 * Storage Module
 * Handles persistence of tasks and theme preference using LocalStorage
 * BONUS FEATURE IMPLEMENTATION
 */

const AppStorage = {
    TASKS_KEY: 'taskmaster_tasks',
    THEME_KEY: 'taskmaster_theme',

    /**
     * Save tasks array to LocalStorage
     * @param {Array} tasks 
     */
    saveTasks(tasks) {
        try {
            localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
        } catch (e) {
            console.error('Error saving tasks to LocalStorage', e);
        }
    },

    /**
     * Load tasks from LocalStorage
     * @returns {Array} List of task objects
     */
    loadTasks() {
        try {
            const tasksJson = localStorage.getItem(this.TASKS_KEY);
            return tasksJson ? JSON.parse(tasksJson) : [];
        } catch (e) {
            console.error('Error loading tasks from LocalStorage', e);
            return [];
        }
    },

    /**
     * Save theme preference
     * @param {string} theme 'dark' or 'light'
     */
    saveTheme(theme) {
        try {
            localStorage.setItem(this.THEME_KEY, theme);
        } catch (e) {
            console.error('Error saving theme', e);
        }
    },

    /**
     * Load theme preference
     * @returns {string|null}
     */
    loadTheme() {
        try {
            return localStorage.getItem(this.THEME_KEY);
        } catch (e) {
            console.error('Error loading theme', e);
            return null;
        }
    },
    
    /**
     * Clear all tasks
     */
    clearTasks() {
        try {
            localStorage.removeItem(this.TASKS_KEY);
        } catch (e) {
            console.error('Error clearing tasks', e);
        }
    }
};

// Export for global use (since we're not using ES modules)
// Named AppStorage to avoid shadowing the browser's native window.Storage constructor
window.AppStorage = AppStorage;
