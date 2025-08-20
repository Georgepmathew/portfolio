// Professional Portfolio JavaScript
// German Engineering Approach: Clean, Efficient, Reliable

class PortfolioManager {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {
            de: {
                nav: {
                    about: 'Über mich',
                    experience: 'Erfahrung',
                    projects: 'Projekte',
                    contact: 'Kontakt'
                },
                hero: {
                    title: 'Digital Transformation Leader',
                    subtitle: 'Spezialist für Geschäftsprozessoptimierung und strategische Unternehmensführung',
                    cta: 'Projekte ansehen'
                },
                about: {
                    title: 'Über mich',
                    text: 'Erfahrener Manager mit Fokus auf digitale Transformation und Geschäftsprozessoptimierung. Expertise in der Leitung komplexer Projekte und strategischer Unternehmensentwicklung.'
                },
                experience: {
                    title: 'Berufserfahrung',
                    current: 'Aktuell',
                    years: 'Jahre'
                },
                projects: {
                    title: 'Projekte',
                    viewProject: 'Projekt ansehen'
                },
                contact: {
                    title: 'Kontakt',
                    phone: 'Telefon',
                    email: 'E-Mail',
                    linkedin: 'LinkedIn',
                    location: 'Standort'
                }
            },
            en: {
                nav: {
                    about: 'About',
                    experience: 'Experience',
                    projects: 'Projects',
                    contact: 'Contact'
                },
                hero: {
                    title: 'Digital Transformation Leader',
                    subtitle: 'Specialist in Business Process Optimization and Strategic Management',
                    cta: 'View Projects'
                },
                about: {
                    title: 'About Me',
                    text: 'Experienced manager focused on digital transformation and business process optimization. Expertise in leading complex projects and strategic business development.'
                },
                experience: {
                    title: 'Professional Experience',
                    current: 'Current',
                    years: 'years'
                },
                projects: {
                    title: 'Projects',
                    viewProject: 'View Project'
                },
                contact: {
                    title: 'Contact',
                    phone: 'Phone',
                    email: 'Email',
                    linkedin: 'LinkedIn',
                    location: 'Location'
                }
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupMobileNavigation();
        this.updateLanguage();
        this.setupSmoothScrolling();
        this.setupFormHandling();
    }

    setupEventListeners() {
        // Language toggle
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                const mobileNav = document.querySelector('.mobile-nav');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileNav && mobileMenuBtn) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileNav = document.querySelector('.mobile-nav');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileNav && mobileMenuBtn && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Update active navigation
                    const id = entry.target.id;
                    if (id) {
                        this.updateActiveNavigation(id);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe project cards for stagger animation
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    }

    updateActiveNavigation(activeId) {
        // Update desktop navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupMobileNavigation() {
        // Show/hide mobile navigation based on scroll
        let lastScrollY = window.scrollY;
        const mobileNav = document.querySelector('.mobile-nav-container');
        
        if (!mobileNav) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down - hide mobile nav
                    mobileNav.style.transform = 'translateY(100%)';
                } else {
                    // Scrolling up - show mobile nav
                    mobileNav.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = this.currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                this.showNotification(
                    this.currentLanguage === 'de' 
                        ? 'Nachricht erfolgreich gesendet!' 
                        : 'Message sent successfully!',
                    'success'
                );
                
                contactForm.reset();
            } catch (error) {
                // Show error message
                this.showNotification(
                    this.currentLanguage === 'de' 
                        ? 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.' 
                        : 'Error sending message. Please try again.',
                    'error'
                );
            } finally {
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'de' ? 'en' : 'de';
        this.updateLanguage();
        
        // Store preference
        localStorage.setItem('preferredLanguage', this.currentLanguage);
    }

    updateLanguage() {
        const translations = this.translations[this.currentLanguage];
        
        // Update language toggle button
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'de' ? 'EN' : 'DE';
            langToggle.setAttribute('aria-label', 
                this.currentLanguage === 'de' 
                    ? 'Switch to English' 
                    : 'Zur deutschen Version wechseln'
            );
        }

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getNestedProperty(translations, key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update document language
        document.documentElement.lang = this.currentLanguage;
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">×</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('notification--fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.classList.add('notification--fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Performance optimization: Debounced scroll handler
    debounce(func, wait) {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for stored language preference
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    const portfolio = new PortfolioManager();
    
    if (storedLanguage && ['de', 'en'].includes(storedLanguage)) {
        portfolio.currentLanguage = storedLanguage;
        portfolio.updateLanguage();
    }

    // Add loading class removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Enhanced accessibility
    document.addEventListener('keydown', (e) => {
        // Skip navigation for screen readers
        if (e.key === 'Tab' && e.shiftKey && document.activeElement === document.body) {
            const skipLink = document.querySelector('.skip-link');
            if (skipLink) {
                skipLink.focus();
            }
        }
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}
