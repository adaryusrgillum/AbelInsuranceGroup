/**
 * Abel Insurance Group - Main JavaScript
 * Enhanced with neuromarketing interactions and performance optimizations
 */

(function() {
    'use strict';

    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Debounce function for performance optimization
     */
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

    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ============================================
    // Navigation Functionality
    // ============================================
    
    /**
     * Mobile menu toggle
     */
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a link
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    /**
     * Sticky navigation on scroll
     */
    function initStickyNav() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;

        const handleScroll = debounce(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }

    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Animated Counters for Statistics
    // ============================================
    
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const isPercentage = element.textContent.includes('%');
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                if (isPercentage) element.textContent += '%';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
                if (isPercentage) element.textContent += '%';
            }
        };
        
        updateCounter();
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let animated = false;

        const animateOnScroll = () => {
            if (animated) return;

            counters.forEach(counter => {
                if (isInViewport(counter)) {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                    animated = true;
                }
            });
        };

        window.addEventListener('scroll', debounce(animateOnScroll, 100));
        animateOnScroll(); // Check on load
    }

    // ============================================
    // Back to Top Button
    // ============================================
    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;

        const handleScroll = debounce(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Form Validation and Submission
    // ============================================
    
    function initFormHandling() {
        const form = document.getElementById('quoteForm');
        
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!validateForm(data)) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (in production, this would be an API call)
            setTimeout(() => {
                showNotification('Thank you! We\'ll contact you shortly with your free quote.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track conversion (analytics would go here)
                console.log('Form submitted:', data);
            }, 1500);
        });
    }

    function validateForm(data) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            return false;
        }

        // Check required fields
        if (!data.fullName || !data.email || !data.phone || !data.insuranceType) {
            return false;
        }

        return true;
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease-out'
        });

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // ============================================
    // Intersection Observer for Fade-in Animations
    // ============================================
    
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.service-card, .benefit-item, .testimonial-card, .stat-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // ============================================
    // Real-time Form Input Enhancements
    // ============================================
    
    function initFormEnhancements() {
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                    }
                }
                e.target.value = value;
            });
        }

        // Add focus/blur effects to form inputs
        const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
    }

    // ============================================
    // Urgency Timer (Psychological Trigger)
    // ============================================
    
    function initUrgencyTimer() {
        const urgencyElements = document.querySelectorAll('.hero-urgency, .cta-urgency-banner');
        
        // Create countdown for "limited time offer"
        urgencyElements.forEach(element => {
            // Add pulsing effect
            setInterval(() => {
                element.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        });
    }

    // ============================================
    // Trust Signal Enhancements
    // ============================================
    
    function initTrustSignals() {
        // Add subtle animations to trust badges
        const trustBadges = document.querySelectorAll('.trust-badge, .badge-item');
        
        trustBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateX(-10px)';
                badge.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                
                requestAnimationFrame(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateX(0)';
                });
            }, index * 100);
        });
    }

    // ============================================
    // Performance Optimizations
    // ============================================
    
    /**
     * Lazy load images when they come into viewport
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
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
    }

    /**
     * Add CSS animation classes
     */
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            /* Mobile menu styles */
            @media (max-width: 767px) {
                .nav-links.active {
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background-color: white;
                    padding: 2rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    animation: slideDown 0.3s ease-out;
                }

                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }

                body.menu-open {
                    overflow: hidden;
                }
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Enhanced scrollbar for webkit browsers */
            ::-webkit-scrollbar {
                width: 12px;
            }

            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            ::-webkit-scrollbar-thumb {
                background: #1a56db;
                border-radius: 6px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: #0e3a8f;
            }

            /* Loading state for form button */
            button[disabled] {
                opacity: 0.6;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // Analytics and Tracking (Placeholder)
    // ============================================
    
    function initAnalytics() {
        // Track CTA clicks
        const ctaButtons = document.querySelectorAll('.btn-primary, .service-cta');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                console.log('CTA Clicked:', buttonText);
                
                // In production, send to analytics service:
                // ga('send', 'event', 'CTA', 'click', buttonText);
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', debounce(() => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercentage > maxScroll) {
                maxScroll = Math.floor(scrollPercentage / 25) * 25; // Track in 25% increments
                console.log('Scroll depth:', maxScroll + '%');
                
                // In production:
                // ga('send', 'event', 'Scroll Depth', maxScroll + '%');
            }
        }, 500));
    }

    // ============================================
    // Initialize All Features
    // ============================================
    
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Add animation styles
        addAnimationStyles();

        // Initialize all features
        initMobileMenu();
        initStickyNav();
        initSmoothScroll();
        initCounters();
        initBackToTop();
        initFormHandling();
        initFormEnhancements();
        initAnimations();
        initUrgencyTimer();
        initTrustSignals();
        initLazyLoading();
        initAnalytics();

        // Log initialization
        console.log('Abel Insurance Group website initialized successfully');
    }

    // Start initialization
    init();

    // ============================================
    // Expose public API (if needed)
    // ============================================
    
    window.AbelInsurance = {
        showNotification: showNotification,
        version: '1.0.0'
    };

})();
