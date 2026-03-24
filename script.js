// Créer des particules flottantes
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 10px #00ffff;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite;
            animation-delay: ${Math.random() * 15}s;
        `;
        document.body.appendChild(particle);
    }
}

// Animation des particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0; 
        }
        10% { 
            opacity: 1; 
        }
        90% { 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(style);

// Initialiser les particules au chargement de la page
createParticles();

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent s'animer
function addVeilleNavLink() {
    const navContainers = document.querySelectorAll('.nav-links');
    if (!navContainers.length) return;

    const path = window.location.pathname.toLowerCase();
    const isProjectSubpage = path.includes('/projets/');
    const veilleHref = isProjectSubpage ? '../veille-technologique-rugby.html' : 'veille-technologique-rugby.html';
    const isVeillePage = path.endsWith('/veille-technologique-rugby.html') || path.endsWith('veille-technologique-rugby.html');

    navContainers.forEach((container) => {
        const alreadyExists = Array.from(container.querySelectorAll('a')).some((link) => {
            const href = link.getAttribute('href');
            return href && href.indexOf('veille-technologique-rugby.html') !== -1;
        });
        if (alreadyExists) return;

        const projectsLink = Array.from(container.querySelectorAll('a')).find((link) => {
            const href = link.getAttribute('href') || '';
            return href === 'projets.html' || href === '../projets.html';
        });
        if (!projectsLink) return;

        const veilleLink = document.createElement('a');
        veilleLink.href = veilleHref;
        veilleLink.textContent = 'Veille Tech';
        if (isVeillePage) {
            veilleLink.classList.add('active');
        }

        projectsLink.insertAdjacentElement('afterend', veilleLink);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addVeilleNavLink();

    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .feature-card, .about-container, .contact-container, .form-group'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});

// Effet de typing pour les titres (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Effet de parallax léger sur le curseur
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animateParallax() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    const parallaxElements = document.querySelectorAll('.hero-visual, .rotating-cube');
    parallaxElements.forEach(el => {
        if (el) {
            el.style.transform = `translate(${currentX * 20}px, ${currentY * 20}px)`;
        }
    });
    
    requestAnimationFrame(animateParallax);
}

animateParallax();

// Animation des barres de compétences
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 2s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Effet de glitch aléatoire sur le titre
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        if (Math.random() > 0.95) {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'glitch 0.3s';
            }, 10);
        }
    });
}

setInterval(randomGlitch, 3000);

// Préventions des erreurs console
console.log('%c🚀 Portfolio Futuriste', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cSystème initialisé avec succès', 'color: #ff00ff;');