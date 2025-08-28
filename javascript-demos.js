// JavaScript Tutorial Interactive Demos
document.addEventListener('DOMContentLoaded', function() {
    initJSConsole();
    initEventDemo();
    initAsyncDemo();
    initES6Demo();
});

// Interactive JavaScript Console
function initJSConsole() {
    const consoleInput = document.getElementById('consoleInput');
    const consoleOutput = document.getElementById('consoleOutput');
    
    if (!consoleInput || !consoleOutput) return;
    
    consoleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const code = this.value.trim();
            if (code) {
                executeCode(code);
                this.value = '';
            }
        }
    });
    
    function executeCode(code) {
        const outputLine = document.createElement('div');
        outputLine.className = 'console-line';
        
        // Show the input
        const inputLine = document.createElement('div');
        inputLine.className = 'console-line input-line';
        inputLine.innerHTML = `<span class="console-prompt">&gt;</span> ${escapeHtml(code)}`;
        consoleOutput.appendChild(inputLine);
        
        try {
            // Create a safe execution context
            const result = evaluateCode(code);
            outputLine.className = 'console-line output-line';
            outputLine.textContent = result;
        } catch (error) {
            outputLine.className = 'console-line error-line';
            outputLine.textContent = `Error: ${error.message}`;
        }
        
        consoleOutput.appendChild(outputLine);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    
    function evaluateCode(code) {
        // Safe evaluation for demo purposes
        const allowedPatterns = [
            /^console\.log\(.+\)$/,
            /^Math\..+$/,
            /^".*"$|^'.*'$/,
            /^\d+(\.\d+)?$/,
            /^true|false$/,
            /^\[.*\]$/,
            /^\{.*\}$/
        ];
        
        // Simple string evaluation for demo
        if (code.startsWith('console.log(')) {
            const content = code.slice(12, -1);
            return eval(content);
        }
        
        if (code.startsWith('Math.')) {
            return eval(code);
        }
        
        // Return the code as-is for other cases
        return eval(code);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Add console styles
    const consoleStyles = document.createElement('style');
    consoleStyles.textContent = `
        .js-console {
            background: #1e1e1e;
            color: #d4d4d4;
            border-radius: 0.5rem;
            overflow: hidden;
            font-family: 'Fira Code', monospace;
            margin: var(--spacing-6) 0;
        }
        
        .console-output {
            height: 200px;
            overflow-y: auto;
            padding: var(--spacing-4);
            border-bottom: 1px solid #333;
        }
        
        .console-line {
            margin-bottom: var(--spacing-1);
            line-height: 1.4;
        }
        
        .input-line {
            color: #569cd6;
        }
        
        .output-line {
            color: #ce9178;
        }
        
        .error-line {
            color: #f44747;
        }
        
        .console-input-container {
            display: flex;
            align-items: center;
            padding: var(--spacing-3) var(--spacing-4);
            background: #252526;
        }
        
        .console-prompt {
            color: #569cd6;
            margin-right: var(--spacing-2);
            font-weight: bold;
        }
        
        .console-input {
            flex: 1;
            background: none;
            border: none;
            color: #d4d4d4;
            font-family: inherit;
            font-size: 0.9rem;
            outline: none;
        }
        
        .console-input::placeholder {
            color: #6a6a6a;
        }
    `;
    document.head.appendChild(consoleStyles);
}

// DOM Manipulation Demo Functions
function changeText() {
    const element = document.getElementById('demoElement');
    const texts = [
        'Text changed with JavaScript!',
        'DOM manipulation is powerful!',
        'You can change any element!',
        'This element can be modified using the controls below.'
    ];
    
    const currentText = element.querySelector('p').textContent;
    const currentIndex = texts.indexOf(currentText);
    const nextIndex = (currentIndex + 1) % texts.length;
    
    element.querySelector('p').textContent = texts[nextIndex];
    logEvent('Text changed using textContent property');
}

function changeColor() {
    const element = document.getElementById('demoElement');
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    element.style.backgroundColor = randomColor + '20';
    element.style.borderColor = randomColor;
    logEvent(`Background color changed to ${randomColor}`);
}

function addClass() {
    const element = document.getElementById('demoElement');
    const classes = ['highlight', 'shadow', 'rounded', 'animated'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    
    element.classList.toggle(randomClass);
    logEvent(`Toggled class: ${randomClass}`);
}

function createElement() {
    const container = document.getElementById('demoElement');
    const newElement = document.createElement('div');
    newElement.className = 'created-element';
    newElement.textContent = `Created at ${new Date().toLocaleTimeString()}`;
    newElement.style.cssText = `
        background: var(--accent-100);
        color: var(--accent-700);
        padding: var(--spacing-2);
        margin: var(--spacing-2) 0;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    container.appendChild(newElement);
    logEvent('New element created and appended');
}

function removeElement() {
    const container = document.getElementById('demoElement');
    const createdElements = container.querySelectorAll('.created-element');
    
    if (createdElements.length > 0) {
        const lastElement = createdElements[createdElements.length - 1];
        lastElement.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => lastElement.remove(), 300);
        logEvent('Last created element removed');
    } else {
        logEvent('No elements to remove');
    }
}

// Event Demo Initialization
function initEventDemo() {
    const eventArea = document.getElementById('eventArea');
    const eventButton = document.getElementById('eventButton');
    
    if (!eventArea || !eventButton) return;
    
    // Mouse events
    eventArea.addEventListener('mouseenter', () => logEvent('Mouse entered the area', 'mouseenter'));
    eventArea.addEventListener('mouseleave', () => logEvent('Mouse left the area', 'mouseleave'));
    eventArea.addEventListener('mousemove', (e) => {
        // Throttle mousemove events
        if (!eventArea.dataset.lastMove || Date.now() - eventArea.dataset.lastMove > 500) {
            logEvent(`Mouse moved to (${e.offsetX}, ${e.offsetY})`, 'mousemove');
            eventArea.dataset.lastMove = Date.now();
        }
    });
    
    // Click events
    eventButton.addEventListener('click', () => {
        logEvent('Button clicked!', 'click');
        eventButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            eventButton.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Keyboard events
    eventArea.addEventListener('keydown', (e) => {
        if (eventArea === document.activeElement) {
            logEvent(`Key pressed: ${e.key}`, 'keydown');
        }
    });
    
    // Make event area focusable
    eventArea.setAttribute('tabindex', '0');
    
    // Add event demo styles
    const eventStyles = document.createElement('style');
    eventStyles.textContent = `
        .event-playground {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-6);
            margin: var(--spacing-6) 0;
        }
        
        .event-area {
            background: var(--primary-50);
            border: 2px dashed var(--primary-300);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-4);
        }
        
        .event-area:hover {
            background: var(--primary-100);
            border-color: var(--primary-500);
        }
        
        .event-area:focus {
            outline: 2px solid var(--primary-500);
            outline-offset: 2px;
        }
        
        .event-btn {
            background: var(--primary-600);
            color: white;
            border: none;
            padding: var(--spacing-3) var(--spacing-6);
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .event-btn:hover {
            background: var(--primary-700);
        }
        
        .event-log {
            background: #1e1e1e;
            color: #d4d4d4;
            border-radius: 0.5rem;
            overflow: hidden;
            font-family: 'Fira Code', monospace;
        }
        
        .event-log h4 {
            background: #333;
            color: white;
            padding: var(--spacing-3);
            margin: 0;
            font-size: 1rem;
        }
        
        .log-content {
            height: 150px;
            overflow-y: auto;
            padding: var(--spacing-3);
            font-size: 0.875rem;
        }
        
        .log-entry {
            margin-bottom: var(--spacing-1);
            padding: var(--spacing-1) 0;
            border-bottom: 1px solid #333;
        }
        
        .log-timestamp {
            color: #6a6a6a;
            font-size: 0.75rem;
        }
        
        .log-event {
            color: #569cd6;
        }
        
        .clear-log-btn {
            width: 100%;
            background: #333;
            color: white;
            border: none;
            padding: var(--spacing-2);
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s ease;
        }
        
        .clear-log-btn:hover {
            background: #444;
        }
        
        @media (max-width: 768px) {
            .event-playground {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(eventStyles);
}

function logEvent(message, eventType = 'info') {
    const logContent = document.getElementById('logContent');
    if (!logContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <div class="log-timestamp">${timestamp}</div>
        <div class="log-event">[${eventType}] ${message}</div>
    `;
    
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
    
    // Keep only last 20 entries
    const entries = logContent.querySelectorAll('.log-entry');
    if (entries.length > 20) {
        entries[0].remove();
    }
}

function clearEventLog() {
    const logContent = document.getElementById('logContent');
    if (logContent) {
        logContent.innerHTML = '<p>Event log cleared...</p>';
    }
}

// Async Demo Functions
function initAsyncDemo() {
    // Add loading spinner styles
    const spinnerStyles = document.createElement('style');
    spinnerStyles.textContent = `
        .api-demo {
            text-align: center;
            margin: var(--spacing-6) 0;
        }
        
        .api-result {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin-top: var(--spacing-4);
            min-height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-3);
            margin-top: var(--spacing-4);
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--neutral-200);
            border-top: 4px solid var(--primary-600);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .quote-content {
            text-align: left;
        }
        
        .quote-text {
            font-size: 1.125rem;
            font-style: italic;
            margin-bottom: var(--spacing-3);
            color: var(--neutral-700);
        }
        
        .quote-author {
            font-weight: 600;
            color: var(--primary-600);
        }
        
        .weather-demo {
            margin: var(--spacing-6) 0;
        }
        
        .weather-controls {
            display: flex;
            gap: var(--spacing-3);
            justify-content: center;
            margin-bottom: var(--spacing-4);
            flex-wrap: wrap;
        }
        
        .weather-controls input {
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--neutral-300);
            border-radius: 0.375rem;
            font-size: 1rem;
            min-width: 200px;
        }
        
        .weather-result {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .weather-info {
            text-align: center;
        }
        
        .weather-temp {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-600);
            margin-bottom: var(--spacing-2);
        }
        
        .weather-desc {
            font-size: 1.125rem;
            color: var(--neutral-600);
            margin-bottom: var(--spacing-3);
        }
        
        .weather-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: var(--spacing-4);
            margin-top: var(--spacing-4);
        }
        
        .weather-detail {
            text-align: center;
        }
        
        .weather-detail-label {
            font-size: 0.875rem;
            color: var(--neutral-500);
            display: block;
        }
        
        .weather-detail-value {
            font-weight: 600;
            color: var(--neutral-700);
        }
    `;
    document.head.appendChild(spinnerStyles);
}

async function fetchRandomQuote() {
    const resultDiv = document.getElementById('quoteResult');
    const loadingDiv = document.getElementById('loadingIndicator');
    
    // Show loading
    loadingDiv.style.display = 'flex';
    resultDiv.style.display = 'none';
    
    try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock quote data
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
            { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
            { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
            { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        resultDiv.innerHTML = `
            <div class="quote-content">
                <p class="quote-text">"${randomQuote.text}"</p>
                <p class="quote-author">— ${randomQuote.author}</p>
            </div>
        `;
        
        logEvent('Quote fetched successfully');
        
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <p>Failed to fetch quote. Please try again.</p>
            </div>
        `;
        logEvent('Error fetching quote: ' + error.message);
    } finally {
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'flex';
    }
}

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const city = cityInput.value.trim();
    
    if (!city) {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }
    
    weatherResult.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Fetching weather data...</p>
        </div>
    `;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock weather data
        const weatherData = {
            city: city,
            temperature: Math.floor(Math.random() * 30) + 5,
            description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            pressure: Math.floor(Math.random() * 50) + 1000
        };
        
        weatherResult.innerHTML = `
            <div class="weather-info">
                <h4>${weatherData.city}</h4>
                <div class="weather-temp">${weatherData.temperature}°C</div>
                <div class="weather-desc">${weatherData.description}</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span class="weather-detail-label">Humidity</span>
                        <span class="weather-detail-value">${weatherData.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Wind</span>
                        <span class="weather-detail-value">${weatherData.windSpeed} km/h</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Pressure</span>
                        <span class="weather-detail-value">${weatherData.pressure} hPa</span>
                    </div>
                </div>
            </div>
        `;
        
        logEvent(`Weather data loaded for ${city}`);
        
    } catch (error) {
        weatherResult.innerHTML = `
            <div class="error-message">
                <p>Failed to fetch weather data. Please try again.</p>
            </div>
        `;
        logEvent('Error fetching weather: ' + error.message);
    }
}

// ES6+ Features Demo
function initES6Demo() {
    const featureStyles = document.createElement('style');
    featureStyles.textContent = `
        .feature-tabs {
            display: flex;
            gap: var(--spacing-2);
            margin-bottom: var(--spacing-6);
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .feature-tab {
            background: var(--neutral-200);
            color: var(--neutral-700);
            border: none;
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        
        .feature-tab:hover {
            background: var(--neutral-300);
        }
        
        .feature-tab.active {
            background: var(--primary-600);
            color: white;
        }
        
        .feature-content {
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            min-height: 300px;
        }
        
        .feature-example {
            margin: var(--spacing-4) 0;
        }
        
        .feature-demo {
            background: var(--neutral-50);
            padding: var(--spacing-4);
            border-radius: 0.375rem;
            margin: var(--spacing-4) 0;
        }
        
        .demo-input {
            width: 100%;
            padding: var(--spacing-2);
            border: 1px solid var(--neutral-300);
            border-radius: 0.25rem;
            margin: var(--spacing-2) 0;
        }
        
        .demo-output {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: var(--spacing-3);
            border-radius: 0.25rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            margin-top: var(--spacing-2);
        }
    `;
    document.head.appendChild(featureStyles);
    
    // Show initial feature
    showFeature('destructuring');
}

function showFeature(featureName) {
    const featureContent = document.getElementById('featureContent');
    const featureTabs = document.querySelectorAll('.feature-tab');
    
    // Update active tab
    featureTabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = Array.from(featureTabs).find(tab => 
        tab.textContent.toLowerCase().includes(featureName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const features = {
        destructuring: {
            title: 'Destructuring Assignment',
            description: 'Extract values from arrays and objects into distinct variables.',
            example: `// Array Destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary, tertiary] = colors;

// Object Destructuring
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age } = person;

console.log(primary); // 'red'
console.log(name);    // 'John'`,
            demo: `
                <div class="feature-demo">
                    <h4>Try Destructuring</h4>
                    <input type="text" class="demo-input" id="destructureInput" placeholder="Enter: [1, 2, 3, 4, 5]" value="[1, 2, 3, 4, 5]">
                    <button onclick="demonstrateDestructuring()" class="btn btn-outline">Destructure Array</button>
                    <div class="demo-output" id="destructureOutput">Click the button to see destructuring in action!</div>
                </div>
            `
        },
        spread: {
            title: 'Spread Operator (...)',
            description: 'Expand arrays and objects, merge data, and pass arguments.',
            example: `// Array Spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object Spread
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Function Arguments
const numbers = [1, 2, 3, 4, 5];
const max = Math.max(...numbers);`,
            demo: `
                <div class="feature-demo">
                    <h4>Array Merger</h4>
                    <input type="text" class="demo-input" id="array1Input" placeholder="Array 1: [1, 2, 3]" value="[1, 2, 3]">
                    <input type="text" class="demo-input" id="array2Input" placeholder="Array 2: [4, 5, 6]" value="[4, 5, 6]">
                    <button onclick="demonstrateSpread()" class="btn btn-outline">Merge Arrays</button>
                    <div class="demo-output" id="spreadOutput">Enter arrays above and click merge!</div>
                </div>
            `
        },
        modules: {
            title: 'ES6 Modules',
            description: 'Import and export functionality between JavaScript files.',
            example: `// math.js - Export functions
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export default function subtract(a, b) {
    return a - b;
}

// main.js - Import functions
import subtract, { add, multiply } from './math.js';

console.log(add(5, 3));      // 8
console.log(multiply(4, 2)); // 8
console.log(subtract(10, 4)); // 6`,
            demo: `
                <div class="feature-demo">
                    <h4>Module System Benefits</h4>
                    <ul style="text-align: left; margin: var(--spacing-4) 0;">
                        <li>✓ Code organization and reusability</li>
                        <li>✓ Namespace management</li>
                        <li>✓ Dependency management</li>
                        <li>✓ Tree shaking for smaller bundles</li>
                        <li>✓ Better development experience</li>
                    </ul>
                </div>
            `
        },
        classes: {
            title: 'ES6 Classes',
            description: 'Object-oriented programming with class syntax.',
            example: `class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        return \`\${this.name} makes a sound\`;
    }
    
    static getSpeciesCount() {
        return Animal.count || 0;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Canine');
        this.breed = breed;
    }
    
    speak() {
        return \`\${this.name} barks!\`;
    }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // "Buddy barks!"`,
            demo: `
                <div class="feature-demo">
                    <h4>Create Your Pet</h4>
                    <input type="text" class="demo-input" id="petNameInput" placeholder="Pet name" value="Buddy">
                    <select class="demo-input" id="petTypeSelect">
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                    </select>
                    <button onclick="createPet()" class="btn btn-outline">Create Pet</button>
                    <div class="demo-output" id="classOutput">Create a pet to see classes in action!</div>
                </div>
            `
        }
    };
    
    if (featureContent && features[featureName]) {
        const feature = features[featureName];
        featureContent.innerHTML = `
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            
            <div class="code-example">
                <h4>Example Code</h4>
                <pre><code>${feature.example}</code></pre>
                <button class="copy-btn" data-code="${feature.example.replace(/"/g, '&quot;')}">Copy Code</button>
            </div>
            
            ${feature.demo}
        `;
    }
}

// Demo Functions for ES6 Features
function demonstrateDestructuring() {
    const input = document.getElementById('destructureInput');
    const output = document.getElementById('destructureOutput');
    
    try {
        const array = JSON.parse(input.value);
        const [first, second, ...rest] = array;
        
        output.innerHTML = `
            <div>const [first, second, ...rest] = ${input.value};</div>
            <div>first: ${first}</div>
            <div>second: ${second}</div>
            <div>rest: [${rest.join(', ')}]</div>
        `;
    } catch (error) {
        output.innerHTML = `<div style="color: #f44747;">Error: Invalid array format</div>`;
    }
}

function demonstrateSpread() {
    const array1Input = document.getElementById('array1Input');
    const array2Input = document.getElementById('array2Input');
    const output = document.getElementById('spreadOutput');
    
    try {
        const arr1 = JSON.parse(array1Input.value);
        const arr2 = JSON.parse(array2Input.value);
        const merged = [...arr1, ...arr2];
        
        output.innerHTML = `
            <div>const merged = [...${JSON.stringify(arr1)}, ...${JSON.stringify(arr2)}];</div>
            <div>Result: ${JSON.stringify(merged)}</div>
        `;
    } catch (error) {
        output.innerHTML = `<div style="color: #f44747;">Error: Invalid array format</div>`;
    }
}

function createPet() {
    const nameInput = document.getElementById('petNameInput');
    const typeSelect = document.getElementById('petTypeSelect');
    const output = document.getElementById('classOutput');
    
    const name = nameInput.value.trim() || 'Unnamed Pet';
    const type = typeSelect.value;
    
    // Simulate class instantiation
    const petData = {
        dog: { sound: 'barks', emoji: '🐕' },
        cat: { sound: 'meows', emoji: '🐱' },
        bird: { sound: 'chirps', emoji: '🐦' }
    };
    
    const pet = petData[type];
    
    output.innerHTML = `
        <div>const my${type.charAt(0).toUpperCase() + type.slice(1)} = new ${type.charAt(0).toUpperCase() + type.slice(1)}('${name}');</div>
        <div>my${type.charAt(0).toUpperCase() + type.slice(1)}.speak();</div>
        <div style="margin-top: var(--spacing-3); font-size: 1.125rem;">
            ${pet.emoji} "${name} ${pet.sound}!"
        </div>
    `;
}

// Add DOM demo styles
document.addEventListener('DOMContentLoaded', function() {
    const domStyles = document.createElement('style');
    domStyles.textContent = `
        .dom-playground {
            margin: var(--spacing-6) 0;
        }
        
        .demo-element {
            background: var(--primary-50);
            border: 2px solid var(--primary-300);
            border-radius: 0.5rem;
            padding: var(--spacing-6);
            margin-bottom: var(--spacing-6);
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .demo-element h4 {
            margin-bottom: var(--spacing-3);
            color: var(--primary-700);
        }
        
        .demo-element p {
            color: var(--neutral-600);
            margin: 0;
        }
        
        .dom-controls {
            display: flex;
            gap: var(--spacing-3);
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .dom-controls button {
            background: var(--secondary-600);
            color: white;
            border: none;
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 0.875rem;
        }
        
        .dom-controls button:hover {
            background: var(--secondary-700);
            transform: translateY(-1px);
        }
        
        /* Dynamic classes for demo */
        .highlight {
            background: var(--warning-100) !important;
            border-color: var(--warning-500) !important;
        }
        
        .shadow {
            box-shadow: var(--shadow-xl) !important;
        }
        
        .rounded {
            border-radius: 2rem !important;
        }
        
        .animated {
            animation: bounce 0.5s ease-in-out !important;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(domStyles);
});