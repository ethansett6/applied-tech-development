// Simple script without complex error handling
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const nav = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                nav.classList.remove('active');
            }
        });
    });

    // News items
    const newsItems = [
        {
            title: "ChatGPT-4 Breakthrough",
            description: "OpenAI releases new capabilities for ChatGPT-4 with improved reasoning...",
            date: "2024-03-20"
        },
        {
            title: "AI in Healthcare",
            description: "New AI models show promising results in early disease detection...",
            date: "2024-03-19"
        },
        {
            title: "Machine Learning Updates",
            description: "Latest developments in machine learning algorithms and applications...",
            date: "2024-03-18"
        }
    ];

    // Populate news
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        newsItems.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span>${item.date}</span>
            `;
            newsGrid.appendChild(newsCard);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            const section = this.closest('section');
            
            // Update buttons
            section.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            section.querySelectorAll('[data-lang]').forEach(content => {
                content.classList.remove('active');
                if (content.dataset.lang === lang) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Set English as default
    document.querySelectorAll('[data-lang="en"]').forEach(el => el.classList.add('active'));
});

// Chat functionality
function openChat() {
    const chatInterface = document.getElementById('chatInterface');
    if (chatInterface) {
        chatInterface.classList.add('active');
    }
}

function closeChat() {
    const chatInterface = document.getElementById('chatInterface');
    if (chatInterface) {
        chatInterface.classList.remove('active');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    if (!input) return;

    const message = input.value.trim();
    if (message) {
        // Add user message
        addMessageToChat('user', message);
        input.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = '...';
        document.getElementById('chatMessages').appendChild(typingDiv);
        
        // Simulate AI thinking
        setTimeout(() => {
            typingDiv.remove();
            const response = getSmartResponse(message);
            addMessageToChat('bot', response);
        }, 1000);
    }
}

function addMessageToChat(type, text) {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getSmartResponse(message) {
    const msg = message.toLowerCase();
    
    // Mathematics
    if (msg.includes('calculate') || msg.includes('solve') || msg.includes('math')) {
        try {
            // Handle specific math questions
            if (msg.includes('square root')) {
                const num = msg.match(/\d+/);
                if (num) return `The square root of ${num[0]} is ${Math.sqrt(num[0])}`;
            }
            // Basic calculations
            const mathExpression = msg.replace(/[^0-9+\-*/().]/g, '');
            if (mathExpression) {
                const result = eval(mathExpression);
                return `${result}`;
            }
        } catch (error) {
            return "Please format your math question clearly, like '5 + 3' or 'square root of 16'";
        }
    }

    // Science Questions
    if (msg.includes('what is') || msg.includes('explain') || msg.includes('how')) {
        // Physics
        if (msg.includes('gravity')) {
            return "Gravity is a fundamental force that attracts objects with mass. On Earth, gravity accelerates objects at 9.8 meters per second squared (9.8 m/s²). It's what keeps planets in orbit and makes objects fall to the ground.";
        }
        if (msg.includes('atom')) {
            return "An atom is the basic unit of matter, consisting of a nucleus (protons and neutrons) surrounded by electrons. The number of protons determines the element. For example, Hydrogen has 1 proton, while Carbon has 6.";
        }
        if (msg.includes('dna')) {
            return "DNA (Deoxyribonucleic Acid) is a molecule that carries genetic instructions for development and functioning of living things. It has a double helix structure and is made up of nucleotides: Adenine, Thymine, Guanine, and Cytosine (A,T,G,C).";
        }
    }

    // Historical Facts
    if (msg.includes('who') || msg.includes('when')) {
        if (msg.includes('world war 2') || msg.includes('ww2')) {
            return "World War II (1939-1945) was a global conflict. Key events: Germany invaded Poland (1939), Pearl Harbor attack (1941), D-Day (1944), and atomic bombs dropped on Japan (1945). It ended with Axis powers' defeat and about 75 million casualties.";
        }
        if (msg.includes('einstein')) {
            return "Albert Einstein (1879-1955) was a theoretical physicist who developed the theory of relativity (E=mc²). He won the Nobel Prize in Physics in 1921 for his work on the photoelectric effect. His theories revolutionized our understanding of space, time, and gravity.";
        }
    }

    // Geography
    if (msg.includes('capital of')) {
        const capitals = {
            'usa': 'Washington, D.C.',
            'japan': 'Tokyo',
            'france': 'Paris',
            'china': 'Beijing',
            'russia': 'Moscow',
            'uk': 'London',
            'germany': 'Berlin',
            'india': 'New Delhi',
            'myanmar': 'Naypyidaw'
        };
        for (let country in capitals) {
            if (msg.includes(country)) {
                return `The capital of ${country.toUpperCase()} is ${capitals[country]}.`;
            }
        }
    }

    // Technology Questions
    if (msg.includes('what is') || msg.includes('explain')) {
        if (msg.includes('blockchain')) {
            return "Blockchain is a decentralized digital ledger that records transactions across a network of computers. It's the technology behind cryptocurrencies like Bitcoin, but also has applications in supply chain, voting systems, and smart contracts.";
        }
        if (msg.includes('machine learning')) {
            return "Machine Learning is a branch of AI that enables systems to learn and improve from experience without explicit programming. It uses algorithms to analyze data, identify patterns, and make predictions. Applications include image recognition, recommendation systems, and natural language processing.";
        }
        if (msg.includes('cloud computing')) {
            return "Cloud Computing delivers computing services (storage, databases, software) over the internet ('the cloud'). It offers flexible resources, economies of scale, and pay-as-you-go pricing. Examples include AWS, Google Cloud, and Microsoft Azure.";
        }
    }

    // Programming
    if (msg.includes('programming') || msg.includes('code')) {
        if (msg.includes('python')) {
            return "Python is a high-level programming language known for its simplicity and readability. It's widely used in AI, data science, web development, and automation. Example:\n\nprint('Hello, World!')\nfor i in range(5):\n    print(i)";
        }
        if (msg.includes('javascript')) {
            return "JavaScript is a programming language that makes web pages interactive. It runs in browsers and can also be used for server-side development (Node.js). Example:\n\nconsole.log('Hello, World!');\nfor(let i = 0; i < 5; i++) {\n    console.log(i);\n}";
        }
    }

    // Company-specific responses remain the same
    if (msg.includes('ai') || msg.includes('artificial intelligence')) {
        return "At ATD, we specialize in cutting-edge AI solutions including machine learning, natural language processing, and computer vision. Our team can help implement AI solutions tailored to your specific needs.";
    }

    // Contact info remains the same
    if (msg.includes('contact') || msg.includes('telegram')) {
        return "You can reach our founders directly on Telegram:\n• Robert Jasen (@ROBERT_JASEN)\n• Ethan (@KOHPONEE)";
    }

    // Help Command
    if (msg.includes('help')) {
        return "I can answer questions about:\n• Math (try 'calculate 5 + 3')\n• Science (try 'what is gravity?')\n• History (try 'when was WW2?')\n• Geography (try 'capital of Japan?')\n• Technology (try 'what is blockchain?')\n• Programming (try 'explain Python')\n• And more!";
    }

    // HTML Course
    if (msg.includes('html') || msg.includes('web')) {
        if (msg.includes('basic') || msg.includes('start') || msg.includes('learn')) {
            return `Here's a basic HTML tutorial:

1. HTML Structure:
<!DOCTYPE html>
<html>
    <head>
        <title>Your Title</title>
    </head>
    <body>
        Your content
    </body>
</html>

2. Common Elements:
• Headings: <h1>Main Title</h1> to <h6>Smallest Heading</h6>
• Paragraph: <p>Your text here</p>
• Links: <a href="url">Link Text</a>
• Images: <img src="image.jpg" alt="description">
• Lists: 
  <ul>
    <li>Unordered item</li>
  </ul>
  <ol>
    <li>Ordered item</li>
  </ol>

Type 'html tags' for more elements, or 'html exercise' for practice tasks.`;
        }

        if (msg.includes('tags') || msg.includes('elements')) {
            return `Essential HTML Tags:

• Text Formatting:
  <strong>Bold text</strong>
  <em>Italic text</em>
  <br> (Line break)
  <hr> (Horizontal line)

• Containers:
  <div>Block container</div>
  <span>Inline container</span>

• Forms:
  <form>
    <input type="text">
    <input type="email">
    <button>Submit</button>
  </form>

• Tables:
  <table>
    <tr><th>Header</th></tr>
    <tr><td>Data</td></tr>
  </table>

Type 'html attributes' for attributes info.`;
        }

        if (msg.includes('attributes')) {
            return `Common HTML Attributes:

• Global Attributes:
  - class="name" (CSS styling)
  - id="unique-name" (Unique identifier)
  - style="css rules" (Inline styling)

• Specific Attributes:
  - <img src="" alt="">
  - <a href="" target="_blank">
  - <input type="" placeholder="">
  - <button type="submit">

• Form Attributes:
  - required
  - disabled
  - checked
  - maxlength="number"

Type 'html exercise' for practice tasks.`;
        }

        if (msg.includes('exercise') || msg.includes('practice')) {
            return `HTML Practice Exercise:

Create a simple profile page with:
1. A main heading with your name
2. A profile image
3. An "About Me" paragraph
4. A list of skills
5. A contact form

Here's the basic structure:

<!DOCTYPE html>
<html>
<head>
    <title>My Profile</title>
</head>
<body>
    <h1>Your Name</h1>
    <img src="profile.jpg" alt="Profile Picture">
    <h2>About Me</h2>
    <p>Your description here</p>
    <h2>Skills</h2>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
    </ul>
    <h2>Contact Me</h2>
    <form>
        <input type="text" placeholder="Name">
        <input type="email" placeholder="Email">
        <button type="submit">Send</button>
    </form>
</body>
</html>

Type 'html validate' to check your code.`;
        }

        if (msg.includes('validate')) {
            return `To validate your HTML:

1. Use online validators:
   • W3C Validator: https://validator.w3.org/
   • HTML Checker: https://validator.w3.org/nu/

2. Check for:
   • Proper tag closing
   • Correct nesting
   • Required attributes
   • Valid DOCTYPE
   • Unique IDs

3. Best Practices:
   • Use semantic elements
   • Include alt text for images
   • Make forms accessible
   • Test across browsers

Need more specific help? Ask about any HTML topic!`;
        }
    }

    // Default response
    return "Please ask a specific question about math, science, history, technology, or any other topic. For example: 'What is gravity?' or 'Calculate 25 * 4'";
}

function showLesson(lessonId) {
    const lessons = {
        'html-basics': {
            title: 'Lesson 1: HTML Fundamentals',
            content: `
                <h2>Getting Started with HTML</h2>
                <div class="lesson-content">
                    <h3>What is HTML?</h3>
                    <p>HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of web content using elements and tags.</p>

                    <h3>Basic Document Structure</h3>
                    <pre><code>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>My First Page</title>
    </head>
    <body>
        Content goes here
    </body>
</html>
                    </code></pre>

                    <h3>Key Concepts:</h3>
                    <ul>
                        <li>Elements are defined by tags</li>
                        <li>Tags usually come in pairs (opening and closing)</li>
                        <li>The DOCTYPE declaration defines the document type</li>
                        <li>The <code>html</code> element is the root element</li>
                    </ul>

                    <div class="practice-tip">
                        Create your first HTML file and save it with a .html extension!
                    </div>
                </div>
            `
        },
        'html-text': {
            title: 'Lesson 2: Text Elements',
            content: `
                <h2>Working with Text</h2>
                <div class="lesson-content">
                    <h3>Headings</h3>
                    <pre><code>
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>
<h4>Subsection</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
                    </code></pre>

                    <h3>Paragraphs and Text Formatting</h3>
                    <pre><code>
<p>This is a paragraph.</p>
<strong>Bold text</strong>
<em>Italic text</em>
<mark>Highlighted text</mark>
<small>Smaller text</small>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>
                    </code></pre>

                    <div class="practice-tip">
                        Try combining different text elements to create rich content!
                    </div>
                </div>
            `
        },
        'html-links': {
            title: 'Lesson 3: Links & Navigation',
            content: `
                <h2>HTML Links and Navigation</h2>
                <div class="lesson-content">
                    <h3>Basic Link Syntax</h3>
                    <pre><code>
<!-- External Links -->
<a href="https://www.example.com">Visit Example.com</a>

<!-- Internal Links -->
<a href="/about.html">About Us</a>

<!-- Link to Page Section -->
<a href="#section-id">Jump to Section</a>

<!-- Link with Image -->
<a href="https://www.example.com">
    <img src="button.jpg" alt="Click Here">
</a>
                    </code></pre>

                    <h3>Link Attributes</h3>
                    <ul>
                        <li><code>target="_blank"</code> - Opens link in new tab</li>
                        <li><code>rel="noopener"</code> - Security for external links</li>
                        <li><code>download</code> - Makes link download file</li>
                    </ul>

                    <h3>Navigation Structure</h3>
                    <pre><code>
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
                    </code></pre>

                    <div class="practice-tip">
                        Try creating a navigation menu with both internal and external links!
                    </div>
                </div>`
        },
        'html-images': {
            title: 'Lesson 4: Images & Media',
            content: `
                <h2>Working with Images</h2>
                <div class="lesson-content">
                    <h3>Basic Image Syntax</h3>
                    <pre><code>
<!-- Basic Image -->
<img src="image.jpg" alt="Description of image">

<!-- Image with Size -->
<img src="photo.jpg" alt="Profile photo" width="300" height="200">

<!-- Responsive Image -->
<img src="banner.jpg" alt="Banner" style="max-width: 100%; height: auto;">
                    </code></pre>

                    <h3>Image Formats</h3>
                    <ul>
                        <li>.jpg - Best for photographs</li>
                        <li>.png - Best for graphics with transparency</li>
                        <li>.svg - Vector graphics that scale perfectly</li>
                        <li>.webp - Modern format with better compression</li>
                    </ul>

                    <h3>Figure Element</h3>
                    <pre><code>
<figure>
    <img src="diagram.jpg" alt="Process diagram">
    <figcaption>Fig.1 - System Architecture Diagram</figcaption>
</figure>
                    </code></pre>

                    <h3>Background Images</h3>
                    <pre><code>
<!-- Using style attribute -->
<div style="background-image: url('background.jpg');">
    Content over background
</div>
                    </code></pre>

                    <div class="practice-tip">
                        Remember to always include alt text for accessibility!
                    </div>
                </div>`
        },
        'html-lists': {
            title: 'Lesson 5: Lists & Navigation',
            content: `
                <h2>HTML Lists</h2>
                <div class="lesson-content">
                    <h3>Unordered Lists</h3>
                    <pre><code>
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item
        <ul>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
        </ul>
    </li>
</ul>
                    </code></pre>

                    <h3>Ordered Lists</h3>
                    <pre><code>
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- Custom numbering -->
<ol type="A">
    <li>Item A</li>
    <li>Item B</li>
</ol>
                    </code></pre>

                    <h3>Description Lists</h3>
                    <pre><code>
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>
                    </code></pre>

                    <div class="practice-tip">
                        Create a nested list with at least three levels of depth!
                    </div>
                </div>`
        }
    };

    // Create modal for lesson
    const modal = document.createElement('div');
    modal.className = 'lesson-modal';
    modal.innerHTML = `
        <div class="lesson-modal-content">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
            ${lessons[lessonId].content}
        </div>
    `;
    document.body.appendChild(modal);
} 