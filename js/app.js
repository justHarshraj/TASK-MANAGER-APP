/**
 * App Main Entry Point
 * Initializes all modules when the DOM is fully loaded.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme first to prevent flash of wrong theme
    if (window.ThemeToggle) {
        window.ThemeToggle.init();
    }

    // 2. Initialize Task Manager (Core App Logic)
    if (window.TaskManager) {
        window.TaskManager.init();
    }

    // 3. Initialize Educational Sections
    if (window.PropagationDemo) {
        window.PropagationDemo.init();
    }

    if (window.PipelineVisual) {
        window.PipelineVisual.init();
    }

    console.log('🚀 TaskMaster Pro Initialization Complete');
});
