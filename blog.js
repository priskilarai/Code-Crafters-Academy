// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initCategoryFilter();
    initSidebarNewsletter();
    initReadingProgress();
});

// Blog Search Functionality
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title-link').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          tags.some(tag => tag.includes(searchTerm));
            
            if (matches || searchTerm === '') {
                post.style.display = 'block';
                post.style.animation = 'fadeInUp 0.4s ease-out';
            } else {
                post.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
        handleNoResults(visiblePosts.length === 0 && searchTerm !== '');
    });
}

// Category Filter
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll('.category-list a');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Update active category
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts (simplified demo)
            blogPosts.forEach(post => {
                const postTags = Array.from(post.querySelectorAll('.tag')).map(tag => 
                    tag.textContent.toLowerCase()
                );
                
                const matches = category === 'all' || postTags.some(tag => 
                    tag.includes(category) || 
                    (category === 'tutorials' && (tag.includes('css') || tag.includes('javascript') || tag.includes('html'))) ||
                    (category === 'tips' && tag.includes('performance')) ||
                    (category === 'news' && tag.includes('trends'))
                );
                
                if (matches) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.4s ease-out';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Sidebar Newsletter
function initSidebarNewsletter() {
    const sidebarForm = document.getElementById('sidebarNewsletter');
    
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Reading Progress Indicator
function initReadingProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 4rem;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-600);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress(); // Initial call
}

// Handle no search results
function handleNoResults(show) {
    const blogMain = document.querySelector('.blog-main');
    const existingNoResults = document.querySelector('.no-results-message');
    
    if (show && !existingNoResults) {
        const noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results-message';
        noResultsEl.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--neutral-500);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem;">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or browse our categories.</p>
            </div>
        `;
        blogMain.appendChild(noResultsEl);
    } else if (!show && existingNoResults) {
        existingNoResults.remove();
    }
}

// Blog post hover effects
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const image = post.querySelector('.post-image img');
        
        post.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        post.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

// Tag cloud interactions
document.addEventListener ('DOMContentLoaded', function() {
    const tagCloudStyles = document.createElement('style');
    tagCloudStyles.textContent = `
        /* Blog Layout */
        .blog-content {
            padding: var(--spacing-20) var(--spacing-4);
        }
        
        .blog-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: var(--spacing-12);
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .blog-main {
            min-width: 0; /* Prevent grid overflow */
        }
        
        /* Featured Post */
        .blog-post.featured {
            margin-bottom: var(--spacing-12);
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--neutral-200);
        }
        
        .blog-post.featured .post-image {
            height: 300px;
            position: relative;
        }
        
        .post-category {
            position: absolute;
            top: var(--spacing-4);
            left: var(--spacing-4);
            background: var(--primary-600);
            color: white;
            padding: var(--spacing-1) var(--spacing-3);
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        /* Regular Blog Posts */
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--spacing-8);
        }
        
        .blog-post {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--neutral-200);
            transition: all var(--transition-base);
        }
        
        .blog-post:hover {
            transform: translateY(-0.25rem);
            box-shadow: var(--shadow-lg);
        }
        
        .post-image {
            height: 200px;
            overflow: hidden;
        }
        
        .post-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-slow);
        }
        
        .post-content {
            padding: var(--spacing-6);
        }
        
        .post-header {
            margin-bottom: var(--spacing-4);
        }
        
        .post-title-link {
            color: var(--neutral-800);
            text-decoration: none;
            font-weight: 600;
            line-height: 1.3;
            transition: color var(--transition-fast);
        }
        
        .post-title-link:hover {
            color: var(--primary-600);
        }
        
        .blog-post.featured .post-title-link {
            font-size: 1.75rem;
        }
        
        .post-meta {
            display: flex;
            gap: var(--spacing-4);
            margin-top: var(--spacing-3);
            font-size: 0.875rem;
            color: var(--neutral-500);
            flex-wrap: wrap;
        }
        
        .post-excerpt {
            line-height: 1.6;
            color: var(--neutral-600);
            margin-bottom: var(--spacing-4);
        }
        
        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-2);
            margin-bottom: var(--spacing-4);
        }
        
        .read-more-btn {
            color: var(--primary-600);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color var(--transition-fast);
        }
        
        .read-more-btn:hover {
            color: var(--primary-700);
            text-decoration: underline;
        }
        
        /* Pagination */
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--spacing-4);
            margin-top: var(--spacing-12);
        }
        
        .pagination-btn {
            background: white;
            color: var(--primary-600);
            border: 1px solid var(--primary-600);
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all var(--transition-fast);
            font-weight: 500;
        }
        
        .pagination-btn:hover:not(:disabled) {
            background: var(--primary-600);
            color: white;
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-info {
            color: var(--neutral-600);
            font-size: 0.95rem;
        }
        
        /* Sidebar Styles */
        .blog-sidebar {
            min-width: 0;
        }
        
        .sidebar-widget {
            background: white;
            padding: var(--spacing-6);
            border-radius: 1rem;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--neutral-200);
            margin-bottom: var(--spacing-6);
        }
        
        .sidebar-widget h3 {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-800);
            font-size: 1.25rem;
        }
        
        .search-widget {
            display: flex;
            gap: var(--spacing-2);
        }
        
        .search-widget input {
            flex: 1;
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--neutral-300);
            border-radius: 0.375rem;
            font-size: 0.95rem;
        }
        
        .search-btn {
            background: var(--primary-600);
            color: white;
            border: none;
            padding: var(--spacing-2);
            border-radius: 0.375rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--transition-fast);
        }
        
        .search-btn:hover {
            background: var(--primary-700);
        }
        
        .category-list {
            list-style: none;
        }
        
        .category-list li {
            margin-bottom: var(--spacing-2);
        }
        
        .category-list a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-2) var(--spacing-3);
            color: var(--neutral-600);
            text-decoration: none;
            border-radius: 0.375rem;
            transition: all var(--transition-fast);
        }
        
        .category-list a:hover,
        .category-list a.active {
            background: var(--primary-100);
            color: var(--primary-700);
        }
        
        .category-list span {
            font-size: 0.875rem;
            color: var(--neutral-500);
        }
        
        .popular-posts {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-4);
        }
        
        .popular-post {
            display: flex;
            gap: var(--spacing-3);
            align-items: flex-start;
        }
        
        .popular-post-image {
            flex-shrink: 0;
            width: 60px;
            height: 60px;
            border-radius: 0.375rem;
            overflow: hidden;
        }
        
        .popular-post-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .popular-post-content h4 {
            margin-bottom: var(--spacing-1);
            font-size: 0.95rem;
            line-height: 1.3;
        }
        
        .popular-post-content a {
            color: var(--neutral-700);
            text-decoration: none;
            transition: color var(--transition-fast);
        }
        
        .popular-post-content a:hover {
            color: var(--primary-600);
        }
        
        .popular-post-content time {
            font-size: 0.8rem;
            color: var(--neutral-500);
        }
        
        .sidebar-newsletter {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-3);
        }
        
        .sidebar-newsletter input {
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--neutral-300);
            border-radius: 0.375rem;
            font-size: 0.95rem;
        }
        
        .sidebar-newsletter .btn {
            padding: var(--spacing-2) var(--spacing-4);
            font-size: 0.95rem;
        }
        
        .tag-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-2);
        }
        
        .cloud-tag {
            background: var(--neutral-100);
            color: var(--neutral-600);
            padding: var(--spacing-1) var(--spacing-3);
            border-radius: 1rem;
            text-decoration: none;
            font-size: 0.875rem;
            transition: all var(--transition-fast);
        }
        
        .cloud-tag:hover {
            background: var(--primary-100);
            color: var(--primary-700);
            transform: translateY(-1px);
        }
        
        /* Responsive Blog Layout */
        @media (max-width: 1024px) {
            .blog-layout {
                grid-template-columns: 1fr;
                gap: var(--spacing-8);
            }
            
            .blog-sidebar {
                order: -1;
            }
            
            .sidebar-widget {
                margin-bottom: var(--spacing-4);
            }
        }
        
        @media (max-width: 768px) {
            .blog-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-post.featured .post-image {
                height: 250px;
            }
            
            .post-meta {
                flex-direction: column;
                gap: var(--spacing-2);
            }
            
            .pagination {
                flex-direction: column;
                gap: var(--spacing-3);
            }
        }
        
        @media (max-width: 480px) {
            .blog-content {
                padding: var(--spacing-12) var(--spacing-3);
            }
            
            .sidebar-widget {
                padding: var(--spacing-4);
            }
            
            .popular-post {
                flex-direction: column;
                text-align: center;
            }
            
            .popular-post-image {
                width: 100%;
                height: 120px;
            }
        }
    `;
    document.head.appendChild(tagCloudStyles);
});

// Sidebar Newsletter Submission
function initSidebarNewsletter() {
    const form = document.getElementById('sidebarNewsletter');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                    emailInput.value = '';
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Enhanced blog interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add reading time calculation
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        const excerpt = post.querySelector('.post-excerpt');
        if (excerpt) {
            const wordCount = excerpt.textContent.split(' ').length;
            const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
            
            const timeElement = post.querySelector('.post-reading-time');
            if (timeElement && readingTime > 0) {
                timeElement.textContent = `${readingTime} min read`;
            }
        }
    });
    
    // Add bookmark functionality
    posts.forEach(post => {
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = '🔖';
        bookmarkBtn.setAttribute('aria-label', 'Bookmark this article');
        bookmarkBtn.style.cssText = `
            position: absolute;
            top: var(--spacing-3);
            right: var(--spacing-3);
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.125rem;
            transition: all var(--transition-fast);
            backdrop-filter: blur(4px);
        `;
        
        bookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.style.background = this.style.background.includes('rgba(59, 130, 246') 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(59, 130, 246, 0.9)';
            
            const isBookmarked = this.style.background.includes('rgba(59, 130, 246');
            showNotification(
                isBookmarked ? 'Article bookmarked!' : 'Bookmark removed',
                'info'
            );
        });
        
        const postImage = post.querySelector('.post-image');
        if (postImage) {
            postImage.style.position = 'relative';
            postImage.appendChild(bookmarkBtn);
        }
    });
});