document.addEventListener('DOMContentLoaded', function() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // 星际导航手册模态框功能
    const openManualModalBtn = document.querySelector('.open-manual-modal');
    const manualModal = document.getElementById('star-manual-modal');
    const closeManualModalBtn = document.querySelector('.close-manual-modal');
    const manualHeaders = document.querySelectorAll('.manual-header');

    if (openManualModalBtn && manualModal && closeManualModalBtn) {
        openManualModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            manualModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        closeManualModalBtn.addEventListener('click', () => {
            manualModal.classList.remove('show');
            document.body.style.overflow = '';
            manualHeaders.forEach(header => {
                header.classList.remove('active');
                header.nextElementSibling.classList.remove('open');
            });
        });

        manualModal.addEventListener('click', (e) => {
            if (e.target === manualModal) {
                manualModal.classList.remove('show');
                document.body.style.overflow = '';
                manualHeaders.forEach(header => {
                    header.classList.remove('active');
                    header.nextElementSibling.classList.remove('open');
                });
            }
        });
    }

    // 星际导航手册折叠功能 (应用于模态框内的条目)
    manualHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            content.classList.toggle('open');
        });
    });
});