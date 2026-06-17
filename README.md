# TaskMaster Pro

A fully interactive Task Manager Application built strictly with HTML, CSS, and Vanilla JavaScript. This project demonstrates core DOM manipulation, event handling, and understanding of the browser rendering pipeline.

## Features

* **Task Management**: Create, edit, complete, and delete tasks dynamically without page reloads.
* **Theme Toggle**: Switch between dark and light modes, persisting the choice.
* **Educational Demos**: Interactive sections demonstrating "Attributes vs. Properties" and "Event Propagation".
* **Bonus Implementations**:
    * LocalStorage persistence.
    * Task search and category filtering.
    * Real-time counters for pending and completed tasks.
    * Optimized DOM rendering using `DocumentFragment`.

## Core Concepts Explained

### 1. Browser Rendering Pipeline

The journey from raw code to pixels on the screen follows a specific pipeline:

1. **Parsing**: The browser receives raw bytes of HTML, converts them to characters, and parses them.
2. **Tokenization**: The parser breaks the characters down into distinct tokens (e.g., StartTag, EndTag, Attribute).
3. **DOM Tree Creation**: Tokens are converted into `Node` objects, which are linked together in a tree data structure called the Document Object Model (DOM).
4. **CSSOM Tree Creation**: Concurrently, CSS is parsed into the CSS Object Model (CSSOM), a tree representing styles associated with nodes.
5. **Render Tree**: The DOM and CSSOM are combined to form the Render Tree. It includes only the nodes required to render the page (e.g., it excludes `<head>` and nodes with `display: none`).
6. **Layout (Reflow)**: The browser calculates the exact geometry (position and size) of each node in the Render Tree.
7. **Paint**: Finally, the browser draws the pixels onto the screen layer by layer.

### 2. Event Propagation

When an event (like a click) occurs on an element, it doesn't just happen there; it travels through the DOM.

* **Event Capturing (Top-Down)**: The event starts at the root (Window/Document) and travels *down* the DOM tree to the target element.
    * *Example Setup*: `element.addEventListener('click', handler, true)`
* **Event Bubbling (Bottom-Up)**: After reaching the target, the event travels *up* from the target element back to the root. This is the default behavior.
    * *Example Setup*: `element.addEventListener('click', handler, false)` (or simply omit the 3rd argument).

### 3. Event Delegation

Instead of attaching a separate event listener to every single task card (which is bad for performance and memory, especially for dynamically created elements), we use **Event Delegation**.

We attach *one* single event listener to the parent container (`#task-list`). Since events bubble up, any click on a child element (like a delete button) will eventually reach the parent container. The parent's listener catches it, and we use `event.target` to determine exactly which element triggered the event and respond accordingly.

### 4. Attributes vs. Properties

* **Attributes**: Defined in the HTML markup (e.g., `<input value="Hello">`). They are always strings and represent the *initial* state. Accessed via `element.getAttribute('name')`.
* **Properties**: Live on the DOM object in JavaScript memory. They represent the *current* state and can be of any type (booleans, objects, etc.). Accessed via dot notation, e.g., `element.value`.

*Example*: If a user types "World" into the input above:
* `input.getAttribute('value')` will still return `"Hello"` (the initial HTML attribute).
* `input.value` will return `"World"` (the current property value).

## How to Run

1. Clone this repository.
2. Open `index.html` in your web browser, or serve it using a local development server (e.g., VS Code Live Server).

## Deployment

*(Replace with actual deployment link once hosted on Netlify, Vercel, or GitHub Pages)*
Live Demo: [Link Here]
