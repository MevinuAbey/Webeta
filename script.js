document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Mobile Menu Toggle (Preserved)
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');

        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links (Lenis-like feel with standard behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- GSAP ANIMATIONS ---

    // 1. Hero Entrance (Staggered)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".navbar", { y: -50, opacity: 0, duration: 1 })
        .from(".logo", { opacity: 0, x: -20, duration: 0.8 }, "-=0.5")
        .from(".greeting", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".name", { opacity: 0, y: 30, duration: 1 }, "-=0.6")
        .from(".role", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".bio", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".cta-group", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-visual", { opacity: 0, x: 50, duration: 1 }, "-=0.8");

    // 2. 3D Tilt Effect for Hero Code Block
    const codeBlock = document.querySelector('.code-block-decoration');
    const heroVisual = document.querySelector('.hero-visual');

    if (codeBlock && heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;

            gsap.to(codeBlock, {
                rotationY: xPct * 10, // Reduced from 20 for more stability
                rotationX: -yPct * 10,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power1.out"
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            gsap.to(codeBlock, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power1.out"
            });
        });
    }

    // 3. Scroll Triggered Elements (Reveal)
    const revealElements = document.querySelectorAll('.section-header, .about-card, .social-card');

    revealElements.forEach(el => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );
    });

    // 4. Typing Effect
    const typingText = document.querySelector('.typing-text');
    const phrases = ["from Sri Lanka 🇱🇰", "who loves AI 🤖", "building the future 🚀"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    if (typingText) type();

    // 5. Magnetic Button Effect
    const glowingCards = document.querySelectorAll('.about-card');
    glowingCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
