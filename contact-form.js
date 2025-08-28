// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateForm() {
        let isValid = true;
        
        // Clear all errors first
        clearAllErrors();
        
        // Validate required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField && emailField.value && !validateEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !validateEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = 'var(--error-500)';
        
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        errorEl.style.cssText = `
            color: var(--error-500);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorEl);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function clearAllErrors() {
        const errors = contactForm.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
        
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm() {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
            transform: translateX(100%);
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-500)';
        } else {
            notification.style.backgroundColor = 'var(--error-500)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
});

// Form Enhancement: Auto-save to localStorage
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    const STORAGE_KEY = 'codecrafters-contact-form';
    
    // Load saved form data
    function loadFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = contactForm.querySelector(`[name="${key}"]`);
                    if (field) {
                        if (field.type === 'checkbox') {
                            field.checked = data[key];
                        } else {
                            field.value = data[key];
                        }
                    }
                });
            } catch (e) {
                console.warn('Could not load saved form data');
            }
        }
    }
    
    // Save form data
    function saveFormData() {
        const formData = {};
        formFields.forEach(field => {
            if (field.name) {
                formData[field.name] = field.type === 'checkbox' ? field.checked : field.value;
            }
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    
    // Auto-save on input
    formFields.forEach(field => {
        field.addEventListener('input', saveFormData);
        field.addEventListener('change', saveFormData);
    });
    
    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        setTimeout(() => {
            localStorage.removeItem(STORAGE_KEY);
        }, 2000);
    });
    
    // Load saved data on page load
    loadFormData();
});

// Form accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add ARIA attributes for better accessibility
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.setAttribute('aria-required', 'true');
        
        const label = form.querySelector(`label[for="${field.id}"]`);
        if (label && !label.textContent.includes('*')) {
            label.innerHTML = label.innerHTML.replace(/\s*\*?\s*$/, ' <span style="color: var(--error-500);">*</span>');
        }
    });
    
    // Add character counter for textarea
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        messageField.setAttribute('maxlength', maxLength);
        
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--neutral-500);
            margin-top: 0.25rem;
        `;
        
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${messageField.value.length}/${maxLength} characters`;
            
            if (remaining < 100) {
                counter.style.color = 'var(--warning-500)';
            } else {
                counter.style.color = 'var(--neutral-500)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        messageField.parentNode.appendChild(counter);
        updateCounter();
    }
});