window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Remove preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Initialize Particle Network
    const particleNetwork = new ParticleNetwork();

    // Initialize typing effect
    // initializeTypingEffect(); // Removed because function is not defined
});

// Remove theme-related functions and keep only dark mode styles
// document.documentElement.setAttribute('data-theme', 'dark');

// Particle Network
class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-network';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.connectionDistance = 150;
        this.mouseRadius = 200;

        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Adjust particle count based on screen size
        this.particleCount = Math.floor((this.width * this.height) / 15000);
    }

    init() {
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                originalRadius: Math.random() * 2 + 1
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 255, 148, 0.8)';
        this.ctx.fill();
    }

    drawConnection(p1, p2, distance) {
        const opacity = 1 - (distance / this.connectionDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(0, 255, 148, ${opacity * 0.2})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    update() {
        for (let particle of this.particles) {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;

            // React to mouse
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                particle.vx -= Math.cos(angle) * force * 0.02;
                particle.vy -= Math.sin(angle) * force * 0.02;
                particle.radius = particle.originalRadius * (1 + force);
            } else {
                particle.radius = particle.originalRadius;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.drawConnection(this.particles[i], this.particles[j], distance);
                }
            }
        }

        // Draw particles
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}
//
// Navbar Scroll Effect
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 50) {
//         navbar.style.padding = '10px 0';
//         navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
//     } else {
//         navbar.style.padding = '20px 0';
//         navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
//     }
// });
//
// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 900;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.innerText;
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// Trigger counter animation when in viewport
const counterSection = document.querySelector('.cyber-stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (counterSection) {
    observer.observe(counterSection);
}

// Animate skill progress bars when in view
const skillBars = document.querySelectorAll('.progress-bar');

const animateSkillBar = (bar) => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) {
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = `${targetWidth}%`;
        }, 100);
    }
};

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBar(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillsObserver.observe(bar);
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("fAtIsvwPraXm0f7F1"); // Replace with your EmailJS public key

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the submit button and loading spinner
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const loadingSpinner = submitBtn.querySelector('.loading-spinner');

            // Show loading state
            btnText.style.opacity = '0.5';
            loadingSpinner.classList.remove('d-none');
            submitBtn.disabled = true;

            // Prepare template parameters
            const templateParams = {
                name: contactForm.user_name.value,
                email: contactForm.user_email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            // Send email using EmailJS
            emailjs.send(
                'tom-onion', // Replace with your EmailJS service ID
                'tom-onion', // Replace with your EmailJS template ID
                templateParams
            )
                .then(function () {
                    // Show success message
                    showFeedback('Message sent successfully!', 'success');
                    contactForm.reset();
                })
                .catch(function (error) {
                    // Show error message
                    showFeedback('Failed to send message. Please try again.', 'error');
                    console.error('EmailJS Error:', error);
                })
                .finally(function () {
                    // Reset button state
                    btnText.style.opacity = '1';
                    loadingSpinner.classList.add('d-none');
                    submitBtn.disabled = false;
                });
        });
    }
});

// Feedback message handler
function showFeedback(message, type) {
    // Remove any existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create new feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Show the feedback
    setTimeout(() => feedback.classList.add('show'), 100);

    // Remove the feedback after 5 seconds
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 5000);
}

// Particle Effect Background (optional - uncomment to use)

// const createParticle = (x, y) => {
//     const particle = document.createElement('div');
//     particle.className = 'cyber-particle';
//     document.body.appendChild(particle);

//     const size = Math.random() * 5 + 3;
//     particle.style.width = `${size}px`;
//     particle.style.height = `${size}px`;
//     particle.style.background = 'var(--primary-color)';
//     particle.style.position = 'fixed';
//     particle.style.left = `${x}px`;
//     particle.style.top = `${y}px`;
//     particle.style.borderRadius = '50%';
//     particle.style.pointerEvents = 'none';

//     const angle = Math.random() * Math.PI * 2;
//     const velocity = Math.random() * 2 + 1;
//     const vx = Math.cos(angle) * velocity;
//     const vy = Math.sin(angle) * velocity;

//     let opacity = 1;
//     const animate = () => {
//         particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
//         particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
//         opacity -= 0.01;
//         particle.style.opacity = opacity;

//         if (opacity > 0) {
//             requestAnimationFrame(animate);
//         } else {
//             particle.remove();
//         }
//     };

//     requestAnimationFrame(animate);
// };

// document.addEventListener('mousemove', (e) => {
//     if (Math.random() < 0.1) {
//         createParticle(e.clientX, e.clientY);
//     }
// });


// Typing Effect for Hero Section
// function initializeTypingEffect() {
//     const heroText = document.querySelector('#glitch-txt');
//     if (heroText) {
//         const text = heroText.innerText;
//         heroText.innerText = '';
//         let charIndex = 0;

//         const typeText = () => {
//             if (charIndex < text.length) {
//                 heroText.innerText += text.charAt(charIndex);
//                 charIndex++;
//                 setTimeout(typeText, 100);
//             }
//         };

//         setTimeout(typeText, 1000);
//     }
// }

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Remove Theme Toggle
// const toggleTheme = () => {
//     // Theme toggle removed - dark mode only
// };

// Initialize tooltips and popovers if using Bootstrap
// if (typeof bootstrap !== 'undefined') {
//     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//     tooltipTriggerList.map(function (tooltipTriggerEl) {
//         return new bootstrap.Tooltip(tooltipTriggerEl);
//     });

//     const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
//     popoverTriggerList.map(function (popoverTriggerEl) {
//         return new bootstrap.Popover(popoverTriggerEl);
//     });
// }
// const noiseElement = document.createElement('div');
// noiseElement.className = 'digital-noise';
// document.body.appendChild(noiseElement);

// Cursor Effect
document.addEventListener('DOMContentLoaded', () => {
    // Check if device is touch-only
    const isTouchDevice = () => {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    };

    // Don't initialize cursor on touch-only devices
    if (isTouchDevice()) {
        document.body.style.cursor = 'auto';
        return;
    }

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor-particle';
    document.body.appendChild(cursor);

    // Create trail points
    const trailPoints = [];
    const numTrails = 4; // Increased to 25 trail points for a longer trail

    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = i % 2 === 0 ? 'cursor-trail' : 'cursor-trail-blue';
        document.body.appendChild(trail);
        trailPoints.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Handle cursor movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Animation loop for smooth trailing
    function animateTrails() {
        // Instantly update main cursor
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

        let prevX = mouseX;
        let prevY = mouseY;
        const smoothing = 0.250;
        trailPoints.forEach((point) => {
            // Lerp each point toward the previous point
            point.x += (prevX - point.x) * smoothing;
            point.y += (prevY - point.y) * smoothing;
            point.element.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
            prevX = point.x;
            prevY = point.y;
        });
        requestAnimationFrame(animateTrails);
    }
    animateTrails();

    // Handle cursor visibility
    const updateVisibility = (visible) => {
        cursor.style.opacity = visible ? '1' : '0';
        trailPoints.forEach(point => {
            point.element.style.opacity = visible ? point.element.className.includes('blue') ? '0.4' : '0.6' : '0';
        });
    };

    document.addEventListener('mouseleave', () => updateVisibility(false));
    document.addEventListener('mouseenter', () => updateVisibility(true));

    // Handle cursor for interactive elements
    const handleInteractiveElement = (element) => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            trailPoints.forEach(point => point.element.classList.add('hover'));
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            trailPoints.forEach(point => point.element.classList.remove('hover'));
        });
    };

    // Apply to all interactive elements
    document.querySelectorAll('a, button, input, textarea, [role="button"]')
        .forEach(handleInteractiveElement);

    // Handle window blur/focus
    window.addEventListener('blur', () => updateVisibility(false));
    window.addEventListener('focus', () => updateVisibility(true));
});

// Neural Network Effect
function createNeuralNetwork() {
    const cyberText = document.querySelector('.cyber-text');
    if (!cyberText) return;

    const neuralNetwork = document.createElement('div');
    neuralNetwork.className = 'neural-network';
    cyberText.appendChild(neuralNetwork);

    const numNodes = 15;
    const nodes = [];

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 2}s`;
        neuralNetwork.appendChild(node);
        nodes.push(node);
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < 0.3) { // 30% chance to create a connection
                const connection = document.createElement('div');
                connection.className = 'connection';
                connection.style.animationDelay = `${Math.random() * 2}s`;
                neuralNetwork.appendChild(connection);

                // Update connection position and rotation
                function updateConnection() {
                    const rect1 = nodes[i].getBoundingClientRect();
                    const rect2 = nodes[j].getBoundingClientRect();
                    const x1 = rect1.left + rect1.width / 2;
                    const y1 = rect1.top + rect1.height / 2;
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;

                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1);

                    connection.style.width = `${length}px`;
                    connection.style.left = `${x1}px`;
                    connection.style.top = `${y1}px`;
                    connection.style.transform = `rotate(${angle}rad)`;
                }

                updateConnection();
                window.addEventListener('resize', updateConnection);
            }
        }
    }
}

// Initialize neural network effect
document.addEventListener('DOMContentLoaded', () => {
    createNeuralNetwork();
});



//Terminal
const bootMessage = "[OK] Booted... Tom Has Peeled The Onion for You......."; //[OK] Booted... Establishing Secure Shell... Access Granted!
const bootScreen = document.getElementById('bootScreen');
const glitchText = document.getElementById('glitchText');
let charIndex = 0;

function typeBoot() {
    if (charIndex < bootMessage.length) {
        bootScreen.textContent += bootMessage[charIndex];
        charIndex++;
        setTimeout(typeBoot, 40);
    } else {
        setTimeout(() => {
            if (bootScreen) bootScreen.style.display = 'none';
            if (glitchText) {
                glitchText.style.display = 'block';
                typeTerminalText();
            }
        }, 800);
    }
}

// Terminal typing effect for glitch text
function typeTerminalText() {
    const terminalText = "Terminal Unlocked";
    const gradientText = "Tom Has Peeled the Onion";
    let terminalIndex = 0;
    let gradientIndex = 0;

    // Clear the content first and add typing class
    glitchText.innerHTML = '';
    glitchText.classList.add('typing');

    // Type "Terminal Unlocked"
    function typeTerminal() {
        if (terminalIndex < terminalText.length) {
            glitchText.innerHTML += terminalText[terminalIndex];
            terminalIndex++;
            setTimeout(typeTerminal, 100);
        } else {
            // Remove typing class and add line break
            glitchText.classList.remove('typing');
            glitchText.innerHTML += '<br>';
            setTimeout(typeGradient, 500);
        }
    }

    // Type "Tom Has Peeled the Onion"
    function typeGradient() {
        const onionStart = gradientText.indexOf("Onion");
        const onionEnd = onionStart + "Onion".length;
        if (gradientIndex < gradientText.length) {
            // Build the string up to the current character
            let displayText = "";
            for (let i = 0; i <= gradientIndex; i++) {
                if (i === onionStart) displayText += '<span class="onion-hover">';
                displayText += gradientText[i];
                if (i === onionEnd - 1) displayText += '</span>';
            }
            const gradientDiv = glitchText.querySelector('.gradient-text');
            if (gradientDiv) {
                gradientDiv.innerHTML = displayText;
            }
            gradientIndex++;
            setTimeout(typeGradient, 80);
        } else {
            // Set the final text with the span
            let displayText = "";
            for (let i = 0; i < gradientText.length; i++) {
                if (i === onionStart) displayText += '<span class="onion-hover">';
                displayText += gradientText[i];
                if (i === onionEnd - 1) displayText += '</span>';
            }
            const gradientDiv = glitchText.querySelector('.gradient-text');
            if (gradientDiv) {
                gradientDiv.innerHTML = displayText;
                gradientDiv.setAttribute('data-text', gradientText);
            }
            // Remove typing class to restore glitch effect
            glitchText.classList.remove('typing');
            // Start typing terminal commands
            setTimeout(typeTerminalCommands, 500);
        }
    }

    typeTerminal();
}

// Type terminal commands one by one
function typeTerminalCommands() {
    const commands = [
        { prompt: 'tom@loopback:~$', command: 'whoami ! --evil', output: 'TOM — access unrestricted.' },
        { prompt: 'tom@loopback:~$', command: 'make weapon', output: 'No compiler needed. Linux is already compiled.\nLinux ∴ Weapon system online.' },
        { prompt: 'tom@loopback:~$', command: 'sudo chmod 777 /world && sudo su', output: 'Permissions granted to: tom\nResult: Reality is now writable.' },
        { prompt: 'root@tom:~$', command: 'sudo make sleep', output: 'Linking brain.lib ...  \nmake: Segmentation fault at 3AM\n🧠 RAM full. Can\'t allocate rest cycle.\n' }
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let currentCommand = commands[commandIndex];
    let isTypingCommand = true;

    // Hide all terminal outputs and prompts/texts initially
    document.querySelectorAll('.terminal-output').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.terminal-text').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.terminal-prompt').forEach(el => {
        el.textContent = '';
    });

    function typeCommand() {
        const commandElements = document.querySelectorAll('.terminal-text');
        const promptElements = document.querySelectorAll('.terminal-prompt');
        const outputElements = document.querySelectorAll('.terminal-output');

        if (commandIndex < commands.length) {
            // Only animate the current line, previous lines are static and visible
            for (let i = 0; i < commands.length; i++) {
                if (i < commandIndex) {
                    // Previous lines: show full prompt, command, and output as static
                    if (promptElements[i]) promptElements[i].textContent = commands[i].prompt;
                    if (commandElements[i]) commandElements[i].textContent = commands[i].command;
                    if (outputElements[i]) {
                        outputElements[i].innerHTML = commands[i].output.replace(/\n/g, '<br>');
                        outputElements[i].style.display = 'block';
                    }
                } else if (i === commandIndex) {
                    // Current line: animate command, hide output until ready
                    if (promptElements[i]) promptElements[i].textContent = commands[i].prompt;
                    if (outputElements[i]) outputElements[i].style.display = 'none';
                } else {
                    // Future lines: clear all
                    if (promptElements[i]) promptElements[i].textContent = '';
                    if (commandElements[i]) commandElements[i].textContent = '';
                    if (outputElements[i]) outputElements[i].style.display = 'none';
                }
            }
            let prompt = commands[commandIndex].prompt;
            let command = commands[commandIndex].command;
            let totalCommand = command.length;

            if (isTypingCommand && charIndex < totalCommand) {
                if (commandElements[commandIndex]) {
                    commandElements[commandIndex].textContent = command.substring(0, charIndex + 1);
                }
                charIndex++;
                setTimeout(typeCommand, 50);
            } else if (isTypingCommand) {
                isTypingCommand = false;
                charIndex = 0;
                setTimeout(() => {
                    if (outputElements[commandIndex]) {
                        outputElements[commandIndex].innerHTML = commands[commandIndex].output.replace(/\n/g, '<br>');
                        outputElements[commandIndex].style.display = 'block';
                    }
                    commandIndex++;
                    if (commandIndex < commands.length) {
                        currentCommand = commands[commandIndex];
                        isTypingCommand = true;
                        charIndex = 0;
                        setTimeout(typeCommand, 800);
                    }
                }, 500);
            }
        }
    }

    setTimeout(typeCommand, 500);
}

// Trigger terminal animation when in viewport
document.addEventListener('DOMContentLoaded', () => {
    let terminalAnimated = false;
    const terminalSection = document.querySelector('.about-content') || document.querySelector('.terminal-container');
    if (!terminalSection) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalAnimated) {
                terminalAnimated = true;
                if (bootScreen && glitchText) {
                    bootScreen.style.display = 'block';
                    glitchText.style.display = 'none';
                    setTimeout(typeBoot, 1000);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(terminalSection);
});

const glitchTxt = document.getElementById("glitch-txt");
const originalText = "Dhaya";
const glitchChars = "!@#$%^&*()_+=-{}[]|;:<>?/0123456789";
let i = 0;

// Typewriter animation
function typeText() {
    if (i < originalText.length) {
        glitchTxt.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeText, 350); // Typing speed
    } else {
        startGlitching();
    }
}

// Random glitch character
function randomChar() {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

// Glitch function
function glitchEffect() {
    const textArray = originalText.split("");
    const glitched = textArray.map(char =>
        Math.random() < 0.25 ? randomChar() : char
    ).join("");

    glitchTxt.textContent = glitched;

    setTimeout(() => {
        glitchTxt.textContent = originalText;
    }, 150);
}

// Trigger glitch overlay & start random glitch interval
function startGlitching() {
    glitchTxt.setAttribute("data-text", originalText);
    glitchTxt.classList.add("glitching");

    setInterval(glitchEffect, 500);
}

// Begin typing on page load
document.addEventListener('DOMContentLoaded', () => {
    if (glitchTxt) {
        glitchTxt.textContent = "";
        typeText();
    }
});

/*
Add this CSS to your stylesheet for the hover effect:
.onion-hover {
    transition: color 0.3s;
    cursor: pointer;
}
.onion-hover:hover {
    color: #ffa197 !important;
}
*/

// Typing animation for .gradient-text ("Terminal Unlocked" + "Tom Has Peeled the Onion")
(function () {
    let gradientAnimated = false;
    document.addEventListener('DOMContentLoaded', function () {
        const gradientTextEl = document.querySelector('.gradient-text.josefin-sans');
        if (!gradientTextEl) return;
        const firstLine = 'Terminal Unlocked';
        const fullText = 'Tom Has Peeled the Onion';
        const onionStart = fullText.indexOf('Onion');
        const onionEnd = onionStart + 'Onion'.length;

        function typeGradientText() {
            let i = 0;
            // First type 'Terminal Unlocked'
            function typeFirstLine() {
                gradientTextEl.innerHTML = firstLine.substring(0, i);
                if (i < firstLine.length) {
                    i++;
                    setTimeout(typeFirstLine, 70);
                } else {
                    // Add a line break and start typing the main text
                    gradientTextEl.innerHTML = firstLine + '<br>';
                    setTimeout(typeSecondLine, 400);
                }
            }
            // Then type 'Tom Has Peeled the Onion' with onion-word span
            let j = 0;
            function typeSecondLine() {
                let html = firstLine + '<br>';
                for (let k = 0; k <= j; k++) {
                    if (k === onionStart) html += '<span class="onion-word">';
                    html += fullText[k] || '';
                    if (k === onionEnd - 1) html += '</span>';
                }
                gradientTextEl.innerHTML = html;
                if (j < fullText.length - 1) {
                    j++;
                    setTimeout(typeSecondLine, 70);
                }
            }
            typeFirstLine();
        }

        // IntersectionObserver to trigger typing when in viewport
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !gradientAnimated) {
                    gradientAnimated = true;
                    typeGradientText();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        observer.observe(gradientTextEl);
    });
})();
