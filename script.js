// ===================================
// NAVIGATION
// ===================================

// Sticky navigation on scroll
const nav = document.getElementById('main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for just "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.getElementById('main-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NETWORK DIAGRAM - HTML/CSS/SVG
// ===================================

const networkSvg = document.getElementById('network-svg');
const networkDesktop = document.getElementById('network-diagram-desktop');
const mobileNetworkCards = document.getElementById('mobile-network-cards');

const isMobile = () => window.innerWidth <= 768;

// Node data
const outerNodes = [
    { 
        label: 'Macro Research', 
        description: 'Top-down analysis of global economic conditions, policy dynamics, and market cycles', 
        angle: 0, 
        radius: 60 
    },
    { 
        label: 'Asset Allocation', 
        description: 'Rigorous framework for positioning across asset classes, geographies, and risk factors', 
        angle: Math.PI * 2 / 5, 
        radius: 60 
    },
    { 
        label: 'Securities Analysis', 
        description: 'Fundamental and quantitative evaluation of individual securities across equities and fixed income', 
        angle: Math.PI * 4 / 5, 
        radius: 60 
    },
    { 
        label: 'Manager Due Diligence', 
        description: 'Rigorous due diligence on external managers and investment vehicles where applicable', 
        angle: Math.PI * 6 / 5, 
        radius: 60 
    },
    { 
        label: 'Risk Oversight', 
        description: 'Continuous portfolio-level risk monitoring with emphasis on downside protection and tail risk management', 
        angle: Math.PI * 8 / 5, 
        radius: 60 
    }
];

// Initialize mobile cards - always show full descriptions, no arrows
function initMobileCards() {
    if (!mobileNetworkCards) return;
    
    mobileNetworkCards.innerHTML = '';
    
    outerNodes.forEach((node, index) => {
        const card = document.createElement('div');
        card.className = 'mobile-network-card';
        card.innerHTML = `
            <div class="mobile-card-header">
                <div class="mobile-card-number">${index + 1}</div>
                <h4 class="mobile-card-title">${node.label}</h4>
            </div>
            <div class="mobile-card-content">
                <p class="mobile-card-description">${node.description}</p>
            </div>
        `;
        
        mobileNetworkCards.appendChild(card);
    });
}

// Create SVG connectors with orthogonal paths
function createSVGConnectors() {
    if (!networkSvg || !networkDesktop || isMobile()) return;
    
    networkSvg.innerHTML = '';
    
    // Get center node position
    const centerNode = document.getElementById('center-node');
    if (!centerNode) return;
    
    const centerRect = centerNode.getBoundingClientRect();
    const containerRect = networkDesktop.getBoundingClientRect();
    
    const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;
    
    // Create path for each outer node
    for (let i = 0; i < 5; i++) {
        const outerNode = document.getElementById(`node-${i}`);
        if (!outerNode) continue;
        
        const outerRect = outerNode.getBoundingClientRect();
        const outerX = outerRect.left + outerRect.width / 2 - containerRect.left;
        const outerY = outerRect.top + outerRect.height / 2 - containerRect.top;
        
        // Create orthogonal path with rounded corners
        const path = createOrthogonalPath(centerX, centerY, outerX, outerY);
        
        // Create path element
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
        pathElement.setAttribute('stroke-width', '1.5');
        pathElement.setAttribute('fill', 'none');
        pathElement.setAttribute('id', `path-${i}`);
        
        networkSvg.appendChild(pathElement);
        
        // Create animated dots
        createAnimatedDots(pathElement, i);
    }
}

// Create orthogonal path with rounded corners
function createOrthogonalPath(x1, y1, x2, y2) {
    const radius = 12;
    const midX = (x1 + x2) / 2;
    
    let path = `M ${x1} ${y1} `;
    
    // Determine if we need horizontal-vertical or vertical-horizontal routing
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal first, then vertical
        if (dx > 0) {
            // Going right
            path += `L ${midX - radius} ${y1} `;
            path += `Q ${midX} ${y1} ${midX} ${y1 + (dy > 0 ? radius : -radius)} `;
            path += `L ${midX} ${y2 - (dy > 0 ? radius : -radius)} `;
            path += `Q ${midX} ${y2} ${midX + radius} ${y2} `;
            path += `L ${x2} ${y2}`;
        } else {
            // Going left
            path += `L ${midX + radius} ${y1} `;
            path += `Q ${midX} ${y1} ${midX} ${y1 + (dy > 0 ? radius : -radius)} `;
            path += `L ${midX} ${y2 - (dy > 0 ? radius : -radius)} `;
            path += `Q ${midX} ${y2} ${midX - radius} ${y2} `;
            path += `L ${x2} ${y2}`;
        }
    } else {
        // Vertical first, then horizontal
        if (dy > 0) {
            // Going down
            const midY = (y1 + y2) / 2;
            path += `L ${x1} ${midY - radius} `;
            path += `Q ${x1} ${midY} ${x1 + (dx > 0 ? radius : -radius)} ${midY} `;
            path += `L ${x2 - (dx > 0 ? radius : -radius)} ${midY} `;
            path += `Q ${x2} ${midY} ${x2} ${midY + radius} `;
            path += `L ${x2} ${y2}`;
        } else {
            // Going up
            const midY = (y1 + y2) / 2;
            path += `L ${x1} ${midY + radius} `;
            path += `Q ${x1} ${midY} ${x1 + (dx > 0 ? radius : -radius)} ${midY} `;
            path += `L ${x2 - (dx > 0 ? radius : -radius)} ${midY} `;
            path += `Q ${x2} ${midY} ${x2} ${midY - radius} `;
            path += `L ${x2} ${y2}`;
        }
    }
    
    return path;
}

// Create animated dots along path
function createAnimatedDots(pathElement, index) {
    const numDots = 3;
    
    for (let i = 0; i < numDots; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '3');
        circle.setAttribute('fill', '#FFFFFF');
        circle.setAttribute('opacity', '0');
        
        // Create animateMotion
        const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animateMotion.setAttribute('dur', '4s');
        animateMotion.setAttribute('repeatCount', 'indefinite');
        animateMotion.setAttribute('begin', `${i * 1.3}s`);
        
        const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
        mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#path-${index}`);
        
        animateMotion.appendChild(mpath);
        circle.appendChild(animateMotion);
        
        // Fade in/out animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'opacity');
        animate.setAttribute('values', '0;1;1;0');
        animate.setAttribute('keyTimes', '0;0.1;0.9;1');
        animate.setAttribute('dur', '4s');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('begin', `${i * 1.3}s`);
        
        circle.appendChild(animate);
        networkSvg.appendChild(circle);
    }
}

// Initialize diagram on desktop
if (networkDesktop && !isMobile()) {
    createSVGConnectors();
}

// Recreate on resize
window.addEventListener('resize', () => {
    if (!isMobile()) {
        createSVGConnectors();
    } else {
        initMobileCards();
    }
});

// Old canvas code removed
if (false) {
    const ctx = networkCanvas.getContext('2d');
    
    // Set canvas size - increased by 40%
    function resizeNetworkCanvas() {
        const container = networkCanvas.parentElement;
        networkCanvas.width = container.offsetWidth;
        networkCanvas.height = 840; // Increased by 40%
    }
    resizeNetworkCanvas();
    window.addEventListener('resize', () => {
        resizeNetworkCanvas();
        if (isMobile()) {
            initMobileCards();
        }
    });
    
    const centerNode = {
        x: 0,
        y: 0,
        width: 140,
        height: 100,
        color: '#6B1E2E'
    };
    
    // Load B logo image
    const bLogoImage = new Image();
    bLogoImage.src = 'assets/images/B_-_Logo_White.jpg';
    
    // Traveling dots
    const dots = [];
    
    function initDots() {
        dots.length = 0;
        outerNodes.forEach((node, index) => {
            const numDots = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numDots; i++) {
                dots.push({
                    nodeIndex: index,
                    progress: i / numDots,
                    speed: 0.003 + Math.random() * 0.002,
                    direction: Math.random() > 0.5 ? 1 : -1,
                    color: Math.random() > 0.5 ? '#6B1E2E' : '#FFFFFF'
                });
            }
        });
    }
    
    initDots();
    
    // Track hovered node
    let hoveredNodeIndex = -1;
    let nodePositions = [];
    
    // Helper function to draw rounded rectangle
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
    
    // Helper function to create orthogonal path with rounded corners
    function drawOrthogonalPath(ctx, x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const cornerRadius = 10;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        // Horizontal from center
        if (Math.abs(x2 - x1) > cornerRadius * 2) {
            ctx.lineTo(midX - cornerRadius, y1);
            ctx.quadraticCurveTo(midX, y1, midX, y1 + (y2 > y1 ? cornerRadius : -cornerRadius));
        } else {
            ctx.lineTo(x1, y1 + (y2 - y1) / 2 - cornerRadius);
            ctx.quadraticCurveTo(x1, y1 + (y2 - y1) / 2, x1 + (x2 > x1 ? cornerRadius : -cornerRadius), y1 + (y2 - y1) / 2);
        }
        
        // Vertical
        if (Math.abs(y2 - y1) > cornerRadius * 2) {
            ctx.lineTo(midX, y2 - cornerRadius);
            ctx.quadraticCurveTo(midX, y2, midX + (x2 > midX ? cornerRadius : -cornerRadius), y2);
        }
        
        // Horizontal to node
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Animation loop
    function animateNetwork() {
        if (isMobile()) {
            // Don't animate on mobile, but keep checking
            requestAnimationFrame(animateNetwork);
            return;
        }
        
        ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
        
        const centerX = networkCanvas.width / 2;
        const centerY = networkCanvas.height / 2;
        const radius = Math.min(networkCanvas.width, networkCanvas.height) * 0.38 * 1.3; // Increased by 30%
        
        centerNode.x = centerX;
        centerNode.y = centerY;
        
        nodePositions = [];
        
        // Draw connections first with orthogonal paths
        outerNodes.forEach((node, index) => {
            const nodeX = centerX + Math.cos(node.angle - Math.PI / 2) * radius;
            const nodeY = centerY + Math.sin(node.angle - Math.PI / 2) * radius;
            
            const nodeWidth = 200;
            const nodeHeight = 120;
            nodePositions.push({ x: nodeX, y: nodeY, width: nodeWidth, height: nodeHeight, index });
            
            // Draw orthogonal path
            drawOrthogonalPath(ctx, centerNode.x, centerNode.y, nodeX, nodeY);
        });
        
        // Draw center node (rounded rectangle with B logo)
        const centerRectX = centerNode.x - centerNode.width / 2;
        const centerRectY = centerNode.y - centerNode.height / 2;
        
        drawRoundedRect(ctx, centerRectX, centerRectY, centerNode.width, centerNode.height, 12);
        ctx.fillStyle = centerNode.color;
        ctx.fill();
        ctx.shadowColor = centerNode.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw B logo if loaded
        if (bLogoImage.complete) {
            const logoSize = 30;
            ctx.drawImage(bLogoImage, centerNode.x - logoSize / 2, centerNode.y - 30, logoSize, logoSize);
        }
        
        // Draw center label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Figtree';
        ctx.textAlign = 'center';
        ctx.fillText('Baritone', centerNode.x, centerNode.y + 5);
        ctx.fillText('Research', centerNode.x, centerNode.y + 22);
        
        // Draw outer nodes (rounded rectangles)
        outerNodes.forEach((node, index) => {
            const nodeX = centerX + Math.cos(node.angle - Math.PI / 2) * radius;
            const nodeY = centerY + Math.sin(node.angle - Math.PI / 2) * radius;
            
            const isHovered = hoveredNodeIndex === index;
            const nodeWidth = isHovered ? 210 : 200;
            const nodeHeight = isHovered ? 126 : 120;
            
            const rectX = nodeX - nodeWidth / 2;
            const rectY = nodeY - nodeHeight / 2;
            
            // Draw node rounded rectangle
            drawRoundedRect(ctx, rectX, rectY, nodeWidth, nodeHeight, 12);
            ctx.fillStyle = '#1C1F24';
            ctx.fill();
            
            // Add border ring if hovered
            if (isHovered) {
                ctx.strokeStyle = '#6B1E2E';
                ctx.lineWidth = 3;
                ctx.shadowColor = '#6B1E2E';
                ctx.shadowBlur = 15;
                ctx.stroke();
                ctx.shadowBlur = 0;
            } else {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            // Draw label
            ctx.fillStyle = '#E8E8E8';
            ctx.font = 'bold 14px Figtree';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, nodeX, nodeY - 35);
            
            // Always draw description inside node
            ctx.fillStyle = 'rgba(232, 232, 232, 0.85)';
            ctx.font = '400 11px Figtree';
            ctx.textAlign = 'center';
            
            // Word wrap the description
            const maxWidth = nodeWidth - 20;
            const words = node.description.split(' ');
            let line = '';
            let lineY = nodeY - 10;
            const lineHeight = 14;
            
            words.forEach((word, i) => {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);
                
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line.trim(), nodeX, lineY);
                    line = word + ' ';
                    lineY += lineHeight;
                } else {
                    line = testLine;
                }
            });
            ctx.fillText(line.trim(), nodeX, lineY);
        });
        
        requestAnimationFrame(animateNetwork);
    }
    
    animateNetwork();
    
    // Mouse move handler for hover detection (rectangular hit areas)
    networkCanvas.addEventListener('mousemove', (e) => {
        if (isMobile()) return;
        
        const rect = networkCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        let foundHover = false;
        
        for (let i = 0; i < nodePositions.length; i++) {
            const pos = nodePositions[i];
            const halfWidth = pos.width / 2;
            const halfHeight = pos.height / 2;
            
            // Check if mouse is inside rectangle
            if (mouseX >= pos.x - halfWidth && mouseX <= pos.x + halfWidth &&
                mouseY >= pos.y - halfHeight && mouseY <= pos.y + halfHeight) {
                if (hoveredNodeIndex !== pos.index) {
                    hoveredNodeIndex = pos.index;
                }
                foundHover = true;
                networkCanvas.style.cursor = 'pointer';
                break;
            }
        }
        
        if (!foundHover && hoveredNodeIndex !== -1) {
            hoveredNodeIndex = -1;
            networkCanvas.style.cursor = 'default';
        }
    });
    
    networkCanvas.addEventListener('mouseleave', () => {
        hoveredNodeIndex = -1;
        hidePopover();
        networkCanvas.style.cursor = 'default';
    });
    
    // Touch handler for mobile canvas (if shown)
    networkCanvas.addEventListener('click', (e) => {
        if (!isMobile()) return;
        
        const rect = networkCanvas.getBoundingClientRect();
        const touchX = e.clientX - rect.left;
        const touchY = e.clientY - rect.top;
        
        for (let i = 0; i < nodePositions.length; i++) {
            const pos = nodePositions[i];
            const dist = Math.sqrt((touchX - pos.x) ** 2 + (touchY - pos.y) ** 2);
            
            if (dist <= pos.radius) {
                showMobilePanel(outerNodes[pos.index]);
                break;
            }
        }
    });
}

// Popover functions
function showPopover(node, x, y) {
    if (!nodePopover) return;
    
    popoverTitle.textContent = node.label;
    popoverDescription.textContent = node.description;
    
    // Position popover
    const popoverWidth = 320;
    const popoverHeight = 150; // Approximate
    const padding = 20;
    
    let left = x + 15;
    let top = y - popoverHeight / 2;
    
    // Keep within viewport
    if (left + popoverWidth > window.innerWidth - padding) {
        left = x - popoverWidth - 15;
    }
    if (top < padding) {
        top = padding;
    }
    if (top + popoverHeight > window.innerHeight - padding) {
        top = window.innerHeight - popoverHeight - padding;
    }
    
    nodePopover.style.left = left + 'px';
    nodePopover.style.top = top + 'px';
    nodePopover.classList.add('visible');
}

function hidePopover() {
    if (nodePopover) {
        nodePopover.classList.remove('visible');
    }
}

// Mobile panel functions
function showMobilePanel(node) {
    if (!mobilePanel) return;
    
    mobilePanelTitle.textContent = node.label;
    mobilePanelDescription.textContent = node.description;
    mobilePanel.classList.add('visible');
}

function hideMobilePanel() {
    const mobilePanel = document.querySelector('.mobile-description-panel');
    if (mobilePanel) {
        mobilePanel.classList.remove('visible');
    }
}

const mobilePanelClose = document.querySelector('.mobile-panel-close');
if (mobilePanelClose) {
    mobilePanelClose.addEventListener('click', hideMobilePanel);
}


// Initialize mobile cards on load
if (isMobile()) {
    initMobileCards();
}

// ===================================
// INTERSECTION OBSERVER - ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if element has data-count attribute
            if (entry.target.hasAttribute('data-count')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.feature-card, .process-step, .ai-callout, .leadership-card, .fade-in, [data-count]'
);

animatedElements.forEach(el => observer.observe(el));

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// ===================================
// PIPELINE WIDGET ANIMATION
// ===================================

const pipelineItems = document.querySelectorAll('.pipeline-item');
const statuses = ['updated', 'reviewed', 'running', 'pending'];

if (pipelineItems.length > 0) {
    let currentIndex = 0;
    
    // Cycle through pipeline statuses
    setInterval(() => {
        pipelineItems.forEach((item, index) => {
            const newStatusIndex = (currentIndex + index) % statuses.length;
            const newStatus = statuses[newStatusIndex];
            
            // Remove all status classes
            statuses.forEach(status => {
                item.setAttribute('data-status', newStatus);
            });
            
            // Update status text
            const statusText = item.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
            }
        });
        
        currentIndex = (currentIndex + 1) % statuses.length;
    }, 5000); // Change every 5 seconds
}

// ===================================
// TABS FUNCTIONALITY
// ===================================

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                // Error
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            // Network error
            formStatus.textContent = 'Network error. Please check your connection and try again.';
            formStatus.className = 'form-status error';
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        }
    });
}

// ===================================
// PARALLAX EFFECT ON HERO
// ===================================

const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        // Only apply parallax on desktop
        if (window.innerWidth > 768) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Trigger animations for elements already in viewport
    const viewportHeight = window.innerHeight;
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.85) {
            el.classList.add('visible');
            
            // Trigger counter if applicable
            if (el.hasAttribute('data-count')) {
                animateCounter(el);
            }
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images when they come into viewport
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation for tabs
tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        let newIndex;
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            newIndex = (index + 1) % tabButtons.length;
            tabButtons[newIndex].focus();
            tabButtons[newIndex].click();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            tabButtons[newIndex].focus();
            tabButtons[newIndex].click();
        }
    });
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add screen reader only class to CSS if not already present
if (!document.querySelector('style[data-sr-only]')) {
    const style = document.createElement('style');
    style.setAttribute('data-sr-only', 'true');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(style);
}
