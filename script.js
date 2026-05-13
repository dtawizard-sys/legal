document.addEventListener('DOMContentLoaded', () => {
    // 1. Disclaimer Modal Logic
    const modal = document.getElementById('disclaimer-modal');
    const acceptBtn = document.getElementById('accept-disclaimer');
    
    // Check if user has already accepted in this session
    const hasAccepted = sessionStorage.getItem('disclaimerAccepted');
    
    if (!hasAccepted) {
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
        
        // Show modal with a slight delay for better UX
        setTimeout(() => {
            modal.classList.add('active');
        }, 500);
    }

    acceptBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        sessionStorage.setItem('disclaimerAccepted', 'true');
    });

    // Handle form submission (prevent default for demo)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out. We will get back to you shortly.');
            contactForm.reset();
        });
    }

    // 2. Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Sticky Header on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 5. Fade-in on Scroll Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all sections and add fade-in class, then observe
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// Function to explicitly show disclaimer from footer link
window.showDisclaimer = function(e) {
    e.preventDefault();
    const modal = document.getElementById('disclaimer-modal');
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
};
