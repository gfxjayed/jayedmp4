/**
 * Premium Motion Designer Portfolio
 * JavaScript File - Smooth Animations & Interactions
 * Designed for elite creative professionals
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZE LOADER =====
    const loader = document.querySelector('.loader');
    const loadingProgress = document.querySelector('.loading-progress');
    const logoLetters = document.querySelectorAll('.logo-letter');
    
    // Animate logo letters
    logoLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after animation completes
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                
                // Initialize all animations after loading
                initAnimations();
                initCustomCursor();
                initParticles();
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 50);
    
    // ===== INITIALIZE ALL ANIMATIONS =====
    function initAnimations() {
        // Animate hero title letters
        animateHeroTitle();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize skill bars animation
        initSkillBars();
        
        // Initialize statistics counters
        initCounters();
        
        // Initialize navigation active state
        initNavigation();
        
        // Initialize form interactions
        initForm();
        
        // Initialize button ripple effects
        initRippleButtons();
        
        // Initialize hover effects
        initHoverEffects();
        
        // Initialize mobile menu
        initMobileMenu();
    }
    
    // ===== ANIMATE HERO TITLE =====
    function animateHeroTitle() {
        const letters = document.querySelectorAll('.letter-anim');
        
        letters.forEach((letter, index) => {
            // Reset for animation
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(30px)';
            
            // Animate with delay
            setTimeout(() => {
                letter.style.transition = 'opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }
    
    // ===== INITIALIZE SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Create Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class to trigger CSS animations
                    entry.target.classList.add('animate-in');
                    
                    // If it's a skill progress bar, animate it
                    if (entry.target.classList.contains('skill-progress')) {
                        const width = entry.target.getAttribute('data-width');
                        setTimeout(() => {
                            entry.target.style.width = `${width}%`;
                        }, 300);
                    }
                    
                    // If it's a counter, start counting
                    if (entry.target.classList.contains('stat-number')) {
                        animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements that should animate on scroll
        const animateElements = document.querySelectorAll('.skill-progress, .stat-number, .project-card, .tool-card, .timeline-item, .category-title, .section-title');
        animateElements.forEach(el => observer.observe(el));
        
        // Add scroll-based parallax effect to hero shapes
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = scrollY * speed;
                shape.style.transform = `translateY(${yPos}px)`;
            });
            
            // Update navigation active state based on scroll position
            updateNavigationOnScroll();
        });
    }
    
    // ===== INITIALIZE SKILL BARS =====
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            // Set initial width to 0
            bar.style.width = '0%';
        });
    }
    
    // ===== ANIMATE COUNTERS =====
    function animateCounter(counterElement) {
        // Only animate if not already animated
        if (counterElement.classList.contains('animated')) return;
        
        counterElement.classList.add('animated');
        const target = parseInt(counterElement.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counterElement.textContent = Math.floor(current);
        }, 16);
    }
    
    // ===== INITIALIZE STATISTICS COUNTERS =====
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        // Set initial values to 0
        counters.forEach(counter => {
            counter.textContent = '0';
        });
    }
    
    // ===== INITIALIZE NAVIGATION =====
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Scroll to target with smooth behavior
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                closeMobileMenu();
            });
        });
    }
    
    // ===== UPDATE NAVIGATION ON SCROLL =====
    function updateNavigationOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;
        
        // Find current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = `#${section.id}`;
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== INITIALIZE FORM INTERACTIONS =====
    function initForm() {
        const contactForm = document.getElementById('contactForm');
        const formGroups = document.querySelectorAll('.form-group');
        
        // Add focus/blur events to form inputs
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            
            if (input) {
                // Check if input has value on page load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
                
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
            }
        });
        
        // Handle form submission
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.querySelector('span').textContent;
                
                // Show loading state
                submitBtn.querySelector('span').textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (in a real site, this would be an API call)
                setTimeout(() => {
                    // Show success state
                    submitBtn.querySelector('span').textContent = 'Message Sent!';
                    submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                    
                    // Reset form
                    this.reset();
                    formGroups.forEach(group => group.classList.remove('focused'));
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        }
    }
    
    // ===== INITIALIZE BUTTON RIPPLE EFFECTS =====
    function initRippleButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('div');
                ripple.classList.add('btn-ripple');
                
                // Get click position relative to button
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                // Position the ripple
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Add to button
                this.appendChild(ripple);
                
                // Remove ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // ===== INITIALIZE HOVER EFFECTS =====
    function initHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.project-card, .tool-card, .timeline-content, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ===== INITIALIZE MOBILE MENU =====
    function initMobileMenu() {
        const menuBtn = document.querySelector('.nav-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                // Toggle menu open/close
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
                
                // Animate menu lines
                const lines = this.querySelectorAll('.menu-line');
                if (this.classList.contains('active')) {
                    // Transform to X
                    lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    // Reset to hamburger
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            });
        }
    }
    
    // ===== CLOSE MOBILE MENU =====
    function closeMobileMenu() {
        const menuBtn = document.querySelector('.nav-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn && menuBtn.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Reset menu lines
            const lines = menuBtn.querySelectorAll('.menu-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    }
    
    // ===== INITIALIZE CUSTOM CURSOR =====
    function initCustomCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorRing = document.querySelector('.cursor-ring');
        
        // Only enable custom cursor on desktop
        if (window.innerWidth >= 768) {
            document.addEventListener('mousemove', (e) => {
                // Update cursor position
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
                
                // Update ring position with slight delay for smooth effect
                setTimeout(() => {
                    cursorRing.style.left = `${e.clientX}px`;
                    cursorRing.style.top = `${e.clientY}px`;
                }, 50);
            });
            
            // Add hover effects to interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .project-card, .tool-card, .play-overlay');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.style.width = '16px';
                    cursorDot.style.height = '16px';
                    cursorRing.style.width = '50px';
                    cursorRing.style.height = '50px';
                    cursorRing.style.borderColor = 'var(--accent-color)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorDot.style.width = '8px';
                    cursorDot.style.height = '8px';
                    cursorRing.style.width = '30px';
                    cursorRing.style.height = '30px';
                    cursorRing.style.borderColor = 'rgba(108, 99, 255, 0.5)';
                });
            });
        } else {
            // Hide custom cursor on mobile
            cursorDot.style.display = 'none';
            cursorRing.style.display = 'none';
        }
    }
    
    // ===== INITIALIZE PARTICLE BACKGROUND =====
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
        
        function createParticle(container) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = `rgba(108, 99, 255, ${Math.random() * 0.5 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            
            // Add to container
            container.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== HANDLE WINDOW RESIZE =====
    window.addEventListener('resize', function() {
        // Reinitialize cursor on resize (to handle mobile/desktop switch)
        initCustomCursor();
        
        // Close mobile menu if open when resizing to desktop
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
    
    // ===== INITIALIZE ON LOAD =====
    // Call updateNavigationOnScroll once to set initial active state
    setTimeout(updateNavigationOnScroll, 100);
});