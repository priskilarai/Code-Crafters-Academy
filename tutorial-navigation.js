// Fixed JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code') || 
                         this.parentElement.nextElementSibling.textContent;
            
            copyToClipboard(code).then(() => {
                // Visual feedback for successful copy
                const originalText = this.innerHTML;
                this.innerHTML = ' Copied!';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.innerHTML = ' Failed';
                
                setTimeout(() => {
                    this.innerHTML = ' Copy Code';
                }, 2000);
            });
        });
    });
    
    // Interactive form demo - only if form exists
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
                let preview = this.parentNode.querySelector('.color-preview');
                
                if (!preview) {
                    preview = document.createElement('div');
                    preview.className = 'color-preview';
                    preview.style.cssText = `
                        width: 2rem;
                        height: 2rem;
                        border-radius: 0.25rem;
                        border: 1px solid var(--neutral-300);
                        margin-top: 0.5rem;
                    `;
                    this.parentNode.appendChild(preview);
                }
                
                preview.style.background = this.value;
            });
        }
    }
    
    // Syntax highlighting for code blocks
    function addSyntaxHighlighting() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            let html = block.innerHTML;
            
            // Basic syntax highlighting
            html = html.replace(/(<!DOCTYPE[^&]*>)/g, '$1');
            html = html.replace(/(<\/?[a-zA-Z0-9\-]+)/g, '$1');
            html = html.replace(/(>)/g, '$1');
            html = html.replace(/([a-zA-Z\-]+=)/g, '$1');
            html = html.replace(/("[^"]*")/g, '$1');
            html = html.replace(/(<!--[^&]*-->)/g, '$1');
            
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
                    heading.setAttribute('data-collapsible', 'true');
                    
                    // Create wrapper for content
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
                    
                    // Add arrow indicator
                    const arrow = document.createElement('span');
                    arrow.className = 'collapse-arrow';
                    arrow.innerHTML = ' ▼';
                    arrow.style.transition = 'transform 0.2s ease';
                    heading.appendChild(arrow);
                    
                    heading.addEventListener('click', function() {
                        const isHidden = wrapper.style.display === 'none';
                        wrapper.style.display = isHidden ? 'block' : 'none';
                        arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
                    });
                    
                    // Initially collapse content on mobile
                    wrapper.style.display = 'none';
                    arrow.style.transform = 'rotate(-90deg)';
                }
            });
        } else {
            // Ensure all content is visible on larger screens
            const wrappers = document.querySelectorAll('.collapsible-content');
            wrappers.forEach(wrapper => {
                wrapper.style.display = 'block';
            });
            
            const arrows = document.querySelectorAll('.collapse-arrow');
            arrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        }
    }
    
    // Initialize collapsible sections
    createCollapsibleSections();
    
    // Re-initialize on resize
    window.addEventListener('resize', createCollapsibleSections);
});

// Modern clipboard API function
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (fallbackErr) {
            document.body.removeChild(textArea);
            throw fallbackErr;
        }
    }
}

// Code example interaction enhancements
document.addEventListener('DOMContentLoaded', function() {
    const codeExamples = document.querySelectorAll('.code-example');
    
    codeExamples.forEach((example, index) => {
        
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
});