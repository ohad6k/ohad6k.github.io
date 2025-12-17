document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .hero, .projects');
    revealElements.forEach(el => observer.observe(el));

    // Initialize Interactions
    if (window.innerWidth > 900) {
        initMagneticLetters();
        initCustomCursor();
    }
});

function initMagneticLetters() {
    const words = document.querySelectorAll('.hero-title .word');

    words.forEach(word => {
        const text = word.textContent.trim();
        word.innerHTML = '';

        // Split into letters
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'letter';
            word.appendChild(span);
        });

        const letters = word.querySelectorAll('.letter');

        word.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            letters.forEach(letter => {
                const rect = letter.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;

                const distanceX = mouseX - letterCenterX;
                const distanceY = mouseY - letterCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                const maxDist = 150;

                if (distance < maxDist) {
                    const force = (maxDist - distance) / maxDist;
                    const strength = 40;

                    const moveX = (distanceX / distance) * -1 * force * strength;
                    const moveY = (distanceY / distance) * -1 * force * strength;

                    letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    letter.style.transform = 'translate(0, 0)';
                }
            });
        });

        word.addEventListener('mouseleave', () => {
            letters.forEach(letter => {
                letter.style.transform = 'translate(0, 0)';
            });
        });
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    // Track mouse position globally
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isHovering) {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    // Handle interactive elements
    const interactives = document.querySelectorAll('a, button, .contact-strip a');

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.classList.add('snapped'); // Matches my previous JS logic
            cursor.classList.add('locked'); // Matches CSS media query logic if present

            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            cursor.style.width = `${rect.width + 10}px`;
            cursor.style.height = `${rect.height + 10}px`;
            cursor.style.borderRadius = computedStyle.borderRadius === '0px' ? '4px' : computedStyle.borderRadius;

            cursor.style.transform = `translate(${centerX}px, ${centerY}px) translate(-50%, -50%)`;
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.classList.remove('snapped');
            cursor.classList.remove('locked');

            // Reset to default dot
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderRadius = '50%';

            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });
    });
}