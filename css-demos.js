// CSS Tutorial Interactive Demos
document.addEventListener('DOMContentLoaded', function() {
    initFlexboxDemo();
    initAnimationDemos();
    initThemeSwitcher();
});

// Flexbox Interactive Demo
function initFlexboxDemo() {
    const justifySelect = document.getElementById('justify-content');
    const alignSelect = document.getElementById('align-items');
    const directionSelect = document.getElementById('flex-direction');
    const flexContainer = document.getElementById('flexboxDemo');
    
    if (!flexContainer) return;
    
    function updateFlexbox() {
        if (justifySelect) flexContainer.style.justifyContent = justifySelect.value;
        if (alignSelect) flexContainer.style.alignItems = alignSelect.value;
        if (directionSelect) flexContainer.style.flexDirection = directionSelect.value;
    }
    
    if (justifySelect) justifySelect.addEventListener('change', updateFlexbox);
    if (alignSelect) alignSelect.addEventListener('change', updateFlexbox);
    if (directionSelect) directionSelect.addEventListener('change', updateFlexbox);
    
    // Initial setup
    updateFlexbox();
}

// Animation Trigger Function
function triggerAnimations() {
    const animationCards = document.querySelectorAll('.animation-card');
    
    animationCards.forEach((card, index) => {
        card.style.animation = 'none';
        
        setTimeout(() => {
            switch(index) {
                case 0: // Hover scale effect
                    card.style.animation = 'scaleAnimation 0.5s ease-in-out';
                    break;
                case 1: // Rotation
                    card.style.animation = 'rotateAnimation 1s ease-in-out';
                    break;
                case 2: // Pulse
                    card.style.animation = 'pulseAnimation 1s ease-in-out';
                    break;
                case 3: // Slide
                    card.style.animation = 'slideAnimation 0.8s ease-out';
                    break;
            }
        }, index * 200);
    });
}

// Animation Demos Initialization
function initAnimationDemos() {
    // Add animation keyframes
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animation-examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-4);
            margin: var(--spacing-6) 0;
        }
        
        .animation-card {
            background: var(--primary-100);
            color: var(--primary-700);
            padding: var(--spacing-6);
            border-radius: 0.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid var(--primary-200);
        }
        
        .animation-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        
        .demo-trigger {
            margin-top: var(--spacing-4);
            background: var(--primary-600);
            color: white;
            border: none;
            padding: var(--spacing-3) var(--spacing-6);
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .demo-trigger:hover {
            background: var(--primary-700);
            transform: translateY(-1px);
        }
        
        @keyframes scaleAnimation {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes rotateAnimation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulseAnimation {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes slideAnimation {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        /* Box Model Demo Styles */
        .box-model-demo {
            margin: var(--spacing-6) 0;
            display: flex;
            justify-content: center;
            padding: var(--spacing-8);
            background: var(--neutral-50);
            border-radius: 0.5rem;
        }
        
        .demo-box {
            position: relative;
            width: 200px;
            height: 100px;
            background: var(--primary-100);
            border: 5px solid var(--primary-600);
            padding: 20px;
            margin: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: var(--primary-700);
        }
        
        .demo-box::before {
            content: '';
            position: absolute;
            top: -35px;
            left: -35px;
            right: -35px;
            bottom: -35px;
            border: 2px dashed var(--warning-500);
            pointer-events: none;
        }
        
        /* Flexbox Demo Styles */
        .demo-controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-4);
            margin-bottom: var(--spacing-6);
            padding: var(--spacing-4);
            background: var(--neutral-50);
            border-radius: 0.5rem;
        }
        
        .control-group {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-2);
        }
        
        .control-group label {
            font-weight: 500;
            color: var(--neutral-700);
            font-size: 0.875rem;
        }
        
        .control-group select {
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--neutral-300);
            border-radius: 0.375rem;
            background: white;
            font-size: 0.875rem;
        }
        
        .flexbox-container {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--neutral-100);
            border: 2px dashed var(--primary-300);
            border-radius: 0.5rem;
            height: 200px;
            margin: var(--spacing-4) 0;
            transition: all 0.3s ease;
        }
        
        .flex-item {
            background: var(--primary-600);
            color: white;
            padding: var(--spacing-4);
            margin: var(--spacing-2);
            border-radius: 0.375rem;
            font-weight: 600;
            min-width: 60px;
            text-align: center;
            box-shadow: var(--shadow-sm);
        }
        
        /* CSS Grid Demo Styles */
        .css-grid-container {
            display: grid;
            grid-template-columns: 200px 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                "header header"
                "sidebar main"
                "footer footer";
            gap: 1rem;
            height: 300px;
            border: 2px dashed var(--primary-300);
            padding: var(--spacing-4);
            border-radius: 0.5rem;
            margin: var(--spacing-6) 0;
        }
        
        .grid-item {
            background: var(--primary-100);
            color: var(--primary-700);
            padding: var(--spacing-4);
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            border: 1px solid var(--primary-300);
        }
        
        .grid-item.header { grid-area: header; }
        .grid-item.sidebar { grid-area: sidebar; }
        .grid-item.main { grid-area: main; }
        .grid-item.footer { grid-area: footer; }
        
        /* Responsive Grid Demo */
        @media (max-width: 768px) {
            .css-grid-container {
                grid-template-columns: 1fr;
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "footer";
                height: auto;
            }
            
            .demo-controls {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(animationStyles);
}

// Theme Switcher Demo
function initThemeSwitcher() {
    const themePreview = document.getElementById('themePreview');
    if (!themePreview) return;
    
    // Add theme styles
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-controls {
            display: flex;
            gap: var(--spacing-3);
            margin-bottom: var(--spacing-6);
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .theme-btn {
            background: var(--neutral-200);
            color: var(--neutral-700);
            border: none;
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        
        .theme-btn:hover {
            background: var(--neutral-300);
            transform: translateY(-1px);
        }
        
        .theme-btn.active {
            background: var(--primary-600);
            color: white;
        }
        
        .theme-preview {
            border: 1px solid var(--neutral-300);
            border-radius: 0.5rem;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .preview-header {
            padding: var(--spacing-4);
            font-weight: 600;
            border-bottom: 1px solid;
        }
        
        .preview-content {
            padding: var(--spacing-6);
        }
        
        .preview-content h4 {
            margin-bottom: var(--spacing-3);
        }
        
        .preview-content p {
            margin-bottom: var(--spacing-4);
            line-height: 1.5;
        }
        
        .preview-button {
            padding: var(--spacing-2) var(--spacing-4);
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .preview-button:hover {
            transform: translateY(-1px);
        }
        
        /* Theme Variables */
        .theme-preview[data-theme="light"] {
            --theme-bg: #ffffff;
            --theme-text: #374151;
            --theme-header-bg: #f3f4f6;
            --theme-border: #e5e7eb;
            --theme-button-bg: #3b82f6;
            --theme-button-text: #ffffff;
        }
        
        .theme-preview[data-theme="dark"] {
            --theme-bg: #1f2937;
            --theme-text: #f3f4f6;
            --theme-header-bg: #111827;
            --theme-border: #374151;
            --theme-button-bg: #6366f1;
            --theme-button-text: #ffffff;
        }
        
        .theme-preview[data-theme="blue"] {
            --theme-bg: #eff6ff;
            --theme-text: #1e40af;
            --theme-header-bg: #dbeafe;
            --theme-border: #93c5fd;
            --theme-button-bg: #2563eb;
            --theme-button-text: #ffffff;
        }
        
        .theme-preview {
            background-color: var(--theme-bg);
            color: var(--theme-text);
            border-color: var(--theme-border);
        }
        
        .theme-preview .preview-header {
            background-color: var(--theme-header-bg);
            border-color: var(--theme-border);
        }
        
        .theme-preview .preview-button {
            background-color: var(--theme-button-bg);
            color: var(--theme-button-text);
        }
    `;
    document.head.appendChild(themeStyles);
    
    // Set initial theme
    setTheme('light');
}

function setTheme(theme) {
    const themePreview = document.getElementById('themePreview');
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    if (themePreview) {
        themePreview.setAttribute('data-theme', theme);
    }
    
    // Update active button
    themeButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = Array.from(themeButtons).find(btn => 
        btn.textContent.toLowerCase().includes(theme)
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Responsive breakpoint visualization
document.addEventListener('DOMContentLoaded', function() {
    const breakpointStyles = document.createElement('style');
    breakpointStyles.textContent = `
        .breakpoint-visualization {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-4);
            margin: var(--spacing-6) 0;
        }
        
        .breakpoint {
            padding: var(--spacing-6);
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .breakpoint.mobile {
            background: var(--accent-100);
            color: var(--accent-700);
        }
        
        .breakpoint.tablet {
            background: var(--warning-100);
            color: var(--warning-700);
        }
        
        .breakpoint.desktop {
            background: var(--primary-100);
            color: var(--primary-700);
        }
        
        .breakpoint:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .breakpoint small {
            display: block;
            margin-top: var(--spacing-2);
            font-weight: 400;
            opacity: 0.8;
        }
        
        /* Highlight current breakpoint */
        @media (max-width: 767px) {
            .breakpoint.mobile {
                border-color: var(--accent-500);
                box-shadow: var(--shadow-md);
                transform: scale(1.05);
            }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
            .breakpoint.tablet {
                border-color: var(--warning-500);
                box-shadow: var(--shadow-md);
                transform: scale(1.05);
            }
        }
        
        @media (min-width: 1024px) {
            .breakpoint.desktop {
                border-color: var(--primary-500);
                box-shadow: var(--shadow-md);
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(breakpointStyles);
});

// CSS Grid Interactive Demo
document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            // Highlight clicked grid area
            gridItems.forEach(g => g.style.background = '');
            this.style.background = 'var(--primary-200)';
            this.style.borderColor = 'var(--primary-500)';
            
            // Show grid area info
            const area = this.style.gridArea || this.className.split(' ')[1];
            showNotification(`Grid Area: ${area}`, 'info');
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.style.background = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
});

// Enhanced code example interactions
document.addEventListener('DOMContentLoaded', function() {
    const codeExamples = document.querySelectorAll('.code-example');
    
    codeExamples.forEach(example => {
        // Add "Try it" button for certain examples
        const hasDemo = example.closest('#flexbox') || example.closest('#grid') || example.closest('#animations');
        
        if (hasDemo) {
            const tryButton = document.createElement('button');
            tryButton.textContent = 'Try This Code';
            tryButton.className = 'try-code-btn';
            tryButton.style.cssText = `
                position: absolute;
                top: var(--spacing-2);
                left: var(--spacing-2);
                background: var(--accent-600);
                color: white;
                border: none;
                padding: var(--spacing-1) var(--spacing-2);
                border-radius: 0.25rem;
                font-size: 0.75rem;
                cursor: pointer;
                transition: background var(--transition-fast);
            `;
            
            tryButton.addEventListener('click', function() {
                showNotification('Interactive demo is available above the code example!', 'info');
            });
            
            example.appendChild(tryButton);
        }
    });
});

// CSS property value cycler for demonstrations
function createPropertyCycler(element, property, values, interval = 2000) {
    let currentIndex = 0;
    
    const cycle = () => {
        element.style[property] = values[currentIndex];
        currentIndex = (currentIndex + 1) % values.length;
    };
    
    // Initial value
    cycle();
    
    // Start cycling
    const intervalId = setInterval(cycle, interval);
    
    // Stop cycling on hover
    element.addEventListener('mouseenter', () => clearInterval(intervalId));
    
    return intervalId;
}

// Demo property cycling for visual examples
document.addEventListener('DOMContentLoaded', function() {
    // Animate CSS properties for visual demonstration
    const demoElements = document.querySelectorAll('.animation-card');
    
    if (demoElements.length > 0) {
        // Cycle background colors for demonstration
        setTimeout(() => {
            demoElements.forEach((el, index) => {
                const colors = ['var(--primary-100)', 'var(--secondary-100)', 'var(--accent-100)'];
                createPropertyCycler(el, 'backgroundColor', colors, 3000 + index * 500);
            });
        }, 5000); // Start after 5 seconds
    }
});