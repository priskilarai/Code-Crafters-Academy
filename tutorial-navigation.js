// Tutorial Navigation and Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Copy code functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = 'var(--accent-600)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                showNotification('Failed to copy code to clipboard', 'error');
            });
        });
    });
    
    // Interactive form demo
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Form validation successful! This is just a demo.', 'success');
        });
        
        // Range input live update
        const rangeInput = document.getElementById('demo-range');
        const rangeOutput = document.getElementById('rangeValue');
        
        if (rangeInput && rangeOutput) {
            rangeInput.addEventListener('input', function() {
                rangeOutput.textContent = this.value;
            });
        }
        
        // Color picker preview
        const colorInput = document.getElementById('demo-color');
        if (colorInput) {
            colorInput.addEventListener('input', function() {
                const preview = document.createElement('div');
                preview.style.cssText = `
                    width: 2rem;
                    height: 2rem;
                    background: ${this.value};
                    border-radius: 0.25rem;
                    border: 1px solid var(--neutral-300);
                    margin-top: 0.5rem;
                `;
                
                // Remove existing preview
                const existingPreview = this.parentNode.querySelector('.color-preview');
                if (existingPreview) {
                    existingPreview.remove();
                }
                
                preview.className = 'color-preview';
                this.parentNode.appendChild(preview);
            });
        }
    }
    
    // Syntax highlighting for code blocks
    function addSyntaxHighlighting() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            let html = block.innerHTML;
            
            // Basic syntax highlighting
            html = html.replace(/(&lt;[^&]*&gt;)/g, '<span style="color: #e06c75;">$1</span>'); // Tags
            html = html.replace(/(="[^"]*")/g, '<span style="color: #98c379;">$1</span>'); // Attributes
            html = html.replace(/(&lt;!DOCTYPE[^&]*&gt;)/g, '<span style="color: #c678dd;">$1</span>'); // Doctype
            
            block.innerHTML = html;
        });
    }
    
    addSyntaxHighlighting();
    
    // Smooth scroll for tutorial navigation
    const tutorialLinks = document.querySelectorAll('.tutorial-link[href^="#"]');
    
    tutorialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                tutorialLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Collapsible sections for mobile
    function createCollapsibleSections() {
        if (window.innerWidth <= 768) {
            const sections = document.querySelectorAll('.tutorial-section');
            
            sections.forEach(section => {
                const heading = section.querySelector('h2');
                if (heading && !heading.hasAttribute('data-collapsible')) {
                    heading.style.cursor = 'pointer';
                    heading.style.borderBottom = '2px solid var(--primary-600)';
                    heading.setAttribute('data-collapsible', 'true');
                    
                    const content = section.querySelector('h2 ~ *');
                    if (content) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'collapsible-content';
                        
                        // Move all content after h2 into wrapper
                        let nextElement = heading.nextElementSibling;
                        while (nextElement) {
                            const current = nextElement;
                            nextElement = nextElement.nextElementSibling;
                            wrapper.appendChild(current);
                        }
                        
                        section.appendChild(wrapper);
                        
                        heading.addEventListener('click', function() {
                            wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
                            
                            const arrow = heading.querySelector('.collapse-arrow');
                            if (!arrow) {
                                const arrowEl = document.createElement('span');
                                arrowEl.className = 'collapse-arrow';
                                arrowEl.innerHTML = ' ▼';
                                arrowEl.style.transition = 'transform 0.2s ease';
                                heading.appendChild(arrowEl);
                            } else {
                                arrow.style.transform = wrapper.style.display === 'none' ? 'rotate(-90deg)' : 'rotate(0deg)';
                            }
                        });
                    }
                }
            });
        }
    }
    
    // Initialize collapsible sections on mobile
    createCollapsibleSections();
    
    // Re-initialize on resize
    window.addEventListener('resize', function() {
        // Remove existing collapsible functionality
        const collapsibleHeadings = document.querySelectorAll('[data-collapsible]');
        collapsibleHeadings.forEach(heading => {
            heading.removeAttribute('data-collapsible');
            heading.style.cursor = '';
            const arrow = heading.querySelector('.collapse-arrow');
            if (arrow) arrow.remove();
        });
        
        createCollapsibleSections();
    });
});

// Code example interaction enhancements
document.addEventListener('DOMContentLoaded', function() {
    const codeExamples = document.querySelectorAll('.code-example');
    
    codeExamples.forEach((example, index) => {
        // Add line numbers
        const pre = example.querySelector('pre');
        if (pre) {
            const code = pre.querySelector('code');
            const lines = code.textContent.split('\n');
            
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'line-numbers';
            lineNumbers.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                padding: var(--spacing-4);
                color: var(--neutral-500);
                font-family: 'Fira Code', monospace;
                font-size: 0.875rem;
                line-height: 1.5;
                border-right: 1px solid var(--neutral-700);
                background: var(--neutral-800);
                user-select: none;
            `;
            
            lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('<br>');
            
            // Adjust pre padding for line numbers
            pre.style.paddingLeft = '3rem';
            example.style.position = 'relative';
            example.insertBefore(lineNumbers, pre);
        }
        
        // Add expand/collapse for long code blocks
        if (code.textContent.split('\n').length > 15) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'code-toggle';
            toggleBtn.textContent = 'Show More';
            toggleBtn.style.cssText = `
                position: absolute;
                bottom: 0.5rem;
                right: 0.5rem;
                background: var(--neutral-700);
                color: white;
                border: none;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                cursor: pointer;
                z-index: 10;
            `;
            
            pre.style.maxHeight = '300px';
            pre.style.overflow = 'hidden';
            
            toggleBtn.addEventListener('click', function() {
                if (pre.style.maxHeight === 'none') {
                    pre.style.maxHeight = '300px';
                    this.textContent = 'Show More';
                } else {
                    pre.style.maxHeight = 'none';
                    this.textContent = 'Show Less';
                }
            });
            
            example.appendChild(toggleBtn);
        }
    });
});t