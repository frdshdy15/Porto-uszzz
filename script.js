document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
    
    // Tutup menu saat link di klik (di mobile)
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // 2. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer (Animasi Saat Scroll - PURE JS)
    
    // Pilihan Kelas yang akan dianimasikan
    const revealElements = document.querySelectorAll('.reveal');
    const skillItems = document.querySelectorAll('.skills-grid .skill-item');
    const projectCardsLeft = document.querySelectorAll('.reveal-slide-left');
    const projectCardsRight = document.querySelectorAll('.reveal-slide-right');

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // 10% dari elemen terlihat
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('reveal')) {
                    element.classList.add('animated', 'slideUp');
                } else if (element.classList.contains('skill-item')) {
                    // Animasi Stagger untuk skill items
                    const index = Array.from(skillItems).indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.classList.add('animated', 'slideUp');
                } else if (element.classList.contains('reveal-slide-left')) {
                    element.classList.add('animated', 'slideLeft');
                } else if (element.classList.contains('reveal-slide-right')) {
                    element.classList.add('animated', 'slideRight');
                }
                
                // Hentikan observasi setelah animasi pertama
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observasi semua elemen
    revealElements.forEach(el => observer.observe(el));
    skillItems.forEach(el => observer.observe(el));
    projectCardsLeft.forEach(el => observer.observe(el));
    projectCardsRight.forEach(el => observer.observe(el));
});
