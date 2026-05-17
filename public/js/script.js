document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X (optional enhancement)
        });
    }

    // Scroll Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Countdown Timer
    const countdownTarget = new Date('November 19, 2026 00:00:00 UTC').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownTarget - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            const container = document.querySelector('.countdown');
            if (container) {
                container.innerHTML = '<h2 class="heading-font" style="font-size: 3rem; color: var(--primary-red);">GTA 6 IS OUT NOW — PLAY IT!</h2>';
            }
        }
    }

    if (document.getElementById('days')) {
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Lightbox Modal Popup
    const videoModal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.querySelector('.video-modal-close');
    const videoCards = document.querySelectorAll('.video-card');

    if (videoModal && modalIframe && modalClose) {
        videoCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // If user clicks with meta key or right click, allow default behavior (opening in new tab)
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
                    return;
                }
                
                e.preventDefault();
                const videoId = this.getAttribute('data-video-id');
                const videoTitle = this.getAttribute('data-video-title');
                
                if (videoId) {
                    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    if (modalTitle) modalTitle.innerText = videoTitle || 'Grand Theft Auto VI Video';
                    videoModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Disable page scrolling
                }
            });
        });

        // Close Modal
        function closeModal() {
            videoModal.classList.remove('show');
            modalIframe.src = '';
            document.body.style.overflow = ''; // Enable page scrolling
        }

        modalClose.addEventListener('click', closeModal);
        
        // Close modal when clicking outside content box
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeModal();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
