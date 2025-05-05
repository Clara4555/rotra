/**
 * Rotra Horizon B.V. - Animations JavaScript File
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Mouse Follower Effect
     */
    const initMouseFollower = () => {
        const mouseFollower = document.querySelector('.mouse-follower');
        
        if (!mouseFollower) return;
        
        // Check if device is mobile or tablet
        if (window.innerWidth < 768) {
            mouseFollower.style.display = 'none';
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor when mouse moves
            mouseFollower.style.opacity = '1';
        });
        
        // Special effect when hovering over buttons and links
        const addHoverEffect = () => {
            const buttons = document.querySelectorAll('button, .btn, a, .service-card, .feature-box, .nav-item');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    mouseFollower.classList.add('hover');
                });
                
                button.addEventListener('mouseleave', () => {
                    mouseFollower.classList.remove('hover');
                });
            });
        };
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null || e.target === document.documentElement) {
                mouseFollower.classList.add('hidden');
            }
        });
        
        document.addEventListener('mouseover', () => {
            mouseFollower.classList.remove('hidden');
        });
        
        // Smooth animation of the follower
        const updateFollower = () => {
            // Calculate the new position with smooth easing
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            
            // Apply the position
            mouseFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            
            // Continue the animation
            requestAnimationFrame(updateFollower);
        };
        
        // Initialize follower animation
        addHoverEffect();
        updateFollower();
    };

    /**
     * Scroll Reveal Animation
     */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        
        if (revealElements.length === 0) return;

        const revealElementOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const revealPoint = 150;
                
                // Get delay attribute if exists
                const delay = element.getAttribute('data-delay') || 0;
                
                // Apply delay to element
                element.style.transitionDelay = `${delay}s`;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        };

        // Run once on load
        revealElementOnScroll();
        
        // Run on scroll
        window.addEventListener('scroll', revealElementOnScroll);
    };

    /**
     * GSAP Animations
     */
    const initGSAPAnimations = () => {
        // Only run if GSAP is loaded
        if (typeof gsap === 'undefined') return;

        // Register ScrollTrigger plugin if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Timeline for hero section text animations
        const initHeroAnimations = () => {
            const heroSlides = document.querySelectorAll('.hero .slide');
            
            if (heroSlides.length === 0) return;
            
            heroSlides.forEach(slide => {
                const texts = slide.querySelectorAll('.animate-text');
                
                if (texts.length === 0) return;
                
                const tl = gsap.timeline({ paused: true });
                
                tl.from(texts, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                });
                
                // Play animation when slide becomes active
                const observer = new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.attributeName === 'class') {
                            if (slide.classList.contains('active')) {
                                tl.restart();
                            }
                        }
                    });
                });
                
                observer.observe(slide, { attributes: true });
                
                // Play animation for initial active slide
                if (slide.classList.contains('active')) {
                    tl.play();
                }
            });
        };

        // Page banner animations
        const initBannerAnimations = () => {
            const banner = document.querySelector('.page-banner');
            
            if (!banner) return;
            
            const texts = banner.querySelectorAll('.animate-text');
            
            if (texts.length === 0) return;
            
            const tl = gsap.timeline();
            
            tl.from(texts, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3
            });
        };

        // Staggered animations for grids and lists
        const initGridAnimations = () => {
            if (typeof ScrollTrigger === 'undefined') return;
            
            const animateGrids = (selector, staggerAmount = 0.1) => {
                const grids = document.querySelectorAll(selector);
                
                grids.forEach(grid => {
                    const items = grid.children;
                    
                    if (items.length === 0) return;
                    
                    gsap.from(items, {
                        y: 50,
                        opacity: 0,
                        duration: 0.6,
                        stagger: staggerAmount,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: grid,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    });
                });
            };
            
            // Animate various grid elements
            animateGrids('.services-cards');
            animateGrids('.features-container');
            animateGrids('.values-container');
            animateGrids('.team-grid');
            animateGrids('.pillars-container');
            animateGrids('.community-initiatives');
            animateGrids('.certification-logos');
            animateGrids('.services-grid');
            animateGrids('.industries-grid');
            animateGrids('.features-grid');
            animateGrids('.strategy-pillars');
            animateGrids('.certifications-grid');
            animateGrids('.contact-info-grid');
        };

        // Text reveal animations
        const initTextReveal = () => {
            if (typeof ScrollTrigger === 'undefined') return;
            
            const sections = document.querySelectorAll('.section-header');
            
            sections.forEach(section => {
                const title = section.querySelector('.section-title');
                const subtitle = section.querySelector('.section-subtitle');
                
                if (!title && !subtitle) return;
                
                const elements = [title, subtitle].filter(el => el !== null);
                
                gsap.from(elements, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
        };

        // Call all GSAP animation initializers
        initHeroAnimations();
        initBannerAnimations();
        initGridAnimations();
        initTextReveal();
    };

    /**
     * Parallax Effects
     */
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.page-banner .banner-bg, .cta');
        
        if (parallaxElements.length === 0) return;

        const parallaxEffect = () => {
            parallaxElements.forEach(element => {
                const scrollPosition = window.pageYOffset;
                const elementPosition = element.offsetTop;
                const distance = scrollPosition - elementPosition;
                
                // Only apply effect when element is in view
                if (elementPosition < scrollPosition + window.innerHeight && 
                    elementPosition + element.offsetHeight > scrollPosition) {
                    
                    // Move the background at a slower rate than the scroll
                    const translateY = distance * 0.3;
                    
                    // Apply to background image for banners
                    if (element.classList.contains('banner-bg')) {
                        element.style.transform = `translateY(${translateY}px)`;
                    }
                    // Apply a subtle parallax to CTA sections
                    else if (element.classList.contains('cta')) {
                        element.style.backgroundPositionY = `${translateY * 0.2}px`;
                    }
                }
            });
        };

        window.addEventListener('scroll', parallaxEffect);
    };

    /**
     * Initialize all animation functions
     */
    const init = () => {
        initMouseFollower();
        initScrollReveal();
        initGSAPAnimations();
        initParallax();
    };

    // Initialize animations when DOM is loaded
    init();
});
