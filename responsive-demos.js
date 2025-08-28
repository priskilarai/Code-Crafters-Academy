// Responsive Design Demo Scripts
document.addEventListener('DOMContentLoaded', function() {
    initDeviceSimulator();
    initBreakpointTester();
    initLayoutPatterns();
    initResponsiveImageDemo();
});

// Device Simulator
function initDeviceSimulator() {
    const deviceButtons = document.querySelectorAll('.device-btn');
    const deviceFrame = document.getElementById('deviceFrame');
    const deviceInfo = document.getElementById('deviceInfo');
    
    const devices = {
        mobile: { width: 375, height: 667, name: 'iPhone SE' },
        tablet: { width: 768, height: 1024, name: 'iPad' },
        desktop: { width: 1440, height: 900, name: 'Desktop' }
    };
    
    let currentOrientation = 'portrait';
    
    deviceButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const deviceType = this.getAttribute('data-device');
            const device = devices[deviceType];
            
            // Update active button
            deviceButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update device frame
            updateDeviceFrame(device);
        });
    });
    
    function updateDeviceFrame(device) {
        const width = currentOrientation === 'portrait' ? device.width : device.height;
        const height = currentOrientation === 'portrait' ? device.height : device.width;
        
        deviceFrame.style.width = Math.min(width, 800) + 'px';
        deviceFrame.style.height = Math.min(height, 600) + 'px';
        
        if (deviceInfo) {
            deviceInfo.innerHTML = `
                <span>${width}px × ${height}px</span>
                <span>${device.name}</span>
                <span>${currentOrientation}</span>
            `;
        }
    }
    
    // Initialize with mobile
    updateDeviceFrame(devices.mobile);
    
    // Add device simulator styles
    const simulatorStyles = document.createElement('style');
    simulatorStyles.textContent = `
        .device-simulator {
            margin: var(--spacing-8) 0;
            text-align: center;
        }
        
        .device-controls {
            display: flex;
            justify-content: center;
            gap: var(--spacing-3);
            margin-bottom: var(--spacing-6);
            flex-wrap: wrap;
        }
        
        .device-btn {
            background: var(--neutral-200);
            color: var(--neutral-700);
            border: none;
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all var(--transition-fast);
            font-weight: 500;
        }
        
        .device-btn:hover {
            background: var(--neutral-300);
        }
        
        .device-btn.active {
            background: var(--primary-600);
            color: white;
        }
        
        .device-frame {
            background: #333;
            border-radius: 1rem;
            padding: var(--spacing-4);
            margin: 0 auto var(--spacing-4);
            transition: all var(--transition-base);
            box-shadow: var(--shadow-xl);
        }
        
        .device-content {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 0.5rem;
            background: white;
        }
        
        .device-info {
            display: flex;
            justify-content: center;
            gap: var(--spacing-4);
            font-size: 0.875rem;
            color: var(--neutral-600);
        }
        
        .device-size {
            font-family: 'Fira Code', monospace;
            background: var(--neutral-100);
            padding: var(--spacing-1) var(--spacing-2);
            border-radius: 0.25rem;
        }
    `;
    document.head.appendChild(simulatorStyles);
}

// Breakpoint Tester
function initBreakpointTester() {
    const breakpointTester = document.getElementById('breakpointTester');
    const currentBreakpoint = document.getElementById('currentBreakpoint');
    const responsiveElement = document.getElementById('responsiveElement');
    
    if (!breakpointTester) return;
    
    function updateBreakpoint() {
        const width = window.innerWidth;
        let breakpoint, name, color;
        
        if (width < 768) {
            breakpoint = 'mobile';
            name = 'Mobile';
            color = 'var(--accent-500)';
        } else if (width < 1024) {
            breakpoint = 'tablet';
            name = 'Tablet';
            color = 'var(--warning-500)';
        } else {
            breakpoint = 'desktop';
            name = 'Desktop';
            color = 'var(--primary-500)';
        }
        
        if (currentBreakpoint) {
            currentBreakpoint.innerHTML = `
                <span class="breakpoint-name">${name}</span>
                <span class="breakpoint-size">${width}px</span>
            `;
            currentBreakpoint.style.backgroundColor = color + '20';
            currentBreakpoint.style.borderColor = color;
        }
        
        if (responsiveElement) {
            responsiveElement.className = `responsive-element ${breakpoint}`;
        }
    }
    
    window.addEventListener('resize', updateBreakpoint);
    updateBreakpoint(); // Initial call
    
    // Add breakpoint tester styles
    const breakpointStyles = document.createElement('style');
    breakpointStyles.textContent = `
        .breakpoint-tester {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin: var(--spacing-6) 0;
            text-align: center;
        }
        
        .current-breakpoint {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-3);
            padding: var(--spacing-3) var(--spacing-6);
            border: 2px solid;
            border-radius: 0.5rem;
            margin-bottom: var(--spacing-6);
            transition: all var(--transition-base);
        }
        
        .breakpoint-name {
            font-weight: 600;
            font-size: 1.125rem;
        }
        
        .breakpoint-size {
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            opacity: 0.8;
        }
        
        .responsive-element {
            background: var(--primary-100);
            color: var(--primary-700);
            padding: var(--spacing-6);
            border-radius: 0.5rem;
            border: 2px solid var(--primary-300);
            transition: all var(--transition-base);
            font-weight: 500;
        }
        
        .responsive-element.mobile {
            background: var(--accent-100);
            color: var(--accent-700);
            border-color: var(--accent-300);
            padding: var(--spacing-4);
            font-size: 0.9rem;
        }
        
        .responsive-element.tablet {
            background: var(--warning-100);
            color: var(--warning-700);
            border-color: var(--warning-300);
            padding: var(--spacing-5);
            font-size: 1rem;
        }
        
        .responsive-element.desktop {
            background: var(--primary-100);
            color: var(--primary-700);
            border-color: var(--primary-300);
            padding: var(--spacing-6);
            font-size: 1.125rem;
        }
    `;
    document.head.appendChild(breakpointStyles);
}

// Layout Patterns Demo
function initLayoutPatterns() {
    const layoutStyles = document.createElement('style');
    layoutStyles.textContent = `
        .layout-patterns {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .pattern-card {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-4);
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        
        .pattern-card:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-md);
        }
        
        .pattern-card h4 {
            margin-bottom: var(--spacing-3);
            text-align: center;
            color: var(--neutral-700);
        }
        
        .pattern-preview {
            height: 100px;
            border: 1px solid var(--neutral-300);
            border-radius: 0.25rem;
            display: grid;
            gap: 2px;
            padding: 4px;
            background: var(--neutral-100);
        }
        
        .sidebar-pattern {
            grid-template-columns: 1fr 3fr;
        }
        
        .pattern-sidebar {
            background: var(--primary-300);
            border-radius: 2px;
        }
        
        .pattern-main {
            background: var(--neutral-300);
            border-radius: 2px;
        }
        
        .cards-pattern {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
        
        .pattern-card-item {
            background: var(--accent-300);
            border-radius: 2px;
        }
        
        .holy-grail-pattern {
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas:
                "header header header"
                "left center right"
                "footer footer footer";
        }
        
        .pattern-header {
            grid-area: header;
            background: var(--primary-400);
            border-radius: 2px;
        }
        
        .pattern-left {
            grid-area: left;
            background: var(--secondary-300);
            border-radius: 2px;
        }
        
        .pattern-center {
            grid-area: center;
            background: var(--neutral-300);
            border-radius: 2px;
        }
        
        .pattern-right {
            grid-area: right;
            background: var(--warning-300);
            border-radius: 2px;
        }
        
        .pattern-footer {
            grid-area: footer;
            background: var(--neutral-400);
            border-radius: 2px;
        }
        
        .layout-code {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin-top: var(--spacing-6);
            text-align: center;
            color: var(--neutral-600);
        }
    `;
    document.head.appendChild(layoutStyles);
}

function showLayoutPattern(pattern) {
    const layoutCode = document.getElementById('layoutCode');
    
    const patterns = {
        sidebar: {
            title: 'Sidebar Layout',
            css: `.container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    min-height: 100vh;
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
    
    .sidebar {
        order: 2;
    }
}`
        },
        cards: {
            title: 'Responsive Card Grid',
            css: `.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
}`
        },
        'holy-grail': {
            title: 'Holy Grail Layout',
            css: `.holy-grail {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    min-height: 100vh;
    gap: 1rem;
}

@media (max-width: 768px) {
    .holy-grail {
        grid-template-columns: 1fr;
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "aside"
            "footer";
    }
}`
        }
    };
    
    const patternData = patterns[pattern];
    if (patternData && layoutCode) {
        layoutCode.innerHTML = `
            <h4>${patternData.title}</h4>
            <div class="code-example">
                <pre><code>${patternData.css}</code></pre>
                <button class="copy-btn" data-code="${patternData.css.replace(/"/g, '&quot;')}">Copy Code</button>
            </div>
        `;
    }
}

// Device Viewport Simulator
function initDeviceViewportSimulator() {
    const deviceSelect = document.getElementById('deviceSelect');
    const deviceViewport = document.getElementById('deviceViewport');
    const viewportInfo = document.getElementById('viewportInfo');
    
    const devices = {
        'iphone-se': { width: 375, height: 667, name: 'iPhone SE' },
        'iphone-12': { width: 390, height: 844, name: 'iPhone 12' },
        'ipad': { width: 768, height: 1024, name: 'iPad' },
        'ipad-pro': { width: 1024, height: 1366, name: 'iPad Pro' },
        'desktop': { width: 1440, height: 900, name: 'Desktop' }
    };
    
    let currentOrientation = 'portrait';
    
    if (deviceSelect) {
        deviceSelect.addEventListener('change', function() {
            updateViewport();
        });
    }
    
    function updateViewport() {
        const selectedDevice = deviceSelect.value;
        const device = devices[selectedDevice];
        
        if (device && deviceViewport) {
            const width = currentOrientation === 'portrait' ? device.width : device.height;
            const height = currentOrientation === 'portrait' ? device.height : device.width;
            
            // Scale down for display
            const scale = Math.min(600 / width, 400 / height, 1);
            const displayWidth = width * scale;
            const displayHeight = height * scale;
            
            deviceViewport.style.width = displayWidth + 'px';
            deviceViewport.style.height = displayHeight + 'px';
            
            if (viewportInfo) {
                viewportInfo.innerHTML = `
                    <span>${width}px × ${height}px</span>
                    <span>${currentOrientation}</span>
                `;
            }
            
            // Update viewport content layout
            updateViewportLayout(width);
        }
    }
    
    function updateViewportLayout(width) {
        const viewportContent = deviceViewport.querySelector('.viewport-content');
        if (!viewportContent) return;
        
        if (width < 768) {
            viewportContent.className = 'viewport-content mobile-layout';
        } else if (width < 1024) {
            viewportContent.className = 'viewport-content tablet-layout';
        } else {
            viewportContent.className = 'viewport-content desktop-layout';
        }
    }
    
    // Initialize
    updateViewport();
    
    // Add viewport simulator styles
    const viewportStyles = document.createElement('style');
    viewportStyles.textContent = `
        .devtools-simulator {
            background: var(--neutral-100);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .devtools-toolbar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--spacing-4);
            margin-bottom: var(--spacing-6);
            flex-wrap: wrap;
        }
        
        .device-selector {
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--neutral-300);
            border-radius: 0.375rem;
            background: white;
            font-size: 0.95rem;
        }
        
        .rotate-btn {
            background: var(--secondary-600);
            color: white;
            border: none;
            padding: var(--spacing-2) var(--spacing-3);
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background var(--transition-fast);
        }
        
        .rotate-btn:hover {
            background: var(--secondary-700);
        }
        
        .device-viewport {
            background: #333;
            border-radius: 0.5rem;
            margin: 0 auto var(--spacing-4);
            transition: all var(--transition-base);
            box-shadow: var(--shadow-lg);
            overflow: hidden;
        }
        
        .viewport-content {
            width: 100%;
            height: 100%;
            background: white;
            display: grid;
            font-size: 0.8rem;
            transition: all var(--transition-base);
        }
        
        .viewport-content.mobile-layout {
            grid-template-areas:
                "header"
                "nav"
                "main"
                "aside"
                "footer";
            grid-template-rows: auto auto 1fr auto auto;
        }
        
        .viewport-content.tablet-layout {
            grid-template-areas:
                "header header"
                "nav nav"
                "main aside"
                "footer footer";
            grid-template-columns: 2fr 1fr;
            grid-template-rows: auto auto 1fr auto;
        }
        
        .viewport-content.desktop-layout {
            grid-template-areas:
                "header header header"
                "nav main aside"
                "footer footer footer";
            grid-template-columns: 200px 1fr 200px;
            grid-template-rows: auto 1fr auto;
        }
        
        .demo-header {
            grid-area: header;
            background: var(--primary-200);
            padding: var(--spacing-2);
            text-align: center;
            font-weight: 600;
        }
        
        .demo-nav {
            grid-area: nav;
            background: var(--secondary-200);
            padding: var(--spacing-2);
            text-align: center;
        }
        
        .demo-main {
            grid-area: main;
            background: var(--neutral-100);
            padding: var(--spacing-2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .demo-aside {
            grid-area: aside;
            background: var(--warning-200);
            padding: var(--spacing-2);
            text-align: center;
        }
        
        .demo-footer {
            grid-area: footer;
            background: var(--neutral-300);
            padding: var(--spacing-2);
            text-align: center;
        }
        
        .viewport-info {
            display: flex;
            justify-content: center;
            gap: var(--spacing-4);
            font-size: 0.875rem;
            color: var(--neutral-600);
        }
        
        .viewport-info span {
            background: var(--neutral-200);
            padding: var(--spacing-1) var(--spacing-2);
            border-radius: 0.25rem;
            font-family: 'Fira Code', monospace;
        }
    `;
    document.head.appendChild(viewportStyles);
}

function rotateDevice() {
    const deviceViewport = document.getElementById('deviceViewport');
    const viewportInfo = document.getElementById('viewportInfo');
    
    if (!deviceViewport) return;
    
    const currentWidth = parseInt(deviceViewport.style.width);
    const currentHeight = parseInt(deviceViewport.style.height);
    
    // Swap dimensions
    deviceViewport.style.width = currentHeight + 'px';
    deviceViewport.style.height = currentWidth + 'px';
    
    // Update orientation
    const isPortrait = currentHeight > currentWidth;
    const newOrientation = isPortrait ? 'landscape' : 'portrait';
    
    if (viewportInfo) {
        const spans = viewportInfo.querySelectorAll('span');
        if (spans.length >= 2) {
            spans[0].textContent = `${currentHeight}px × ${currentWidth}px`;
            spans[1].textContent = newOrientation;
        }
    }
    
    // Add rotation animation
    deviceViewport.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        deviceViewport.style.transform = 'rotate(0deg)';
    }, 300);
}

// Responsive Image Demo
function initResponsiveImageDemo() {
    const imageStyles = document.createElement('style');
    imageStyles.textContent = `
        .image-demo {
            margin: var(--spacing-8) 0;
        }
        
        .image-examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: var(--spacing-8);
            margin: var(--spacing-6) 0;
        }
        
        .image-example {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
        }
        
        .image-example h4 {
            margin-bottom: var(--spacing-4);
            color: var(--neutral-800);
        }
        
        .responsive-img,
        .responsive-picture img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
            box-shadow: var(--shadow-sm);
            margin-bottom: var(--spacing-4);
        }
        
        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .comparison-item {
            text-align: center;
        }
        
        .comparison-frame {
            width: 200px;
            height: 120px;
            border: 2px solid;
            border-radius: 0.5rem;
            margin: 0 auto var(--spacing-3);
            overflow: hidden;
            position: relative;
        }
        
        .comparison-frame.bad {
            border-color: var(--error-500);
        }
        
        .comparison-frame.good {
            border-color: var(--accent-500);
        }
        
        .mini-webpage {
            width: 600px;
            height: 360px;
            transform: scale(0.33);
            transform-origin: top left;
            background: white;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .mini-webpage.responsive {
            width: 200px;
            height: 120px;
            transform: scale(1);
        }
        
        .mini-header {
            background: var(--primary-600);
            color: white;
            padding: 0.5rem;
            text-align: center;
            font-size: 0.7rem;
        }
        
        .mini-content {
            padding: 0.5rem;
            font-size: 0.6rem;
            line-height: 1.2;
        }
        
        .comparison-note {
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .comparison-frame.bad .comparison-note {
            color: var(--error-600);
        }
        
        .comparison-frame.good .comparison-note {
            color: var(--accent-600);
        }
        
        .testing-checklist {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin-top: var(--spacing-8);
        }
        
        .checklist {
            list-style: none;
            margin-top: var(--spacing-4);
        }
        
        .checklist li {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-3);
            margin-bottom: var(--spacing-3);
            padding: var(--spacing-2);
            border-radius: 0.375rem;
            transition: background var(--transition-fast);
        }
        
        .checklist li:hover {
            background: var(--neutral-50);
        }
        
        .checklist input[type="checkbox"] {
            margin-top: 0.125rem;
        }
        
        .checklist label {
            cursor: pointer;
            line-height: 1.5;
        }
        
        .checklist input[type="checkbox"]:checked + label {
            text-decoration: line-through;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .image-examples {
                grid-template-columns: 1fr;
            }
            
            .comparison-grid {
                grid-template-columns: 1fr;
            }
            
            .device-controls {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(imageStyles);
}

// Initialize device viewport simulator
document.addEventListener('DOMContentLoaded', function() {
    initDeviceViewportSimulator();
});

// Checklist functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
            const totalCount = checkboxes.length;
            const percentage = Math.round((checkedCount / totalCount) * 100);
            
            if (checkedCount === totalCount) {
                showNotification('Congratulations! You\'ve completed the responsive design checklist!', 'success');
            }
        });
    });
});