/* ========================================
   LIMA HIDEOUT — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Hero load ---- */
    const hero = document.getElementById('hero');
    setTimeout(() => hero.classList.add('loaded'), 120);

    /* ---- Navbar scroll ---- */
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Burger menu ---- */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        burger.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            burger.classList.remove('active');
        });
    });

    /* ---- Reveal on scroll ---- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));

    /* ---- Smooth anchor scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ---- Hero parallax ---- */
    const heroImg = document.getElementById('heroImg');
    let raf = false;
    window.addEventListener('scroll', () => {
        if (!raf) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y < window.innerHeight) {
                    heroImg.style.transform = `scale(${1 + y * 0.00008}) translateY(${y * 0.18}px)`;
                }
                raf = false;
            });
            raf = true;
        }
    }, { passive: true });

    /* ---- Contact form ---- */
    const form = document.getElementById('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const orig = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.style.opacity = '.6';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '¡Mensaje Enviado!';
            btn.style.opacity = '1';
            btn.style.background = 'var(--accent)';
            btn.style.color = 'var(--darkest)';

            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                form.reset();
            }, 2400);
        }, 1400);
    });

    /* ---- Gallery lightbox ---- */
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbClose   = document.getElementById('lbClose');
    const lbBg      = lightbox.querySelector('.lightbox__bg');
    const items     = document.querySelectorAll('.gallery__item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            lbImg.src = item.querySelector('img').src;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLB = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    lbClose.addEventListener('click', closeLB);
    lbBg.addEventListener('click', closeLB);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

});
