// Tutorial Filter and Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('tutorialSearch');
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    let currentCategory = 'all';
    let currentSearchTerm = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase();
            filterTutorials();
        });
    }
    
    // Category filter functionality
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.getAttribute('data-category');
            filterTutorials();
        });
    });
    
    function filterTutorials() {
        tutorialCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTags = card.getAttribute('data-tags') || '';
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            
            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = currentSearchTerm === '' || 
                cardTitle.includes(currentSearchTerm) || 
                cardDescription.includes(currentSearchTerm) || 
                cardTags.includes(currentSearchTerm);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        const visibleCards = Array.from(tutorialCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const tutorialsGrid = document.getElementById('tutorialsGrid');
        const noResults = document.querySelector('.no-results');
        
        if (visibleCards.length === 0 && !noResults) {
            const noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-results';
            noResultsEl.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--neutral-500);">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem;">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <h3>No tutorials found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            tutorialsGrid.appendChild(noResultsEl);
        } else if (visibleCards.length > 0 && noResults) {
            noResults.remove();
        }
    }
    
    // Filter animations
    function addFilterAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .tutorial-card {
                transition: all 0.3s ease-in-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(1rem);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    addFilterAnimations();
});

// Progress tracking for tutorial sidebar
document.addEventListener('DOMContentLoaded', function() {
    const tutorialLinks = document.querySelectorAll('.tutorial-link');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (tutorialLinks.length === 0) return;
    
    function updateProgress() {
        const sections = document.querySelectorAll('.tutorial-section');
        const viewportHeight = window.innerHeight;
        let visibleSections = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > sectionHeight * 0.3) { // 30% visible threshold
                visibleSections++;
            }
        });
        
        const progress = Math.min((visibleSections / sections.length) * 100, 100);
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            progressText.textContent = Math.round(progress) + '% Complete';
        }
    }
    
    // Update active tutorial link based on scroll position
    function updateActiveTutorialLink() {
        const sections = document.querySelectorAll('.tutorial-section');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom > 200) { // 200px from top
                currentSection = section.id;
            }
        });
        
        tutorialLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#' + currentSection)) {
                tutorialLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                updateActiveTutorialLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calls
    updateProgress();
    updateActiveTutorialLink();
});