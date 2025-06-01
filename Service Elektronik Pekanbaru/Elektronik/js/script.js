// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize form handling
    initFormHandler();
    
    // Initialize loading animations
    initLoadingAnimations();
    
    // Initialize navbar behavior
    initNavbar();
});

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const scrollPercentage = (currentScroll / maxScroll);
        scrollIndicator.style.transform = `scaleX(${scrollPercentage})`;
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

// Form Handler
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nama = document.getElementById('nama').value;
            const telepon = document.getElementById('telepon').value;
            const layanan = document.getElementById('layanan').value;
            const pesan = document.getElementById('pesan').value;
            
            // Create WhatsApp message
            const waMessage = `Halo Service Elektronik Pekanbaru,\n\n`
                + `Nama: ${nama}\n`
                + `Telepon: ${telepon}\n`
                + `Layanan: ${layanan}\n`
                + `Pesan: ${pesan}`;
            
            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(waMessage);
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/6288271600472?text=${encodedMessage}`, '_blank');
            
            // Reset form
            this.reset();
        });
    }
}

// Loading Animations
function initLoadingAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const loadingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add loading class to elements
    document.querySelectorAll('.service-card, .feature-card, .contact-card').forEach(el => {
        el.classList.add('loading');
        loadingObserver.observe(el);
    });
}

// Navbar Behavior
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add animation on hover for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add pulse animation for WhatsApp button
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.classList.add('pulse');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse');
        }, 1000);
    }, 3000);
}

// Handle mobile menu
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });
}

// Add scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        document.querySelector('.whatsapp-float').style.bottom = '90px';
    } else {
        document.querySelector('.whatsapp-float').style.bottom = '30px';
    }
});
