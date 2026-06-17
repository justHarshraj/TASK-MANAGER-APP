# TaskMaster Pro ⚡

TaskMaster Pro is a premium, high-performance, framework-free task management application built using clean, semantic HTML5, modern vanilla CSS, and standard native JavaScript DOM APIs.

Featuring a dark/light interface inspired by Vercel's design aesthetics, this project is built both as a fully functional productivity tool and an educational platform demonstrating key browser mechanics, DOM manipulation strategies, and event workflows.

---

## 🚀 Features

### 1. Task Creation & Lifecycle
* **Dynamic Generation**: Add new tasks instantly. New task cards are rendered dynamically in memory and inserted directly into the DOM without page reloads.
* **Inline Task Editing**: Edit titles inline. In edit mode, the task header is replaced dynamically with a focusable text input, accompanied by a dedicated Save button (`💾`).
* **Complete & Delete States**: Toggle task statuses dynamically (marking them as completed or pending) or remove tasks with built-in slide-out fade animations.

### 2. Intelligent Event Architecture
* **High-Performance Event Delegation**: Uses a single event listener attached to the parent container (`#task-list`) to manage clicks across all task cards, saving memory and ensuring newly added tasks automatically inherit click behaviors.
* **Propagation Demo**: An interactive module executing both top-down **Event Capturing** (root to target) and bottom-up **Event Bubbling** (target to root), logging detailed execution orders to the browser console.

### 3. Polish & Customization
* **Enlarged Adaptive Theme Switcher**: Easily toggle between Dark Mode and Light Mode with a custom-engineered, tactile sliding switch.
* **Category Tagging**: Organize tasks by custom domains: Work, Personal, Study, Health, or Other.
* **Real-time Metrics**: Live dashboard counters tracking total, pending, and completed tasks.
* **Search & Filters**: Instantly find tasks using typing search or category-specific pills.
* **LocalStorage Persistence**: Automatically saves your tasks list and theme preference.

---

## 🛠️ Project Structure

The project is structured modularly to isolate concerns across different browser features:

```text
TASK MANAGER APP/
├── css/
│   └── style.css            # Base design system, custom CSS tokens, and animations
├── js/
│   ├── app.js               # Entry point; coordinates module initializations
│   ├── pipeline.js          # Logic constructing the visual browser pipeline
│   ├── propagation.js       # Capturing/Bubbling simulator and console logger
│   ├── storage.js           # LocalStorage CRUD operations
│   ├── taskManager.js       # Core DOM manipulator, task CRUD, and delegation
│   └── themeToggle.js       # Dark/Light mode theme control
├── index.html               # Semantic HTML markup, structured SEO, and layout
├── README.md                # Project documentation
└── DESIGN.md                # Design specifications
```

---

## 📖 Deep Dive: Core Web Concepts

### 1. The Browser Rendering Pipeline
How raw HTML/CSS strings turn into interactive pixels on your monitor:
1. **HTML Parsing & Tokenization**: Raw bytes of HTML are converted into characters, tokenized (tag starts, tag ends, attributes), and mapped into DOM Node objects.
2. **DOM Tree Construction**: These nodes are linked into the **Document Object Model (DOM)** tree.
3. **CSSOM Tree Construction**: Concurrently, style sheets are parsed into the **CSS Object Model (CSSOM)** tree.
4. **Render Tree Generation**: The DOM and CSSOM trees are merged into the **Render Tree**, which contains only the visible elements to be drawn.
5. **Layout (Reflow)**: The browser calculates coordinates, sizing, and geometric boundaries of every render tree node.
6. **Paint**: The browser paints the pixels onto layers of the viewport.
7. **Composite**: Layers are stitched together and rendered on-screen.

### 2. Event Propagation (Bubbling vs. Capturing)
When an event occurs, it travels along a propagation path:
* **Event Capturing (Top-Down)**: The event moves from the top of the tree (`Window`, `Document`, `HTML`, `Body`) down to the target node. Registered using:
  ```javascript
  element.addEventListener('click', handler, true); // true sets capture phase
  ```
* **Event Bubbling (Bottom-Up)**: The default behavior. Once the target is hit, the event travels back up the DOM tree to the root. Registered using:
  ```javascript
  element.addEventListener('click', handler, false); // or default parameter omission
  ```

### 3. Attributes vs. Properties
* **HTML Attribute**: Defined inside the initial HTML source code markup. They always remain strings and represent the *initial state* of the element.
  * Access: `element.getAttribute('value')`
* **DOM Property**: Represents the live, in-memory representation inside the JavaScript engine. They can hold any data type and track the *current state*.
  * Access: `element.value`

*Example*: When you type into a text input, the DOM *property* `input.value` updates dynamically in memory to match your text, while the *attribute* `input.getAttribute('value')` remains static at its initial HTML definition.

---

## 🧩 Native JavaScript DOM APIs Used

This application deliberately avoids frameworks and libraries to leverage native web API power:

* **Creation & Nodes**: `document.createElement()`, `document.createTextNode()`
* **Hierarchy insertion**: `.appendChild()`, `.append()`, `.prepend()`
* **Positional insertion**: `.before()`, `.after()`
* **Structural replacement**: `.replaceWith()`
* **Removal**: `.remove()`
* **Attributes**: `.setAttribute()`, `.getAttribute()`, `.removeAttribute()`, `.hasAttribute()`, and `.dataset` properties
* **Classes**: `.classList.add()`, `.classList.remove()`
* **Events**: `addEventListener()`

---

## 💻 Running the Application

1. Clone or download this project folder.
2. Serve `index.html` using a simple HTTP server (e.g. `npx serve .` or VS Code Live Server) or simply double-click the `index.html` file to open it in your browser.

---

## 👨‍💻 Created By

**Harsh Raj**
* [LinkedIn](https://www.linkedin.com/in/harsh-raj-533826287)
* [GitHub](https://github.com/justHarshraj)
