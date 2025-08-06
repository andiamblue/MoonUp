document.addEventListener('DOMContentLoaded', () => {

    // ==================== Smooth Scrolling for Nav Links ====================
    const navLinks = document.querySelectorAll('.navbar .nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== "Back to Previous Section" Button ====================
    const backToUpBtn = document.getElementById('back-to-up-btn');
    // تمام بخش‌های اصلی محتوا را انتخاب می‌کنیم
    const sections = Array.from(document.querySelectorAll('main section'));

    // نمایش یا پنهان کردن دکمه بر اساس موقعیت اسکرول
    window.addEventListener('scroll', () => {
        // دکمه فقط بعد از اسکرول به اندازه ارتفاع یک صفحه نمایش داده می‌شود
        if (window.scrollY > window.innerHeight / 2) {
            backToUpBtn.style.display = 'block';
        } else {
            backToUpBtn.style.display = 'none';
        }
    });

    // عملکرد کلیک بر روی دکمه
    backToUpBtn.addEventListener('click', () => {
        const currentScrollY = window.scrollY;

        // پیدا کردن بخش قبلی
        // ما آرایه بخش‌ها را برعکس می‌کنیم و اولین بخشی را پیدا می‌کنیم که بالای ویوپورت فعلی قرار دارد.
        let previousSection = null;
        for (let i = sections.length - 1; i >= 0; i--) {
            // offsetTop موقعیت بالای هر بخش نسبت به کل سند است
            // ما به دنبال اولین بخشی هستیم که شروع آن قبل از موقعیت فعلی اسکرول ما باشد.
            if (sections[i].offsetTop < currentScrollY - 50) { // 50 پیکسل برای ایجاد یک بافر کوچک
                previousSection = sections[i];
                break;
            }
        }

        // اگر بخش قبلی پیدا شد، به آن اسکرول کن
        if (previousSection) {
            previousSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // اگر در بخش اول بودیم، به بالای صفحه برو
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

});