document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    // Note: CSS `scroll-behavior: smooth;` handles this for modern browsers,
    // but this JS provides a fallback and more control if needed.
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Scroll to Previous Section Button ---
    const scrollToPrevBtn = document.getElementById('scrollToPrevBtn');
    const sections = Array.from(document.querySelectorAll('main > section'));

    // Function to show/hide the button
    const toggleScrollButton = () => {
        if (window.scrollY > window.innerHeight / 2) {
            scrollToPrevBtn.style.display = 'block';
        } else {
            scrollToPrevBtn.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleScrollButton);

    // Functionality for the button click
    scrollToPrevBtn.addEventListener('click', () => {
        let currentSectionIndex = -1;
        
        // Find the index of the current section in view
        // We find the last section whose top is above the current scroll position
        for (let i = sections.length - 1; i >= 0; i--) {
            const sectionTop = sections[i].offsetTop;
            // Add a small offset (e.g., 100px) to ensure we're well into the section
            if (window.scrollY >= sectionTop - 100) {
                currentSectionIndex = i;
                break;
            }
        }

        // If we are in a section (not at the very top) and it's not the first one
        if (currentSectionIndex > 0) {
            const prevSection = sections[currentSectionIndex - 1];
            prevSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If we're in the first section or at the top, scroll to the very top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

});