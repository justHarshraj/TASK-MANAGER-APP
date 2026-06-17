/**
 * Event Propagation Demo Module
 * Feature 7️⃣: Demonstrates Event Bubbling and Capturing
 * 
 * As requested, this is implemented entirely in code without a frontend UI.
 * Execution order is logged directly to the browser console.
 */

const PropagationDemo = {
    init() {
        this.runDemo();
    },

    runDemo() {
        console.log("\n--- 7️⃣ EVENT PROPAGATION DEMONSTRATION ---");
        
        // 1. Create the structure in memory
        const grandparent = document.createElement('div');
        grandparent.id = 'grandparent';
        
        const parent = document.createElement('div');
        parent.id = 'parent';
        
        const child = document.createElement('button');
        child.id = 'child-btn';
        
        // Assemble structure
        parent.appendChild(child);
        grandparent.appendChild(parent);

        // -------------------------------------------------------------------
        // EXPLANATION OF BUBBLING VS CAPTURING (as requested by requirements)
        // -------------------------------------------------------------------
        // When an event happens on an element (like clicking 'Child Button'), 
        // it doesn't just fire on that element. It travels through the DOM tree.
        //
        // 1. CAPTURING PHASE (Top-Down): 
        //    Starts at the window/document and goes DOWN the tree to the target element.
        //    To listen to this phase, we pass `true` as the 3rd parameter to addEventListener.
        //
        // 2. BUBBLING PHASE (Bottom-Up): 
        //    Starts at the target element and bubbles UP the tree to the window/document.
        //    This is the default behavior. To listen to this phase, we omit the 
        //    3rd parameter or pass `false` to addEventListener.
        // -------------------------------------------------------------------

        // 2. Demonstrate Bubbling
        console.log("\n▶️ Testing Event Bubbling (Bottom-Up):");
        console.log("Expected Output: Child -> Parent -> Grandparent\n");
        
        const bubbleGP = () => console.log("Grandparent");
        const bubbleP = () => console.log("Parent");
        const bubbleC = () => console.log("Child");

        // Attach bubbling listeners (useCapture = false)
        grandparent.addEventListener('click', bubbleGP, false);
        parent.addEventListener('click', bubbleP, false);
        child.addEventListener('click', bubbleC, false);

        // Simulate click
        child.click();

        // Cleanup bubbling listeners before next test
        grandparent.removeEventListener('click', bubbleGP, false);
        parent.removeEventListener('click', bubbleP, false);
        child.removeEventListener('click', bubbleC, false);

        // 3. Demonstrate Capturing
        console.log("\n▶️ Testing Event Capturing (Top-Down):");
        console.log("Expected Output: Grandparent -> Parent -> Child\n");
        
        const captureGP = () => console.log("Grandparent");
        const captureP = () => console.log("Parent");
        const captureC = () => console.log("Child");

        // Attach capturing listeners (useCapture = true)
        grandparent.addEventListener('click', captureGP, true);
        parent.addEventListener('click', captureP, true);
        child.addEventListener('click', captureC, true);

        // Simulate click
        child.click();

        // Cleanup capturing listeners
        grandparent.removeEventListener('click', captureGP, true);
        parent.removeEventListener('click', captureP, true);
        child.removeEventListener('click', captureC, true);

        console.log("-------------------------------------------\n");
    }
};

window.PropagationDemo = PropagationDemo;
