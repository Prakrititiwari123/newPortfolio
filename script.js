// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Dark/Light Theme Toggle
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeIcon(nextTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-moon', theme === 'light');
    icon.classList.toggle('fa-sun', theme === 'dark');
}

// Smooth scrolling for anchor links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // Apply stagger delays to child elements
            const animatedChildren = entry.target.querySelectorAll(
                '.about-para, .stat-item, .skill-category, .skill-tag, ' +
                '.project-card, .exp-card, .achievement-item, .contact-links a'
            );
            
            animatedChildren.forEach((child, index) => {
                child.style.animationPlayState = 'running';
            });
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .exp-card, .achievement-item').forEach(el => {
    observer.observe(el);
});

// Set initial animation state to paused for scroll-triggered animations
document.querySelectorAll(
    '.about-para, .stat-item, .skill-category, .skill-tag, ' +
    '.project-card, .exp-card, .achievement-item, .contact-links a, .edu-card'
).forEach(el => {
    el.style.animationPlayState = 'paused';
});

window.addEventListener('load', () => {
    document.querySelector('.home-content')?.classList.add('animate-in');
});

// Typing effect for title (optional)
const titles = ['MERN Stack Developer', 'Full Stack Developer', 'React.js Enthusiast'];
let titleIndex = 0;
let charIndex = 0;
const titleElement = document.querySelector('.title');

function typeTitle() {
    if (charIndex < titles[titleIndex].length) {
        titleElement.textContent = titles[titleIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeTitle, 100);
    } else {
        setTimeout(eraseTitle, 2000);
    }
}

function eraseTitle() {
    if (charIndex > 0) {
        titleElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseTitle, 50);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500);
    }
}

// Start typing effect (uncomment if you want it)
// setTimeout(typeTitle, 1000);
