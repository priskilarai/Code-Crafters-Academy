// Accessibility Demo Scripts
document.addEventListener('DOMContentLoaded', function() {
    initAccessibleAccordion();
    initKeyboardDemo();
    initFocusTracking();
    addAccessibilityStyles();
});

// Accessible Accordion Implementation
function initAccessibleAccordion() {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const panel = document.getElementById(this.getAttribute('aria-controls'));
            
            // Close all other panels
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== this) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                    if (otherPanel) {
                        otherPanel.hidden = true;
                    }
                }
            });
            
            // Toggle current panel
            this.setAttribute('aria-expanded', !isExpanded);
            if (panel) {
                panel.hidden = isExpanded;
            }
        });
        
        // Keyboard support
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Live Region Demo
function updateLiveRegion() {
    const liveRegion = document.getElementById('statusRegion');
    const statuses = [
        'Status: Loading...',
        'Status: Processing data...',
        'Status: Complete!',
        'Status: Ready'
    ];
    
    const currentStatus = liveRegion.textContent;
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    liveRegion.textContent = statuses[nextIndex];
    
    // Visual feedback
    liveRegion.style.background = 'var(--accent-100)';
    liveRegion.style.borderColor = 'var(--accent-500)';
    
    setTimeout(() => {
        liveRegion.style.background = '';
        liveRegion.style.borderColor = '';
    }, 1000);
}

// Keyboard Navigation Demo
function initKeyboardDemo() {
    const keyboardElements = document.querySelectorAll('.keyboard-elements *');
    const focusIndicator = document.getElementById('focusIndicator');
    
    keyboardElements.forEach(element => {
        element.addEventListener('focus', function() {
            const elementType = this.tagName.toLowerCase();
            const elementText = this.textContent || this.placeholder || this.getAttribute('aria-label') || 'Element';
            
            if (focusIndicator) {
                focusIndicator.innerHTML = `
                    <strong>Focused:</strong> ${elementType.toUpperCase()} - "${elementText}"
                `;
                focusIndicator.style.background = 'var(--primary-100)';
                focusIndicator.style.borderColor = 'var(--primary-500)';
            }
        });
        
        element.addEventListener('blur', function() {
            if (focusIndicator) {
                focusIndicator.style.background = '';
                focusIndicator.style.borderColor = '';
            }
        });
    });
}

// Custom Button Keyboard Handling
function handleCustomButtonKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCustomButtonClick();
    }
}

function handleCustomButtonClick() {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    showNotification('Custom button activated! This demonstrates proper keyboard support.', 'success');
}

// Focus Tracking for Demo
function initFocusTracking() {
    let focusHistory = [];
    
    document.addEventListener('focusin', function(e) {
        const element = e.target;
        const elementInfo = {
            tag: element.tagName.toLowerCase(),
            id: element.id || 'no-id',
            class: element.className || 'no-class',
            text: element.textContent?.substring(0, 30) || element.placeholder || 'no-text',
            timestamp: new Date().toLocaleTimeString()
        };
        
        focusHistory.push(elementInfo);
        
        // Keep only last 10 focus events
        if (focusHistory.length > 10) {
            focusHistory.shift();
        }
        
        // Update focus indicator if it exists
        const focusIndicator = document.getElementById('focusIndicator');
        if (focusIndicator && element.closest('.keyboard-elements')) {
            focusIndicator.innerHTML = `
                <strong>Currently focused:</strong> ${elementInfo.tag} - "${elementInfo.text}"
                <br><small>Use Tab/Shift+Tab to navigate, Enter/Space to activate</small>
            `;
        }
    });
}

// Accessibility Audit Function
function runAccessibilityAudit() {
    const auditResults = document.getElementById('auditResults');
    if (!auditResults) return;
    
    auditResults.innerHTML = '<div class="audit-loading">Running accessibility audit...</div>';
    
    setTimeout(() => {
        const results = performBasicAudit();
        displayAuditResults(results);
    }, 2000);
}

function performBasicAudit() {
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    
    if (imagesWithoutAlt.length === 0) {
        results.passed.push('All images have alt text');
    } else {
        results.failed.push(`${imagesWithoutAlt.length} images missing alt text`);
    }
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
        results.passed.push('Page has proper heading structure');
    } else {
        results.warnings.push('No headings found on page');
    }
    
    // Check for form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    const inputsWithoutLabels = Array.from(inputs).filter(input => {
        const id = input.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');
        
        return !label && !ariaLabel && !ariaLabelledby;
    });
    
    if (inputsWithoutLabels.length === 0) {
        results.passed.push('All form inputs have proper labels');
    } else {
        results.failed.push(`${inputsWithoutLabels.length} form inputs missing labels`);
    }
    
    // Check for focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    if (focusableElements.length > 0) {
        results.passed.push('Page has focusable elements');
    }
    
    // Check for ARIA landmarks
    const landmarks = document.querySelectorAll('main, nav, header, footer, aside, section[aria-label], [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]');
    if (landmarks.length >= 3) {
        results.passed.push('Page has proper landmark structure');
    } else {
        results.warnings.push('Consider adding more ARIA landmarks');
    }
    
    return results;
}

function displayAuditResults(results) {
    const auditResults = document.getElementById('auditResults');
    
    const totalIssues = results.failed.length + results.warnings.length;
    const score = Math.max(0, 100 - (results.failed.length * 20) - (results.warnings.length * 10));
    
    auditResults.innerHTML = `
        <div class="audit-summary">
            <h4>Accessibility Score: ${score}/100</h4>
            <div class="score-bar">
                <div class="score-fill" style="width: ${score}%; background: ${score >= 80 ? 'var(--accent-500)' : score >= 60 ? 'var(--warning-500)' : 'var(--error-500)'}"></div>
            </div>
        </div>
        
        <div class="audit-details">
            <div class="audit-section passed">
                <h5>✅ Passed (${results.passed.length})</h5>
                <ul>
                    ${results.passed.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            ${results.failed.length > 0 ? `
                <div class="audit-section failed">
                    <h5>❌ Failed (${results.failed.length})</h5>
                    <ul>
                        ${results.failed.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${results.warnings.length > 0 ? `
                <div class="audit-section warnings">
                    <h5>⚠️ Warnings (${results.warnings.length})</h5>
                    <ul>
                        ${results.warnings.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
        
        <div class="audit-recommendations">
            <h5>Recommendations</h5>
            <ul>
                <li>Test with actual screen readers</li>
                <li>Verify keyboard navigation works completely</li>
                <li>Check color contrast ratios</li>
                <li>Validate HTML markup</li>
                <li>Test with users who have disabilities</li>
            </ul>
        </div>
    `;
}

// Add Accessibility Demo Styles
function addAccessibilityStyles() {
    const accessibilityStyles = document.createElement('style');
    accessibilityStyles.textContent = `
        /* Accessibility Demo Styles */
        .accessibility-stats {
            margin: var(--spacing-8) 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-6);
            margin-top: var(--spacing-6);
        }
        
        .stat-card {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            text-align: center;
            transition: all var(--transition-fast);
        }
        
        .stat-card:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-sm);
        }
        
        .stat-number {
            display: block;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-600);
            margin-bottom: var(--spacing-2);
        }
        
        .stat-label {
            color: var(--neutral-600);
            font-size: 0.95rem;
        }
        
        /* WCAG Principles */
        .principle-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-6);
            margin: var(--spacing-8) 0;
        }
        
        .principle-card {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            text-align: center;
            transition: all var(--transition-fast);
        }
        
        .principle-card:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-md);
        }
        
        .principle-icon {
            font-size: 2.5rem;
            margin-bottom: var(--spacing-4);
        }
        
        .principle-card h3 {
            margin-bottom: var(--spacing-3);
            color: var(--primary-600);
        }
        
        .principle-card p {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-600);
        }
        
        .principle-card ul {
            list-style: none;
            text-align: left;
        }
        
        .principle-card li {
            margin-bottom: var(--spacing-2);
            padding-left: var(--spacing-4);
            position: relative;
            color: var(--neutral-600);
            font-size: 0.9rem;
        }
        
        .principle-card li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary-500);
            font-weight: bold;
        }
        
        /* Semantic Comparison */
        .comparison-examples {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-8);
            margin: var(--spacing-6) 0;
        }
        
        .example-bad,
        .example-good {
            background: white;
            border: 1px solid;
            border-radius: 0.5rem;
            padding: var(--spacing-6);
        }
        
        .example-bad {
            border-color: var(--error-300);
        }
        
        .example-good {
            border-color: var(--accent-300);
        }
        
        .example-bad h4 {
            color: var(--error-600);
            margin-bottom: var(--spacing-4);
        }
        
        .example-good h4 {
            color: var(--accent-600);
            margin-bottom: var(--spacing-4);
        }
        
        .example-note {
            margin-top: var(--spacing-4);
            font-size: 0.9rem;
            font-style: italic;
        }
        
        .example-bad .example-note {
            color: var(--error-600);
        }
        
        .example-good .example-note {
            color: var(--accent-600);
        }
        
        /* ARIA Examples */
        .aria-examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-8);
            margin: var(--spacing-6) 0;
        }
        
        .aria-example {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
        }
        
        .aria-example h4 {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-800);
        }
        
        /* Accessible Accordion */
        .accessible-accordion {
            border: 1px solid var(--neutral-300);
            border-radius: 0.5rem;
            overflow: hidden;
        }
        
        .accordion-trigger {
            width: 100%;
            background: var(--neutral-50);
            border: none;
            border-bottom: 1px solid var(--neutral-300);
            padding: var(--spacing-4);
            text-align: left;
            cursor: pointer;
            font-weight: 500;
            transition: all var(--transition-fast);
            position: relative;
        }
        
        .accordion-trigger:hover {
            background: var(--neutral-100);
        }
        
        .accordion-trigger:focus {
            outline: 2px solid var(--primary-500);
            outline-offset: -2px;
            background: var(--primary-50);
        }
        
        .accordion-trigger::after {
            content: '+';
            position: absolute;
            right: var(--spacing-4);
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.25rem;
            transition: transform var(--transition-fast);
        }
        
        .accordion-trigger[aria-expanded="true"]::after {
            transform: translateY(-50%) rotate(45deg);
        }
        
        .accordion-panel {
            padding: var(--spacing-4);
            background: white;
            border-bottom: 1px solid var(--neutral-300);
        }
        
        .accordion-panel:last-child {
            border-bottom: none;
        }
        
        .accordion-panel p {
            margin: 0;
            line-height: 1.6;
            color: var(--neutral-600);
        }
        
        /* Live Region */
        .live-region-demo {
            text-align: center;
            margin: var(--spacing-4) 0;
        }
        
        .live-region {
            background: var(--neutral-100);
            border: 2px solid var(--neutral-300);
            border-radius: 0.5rem;
            padding: var(--spacing-4);
            margin-top: var(--spacing-4);
            font-weight: 500;
            transition: all var(--transition-base);
        }
        
        /* Keyboard Demo */
        .keyboard-test-area {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .keyboard-elements {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-4);
            margin: var(--spacing-6) 0;
            justify-content: center;
        }
        
        .keyboard-btn,
        .keyboard-link,
        .keyboard-input,
        .keyboard-select,
        .custom-button {
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            transition: all var(--transition-fast);
        }
        
        .keyboard-btn {
            background: var(--primary-600);
            color: white;
            border: none;
            cursor: pointer;
        }
        
        .keyboard-btn:focus {
            outline: 2px solid var(--primary-300);
            outline-offset: 2px;
        }
        
        .keyboard-link {
            background: var(--secondary-100);
            color: var(--secondary-700);
            text-decoration: none;
            display: inline-block;
        }
        
        .keyboard-link:focus {
            outline: 2px solid var(--secondary-500);
            outline-offset: 2px;
        }
        
        .keyboard-input,
        .keyboard-select {
            border: 1px solid var(--neutral-300);
            background: white;
        }
        
        .keyboard-input:focus,
        .keyboard-select:focus {
            outline: 2px solid var(--primary-500);
            outline-offset: 2px;
            border-color: var(--primary-500);
        }
        
        .custom-button {
            background: var(--accent-100);
            color: var(--accent-700);
            border: 1px solid var(--accent-300);
            cursor: pointer;
            user-select: none;
        }
        
        .custom-button:focus {
            outline: 2px solid var(--accent-500);
            outline-offset: 2px;
            background: var(--accent-200);
        }
        
        .focus-indicator {
            background: var(--neutral-100);
            border: 2px solid var(--neutral-300);
            border-radius: 0.5rem;
            padding: var(--spacing-4);
            margin-top: var(--spacing-6);
            text-align: center;
            font-size: 0.9rem;
            transition: all var(--transition-base);
        }
        
        /* Testing Tools */
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .tool-card {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            transition: all var(--transition-fast);
        }
        
        .tool-card:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-sm);
        }
        
        .tool-card h4 {
            margin-bottom: var(--spacing-3);
            color: var(--primary-600);
        }
        
        .tool-card p {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-600);
            line-height: 1.5;
        }
        
        .tool-features {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-2);
        }
        
        .feature {
            background: var(--primary-100);
            color: var(--primary-700);
            padding: var(--spacing-1) var(--spacing-2);
            border-radius: 0.25rem;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        /* Accessibility Audit */
        .accessibility-audit {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin-top: var(--spacing-8);
            text-align: center;
        }
        
        .audit-results {
            margin-top: var(--spacing-6);
            text-align: left;
        }
        
        .audit-loading {
            text-align: center;
            color: var(--neutral-600);
            font-style: italic;
        }
        
        .audit-summary {
            text-align: center;
            margin-bottom: var(--spacing-6);
        }
        
        .audit-summary h4 {
            margin-bottom: var(--spacing-3);
            color: var(--neutral-800);
        }
        
        .score-bar {
            background: var(--neutral-200);
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin: 0 auto;
            max-width: 300px;
        }
        
        .score-fill {
            height: 100%;
            transition: width 1s ease-out;
        }
        
        .audit-section {
            margin-bottom: var(--spacing-6);
        }
        
        .audit-section h5 {
            margin-bottom: var(--spacing-3);
            font-size: 1.1rem;
        }
        
        .audit-section.passed h5 {
            color: var(--accent-600);
        }
        
        .audit-section.failed h5 {
            color: var(--error-600);
        }
        
        .audit-section.warnings h5 {
            color: var(--warning-600);
        }
        
        .audit-section ul {
            list-style: none;
            margin-left: var(--spacing-4);
        }
        
        .audit-section li {
            margin-bottom: var(--spacing-2);
            padding-left: var(--spacing-4);
            position: relative;
            line-height: 1.4;
        }
        
        .audit-section.passed li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-500);
        }
        
        .audit-section.failed li::before {
            content: '✗';
            position: absolute;
            left: 0;
            color: var(--error-500);
        }
        
        .audit-section.warnings li::before {
            content: '!';
            position: absolute;
            left: 0;
            color: var(--warning-500);
        }
        
        .audit-recommendations {
            background: var(--neutral-50);
            border-radius: 0.5rem;
            padding: var(--spacing-4);
            margin-top: var(--spacing-6);
        }
        
        .audit-recommendations h5 {
            margin-bottom: var(--spacing-3);
            color: var(--neutral-800);
        }
        
        .audit-recommendations ul {
            list-style: none;
        }
        
        .audit-recommendations li {
            margin-bottom: var(--spacing-2);
            padding-left: var(--spacing-4);
            position: relative;
        }
        
        .audit-recommendations li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--primary-500);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .comparison-examples {
                grid-template-columns: 1fr;
            }
            
            .aria-examples {
                grid-template-columns: 1fr;
            }
            
            .keyboard-elements {
                flex-direction: column;
                align-items: center;
            }
            
            .keyboard-elements > * {
                width: 100%;
                max-width: 300px;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(accessibilityStyles);
}

// Enhanced focus management
document.addEventListener('DOMContentLoaded', function() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-600);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        z-index: 1000;
        transition: top 0.2s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
});