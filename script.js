// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
    } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
    }
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
    });
});

// ========================================
// Gallery Lightbox
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
let currentImageIndex = 0;
const galleryButtons = document.querySelectorAll('.gallery-btn');
let allGalleryImages = [];

// Store all gallery images
galleryButtons.forEach((btn, index) => {
    allGalleryImages.push(btn.getAttribute('data-image'));
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentImageIndex = index;
        openLightbox(btn.getAttribute('data-image'));
    });
});

function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(n) {
    currentImageIndex += n;
    
    if (currentImageIndex >= allGalleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = allGalleryImages.length - 1;
    }
    
    lightboxImage.src = allGalleryImages[currentImageIndex];
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// ========================================
// Smooth Scroll Enhancement
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Header Background Change on Scroll
// ========================================
const header = document.querySelector('.header');

function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(26, 35, 50, 0.1)';
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll('.service-card, .why-us-card, .about-text');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in-up');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========================================
// WhatsApp Link with Pre-filled Message
// ========================================
const whatsappButton = document.querySelector('.btn-whatsapp');

if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '6281234567890'; // Replace with actual number
        const message = encodeURIComponent('Halo Tunas Aluminium, saya tertarik dengan layanan kusen aluminium. Mohon informasi lebih lanjut.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}

// ========================================
// Dynamic Year in Footer
// ========================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Tunas Aluminium. All rights reserved.`;
}

// ========================================
// Prevent Empty Links
// ========================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Back to Top Button (Optional Enhancement)
// ========================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="ri-arrow-up-line"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    const styles = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--color-accent);
            color: var(--color-primary);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: #f4b931;
            transform: translateY(-5px);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize back to top button
createBackToTopButton();

// ========================================
// Console Message (Optional)
// ========================================
console.log('%cTunas Aluminium', 'color: #ffc952; font-size: 24px; font-weight: bold;');
console.log('%cWebsite by Professional Web Developer', 'color: #4a5f7a; font-size: 12px;');
