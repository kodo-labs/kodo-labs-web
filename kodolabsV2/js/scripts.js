/* ===== KODO LABS - JAVASCRIPT ULTRA MODERNO ===== */

// Configuración global y utilidades
const KodoLabs = {
    // Configuración
    config: {
        animationDuration: 600,
        scrollOffset: 100,
        debounceDelay: 16,
        intersectionThreshold: 0.1,
        typingSpeed: 50,
        countAnimationDuration: 2000
    },
    
    // Estado de la aplicación
    state: {
        isModalOpen: false,
        isMobileMenuOpen: false,
        isScrolling: false,
        hasAnimatedStats: false,
        currentSection: 'inicio'
    },
    
    // Utilidades
    utils: {
        // Debounce mejorado con immediate execution
        debounce(func, wait, immediate = false) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func.apply(this, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        },
        
        // Throttle para eventos de alta frecuencia
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Animación de números con easing
        animateCounter(element, start, end, duration = 2000, easing = 'easeOutQuart') {
            const startTime = performance.now();
            const change = end - start;
            
            const easingFunctions = {
                easeOutQuart: t => 1 - (--t) * t * t * t,
                easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            };
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easingFunctions[easing](progress);
                const current = Math.round(start + (change * easedProgress));
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = end;
                }
            };
            
            requestAnimationFrame(animate);
        },
        
        // Typing effect mejorado
        typeWriter(element, text, speed = 50) {
            element.textContent = '';
            let i = 0;
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed + Math.random() * 20); // Variación natural
                }
            };
            
            type();
        },
        
        // Detección de dispositivo
        isMobile() {
            return window.innerWidth <= 768;
        },
        
        // Interpolación de colores
        interpolateColor(color1, color2, factor) {
            const rgb1 = this.hexToRgb(color1);
            const rgb2 = this.hexToRgb(color2);
            
            const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r));
            const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g));
            const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b));
            
            return `rgb(${r}, ${g}, ${b})`;
        },
        
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Kodo Labs - Iniciando sistema ultra moderno...');
    
    // ✅ OPTIMIZACIÓN HERO - Arreglar texto duplicado
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.textContent = 'Digitalizamos tu Negocio';
            heroTitle.style.opacity = '1';
            heroTitle.removeAttribute('data-typing');
            heroTitle.removeAttribute('data-typing-speed');
        }
    }, 100);
    
    // Inicializar todos los módulos
    setTimeout(() => {
        KodoLabs.Navigation.init();
        KodoLabs.ScrollEffects.init();
        KodoLabs.Animations.init();
        KodoLabs.Forms.init();
        KodoLabs.Modals.init();
        KodoLabs.TechShowcase.init();
        KodoLabs.StatsCounter.init();
        KodoLabs.Performance.init();
        KodoLabs.Accessibility.init();
    }, 200);
    
    console.log('✅ Kodo Labs - Sistema cargado exitosamente!');
});

// ===== MÓDULO DE NAVEGACIÓN =====
KodoLabs.Navigation = {
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupHeaderScroll();
        this.setupScrollToTop();
        this.setupActiveSection();
    },
    
    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileMenu || !navLinks) return;
        
        // Toggle menu móvil con animación mejorada
        mobileMenu.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });
        
        // Cerrar menú al hacer click en enlaces
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    },
    
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.classList.add('active');
        navLinks.classList.add('active');
        KodoLabs.state.isMobileMenuOpen = true;
        
        // Animación escalonada de enlaces
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        KodoLabs.Analytics.trackEvent('navigation', 'mobile_menu_open');
    },
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        KodoLabs.state.isMobileMenuOpen = false;
        
        KodoLabs.Analytics.trackEvent('navigation', 'mobile_menu_close');
    },
    
    setupSmoothScrolling() {
        const allLinks = document.querySelectorAll('a[href^="#"]');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    KodoLabs.Analytics.trackEvent('navigation', 'smooth_scroll', targetId);
                }
            });
        });
    },
    
    smoothScrollTo(target) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        // Smooth scroll con easing personalizado
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 800);
        let start = null;
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function (ease-in-out-cubic)
            const easing = percentage < 0.5 
                ? 4 * percentage * percentage * percentage 
                : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
            
            window.scrollTo(0, startPosition + (distance * easing));
            
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    },
    
    setupHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        
        const scrollHandler = KodoLabs.utils.throttle(() => {
            const scrollY = window.scrollY;
            
            if (scrollY > KodoLabs.config.scrollOffset) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 16);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    },
    
    setupScrollToTop() {
        // Crear botón de scroll to top con estilo moderno
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z"/>
            </svg>
        `;
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Ir arriba');
        
        // Estilos inline para el botón
        Object.assign(scrollToTopBtn.style, {
            position: 'fixed',
            bottom: '50px',
            right: '30px',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00c851, #1db954)',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: '1070',
            boxShadow: '0 10px 30px rgba(0, 200, 81, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        document.body.appendChild(scrollToTopBtn);
        
        // Mostrar/ocultar botón
        const toggleButton = KodoLabs.utils.throttle(() => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'scale(1)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'scale(0.8)';
            }
        }, 16);
        
        window.addEventListener('scroll', toggleButton, { passive: true });
        
        // Functionality
        scrollToTopBtn.addEventListener('click', () => {
            this.smoothScrollTo(document.body);
            KodoLabs.Analytics.trackEvent('navigation', 'scroll_to_top');
        });
        
        // Hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'scale(1.1) rotate(5deg)';
            scrollToTopBtn.style.boxShadow = '0 15px 40px rgba(0, 200, 81, 0.5)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'scale(1) rotate(0deg)';
            scrollToTopBtn.style.boxShadow = '0 10px 30px rgba(0, 200, 81, 0.3)';
        });
    },
    
    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;
                    KodoLabs.state.currentSection = currentSection;
                    
                    // Actualizar enlaces activos
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
};

// ===== MÓDULO DE EFECTOS DE SCROLL =====
KodoLabs.ScrollEffects = {
    init() {
        this.setupParallax();
        this.setupScrollReveal();
        this.setupScrollProgress();
    },
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
        
        const parallaxHandler = KodoLabs.utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', parallaxHandler, { passive: true });
    },
    
    setupScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.service-card, .portfolio-item, .about-text, .contact-info, .stat-item, .tech-item'
        );
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Añadir delay escalonado para animaciones
                    setTimeout(() => {
                        entry.target.classList.add('animate-reveal');
                    }, index * 100);
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            revealObserver.observe(el);
        });
        
        // Añadir estilos CSS para la animación
        const style = document.createElement('style');
        style.textContent = `
            .animate-reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    },
    
    setupScrollProgress() {
        // Crear barra de progreso de scroll
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00c851, #00d4ff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        const updateProgress = KodoLabs.utils.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        }, 16);
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }
};

// ===== MÓDULO DE ANIMACIONES =====
KodoLabs.Animations = {
    init() {
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupTypingEffects();
    },
    
    setupHoverEffects() {
        // Service cards hover mejorado
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-20px) scale(1.02) rotateX(5deg)';
                card.style.boxShadow = '0 30px 60px rgba(0, 200, 81, 0.25)';
                
                // Animar icono
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(10deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
        
        // Portfolio items hover
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-15px) scale(1.02) rotateX(2deg)';
                
                // Animar icono del portfolio
                const icon = item.querySelector('.portfolio-image i');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
                
                const icon = item.querySelector('.portfolio-image i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    },
    
    setupLoadingAnimations() {
        // Skeleton loading para elementos que se cargan dinámicamente
        this.createSkeletonLoader();
    },
    
    createSkeletonLoader() {
        const style = document.createElement('style');
        style.textContent = `
            .skeleton {
                background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
                border-radius: 8px;
            }
            
            @keyframes skeleton-loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    },
    
    setupTypingEffects() {
        // Efecto de typing para títulos especiales
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typingSpeed) || 50;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        KodoLabs.utils.typeWriter(entry.target, text, speed);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
};

// ===== MÓDULO DE FORMULARIOS =====
KodoLabs.Forms = {
    init() {
        this.setupContactForm();
        this.setupServiceSelection();
        this.setupRealTimeValidation();
    },
    
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            if (!this.validateForm(formObject)) {
                this.showMessage('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            this.showLoading(true);
            
            try {
                // Simular envío de formulario
                await this.simulateFormSubmission(formObject);
                
                this.showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
                KodoLabs.Analytics.trackEvent('contact', 'form_submit_success');
                
            } catch (error) {
                this.showMessage('Error al enviar el mensaje. Inténtalo nuevamente.', 'error');
                KodoLabs.Analytics.trackEvent('contact', 'form_submit_error');
            } finally {
                this.showLoading(false);
            }
        });
    },
    
    validateForm(data) {
        const requiredFields = ['name', 'email', 'message'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        // Validación de email mejorada
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('Por favor, ingresa un email válido.', 'error');
            return false;
        }
        
        return true;
    },
    
    async simulateFormSubmission(formData) {
        // Simular delay de red
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos del formulario:', formData);
                resolve();
            }, 2000);
        });
    },
    
    showLoading(isLoading) {
        const form = document.getElementById('contact-form');
        const submitBtn = document.querySelector('.submit-btn');
        
        if (isLoading) {
            form.classList.add('loading');
            submitBtn.innerHTML = `
                <div class="spinner"></div>
                Enviando...
            `;
            submitBtn.disabled = true;
        } else {
            form.classList.remove('loading');
            submitBtn.innerHTML = `
                <i class="fas fa-paper-plane"></i>
                Enviar Mensaje
            `;
            submitBtn.disabled = false;
        }
    },
    
    showMessage(message, type) {
        // Remover mensajes existentes
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        // Insertar antes del formulario
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    },
    
    setupServiceSelection() {
        const serviceSelect = document.getElementById('service');
        const serviceCards = document.querySelectorAll('.service-card h3');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.textContent.trim();
                let serviceValue = '';
                
                switch(serviceName) {
                    case 'Desarrollo Web':
                        serviceValue = 'web';
                        break;
                    case 'Aplicaciones Móviles':
                        serviceValue = 'mobile';
                        break;
                    case 'Sistemas de Gestión':
                        serviceValue = 'system';
                        break;
                    case 'E-commerce':
                        serviceValue = 'ecommerce';
                        break;
                }
                
                if (serviceValue && serviceSelect) {
                    serviceSelect.value = serviceValue;
                    KodoLabs.Navigation.smoothScrollTo(document.getElementById('contacto'));
                    KodoLabs.Analytics.trackEvent('service', 'card_click_to_contact', serviceName);
                }
            });
        });
    },
    
    setupRealTimeValidation() {
        const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-green)';
                input.classList.remove('error');
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },
    
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (isValid) {
            input.style.borderColor = 'var(--primary-green)';
            input.classList.remove('error');
        } else {
            input.style.borderColor = '#ff6b6b';
            input.classList.add('error');
        }
        
        return isValid;
    }
};

// ===== MÓDULO DE MODALES =====
KodoLabs.Modals = {
    init() {
        this.setupModalTriggers();
        this.setupModalClose();
        this.setupKeyboardNavigation();
    },
    
    setupModalTriggers() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const modalId = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (modalId) {
                    this.openModal(modalId);
                }
            });
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        KodoLabs.state.isModalOpen = true;
        
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
        
        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
        
        KodoLabs.Analytics.trackEvent('portfolio', 'modal_open', modalId);
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        KodoLabs.state.isModalOpen = false;
        
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
        
        KodoLabs.Analytics.trackEvent('portfolio', 'modal_close', modalId);
    },
    
    setupModalClose() {
        // Click fuera del modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                this.closeModal(modalId);
            }
        });
        
        // Botones de cerrar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            }
        });
    },
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!KodoLabs.state.isModalOpen) return;
            
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
            
            // Tab trapping
            if (e.key === 'Tab') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const focusableElements = openModal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
};

// ===== MÓDULO TECH SHOWCASE ACTUALIZADO =====
KodoLabs.TechShowcase = {
    init() {
        this.createTechSection();
        this.setupTechAnimations();
    },
    
    createTechSection() {
        // Verificar si ya existe la sección
        if (document.querySelector('.tech-showcase')) return;
        
const techData = [
  { icon: 'fab fa-python', name: 'Python', color: '#3776AB' },
  { icon: 'fab fa-node-js', name: 'Node.js', color: '#339933' },
  { icon: 'fab fa-react', name: 'React', color: '#61DAFB' },
  { icon: 'fas fa-database', name: 'PostgreSQL', color: '#336791' },
  { icon: 'fab fa-js-square', name: 'JavaScript', color: '#F7DF1E' },
  { icon: 'fab fa-css3-alt', name: 'CSS', color: '#1572B6' },
  { icon: 'fab fa-aws', name: 'AWS', color: '#FF9900' },
  { icon: 'fas fa-wind', name: 'Tailwind', color: '#06B6D4' },
  { icon: 'fab fa-js-square', name: 'TypeScript', color: '#3178C6', customIcon: true },
  { icon: 'fab fa-github', name: 'GitHub', color: '#181717' },

  // 👇 añadimos estas dos para llegar a 12
  { icon: 'fas fa-bolt', name: 'Next.js', color: '#000000' },
  { icon: 'fas fa-leaf', name: 'MongoDB', color: '#47A248' }
];

        
        const techSection = document.createElement('section');
        techSection.className = 'tech-showcase';
        techSection.innerHTML = `
            <div class="container">
                <div class="tech-grid">
                    ${techData.map(tech => {
                        // Para TypeScript, usar un ícono personalizado si está disponible
                        let iconClass = tech.icon;
                        if (tech.name === 'TypeScript') {
                            iconClass = 'fas fa-code'; // Alternativa si no hay ícono específico de TypeScript
                        }
                        
                        return `
                            <div class="tech-item" data-tech="${tech.name.toLowerCase()}">
                                <i class="${iconClass}" style="color: ${tech.color}"></i>
                                <div>${tech.name}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        // Insertar después del hero
        const hero = document.querySelector('.hero');
        if (hero && hero.parentNode) {
            hero.parentNode.insertBefore(techSection, hero.nextSibling);
        }
    },
    
    setupTechAnimations() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach((item, index) => {
            // Animación de entrada escalonada
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Hover effects mejorados
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                const name = item.querySelector('div');
                
                item.style.transform = 'translateY(-15px) scale(1.05)';
                icon.style.transform = 'scale(1.15) rotateY(15deg)';
                name.style.color = 'var(--primary-green)';
                
                // Efecto de ondas
                this.createRippleEffect(item);
                
                // Añadir efecto de brillo para tecnologías específicas
                if (item.dataset.tech === 'react') {
                    icon.style.filter = 'drop-shadow(0 0 10px #61DAFB)';
                } else if (item.dataset.tech === 'python') {
                    icon.style.filter = 'drop-shadow(0 0 10px #3776AB)';
                } else if (item.dataset.tech === 'javascript' || item.dataset.tech === 'typescript') {
                    icon.style.filter = 'drop-shadow(0 0 10px #F7DF1E)';
                } else if (item.dataset.tech === 'node.js') {
                    icon.style.filter = 'drop-shadow(0 0 10px #339933)';
                } else if (item.dataset.tech === 'postgresql') {
                    icon.style.filter = 'drop-shadow(0 0 10px #336791)';
                } else if (item.dataset.tech === 'aws') {
                    icon.style.filter = 'drop-shadow(0 0 10px #FF9900)';
                } else if (item.dataset.tech === 'tailwind') {
                    icon.style.filter = 'drop-shadow(0 0 10px #06B6D4)';
                } else if (item.dataset.tech === 'css') {
                    icon.style.filter = 'drop-shadow(0 0 10px #1572B6)';
                } else if (item.dataset.tech === 'github') {
                    icon.style.filter = 'drop-shadow(0 0 10px #181717)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
                const name = item.querySelector('div');
                
                item.style.transform = '';
                icon.style.transform = '';
                icon.style.filter = '';
                name.style.color = '';
            });
            
            // Click event para mostrar información adicional (opcional)
            item.addEventListener('click', () => {
                this.showTechInfo(item.dataset.tech);
            });
        });
    },
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 200, 81, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = rect.width / 2 - size / 2 + 'px';
        ripple.style.top = rect.height / 2 - size / 2 + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Añadir keyframes si no existen
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // Función adicional para mostrar información de cada tecnología
    showTechInfo(techName) {
        const techInfo = {
            'python': 'Lenguaje de programación versátil para backend, data science y automatización',
            'node.js': 'Runtime de JavaScript para desarrollo de aplicaciones del lado del servidor',
            'react': 'Biblioteca de JavaScript para construir interfaces de usuario interactivas',
            'postgresql': 'Sistema de gestión de bases de datos relacionales avanzado y confiable',
            'javascript': 'Lenguaje de programación fundamental para desarrollo web moderno',
            'css': 'Lenguaje de estilos para diseñar y dar formato a páginas web',
            'aws': 'Plataforma de servicios en la nube líder en la industria',
            'tailwind': 'Framework de CSS utility-first para desarrollo rápido de interfaces',
            'typescript': 'Superset de JavaScript que añade tipado estático al lenguaje',
            'github': 'Plataforma de desarrollo colaborativo y control de versiones'
        };
        
        const info = techInfo[techName.toLowerCase()];
        if (info) {
            // Crear tooltip temporal
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = info;
            tooltip.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: var(--primary-green);
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                max-width: 300px;
                text-align: center;
                z-index: 10000;
                animation: fadeInUp 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Remover tooltip después de 3 segundos
            setTimeout(() => {
                tooltip.style.animation = 'fadeOutDown 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 3000);
            
            // Añadir animaciones CSS si no existen
            if (!document.querySelector('#tooltip-animations')) {
                const style = document.createElement('style');
                style.id = 'tooltip-animations';
                style.textContent = `
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                    }
                    
                    @keyframes fadeOutDown {
                        from {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateX(-50%) translateY(20px);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Trackear evento de click en tecnología
        if (typeof KodoLabs !== 'undefined' && KodoLabs.Analytics) {
            KodoLabs.Analytics.trackEvent('tech_showcase', 'tech_click', techName);
        }
    }
};

// ===== MÓDULO CONTADOR DE ESTADÍSTICAS =====
KodoLabs.StatsCounter = {
    init() {
        this.createStatsSection();
        this.setupCounterAnimations();
    },
    
    createStatsSection() {
        // Verificar si ya existe la sección
        if (document.querySelector('.stats-section')) return;
        
        const statsData = [
            { number: 50, label: 'Proyectos Completados', suffix: '+' },
            { number: 25, label: 'Clientes Satisfechos', suffix: '+' },
            { number: 100, label: 'Taza de Éxito', suffix: '%' },
            { number: 2, label: 'Años de Experiencia', suffix: '+' }
        ];
        
        const statsSection = document.createElement('section');
        statsSection.className = 'stats-section';
        statsSection.innerHTML = `
            <div class="container">
                <div class="stats-grid">
                    ${statsData.map(stat => `
                        <div class="stat-item">
                            <div class="stat-number" data-count="${stat.number}" data-suffix="${stat.suffix}">0</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Insertar después de about
        const about = document.querySelector('.about');
        if (about && about.parentNode) {
            about.parentNode.insertBefore(statsSection, about.nextSibling);
        }
    },
    
    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !KodoLabs.state.hasAnimatedStats) {
                    KodoLabs.state.hasAnimatedStats = true;
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    },
    
    animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((element, index) => {
            const targetNumber = parseInt(element.dataset.count);
            const suffix = element.dataset.suffix || '';
            
            setTimeout(() => {
                KodoLabs.utils.animateCounter(element, 0, targetNumber, 2000, 'easeOutQuart');
                
                // Añadir sufijo después de la animación
                setTimeout(() => {
                    element.textContent = targetNumber + suffix;
                }, 2000);
            }, index * 200);
        });
        
        KodoLabs.Analytics.trackEvent('stats', 'counters_animated');
    }
};

// ===== MÓDULO DE PERFORMANCE =====
KodoLabs.Performance = {
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.monitorPerformance();
    },
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores sin IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    },
    
    setupImageOptimization() {
        // Manejo de errores de imágenes
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn('Imagen falló al cargar:', e.target.src);
                KodoLabs.Analytics.trackEvent('error', 'image_load_failed', e.target.src);
                
                if (!e.target.dataset.fallbackSet) {
                    e.target.src = this.generateFallbackImage();
                    e.target.dataset.fallbackSet = 'true';
                }
            }
        }, true);
    },
    
    generateFallbackImage() {
        // SVG de fallback optimizado
        return 'data:image/svg+xml;base64,' + btoa(`
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#1a1a1a"/>
                <circle cx="100" cy="80" r="20" fill="#00c851" opacity="0.5"/>
                <text x="100" y="130" text-anchor="middle" fill="#00c851" font-family="Arial" font-size="12">
                    Imagen no disponible
                </text>
            </svg>
        `);
    },
    
    monitorPerformance() {
        // Monitorear métricas de performance
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                KodoLabs.Analytics.trackEvent('performance', 'lcp', Math.round(lastEntry.startTime));
            });
            
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                    KodoLabs.Analytics.trackEvent('performance', 'fid', Math.round(entry.processingStart - entry.startTime));
                });
            });
            
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
};

// ===== MÓDULO DE ACCESIBILIDAD =====
KodoLabs.Accessibility = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIAAttributes();
        this.setupReducedMotion();
    },
    
    setupKeyboardNavigation() {
        // Navegación con teclado mejorada
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
                case 'Enter':
                case ' ':
                    this.handleActivation(e);
                    break;
                case 'Escape':
                    this.handleEscape(e);
                    break;
            }
        });
    },
    
    handleTabNavigation(e) {
        // Mejoras para la navegación con Tab
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (KodoLabs.state.isModalOpen) {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                const modalFocusable = modal.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                
                const firstModal = modalFocusable[0];
                const lastModal = modalFocusable[modalFocusable.length - 1];
                
                if (e.shiftKey && document.activeElement === firstModal) {
                    e.preventDefault();
                    lastModal.focus();
                } else if (!e.shiftKey && document.activeElement === lastModal) {
                    e.preventDefault();
                    firstModal.focus();
                }
            }
        }
    },
    
    handleActivation(e) {
        // Manejar activación con Enter y Espacio
        const target = e.target;
        
        if (target.classList.contains('portfolio-item') || target.classList.contains('service-card')) {
            e.preventDefault();
            target.click();
        }
    },
    
    handleEscape(e) {
        // Cerrar elementos con Escape
        if (KodoLabs.state.isModalOpen) {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                KodoLabs.Modals.closeModal(openModal.id);
            }
        }
        
        if (KodoLabs.state.isMobileMenuOpen) {
            KodoLabs.Navigation.closeMobileMenu();
        }
    },
    
    setupFocusManagement() {
        // Indicadores de focus mejorados
        const style = document.createElement('style');
        style.textContent = `
            .focus-visible {
                outline: 3px solid var(--primary-green) !important;
                outline-offset: 2px !important;
                border-radius: 4px;
            }
            
            .focus-visible:focus {
                box-shadow: 0 0 0 3px rgba(0, 200, 81, 0.3) !important;
            }
        `;
        document.head.appendChild(style);
        
        // Añadir clase focus-visible a elementos focusables
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('a, button, input, select, textarea, [tabindex]')) {
                e.target.classList.add('focus-visible');
            }
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
    },
    
    setupARIAAttributes() {
        // Añadir atributos ARIA faltantes
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Ver detalles del proyecto ${index + 1}`);
        });
        
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Más información sobre el servicio ${index + 1}`);
        });
        
        // Botones de navegación
        const navToggle = document.querySelector('.mobile-menu');
        if (navToggle) {
            navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    },
    
    setupReducedMotion() {
        // Respetar preferencias de movimiento reducido
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        };
        
        handleReducedMotion(mediaQuery);
        mediaQuery.addEventListener('change', handleReducedMotion);
        
        // Añadir estilos para movimiento reducido
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
};

// ===== MÓDULO DE ANALYTICS =====
KodoLabs.Analytics = {
    trackEvent(category, action, label = '', value = 0) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
                timestamp: Date.now()
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', action, {
                category: category,
                label: label,
                value: value
            });
        }
        
        // Custom analytics
        this.sendToCustomAnalytics(category, action, label, value);
        
        // Console para desarrollo
        if (window.location.hostname === 'localhost') {
            console.log('📊 Analytics Event:', { category, action, label, value });
        }
    },
    
    sendToCustomAnalytics(category, action, label, value) {
        // Enviar a tu propio sistema de analytics
        const eventData = {
            category,
            action,
            label,
            value,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            sessionId: this.getSessionId()
        };
        
        // Almacenar localmente para envío posterior
        const events = JSON.parse(localStorage.getItem('kodo_analytics') || '[]');
        events.push(eventData);
        localStorage.setItem('kodo_analytics', JSON.stringify(events));
        
        // Enviar eventos acumulados (implementar según tu backend)
        if (events.length >= 10) {
            this.sendEventBatch(events);
        }
    },
    
    getSessionId() {
        let sessionId = sessionStorage.getItem('kodo_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('kodo_session_id', sessionId);
        }
        return sessionId;
    },
    
    sendEventBatch(events) {
        // Implementar envío a tu backend
        console.log('Enviando batch de eventos:', events);
        
        // Limpiar eventos enviados
        localStorage.removeItem('kodo_analytics');
    }
};

// ===== FUNCIONES GLOBALES PARA COMPATIBILIDAD =====
window.openModal = function(modalId) {
    KodoLabs.Modals.openModal(modalId);
};

window.closeModal = function(modalId) {
    KodoLabs.Modals.closeModal(modalId);
};

window.trackEvent = function(category, action, label) {
    KodoLabs.Analytics.trackEvent(category, action, label);
};

// ===== SERVICE WORKER PARA PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration.scope);
                KodoLabs.Analytics.trackEvent('pwa', 'service_worker_registered');
            })
            .catch(error => {
                console.log('SW falló:', error);
                KodoLabs.Analytics.trackEvent('pwa', 'service_worker_failed');
            });
    });
}

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', (e) => {
    console.error('Error JavaScript:', e.error);
    KodoLabs.Analytics.trackEvent('error', 'javascript_error', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada:', e.reason);
    KodoLabs.Analytics.trackEvent('error', 'unhandled_promise_rejection', e.reason.toString());
});

// ===== OPTIMIZACIONES DE PERFORMANCE =====
// Preload de recursos críticos
const preloadCriticalResources = () => {
    const criticalImages = [
        // Añadir URLs de imágenes críticas aquí
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Ejecutar preload si el usuario no está en una conexión lenta
if (navigator.connection && navigator.connection.effectiveType !== 'slow-2g') {
    preloadCriticalResources();
}

// ===== 🍪 BANNER DE COOKIES ULTRA MODERNO =====

// CSS moderno para el banner
const modernCookieCSS = `
/* Banner de cookies ultra moderno */
.modern-cookie-banner {
    position: fixed;
    bottom: -200px;
    left: 20px;
    right: 20px;
    max-width: 500px;
    margin: 0 auto;
    background: linear-gradient(145deg, 
        rgba(17, 17, 17, 0.98), 
        rgba(26, 26, 26, 0.95));
    backdrop-filter: blur(25px) saturate(180%);
    border: 2px solid rgba(0, 200, 81, 0.3);
    border-radius: 20px;
    padding: 0;
    z-index: 10000;
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(0, 200, 81, 0.2);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    font-family: var(--font-primary, 'Inter', sans-serif);
}

.modern-cookie-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00c851, #00d4ff, #6c5ce7);
    background-size: 200% 100%;
    animation: cookie-rainbow 3s linear infinite;
}

@keyframes cookie-rainbow {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.modern-cookie-banner.show {
    bottom: 20px;
    animation: cookie-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes cookie-bounce {
    0% {
        transform: translateY(100px) scale(0.8);
        opacity: 0;
    }
    50% {
        transform: translateY(-10px) scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

.cookie-content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    align-items: center;
    padding: 20px 24px;
    position: relative;
}

.cookie-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00c851, #1db954);
    border-radius: 50%;
    color: #000;
    font-size: 1.4rem;
    box-shadow: 0 5px 15px rgba(0, 200, 81, 0.3);
    animation: cookie-rotate 4s ease-in-out infinite;
}

@keyframes cookie-rotate {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-10deg) scale(1.1); }
    75% { transform: rotate(10deg) scale(1.1); }
}

.cookie-text {
    min-width: 0;
}

.cookie-text h4 {
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    line-height: 1.2;
    background: linear-gradient(135deg, #ffffff, #00c851);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cookie-text p {
    color: #d0d0d0;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.5;
    opacity: 0.9;
}

.cookie-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 100px;
}

.cookie-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 25px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.cookie-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
}

.cookie-btn:hover::before {
    left: 100%;
}

.cookie-accept {
    background: linear-gradient(135deg, #00c851, #1db954);
    color: #000000;
    border-color: #00c851;
}

.cookie-accept:hover {
    background: linear-gradient(135deg, #00d964, #22c55e);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 200, 81, 0.4);
}

.cookie-decline:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: #ff6b6b;
    color: #ff6b6b;
    transform: translateY(-2px);
}

.cookie-settings:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
    color: #00d4ff;
    transform: translateY(-2px);
}

.cookie-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    backdrop-filter: blur(10px);
}

.cookie-close:hover {
    background: rgba(255, 107, 107, 0.3);
    border-color: #ff6b6b;
    color: #ff6b6b;
    transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
    .modern-cookie-banner {
        left: 10px;
        right: 10px;
        max-width: none;
        border-radius: 15px;
    }
    
    .cookie-content {
        grid-template-columns: 1fr;
        gap: 16px;
        text-align: center;
        padding: 16px;
    }
    
    .cookie-actions {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .cookie-text h4 {
        font-size: 1rem;
    }
    
    .cookie-text p {
        font-size: 0.85rem;
    }
    
    .cookie-btn {
        padding: 10px 16px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .cookie-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .cookie-btn {
        width: 100%;
        justify-content: center;
    }
}

/* Animación de salida */
.modern-cookie-banner.fade-out {
    bottom: -200px;
    opacity: 0;
    transform: scale(0.9);
}
`;

// Función para crear banner moderno
function createModernCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'modern-cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-icon">
                <i class="fas fa-cookie-bite"></i>
            </div>
            <div class="cookie-text">
                <h4>🍪 Experiencia Personalizada</h4>
                <p>Utilizamos cookies para mejorar tu experiencia y ofrecerte contenido relevante. Tu privacidad es importante para nosotros.</p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-accept" onclick="acceptCookies()">
                    <i class="fas fa-check"></i>
                    Aceptar
                </button>
                <button class="cookie-btn cookie-decline" onclick="rejectCookies()">
                    <i class="fas fa-times"></i>
                    Rechazar
                </button>
                <button class="cookie-btn cookie-settings" onclick="showCookieSettings()">
                    <i class="fas fa-cog"></i>
                    Configurar
                </button>
            </div>
        </div>
        <button class="cookie-close" onclick="rejectCookies()" aria-label="Cerrar">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(banner);
    
    // Animación de entrada
    setTimeout(() => {
        banner.classList.add('show');
    }, 500);
}

// Función para mostrar mensajes de confirmación
function showCookieMessage(message, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `cookie-message cookie-message-${type}`;
    messageEl.textContent = message;
    
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 
            'linear-gradient(135deg, #00c851, #1db954)' : 
            'linear-gradient(135deg, #00d4ff, #6c5ce7)',
        color: '#000',
        padding: '12px 20px',
        borderRadius: '25px',
        fontSize: '0.9rem',
        fontWeight: '600',
        zIndex: '10001',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(400px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => messageEl.remove(), 400);
    }, 3000);
}

// Inicialización de cookie consent moderno
const initCookieConsent = () => {
    const hasConsent = localStorage.getItem('kodo_cookie_consent');
    
    if (!hasConsent) {
        createModernCookieBanner();
    }
};

// Funciones mejoradas de cookies
window.acceptCookies = () => {
    localStorage.setItem('kodo_cookie_consent', 'accepted');
    localStorage.setItem('kodo_cookie_timestamp', Date.now());
    
    const banner = document.querySelector('.modern-cookie-banner');
    if (banner) {
        banner.classList.add('fade-out');
        setTimeout(() => banner.remove(), 600);
    }
    
    showCookieMessage('✅ Cookies aceptadas. ¡Gracias por confiar en nosotros!', 'success');
    
    if (typeof KodoLabs !== 'undefined' && KodoLabs.Analytics) {
        KodoLabs.Analytics.trackEvent('cookie', 'consent_accepted');
    }
};

window.rejectCookies = () => {
    localStorage.setItem('kodo_cookie_consent', 'rejected');
    localStorage.setItem('kodo_cookie_timestamp', Date.now());
    
    const banner = document.querySelector('.modern-cookie-banner');
    if (banner) {
        banner.classList.add('fade-out');
        setTimeout(() => banner.remove(), 600);
    }
    
    showCookieMessage('ℹ️ Cookies rechazadas. Respetamos tu decisión.', 'info');
    
    if (typeof KodoLabs !== 'undefined' && KodoLabs.Analytics) {
        KodoLabs.Analytics.trackEvent('cookie', 'consent_rejected');
    }
};

// Función para configuraciones avanzadas
window.showCookieSettings = () => {
    const settings = document.createElement('div');
    settings.className = 'cookie-settings-modal';
    settings.innerHTML = `
        <div class="settings-content">
            <div class="settings-header">
                <h3>🍪 Configuración de Cookies</h3>
                <button onclick="closeSettings()" class="settings-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="settings-body">
                <div class="cookie-category">
                    <div class="category-header">
                        <h4>🔧 Cookies Esenciales</h4>
                        <span class="required">Requeridas</span>
                    </div>
                    <p>Necesarias para el funcionamiento básico del sitio web.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="category-header">
                        <h4>📊 Cookies de Análisis</h4>
                        <label class="toggle">
                            <input type="checkbox" id="analytics-cookies" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <p>Nos ayudan a entender cómo interactúas con nuestro sitio.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="category-header">
                        <h4>🎯 Cookies de Marketing</h4>
                        <label class="toggle">
                            <input type="checkbox" id="marketing-cookies">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <p>Para mostrar contenido y anuncios relevantes.</p>
                </div>
            </div>
            <div class="settings-footer">
                <button onclick="saveSettings()" class="save-settings">
                    <i class="fas fa-save"></i>
                    Guardar Preferencias
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(settings);
    setTimeout(() => settings.classList.add('show'), 100);
};

// Inyectar CSS moderno
if (!document.querySelector('#modern-cookie-css')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modern-cookie-css';
    styleSheet.textContent = modernCookieCSS;
    document.head.appendChild(styleSheet);
}

// Inicializar cookie consent con delay
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCookieConsent, 1000);
});

console.log('🎉 Kodo Labs - JavaScript Ultra Moderno cargado completamente!');

// ===== FUNCIONES MEJORADAS PARA MODALES =====

// Funciones mejoradas para modales con scroll
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Prevenir scroll del body
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Scroll al inicio del modal
    modal.scrollTop = 0;
    
    // Animación de entrada
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
    
    // Focus management
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        setTimeout(() => closeButton.focus(), 100);
    }
    
    // Trackear evento (si tienes analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_open', {
            modal_id: modalId
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('show');
    
    // Restaurar scroll del body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Trackear evento (si tienes analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_close', {
            modal_id: modalId
        });
    }
}

// Mejorar el event listener para cerrar modal con click fuera
document.addEventListener('click', function(e) {
    // Cerrar modal si se hace click en el overlay (no en el contenido)
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Prevenir scroll del body cuando el modal está abierto
document.addEventListener('wheel', function(e) {
    const openModal = document.querySelector('.modal.show');
    if (openModal && !openModal.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });

// Smooth scroll para enlaces dentro de modales (si los hay)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') && e.target.closest('.modal')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Función para manejar el resize de ventana con modales abiertos
window.addEventListener('resize', function() {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
        // Recalcular posición si es necesario
        openModal.scrollTop = Math.max(0, openModal.scrollTop);
    }
});

// Funciones de utilidad para mejorar la experiencia
function scrollToTopOfModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Auto-focus en el primer elemento interactivo del modal
function focusFirstInteractiveElement(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

// Mejorar la accesibilidad del modal
function setupModalAccessibility() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Añadir atributos ARIA si no existen
        if (!modal.hasAttribute('aria-hidden')) {
            modal.setAttribute('aria-hidden', 'true');
        }
        
        // Actualizar aria-hidden cuando se abre/cierra
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isOpen = modal.classList.contains('show');
                    modal.setAttribute('aria-hidden', !isOpen);
                }
            });
        });
        
        observer.observe(modal, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
}

// Inicializar mejoras de accesibilidad cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setupModalAccessibility();
});

// Función para añadir contenido dinámico a modales (opcional)
function updateModalContent(modalId, content) {
    const modal = document.getElementById(modalId);
    const modalBody = modal?.querySelector('.modal-body');
    
    if (modalBody) {
        modalBody.innerHTML = content;
        // Scroll al inicio después de actualizar contenido
        modal.scrollTop = 0;
    }
}

// Prevenir que se cierre el modal al hacer click en el contenido
document.addEventListener('click', function(e) {
    if (e.target.closest('.modal-content')) {
        e.stopPropagation();
    }
});

console.log('🎯 Modal scroll functionality loaded successfully!');