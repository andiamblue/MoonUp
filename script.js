// صبر می‌کنیم تا کل محتوای صفحه بارگذاری شود
document.addEventListener('DOMContentLoaded', () => {

    // --- مدیریت منوی موبایل (همبرگر) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // بستن منو با کلیک روی هر لینک
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // --- مدیریت منوی کشویی پیشرفته در موبایل ---
    const dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', (e) => {
        // فقط در حالت موبایل با کلیک باز شود
        if (window.innerWidth <= 768) {
             // جلوگیری از اسکرول صفحه هنگام باز کردن منو
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });

    // --- اسکرول نرم به بخش‌ها (جایگزین بهتری برای scroll-behavior) ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- دکمه خلاقانه "بازگشت به بخش قبلی" ---
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const sections = Array.from(document.querySelectorAll('main > section'));

    // نمایش و عدم نمایش دکمه بر اساس اسکرول
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    // عملکرد کلیک روی دکمه
    scrollUpBtn.addEventListener('click', () => {
        const currentScroll = window.scrollY;
        let previousSection = null;

        // پیدا کردن بخشی که دقیقا بالاتر از ویوپورت فعلی قرار دارد
        for (let i = sections.length - 1; i >= 0; i--) {
            // offsetTop موقعیت بالای هر بخش نسبت به بالای صفحه است
            // با یک حاشیه کوچک (5 پیکسل) برای دقت بیشتر
            if (sections[i].offsetTop < currentScroll - 5) {
                previousSection = sections[i];
                break;
            }
        }
        
        // اگر بخش قبلی پیدا شد به آن اسکرول کن، در غیر این صورت به بالای صفحه برو
        if (previousSection) {
            previousSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});