/**
 * Browser Rendering Pipeline Visual Module
 * Feature 8️⃣: Dynamically creates a visual flowchart of how the browser renders pages
 */

const PipelineVisual = {
    container: document.getElementById('pipeline-container'),
    
    // Data defining the pipeline steps
    steps: [
        {
            id: 1,
            title: 'HTML',
            icon: '📄',
            desc: 'Browser receives raw HTML bytes.',
            color: 'var(--color-link)'
        },
        {
            id: 2,
            title: 'Parsing',
            icon: '🔍',
            desc: 'Bytes are parsed into characters.',
            color: 'var(--color-link)'
        },
        {
            id: 3,
            title: 'Tokenization',
            icon: '🧩',
            desc: 'Characters are converted into valid HTML tokens.',
            color: 'var(--color-link)'
        },
        {
            id: 4,
            title: 'DOM Tree',
            icon: '🌳',
            desc: 'Tokens form the Document Object Model tree.',
            color: 'var(--color-cyan)'
        },
        {
            id: 5,
            title: 'CSS',
            icon: '🎨',
            desc: 'Browser receives raw CSS bytes.',
            color: 'var(--color-violet)'
        },
        {
            id: 6,
            title: 'CSSOM Tree',
            icon: '🌲',
            desc: 'CSS rules are parsed into the CSS Object Model.',
            color: 'var(--color-violet)'
        },
        {
            id: 7,
            title: 'Render Tree',
            icon: '🔗',
            desc: 'DOM and CSSOM combine to form the Render Tree.',
            color: 'var(--color-ink)'
        }
    ],

    init() {
        if (!this.container) return;
        this.renderPipeline();
    },

    renderPipeline() {
        // Clear container
        this.container.innerHTML = '';
        
        // Use DocumentFragment for performance
        const fragment = document.createDocumentFragment();
        
        this.steps.forEach((step, index) => {
            // Create card wrapper
            const card = document.createElement('div');
            card.className = 'pipeline-card';
            card.setAttribute('data-step', step.id);
            
            // Add a slight delay for entry animation
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            card.style.opacity = '0'; // Start hidden
            
            // Apply specific border color based on data
            card.style.borderTopColor = step.color;
            card.style.borderTopWidth = '3px';

            // Create icon
            const iconEl = document.createElement('span');
            iconEl.className = 'pipeline-icon';
            iconEl.textContent = step.icon;
            
            // Create title
            const titleEl = document.createElement('div');
            titleEl.className = 'pipeline-title';
            titleEl.textContent = step.title;
            titleEl.style.color = step.color;
            
            // Create description
            const descEl = document.createElement('div');
            descEl.className = 'pipeline-desc';
            descEl.textContent = step.desc;
            
            // Assemble card using native DOM append
            card.append(iconEl, titleEl, descEl);
            
            // Add to fragment
            fragment.appendChild(card);
        });
        
        // Inject into DOM
        this.container.appendChild(fragment);
    }
};

window.PipelineVisual = PipelineVisual;
