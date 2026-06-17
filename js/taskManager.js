/**
 * Task Manager Module
 * Handles DOM manipulation, Event Delegation, and Task CRUD operations
 */

const TaskManager = {
    // DOM Elements
    form: document.getElementById('task-form'),
    titleInput: document.getElementById('task-title'),
    categorySelect: document.getElementById('task-category'),
    taskList: document.getElementById('task-list'),
    
    // Stats & Filters
    totalCounter: document.getElementById('total-counter'),
    completedCounter: document.getElementById('completed-counter'),
    pendingCounter: document.getElementById('pending-counter'),
    searchInput: document.getElementById('search-input'),
    categoryFilters: document.getElementById('category-filters'),
    clearAllBtn: document.getElementById('clear-all-btn'),
    
    // State
    tasks: [],

    init() {
        this.tasks = window.AppStorage ? window.AppStorage.loadTasks() : [];
        this.renderAllTasks();
        this.updateCounters();
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Form Submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // 6️⃣ EVENT DELEGATION
        // Instead of attaching listeners to every button, we attach ONE to the parent
        this.taskList.addEventListener('click', (e) => {
            const target = e.target;
            const card = target.closest('.task-card');
            
            if (!card) return; // Clicked outside a card

            // Find which button was clicked using closest()
            if (target.closest('.delete-btn')) {
                this.deleteTask(card);
            } else if (target.closest('.complete-btn')) {
                this.toggleComplete(card);
            } else if (target.closest('.edit-btn')) {
                this.editTask(card);
            } else if (target.closest('.save-btn')) {
                this.editTask(card);
            }
        });

        // Search feature (Bonus)
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.filterTasks();
            });
        }

        // Category filters (Bonus)
        if (this.categoryFilters) {
            this.categoryFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    // Update active class
                    this.categoryFilters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    this.filterTasks();
                }
            });
        }

        // Clear All (Bonus)
        if (this.clearAllBtn) {
            this.clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete all tasks?')) {
                    this.clearAllTasks();
                }
            });
        }
    },



    /**
     * Generate a pseudo-UUID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    },

    /**
     * 1️⃣ TASK CREATION MODULE & 3️⃣ DOM MANIPULATION
     */
    addTask() {
        // 2️⃣ ATTRIBUTES VS PROPERTIES: Demonstration Required
        // Show the difference between input.value and input.getAttribute("value")
        
        // Property (.value): Gets the CURRENT state in memory (what the user typed in the input)
        console.log("Property (this.titleInput.value):", this.titleInput.value);
        
        // Attribute (.getAttribute('value')): Gets the ORIGINAL state from the HTML markup.
        // It does not update automatically when the user types.
        console.log("Attribute (this.titleInput.getAttribute('value')):", this.titleInput.getAttribute('value'));

        const title = this.titleInput.value.trim();
        const category = this.categorySelect.value;

        if (!title || !category) return;

        const newTask = {
            id: this.generateId(),
            title: title,
            category: category,
            status: 'pending',
            timestamp: new Date().toLocaleString()
        };

        this.tasks.push(newTask);
        this.saveState();

        // 3️⃣ DOM Manipulation: prepend() (Insert at the top)
        const taskElement = this.createTaskElement(newTask);
        
        // Remove empty state if it exists
        const emptyState = this.taskList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove(); // 3️⃣ DOM Manipulation: remove()
        }

        this.taskList.prepend(taskElement);
        
        // Show success toast
        this.showToast('Task added successfully.');
        
        // Reset form
        this.form.reset();
        this.updateCounters();
    },

    /**
     * Create a task DOM element using native APIs
     */
    createTaskElement(task) {
        // 1️⃣ DOM API: createElement
        const card = document.createElement('div');
        card.className = 'task-card';
        
        // 2️⃣ CUSTOM DATA ATTRIBUTES (Attributes vs Properties)
        // setAttribute modifies the DOM directly
        card.setAttribute('data-id', task.id);
        card.setAttribute('data-status', task.status);
        card.setAttribute('data-category', task.category);
        
        // NOTE: We could also use the property `card.dataset.status = task.status`
        // dataset is a property that reflects data-* attributes

        // Badge
        const badge = document.createElement('span');
        badge.className = `category-badge category-${task.category}`;
        badge.textContent = task.category; // Note: textContent is a property

        // Title using createTextNode
        const titleEl = document.createElement('h3');
        titleEl.className = 'task-title';
        // 1️⃣ DOM API: createTextNode
        const titleText = document.createTextNode(task.title);
        // 1️⃣ DOM API: appendChild
        titleEl.appendChild(titleText); 

        // Actions container
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        // Helper to create buttons
        const createBtn = (classes, icon, tooltip) => {
            const btn = document.createElement('button');
            btn.className = `icon-btn ${classes}`;
            btn.innerHTML = icon; // Property usage
            btn.setAttribute('title', tooltip); // Attribute usage
            return btn;
        };

        const completeBtn = createBtn('complete-btn', task.status === 'completed' ? '↺' : '✓', 'Toggle Complete');
        
        // Wrap Edit and Save buttons to allow Save below Edit
        const editGroup = document.createElement('div');
        editGroup.className = 'edit-group';
        
        const editBtn = createBtn('edit-btn', '✎', 'Edit Task');
        const saveBtn = createBtn('save-btn', '💾', 'Save Task');
        editGroup.append(editBtn, saveBtn);
        
        const deleteBtn = createBtn('delete-btn', '✕', 'Delete Task');

        // 3️⃣ DOM Manipulation: append() (can take multiple nodes)
        actionsDiv.append(completeBtn, editGroup, deleteBtn);

        const metaDiv = document.createElement('div');
        metaDiv.className = 'task-meta';
        metaDiv.textContent = task.timestamp;

        // Construct the card
        card.append(badge, titleEl, actionsDiv, metaDiv);

        return card;
    },

    /**
     * Render all tasks using a DocumentFragment for performance
     */
    renderAllTasks() {
        this.taskList.innerHTML = ''; // Clear current
        
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = `
                <div class="empty-state">
                    <p>No tasks yet. Add one above to get started.</p>
                </div>
            `;
            return;
        }

        // Bonus: DocumentFragment for efficient bulk DOM insertion
        const fragment = document.createDocumentFragment();
        
        // Render in reverse so newest is on top
        for (let i = this.tasks.length - 1; i >= 0; i--) {
            fragment.appendChild(this.createTaskElement(this.tasks[i]));
        }
        
        this.taskList.appendChild(fragment);
    },

    /**
     * Toggle task status
     */
    toggleComplete(card) {
        const id = card.getAttribute('data-id'); // Read attribute
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        // Toggle state
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        
        // Update DOM attribute
        card.setAttribute('data-status', task.status);
        
        // Update button icon visually
        const btn = card.querySelector('.complete-btn');
        if (btn) {
            btn.innerHTML = task.status === 'completed' ? '↺' : '✓';
        }
        
        this.saveState();
        this.updateCounters();
    },

    /**
     * Delete a task
     */
    deleteTask(card) {
        // Guard: prevent double-click from firing delete twice
        if (card.classList.contains('item-removing')) return;

        const id = card.dataset.id; // Using dataset property this time
        
        // Add animation class
        card.classList.add('item-removing');
        
        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            // 3️⃣ DOM Manipulation: remove()
            card.remove(); 
            
            // Remove from array
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveState();
            this.updateCounters();
            
            // Show empty state if needed
            if (this.tasks.length === 0) {
                this.renderAllTasks();
            }
        }, 300);
    },

    /**
     * Edit a task
     */
    editTask(card) {
        const id = card.dataset.id;
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        // If already editing, save
        if (card.hasAttribute('data-editing')) {
            const input = card.querySelector('.edit-input');
            if (input) {
                input.blur(); // Triggers blur which saves the content
            }
            return;
        }
        
        // Set custom attribute to track editing state
        card.setAttribute('data-editing', 'true');
        card.classList.add('editing');
        
        const titleEl = card.querySelector('.task-title');
        const currentTitle = titleEl.textContent;
        
        // Create input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = currentTitle; // Set property
        
        // 3️⃣ DOM Manipulation: replaceWith()
        titleEl.replaceWith(input);
        input.focus();

        let saved = false; // Guard against double-fire (Enter triggers blur)
        const saveEdit = () => {
            if (saved) return;
            saved = true;

            const newTitle = input.value.trim();
            if (newTitle && newTitle !== currentTitle) {
                task.title = newTitle;
                this.saveState();
            }
            
            // Recreate title element
            const newTitleEl = document.createElement('h3');
            newTitleEl.className = 'task-title';
            newTitleEl.textContent = task.title;
            
            // 3️⃣ DOM Manipulation: replaceWith() (again)
            input.replaceWith(newTitleEl);
            card.classList.remove('editing');
            
            // 2️⃣ ATTRIBUTES VS PROPERTIES: removeAttribute()
            card.removeAttribute('data-editing');
        };

        // Save on Enter or blur
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur(); // Trigger blur event to save
            } else if (e.key === 'Escape') {
                // Cancel edit
                input.value = currentTitle;
                input.blur();
            }
        });
    },

    /**
     * Clear all tasks
     */
    clearAllTasks() {
        this.tasks = [];
        this.saveState();
        this.renderAllTasks();
        this.updateCounters();
    },

    /**
     * Filter tasks by search query and category
     */
    filterTasks() {
        const query = this.searchInput ? this.searchInput.value.toLowerCase() : '';
        const activeFilterBtn = this.categoryFilters ? this.categoryFilters.querySelector('.active') : null;
        const categoryFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

        const cards = this.taskList.querySelectorAll('.task-card');
        
        cards.forEach(card => {
            const titleEl = card.querySelector('.task-title');
            // Skip cards in edit mode (title element is replaced by an input)
            if (!titleEl) return;
            const title = titleEl.textContent.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(query);
            const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = ''; // Reset to default (grid)
            } else {
                card.style.display = 'none'; // Hide
            }
        });
    },

    /**
     * Update dashboard counters
     */
    updateCounters() {
        if (!this.totalCounter) return;
        
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        
        this.totalCounter.textContent = total;
        this.completedCounter.textContent = completed;
        this.pendingCounter.textContent = pending;
    },

    /**
     * Save current state to storage
     */
    saveState() {
        if (window.AppStorage) {
            window.AppStorage.saveTasks(this.tasks);
        }
    },

    /**
     * Show a toast message to demonstrate before() and after()
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = message;
        
        // 3️⃣ DOM Manipulation: before()
        // Insert toast before the task list
        this.taskList.before(toast);

        // 3️⃣ DOM Manipulation: after()
        // Insert a decorative line after the toast
        const decor = document.createElement('span');
        decor.className = 'toast-decor';
        toast.after(decor);

        // Clean up after 2 seconds
        setTimeout(() => {
            toast.remove();
            decor.remove();
        }, 2000);
    }
};

window.TaskManager = TaskManager;
