/* ============================================================
   LUMA Estudio Creativo — main.js
   ============================================================ */

/* ---- Preloader ---- */
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1200);
    });
}

/* ---- Navbar scroll effect ---- */
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ---- Hamburger menu ---- */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ---- Scroll reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Animated counters ---- */
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, step);
}

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ---- Parallax: hero blobs on mouse move ---- */
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (clientX - cx) / cx;
        const dy = (clientY - cy) / cy;

        document.querySelectorAll('.blob').forEach((blob, i) => {
            const factor = (i + 1) * 12;
            blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
        });
    });
}

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Service cards stagger on scroll ---- */
document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

/* ---- Portfolio cards stagger ---- */
document.querySelectorAll('.portfolio-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
});

/* ---- Why cards stagger ---- */
document.querySelectorAll('.why-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
});

/* ---- Floating cards subtle animation on scroll ---- */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.float-card').forEach((card, i) => {
        const offset = Math.sin(scrollY * 0.003 + i * 1.5) * 6;
        card.style.transform = `translateY(${offset}px)`;
    });
});

/* ---- Testimonial stars animation ---- */
document.querySelectorAll('.testi-stars i').forEach((star, i) => {
    star.style.animationDelay = `${i * 0.1}s`;
});

/* ---- Tilt effect on service cards (desktop only) ---- */
if (window.innerWidth > 900) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -4;
            const rotY = ((x - cx) / cx) *  4;
            card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            card.style.transformStyle = 'preserve-3d';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transformStyle = '';
        });
    });
}

/* ---- Typing effect for hero badge ---- */
const badge = document.querySelector('.hero-badge');
if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(10px)';
    setTimeout(() => {
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 300);
}

/* ---- Progress bar for metric inside phone mockup ---- */
const metricFill = document.querySelector('.metric-fill');
if (metricFill) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            metricFill.style.width = '78%';
            observer.disconnect();
        }
    });
    observer.observe(metricFill);
}

/* ---- WhatsApp button pulse on page load ---- */
const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
    setTimeout(() => {
        waBtn.style.transform = 'scale(1.15)';
        setTimeout(() => {
            waBtn.style.transform = '';
        }, 300);
    }, 2000);
}

/* ---- Nav active link style injection ---- */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: #fff; background: rgba(124,58,237,0.15); }`;
document.head.appendChild(style);

console.log('%c LUMA Estudio Creativo ◆', 'color: #A78BFA; font-size: 18px; font-weight: bold; font-family: Sora, sans-serif;');
console.log('%c Tu proyecto tiene algo único. Nosotros te ayudamos a contarlo.', 'color: #94A3B8; font-size: 12px;');
