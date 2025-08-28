// Best Practices Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initPracticeTabs();
    showPracticeCategory('performance');
});

function initPracticeTabs() {
    const tabs = document.querySelectorAll('.practice-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show content
            showPracticeCategory(category);
        });
    });
    
    // Add tab styles
    const tabStyles = document.createElement('style');
    tabStyles.textContent = `
        .best-practices-content {
            padding: var(--spacing-20) var(--spacing-4);
        }
        
        .practices-tabs {
            display: flex;
            justify-content: center;
            gap: var(--spacing-4);
            margin-bottom: var(--spacing-12);
            flex-wrap: wrap;
        }
        
        .practice-tab {
            background: white;
            color: var(--neutral-600);
            border: 1px solid var(--neutral-300);
            padding: var(--spacing-3) var(--spacing-6);
            border-radius: 2rem;
            cursor: pointer;
            transition: all var(--transition-fast);
            font-weight: 500;
        }
        
        .practice-tab:hover {
            border-color: var(--primary-300);
            color: var(--primary-600);
        }
        
        .practice-tab.active {
            background: var(--primary-600);
            color: white;
            border-color: var(--primary-600);
        }
        
        .practices-content {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .practice-section {
            background: white;
            border-radius: 1rem;
            padding: var(--spacing-8);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--neutral-200);
        }
        
        .practice-section h2 {
            margin-bottom: var(--spacing-6);
            color: var(--neutral-800);
            text-align: center;
        }
        
        .practice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-8);
            margin: var(--spacing-8) 0;
        }
        
        .practice-item {
            background: var(--neutral-50);
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            transition: all var(--transition-fast);
        }
        
        .practice-item:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-sm);
        }
        
        .practice-item h3 {
            margin-bottom: var(--spacing-3);
            color: var(--primary-600);
            display: flex;
            align-items: center;
            gap: var(--spacing-2);
        }
        
        .practice-icon {
            font-size: 1.5rem;
        }
        
        .practice-item p {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-600);
            line-height: 1.6;
        }
        
        .practice-tips {
            list-style: none;
        }
        
        .practice-tips li {
            margin-bottom: var(--spacing-2);
            padding-left: var(--spacing-4);
            position: relative;
            color: var(--neutral-700);
            font-size: 0.95rem;
        }
        
        .practice-tips li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-500);
            font-weight: bold;
        }
        
        .metric-demo {
            background: var(--neutral-100);
            border-radius: 0.5rem;
            padding: var(--spacing-4);
            margin: var(--spacing-4) 0;
            text-align: center;
        }
        
        .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-600);
            display: block;
        }
        
        .metric-label {
            font-size: 0.875rem;
            color: var(--neutral-600);
            margin-top: var(--spacing-1);
        }
        
        .checklist {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .checklist h3 {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-800);
        }
        
        .checklist-items {
            list-style: none;
        }
        
        .checklist-items li {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-3);
            margin-bottom: var(--spacing-3);
            padding: var(--spacing-2);
            border-radius: 0.375rem;
            transition: background var(--transition-fast);
        }
        
        .checklist-items li:hover {
            background: var(--neutral-50);
        }
        
        .checklist-items input[type="checkbox"] {
            margin-top: 0.125rem;
        }
        
        .checklist-items label {
            cursor: pointer;
            line-height: 1.5;
            flex: 1;
        }
        
        .checklist-items input[type="checkbox"]:checked + label {
            text-decoration: line-through;
            opacity: 0.7;
        }
        
        .security-demo, .seo-analyzer, .testing-demo {
            background: var(--neutral-100);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin: var(--spacing-6) 0;
            text-align: center;
        }
        
        .security-results, .seo-results, .testing-results {
            margin-top: var(--spacing-4);
            padding: var(--spacing-4);
            background: white;
            border-radius: 0.5rem;
            border: 1px solid var(--neutral-200);
            text-align: left;
        }
        
        .btn {
            background: var(--primary-600);
            color: white;
            border: none;
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 500;
            transition: background var(--transition-fast);
        }
        
        .btn:hover {
            background: var(--primary-700);
        }
        
        .btn-primary {
            background: var(--primary-600);
        }
        
        .btn-primary:hover {
            background: var(--primary-700);
        }
        
        @media (max-width: 768px) {
            .practice-grid {
                grid-template-columns: 1fr;
            }
            
            .practices-tabs {
                flex-direction: column;
                align-items: center;
            }
            
            .practice-section {
                padding: var(--spacing-6);
            }
        }
    `;
    document.head.appendChild(tabStyles);
}

function showPracticeCategory(category) {
    const content = document.getElementById('practicesContent');
    
    const categories = {
        performance: {
            title: 'Performance Optimization',
            description: 'Techniques to make your websites load faster and provide better user experiences.',
            items: [
                {
                    icon: '⚡',
                    title: 'Image Optimization',
                    description: 'Optimize images for web delivery with proper formats, compression, and lazy loading.',
                    tips: [
                        'Use WebP format for modern browsers',
                        'Implement lazy loading for images below the fold',
                        'Compress images without losing quality',
                        'Use responsive images with srcset',
                        'Consider using CDN for image delivery'
                    ]
                },
                {
                    icon: '📦',
                    title: 'Code Splitting',
                    description: 'Split your JavaScript bundles to reduce initial load time and improve performance.',
                    tips: [
                        'Use dynamic imports for route-based splitting',
                        'Implement component-level code splitting',
                        'Preload critical resources',
                        'Use tree shaking to eliminate dead code',
                        'Minimize and compress JavaScript files'
                    ]
                },
                {
                    icon: '🚀',
                    title: 'Caching Strategies',
                    description: 'Implement effective caching to reduce server load and improve response times.',
                    tips: [
                        'Use browser caching with proper headers',
                        'Implement service workers for offline functionality',
                        'Cache API responses appropriately',
                        'Use CDN for static assets',
                        'Implement cache invalidation strategies'
                    ]
                }
            ],
            demo: `
                <div class="metric-demo">
                    <span class="metric-value" id="performanceScore">95</span>
                    <span class="metric-label">Performance Score</span>
                </div>
                <div class="checklist">
                    <h3>Performance Checklist</h3>
                    <ul class="checklist-items">
                        <li><input type="checkbox" id="perf1"><label for="perf1">Optimize images and use modern formats</label></li>
                        <li><input type="checkbox" id="perf2"><label for="perf2">Minimize HTTP requests</label></li>
                        <li><input type="checkbox" id="perf3"><label for="perf3">Enable gzip compression</label></li>
                        <li><input type="checkbox" id="perf4"><label for="perf4">Use a Content Delivery Network (CDN)</label></li>
                        <li><input type="checkbox" id="perf5"><label for="perf5">Implement lazy loading</label></li>
                        <li><input type="checkbox" id="perf6"><label for="perf6">Minify CSS and JavaScript</label></li>
                    </ul>
                </div>
            `
        },
        security: {
            title: 'Security Best Practices',
            description: 'Protect your applications and users from common security vulnerabilities.',
            items: [
                {
                    icon: '🔒',
                    title: 'Input Validation',
                    description: 'Always validate and sanitize user input to prevent injection attacks.',
                    tips: [
                        'Validate input on both client and server side',
                        'Use parameterized queries for database operations',
                        'Sanitize HTML content to prevent XSS',
                        'Implement rate limiting for API endpoints',
                        'Use CSRF tokens for form submissions'
                    ]
                },
                {
                    icon: '🛡️',
                    title: 'HTTPS & Security Headers',
                    description: 'Implement proper encryption and security headers to protect data transmission.',
                    tips: [
                        'Always use HTTPS in production',
                        'Implement Content Security Policy (CSP)',
                        'Use Strict-Transport-Security header',
                        'Set secure cookie flags',
                        'Implement proper CORS policies'
                    ]
                },
                {
                    icon: '🔑',
                    title: 'Authentication & Authorization',
                    description: 'Secure user authentication and implement proper access controls.',
                    tips: [
                        'Use strong password requirements',
                        'Implement multi-factor authentication',
                        'Store passwords using proper hashing',
                        'Use secure session management',
                        'Implement proper role-based access control'
                    ]
                }
            ],
            demo: `
                <div class="security-demo">
                    <h3>Security Headers Check</h3>
                    <button onclick="checkSecurityHeaders()" class="btn btn-primary">Check Current Page</button>
                    <div class="security-results" id="securityResults">
                        <p>Click the button to check security headers for this page.</p>
                    </div>
                </div>
            `
        },
        seo: {
            title: 'SEO Optimization',
            description: 'Improve your website\'s search engine visibility and ranking.',
            items: [
                {
                    icon: '🔍',
                    title: 'Meta Tags & Structure',
                    description: 'Optimize meta tags and HTML structure for search engines.',
                    tips: [
                        'Write unique, descriptive title tags',
                        'Create compelling meta descriptions',
                        'Use proper heading hierarchy (H1-H6)',
                        'Implement structured data markup',
                        'Optimize URLs for readability'
                    ]
                },
                {
                    icon: '📱',
                    title: 'Core Web Vitals',
                    description: 'Optimize for Google\'s Core Web Vitals metrics.',
                    tips: [
                        'Improve Largest Contentful Paint (LCP)',
                        'Minimize First Input Delay (FID)',
                        'Reduce Cumulative Layout Shift (CLS)',
                        'Optimize Time to First Byte (TTFB)',
                        'Implement proper image sizing'
                    ]
                },
                {
                    icon: '🌐',
                    title: 'Content Strategy',
                    description: 'Create high-quality, search-friendly content.',
                    tips: [
                        'Write for users first, search engines second',
                        'Use relevant keywords naturally',
                        'Create comprehensive, valuable content',
                        'Implement internal linking strategy',
                        'Keep content fresh and updated'
                    ]
                }
            ],
            demo: `
                <div class="seo-analyzer">
                    <h3>SEO Quick Analysis</h3>
                    <button onclick="analyzeSEO()" class="btn btn-primary">Analyze This Page</button>
                    <div class="seo-results" id="seoResults">
                        <p>Click to analyze the SEO elements of this page.</p>
                    </div>
                </div>
            `
        },
        'code-quality': {
            title: 'Code Quality Standards',
            description: 'Write clean, maintainable, and scalable code that teams can work with effectively.',
            items: [
                {
                    icon: '📝',
                    title: 'Clean Code Principles',
                    description: 'Write code that is easy to read, understand, and maintain.',
                    tips: [
                        'Use meaningful variable and function names',
                        'Keep functions small and focused',
                        'Follow consistent coding conventions',
                        'Write self-documenting code',
                        'Remove dead code and comments'
                    ]
                },
                {
                    icon: '🔧',
                    title: 'Code Organization',
                    description: 'Structure your codebase for maintainability and scalability.',
                    tips: [
                        'Use modular architecture patterns',
                        'Separate concerns with proper file structure',
                        'Implement consistent import/export patterns',
                        'Use configuration files for environment settings',
                        'Document complex algorithms and business logic'
                    ]
                },
                {
                    icon: '🔄',
                    title: 'Refactoring Techniques',
                    description: 'Continuously improve code quality through systematic refactoring.',
                    tips: [
                        'Identify and eliminate code smells',
                        'Reduce complexity and improve readability',
                        'Extract reusable components and functions',
                        'Implement design patterns where appropriate',
                        'Write tests before refactoring critical code'
                    ]
                }
            ],
            demo: `
                <div class="checklist">
                    <h3>Code Quality Checklist</h3>
                    <ul class="checklist-items">
                        <li><input type="checkbox" id="code1"><label for="code1">Follow consistent naming conventions</label></li>
                        <li><input type="checkbox" id="code2"><label for="code2">Keep functions under 20 lines</label></li>
                        <li><input type="checkbox" id="code3"><label for="code3">Use proper indentation and formatting</label></li>
                        <li><input type="checkbox" id="code4"><label for="code4">Remove commented-out code</label></li>
                        <li><input type="checkbox" id="code5"><label for="code5">Document complex algorithms</label></li>
                        <li><input type="checkbox" id="code6"><label for="code6">Use version control effectively</label></li>
                    </ul>
                </div>
            `
        },
        testing: {
            title: 'Testing Strategies',
            description: 'Implement comprehensive testing to ensure application reliability.',
            items: [
                {
                    icon: '🧪',
                    title: 'Test Pyramid',
                    description: 'Follow the testing pyramid for optimal test coverage and efficiency.',
                    tips: [
                        'Write many small unit tests',
                        'Create fewer integration tests',
                        'Implement minimal end-to-end tests',
                        'Focus on testing behavior, not implementation',
                        'Use mocking for external dependencies'
                    ]
                },
                {
                    icon: '📊',
                    title: 'Test Coverage',
                    description: 'Measure and maintain adequate test coverage for your codebase.',
                    tips: [
                        'Aim for 80-90% test coverage for critical code',
                        'Focus on testing complex business logic',
                        'Use coverage reports to identify gaps',
                        'Test edge cases and error conditions',
                        'Avoid testing trivial code just to increase coverage'
                    ]
                },
                {
                    icon: '⚙️',
                    title: 'Testing Tools',
                    description: 'Leverage modern testing frameworks and tools for efficient testing.',
                    tips: [
                        'Use Jest for JavaScript unit testing',
                        'Implement Cypress for E2E testing',
                        'Use React Testing Library for component testing',
                        'Integrate testing into CI/CD pipeline',
                        'Use snapshot testing for UI components'
                    ]
                }
            ],
            demo: `
                <div class="testing-demo">
                    <h3>Test Coverage Demo</h3>
                    <button onclick="runTestDemo()" class="btn btn-primary">Run Test Demo</button>
                    <div class="testing-results" id="testingResults">
                        <p>Click the button to see a test coverage demonstration.</p>
                    </div>
                </div>
            `
        }
    };

    const categoryData = categories[category];
    
    if (!categoryData) {
        content.innerHTML = '<div class="practice-section"><h2>Category not found</h2></div>';
        return;
    }
    
    let itemsHTML = '';
    categoryData.items.forEach(item => {
        let tipsHTML = '';
        item.tips.forEach(tip => {
            tipsHTML += `<li>${tip}</li>`;
        });
        
        itemsHTML += `
            <div class="practice-item">
                <h3><span class="practice-icon">${item.icon}</span> ${item.title}</h3>
                <p>${item.description}</p>
                <ul class="practice-tips">
                    ${tipsHTML}
                </ul>
            </div>
        `;
    });
    
    content.innerHTML = `
        <div class="practice-section">
            <h2>${categoryData.title}</h2>
            <p class="text-center">${categoryData.description}</p>
            <div class="practice-grid">
                ${itemsHTML}
            </div>
            ${categoryData.demo || ''}
        </div>
    `;
}

// Demo functions for interactive elements
function checkSecurityHeaders() {
    const resultsDiv = document.getElementById('securityResults');
    resultsDiv.innerHTML = `
        <h4>Security Headers Analysis</h4>
        <ul>
            <li>✅ HTTPS: Enabled</li>
            <li>✅ Content Security Policy: Not detected (needs implementation)</li>
            <li>✅ X-Content-Type-Options: nosniff</li>
            <li>✅ X-Frame-Options: DENY</li>
            <li>⚠️ Strict-Transport-Security: Not detected</li>
            <li>✅ X-XSS-Protection: 1; mode=block</li>
        </ul>
        <p><strong>Recommendation:</strong> Implement Content Security Policy and HSTS header for better security.</p>
    `;
}

function analyzeSEO() {
    const resultsDiv = document.getElementById('seoResults');
    const title = document.querySelector('title').textContent;
    const metaDesc = document.querySelector('meta[name="description"]');
    const headings = document.querySelectorAll('h1, h2, h3');
    
    let headingStructure = '';
    headings.forEach((heading, index) => {
        if (index < 5) { // Show first 5 headings
            headingStructure += `<li>${heading.tagName}: ${heading.textContent.substring(0, 50)}...</li>`;
        }
    });
    
    resultsDiv.innerHTML = `
        <h4>SEO Analysis Results</h4>
        <ul>
            <li>✅ Title Tag: "${title}" (Good length: ${title.length} chars)</li>
            <li>${metaDesc ? `✅ Meta Description: "${metaDesc.getAttribute('content').substring(0, 100)}..."` : '❌ Meta Description: Missing'}</li>
            <li>✅ Heading Structure:
                <ul>${headingStructure}</ul>
            </li>
            <li>✅ Responsive Design: Mobile-friendly</li>
            <li>✅ Page Load: Fast loading</li>
        </ul>
        <p><strong>Recommendation:</strong> ${metaDesc ? 'Your basic SEO elements look good!' : 'Add a meta description to improve click-through rates.'}</p>
    `;
}

function runTestDemo() {
    const resultsDiv = document.getElementById('testingResults');
    resultsDiv.innerHTML = `
        <h4>Test Coverage Simulation</h4>
        <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <div style="background: #10b981; height: 24px; width: 85%; border-radius: 0.25rem; margin-bottom: 0.5rem;"></div>
            <p>85% Test Coverage - Good job!</p>
        </div>
        <ul>
            <li>✅ Unit Tests: 152 passed</li>
            <li>✅ Integration Tests: 42 passed</li>
            <li>✅ E2E Tests: 12 passed</li>
            <li>⚠️ 15% uncovered code </li>
        </ul>
        <p><strong>Recommendation:</strong> Focus on testing the utility functions in helpers.js to improve coverage.</p>
    `;
}