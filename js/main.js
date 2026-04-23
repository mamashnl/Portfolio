        // ===== LOADER =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // ===== CUSTOM CURSOR =====
        const cursorDot = document.getElementById('cursorDot');
        const cursorRing = document.getElementById('cursorRing');
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX - 20 + 'px';
            cursorRing.style.top = ringY - 20 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.querySelectorAll('a, button, .filter-btn, .social-link, .project-card, .service-card, .skill-category').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });

        // ===== PARTICLES =====
        const particlesContainer = document.getElementById('particles');
        function createParticles() {
            const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#00ff88'];
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
                particle.style.animationDelay = (Math.random() * 15) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // ===== NAVBAR =====
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Navbar background
            if (scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active nav link
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });

            // Back to top
            const backToTop = document.getElementById('backToTop');
            if (scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ===== MOBILE MENU =====
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // ===== PARALLAX SCROLL =====
        const parallaxLayers = document.querySelectorAll('.parallax-layer');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0.05;
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });

        // ===== REVEAL ON SCROLL =====
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // ===== SKILL BARS ANIMATION =====
        const skillFills = document.querySelectorAll('.skill-fill');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach(fill => {
                        const width = fill.dataset.width;
                        setTimeout(() => {
                            fill.style.width = width + '%';
                        }, 300);
                    });
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

        // ===== COUNTER ANIMATION =====
        const statNumbers = document.querySelectorAll('.stat-number');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => counterObserver.observe(num));

        // ===== PROJECT FILTER =====
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });

        // ===== TESTIMONIALS SLIDER =====
        const testimonialTrack = document.getElementById('testimonialTrack');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonial = 0;
        let testimonialInterval;

        function goToTestimonial(index) {
            currentTestimonial = index;
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToTestimonial(parseInt(dot.dataset.index));
                resetTestimonialInterval();
            });
        });

        function autoSlideTestimonial() {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % 3;
                goToTestimonial(currentTestimonial);
            }, 5000);
        }

        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            autoSlideTestimonial();
        }

        autoSlideTestimonial();

        // ===== CONTACT FORM =====
        const contactForm = document.getElementById('contactForm');
        const toast = document.getElementById('toast');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit');
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Kirim Pesan →';
                submitBtn.disabled = false;
                contactForm.reset();

                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }, 1500);
        });

        // ===== SMOOTH SCROLL FOR NAV LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ===== TILT EFFECT ON PROJECT CARDS =====
        document.querySelectorAll('.project-card, .service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // ===== TYPING EFFECT FOR HERO =====
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        function typeWriter(text, index, callback) {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                setTimeout(() => typeWriter(text, index + 1, callback), 20);
            } else {
                if (callback) callback();
            }
        }

        setTimeout(() => {
            typeWriter(originalText, 0, null);
        }, 2000);