// Portfolio Filter and Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Modal functionality
const portfolioModal = document.getElementById('portfolioModal');
const modalBody = document.getElementById('modalBody');

const projectData = {
    project1: {
        title: 'Bella Vista Restaurant',
        author: 'Maria Garcia',
        description: 'A sophisticated restaurant website featuring online reservations, menu showcase, and elegant design. Built with semantic HTML5, modern CSS Grid layouts, and interactive JavaScript features.',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Forms API'],
        features: [
            'Responsive design optimized for all devices',
            'Online reservation system with form validation',
            'Interactive menu with filtering and search',
            'Image gallery with lightbox functionality',
            'Contact forms with real-time validation',
            'Google Maps integration for location'
        ],
        challenges: 'Implementing complex animations while maintaining performance and creating an intuitive user experience for restaurant customers.',
        lessons: 'Learned the importance of user testing, especially for reservation flows, and how to optimize images for fast loading without sacrificing quality.'
    },
    project2: {
        title: 'TaskFlow Pro',
        author: 'David Kim',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'],
        features: [
            'Real-time collaborative editing',
            'Drag and drop task management',
            'Team workspaces and permissions',
            'File attachments and comments',
            'Progress tracking and analytics',
            'Mobile-responsive design'
        ],
        challenges: 'Handling real-time synchronization across multiple users and implementing complex state management for collaborative features.',
        lessons: 'Gained deep understanding of WebSocket programming and learned how to structure large React applications with proper component architecture.'
    },
    project3: {
        title: 'TechGear Store',
        author: 'Alex Thompson',
        description: 'Modern e-commerce platform specializing in electronics with advanced search, secure payments, and inventory management.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Stripe', 'PostgreSQL', 'Express', 'Redis'],
        features: [
            'Advanced product search and filtering',
            'Secure payment processing with Stripe',
            'User accounts and order history',
            'Inventory management system',
            'Product recommendations engine',
            'Admin dashboard for store management'
        ],
        challenges: 'Implementing secure payment flows and optimizing database queries for product search and filtering.',
        lessons: 'Mastered payment processing, learned about database optimization, and understood the importance of security in e-commerce applications.'
    },
    project4: {
        title: 'Creative Designer Portfolio',
        author: 'Sarah Wilson',
        description: 'Stunning portfolio website for a graphic designer featuring smooth animations, interactive galleries, and creative layouts.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['HTML5', 'SCSS', 'GSAP', 'Intersection Observer', 'WebGL'],
        features: [
            'Smooth scroll animations with GSAP',
            'Interactive project galleries',
            'Creative CSS layouts and effects',
            'Optimized image loading',
            'Contact form with custom styling',
            'Mobile-first responsive design'
        ],
        challenges: 'Creating complex animations that work smoothly across all devices and browsers while maintaining fast loading times.',
        lessons: 'Learned advanced animation techniques, performance optimization for graphics-heavy sites, and creative CSS layout methods.'
    },
    project5: {
        title: 'WeatherNow App',
        author: 'Jennifer Lee',
        description: 'Real-time weather application with interactive charts, location services, and detailed forecasts for multiple cities.',
        image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Vue.js', 'Weather API', 'Charts.js', 'Geolocation', 'PWA'],
        features: [
            'Real-time weather data from multiple APIs',
            'Interactive weather charts and graphs',
            'Geolocation for automatic city detection',
            'Favorite cities management',
            'Weather alerts and notifications',
            'Progressive Web App capabilities'
        ],
        challenges: 'Handling multiple API integrations, managing offline functionality, and creating intuitive data visualizations.',
        lessons: 'Mastered API integration patterns, learned about Progressive Web Apps, and gained experience with data visualization libraries.'
    },
    project6: {
        title: 'EduConnect Platform',
        author: 'Michael Chen',
        description: 'Comprehensive learning management system with course creation, student tracking, and interactive learning modules.',
        image: 'https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Express', 'MySQL', 'JWT', 'WebRTC'],
        features: [
            'Course creation and management tools',
            'Student progress tracking',
            'Video conferencing integration',
            'Assignment submission system',
            'Grade book and analytics',
            'Discussion forums and messaging'
        ],
        challenges: 'Building a scalable architecture for handling thousands of users and implementing real-time communication features.',
        lessons: 'Learned about scalable application architecture, user role management, and building complex educational software.'
    }
};

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <div class="modal-title-section">
                <h2>${project.title}</h2>
                <p class="modal-author">Created by ${project.author}</p>
            </div>
        </div>
        
        <div class="modal-content-body">
            <div class="modal-description">
                <h3>Project Overview</h3>
                <p>${project.description}</p>
            </div>
            
            <div class="modal-technologies">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-features">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-challenges">
                <h3>Technical Challenges</h3>
                <p>${project.challenges}</p>
            </div>
            
            <div class="modal-lessons">
                <h3>Key Learnings</h3>
                <p>${project.lessons}</p>
            </div>
            
            <div class="modal-actions">
                <a href="#" class="btn btn-primary" target="_blank">View Live Demo</a>
                <a href="#" class="btn btn-outline" target="_blank">View Source Code</a>
            </div>
        </div>
    `;
    
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
if (portfolioModal) {
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
        closeModal();
    }
});

// Portfolio item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 0.5rem 0.5rem 0 0;
    }
    
    .modal-title-section {
        padding: var(--spacing-6) var(--spacing-8) var(--spacing-4);
    }
    
    .modal-title-section h2 {
        margin-bottom: var(--spacing-2);
        font-size: 2rem;
    }
    
    .modal-author {
        color: var(--neutral-600);
        font-size: 1.1rem;
        margin: 0;
    }
    
    .modal-content-body {
        padding: 0 var(--spacing-8) var(--spacing-8);
    }
    
    .modal-content-body h3 {
        margin: var(--spacing-6) 0 var(--spacing-3) 0;
        color: var(--primary-600);
        font-size: 1.25rem;
    }
    
    .modal-content-body p {
        line-height: 1.7;
        margin-bottom: var(--spacing-4);
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-4);
    }
    
    .modal-features .feature-list {
        list-style: none;
        margin: 0;
    }
    
    .modal-features .feature-list li {
        margin-bottom: var(--spacing-2);
        padding-left: var(--spacing-6);
        position: relative;
        line-height: 1.5;
    }
    
    .modal-features .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-500);
        font-weight: 700;
    }
    
    .modal-actions {
        display: flex;
        gap: var(--spacing-4);
        margin-top: var(--spacing-8);
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .modal-title-section,
        .modal-content-body {
            padding-left: var(--spacing-6);
            padding-right: var(--spacing-6);
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            text-align: center;
        }
    }
`;
document.head.appendChild(modalStyles);