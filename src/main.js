/**
 * Rotra Horizon B.V. - Main JavaScript File
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Global variables
     */
    const isMobile = window.innerWidth < 992;

    /**
     * Navigation functionality
     */
    const initNavigation = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('.navigation');
        const body = document.body;
        const dropdownItems = document.querySelectorAll('.dropdown');

        // Toggle mobile menu
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                nav.classList.toggle('active');
                body.classList.toggle('menu-open');
            });
        }

        // Handle dropdown menus on mobile
        if (isMobile && dropdownItems.length > 0) {
            dropdownItems.forEach(item => {
                const link = item.querySelector('a');
                
                link.addEventListener('click', (e) => {
                    // Only preventDefault on mobile to allow normal navigation on desktop
                    e.preventDefault();
                    const dropdown = item.querySelector('.dropdown-menu');
                    dropdown.classList.toggle('show');
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav && nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    };

    /**
     * Header scroll effect
     */
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
    };

    /**
     * Back to Top Button
     */
    const initBackToTop = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (!backToTopButton) return;

        const toggleBackToTopButton = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleBackToTopButton);
        // Initial check
        toggleBackToTopButton();
    };

    /**
     * Hero Slider functionality
     */
    const initHeroSlider = () => {
        const heroSlider = document.querySelector('.hero-slider');
        
        if (!heroSlider) return;

        const slides = heroSlider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');

        let currentSlide = 0;
        let slideInterval;

        // Show a specific slide
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Deactivate all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show the selected slide and activate the corresponding dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        };

        // Move to next slide
        const nextSlide = () => {
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        };

        // Move to previous slide
        const prevSlide = () => {
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        };

        // Set up automatic slideshow
        const startSlideshow = () => {
            slideInterval = setInterval(nextSlide, 7000);
        };

        // Stop slideshow (on user interaction)
        const stopSlideshow = () => {
            clearInterval(slideInterval);
        };

        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Initialize slider
        showSlide(0);
        startSlideshow();
    };

    /**
     * Testimonial Slider functionality
     */
    const initTestimonialSlider = () => {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        if (testimonialItems.length === 0) return;

        const dots = document.querySelectorAll('.testimonial-dots .t-dot');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');

        let currentTestimonial = 0;

        // Show a specific testimonial
        const showTestimonial = (index) => {
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });

            // Deactivate all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show the selected testimonial and activate the corresponding dot
            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentTestimonial = index;
        };

        // Move to next testimonial
        const nextTestimonial = () => {
            const newIndex = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(newIndex);
        };

        // Move to previous testimonial
        const prevTestimonial = () => {
            const newIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(newIndex);
        };

        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', prevTestimonial);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextTestimonial);
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Initialize slider
        showTestimonial(0);
    };

    /**
     * Equipment/Fleet Slider functionality
     */
    const initSliders = () => {
        const initSlider = (containerClass, dotClass, prevBtnClass, nextBtnClass) => {
            const slides = document.querySelectorAll(`.${containerClass} .equipment-slide, .${containerClass} .fleet-slide`);
            
            if (slides.length === 0) return;

            const dots = document.querySelectorAll(`.${containerClass} .slider-dots .${dotClass}`);
            const prevBtn = document.querySelector(`.${containerClass} .${prevBtnClass}`);
            const nextBtn = document.querySelector(`.${containerClass} .${nextBtnClass}`);

            let currentSlide = 0;

            // Show a specific slide
            const showSlide = (index) => {
                // Hide all slides
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });

                // Deactivate all dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Show the selected slide and activate the corresponding dot
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                
                currentSlide = index;
            };

            // Move to next slide
            const nextSlide = () => {
                const newIndex = (currentSlide + 1) % slides.length;
                showSlide(newIndex);
            };

            // Move to previous slide
            const prevSlide = () => {
                const newIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(newIndex);
            };

            // Event listeners for controls
            if (prevBtn) {
                prevBtn.addEventListener('click', prevSlide);
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', nextSlide);
            }

            // Event listeners for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });

            // Initialize slider
            showSlide(0);
        };

        // Initialize Equipment Slider
        initSlider('equipment-slider', 'dot', 'prev-slide', 'next-slide');
        // Initialize Fleet Slider
        initSlider('fleet-slider', 'dot', 'prev-slide', 'next-slide');
    };

    /**
     * Tabs functionality
     */
    const initTabs = () => {
        const tabsContainers = document.querySelectorAll('.features-tabs, .modes-tabs, .initiatives-tabs');
        
        tabsContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-btn');
            const tabPanes = container.querySelectorAll('.tab-pane');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');
                    
                    // Deactivate all tabs and panes
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // Activate the selected tab and pane
                    button.classList.add('active');
                    const pane = container.querySelector(`#${tabId}`);
                    if (pane) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    };

    /**
     * FAQ Accordion functionality
     */
    const initFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open the clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    /**
     * Numbers Counter Animation
     */
    const initCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        if (counters.length === 0) return;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const value = +counter.innerText;
                if (value < target) {
                    counter.innerText = Math.ceil(value + increment);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start counting when the element is visible
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    };

    /**
     * Form Validation and Submission
     */
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form elements
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const subject = contactForm.querySelector('#subject');
            const message = contactForm.querySelector('#message');
            const formMessage = contactForm.querySelector('.form-message');
            
            // Simple validation
            if (!name.value || !email.value || !subject.value || !message.value) {
                formMessage.innerHTML = 'Please fill in all required fields.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                formMessage.innerHTML = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Simulate form submission (normally would send to server)
            formMessage.innerHTML = 'Thank you for your message! We will contact you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    };

    /**
     * Smooth Scroll for anchor links
     */
    const initSmoothScroll = () => {
        const scrollLinks = document.querySelectorAll('a.scroll-to');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset for fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const hamburger = document.querySelector('.hamburger-menu');
                    const nav = document.querySelector('.navigation');
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        });
    };

    /**
     * Initialize all functions
     */
    const init = () => {
        initNavigation();
        initHeaderScroll();
        initBackToTop();
        initHeroSlider();
        initTestimonialSlider();
        initSliders();
        initTabs();
        initFaqAccordion();
        initCounters();
        initContactForm();
        initSmoothScroll();
    };

    // Initialize everything when the DOM is loaded
    init();
});
