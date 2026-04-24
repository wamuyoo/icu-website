/**
 * ICU Zambia – Information and Communications University
 * Main JavaScript  |  Professional Academic Edition
 *
 * Sections:
 *  1.  DOM Ready Wrapper
 *  2.  AOS Initialisation
 *  3.  Page Loader
 *  4.  Announcement Bar Dismiss
 *  5.  Scroll Progress Bar
 *  6.  Navbar Scroll Effect & Active-Link Tracking  (merged scroll listener)
 *  7.  Back-to-Top Button
 *  8.  Mobile Menu Auto-Close
 *  9.  Dark Mode Toggle
 * 10.  Typewriter Effect (Hero Tagline)
 * 11.  Animated Counters (Stats Section)
 * 12.  Program Filter Tabs
 * 13.  Course Search
 * 14.  Contact Form Validation & Submission
 * 15.  Newsletter Subscription
 * 16.  Toast Notification Helper
 * 17.  Keyboard Accessibility
 * 18.  Dynamic Footer Year
 * 19.  Console Branding
 */

/* =============================================
   1. DOM READY WRAPPER
   All code runs after the DOM is fully parsed.
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {

    /* =============================================
       2. AOS INITIALISATION
       ============================================= */
    AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    /* =============================================
       3. PAGE LOADER
       ============================================= */
    window.addEventListener('load', function () {
        var loader = document.getElementById('loader');
        if (!loader) return;

        /* Wait for loader progress bar animation (1.5s) then fade out */
        setTimeout(function () {
            loader.classList.add('hidden');
            /* Remove from DOM after transition completes */
            setTimeout(function () { loader.remove(); }, 900);
        }, 1600);
    });

    /* =============================================
       4. ANNOUNCEMENT BAR DISMISS
       ============================================= */
    var announceBar   = document.getElementById('announceBar');
    var announceClose = document.getElementById('announceClose');

    if (announceClose && announceBar) {
        announceClose.addEventListener('click', function () {
            announceBar.style.maxHeight = announceBar.offsetHeight + 'px';
            announceBar.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
            requestAnimationFrame(function () {
                announceBar.style.maxHeight = '0';
                announceBar.style.opacity   = '0';
                announceBar.style.overflow  = 'hidden';
                setTimeout(function () { announceBar.remove(); }, 450);
            });
        });
    }

    /* =============================================
       5. SCROLL PROGRESS BAR
       ============================================= */
    var progressBar = document.createElement('div');
    progressBar.id = 'scrollProgressBar';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-label', 'Page scroll progress');
    progressBar.style.cssText = [
        'position:fixed',
        'top:0',
        'left:0',
        'width:0%',
        'height:3px',
        'background:linear-gradient(90deg,#FF6600,#003366)',
        'z-index:10001',
        'pointer-events:none',
        'transition:width 0.08s linear'
    ].join(';');
    document.body.prepend(progressBar);

    /* =============================================
       6. MERGED SCROLL LISTENER
       Handles: navbar, back-to-top, progress bar, active link
       Using ONE scroll listener improves performance.
       ============================================= */
    var mainNav    = document.getElementById('mainNav');
    var backToTop  = document.getElementById('backToTop');
    var navLinks   = document.querySelectorAll('.nav-link');
    var sections   = document.querySelectorAll('section[id]');
    var ticking    = false;   /* requestAnimationFrame guard */

    function onScroll() {
        var scrollY = window.scrollY;

        /* 6a. Progress bar */
        var totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(pct));

        /* 6b. Navbar colour change */
        if (mainNav) {
            mainNav.classList.toggle('scrolled', scrollY > 80);
        }

        /* 6c. Back-to-top visibility */
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }

        /* 6d. Active nav-link highlighting */
        var current = '';
        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop - 140) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + current;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    /* =============================================
       7. BACK-TO-TOP BUTTON
       ============================================= */
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =============================================
       8. MOBILE MENU AUTO-CLOSE
       ============================================= */
    var navbarToggler  = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.getElementById('navbarNav');

    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    /* Use Bootstrap's Collapse API for proper cleanup */
                    var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
    }

    /* =============================================
       9. DARK MODE TOGGLE
       ============================================= */
    (function initDarkMode() {
        var toggle     = document.getElementById('darkModeToggle');
        if (!toggle) return;

        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var saved       = localStorage.getItem('icuDarkMode');

        /* Apply on load */
        var isDark = (saved === 'true') || (saved === null && prefersDark);
        if (isDark) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            toggle.setAttribute('aria-label', 'Switch to light mode');
        }

        toggle.addEventListener('click', function () {
            var dark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('icuDarkMode', dark);
            toggle.innerHTML = dark
                ? '<i class="fas fa-sun" aria-hidden="true"></i>'
                : '<i class="fas fa-moon" aria-hidden="true"></i>';
            toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    })();

    /* =============================================
       10. TYPEWRITER EFFECT (HERO TAGLINE)
       ============================================= */
    (function typewriter() {
        var el = document.getElementById('heroTagline');
        if (!el) return;

        var phrases = [
            'Delivering An ICT Enabled Education With Excellence',
            'Shaping Minds. Transforming Lives.',
            'Zambia\'s Premier ICT University — Est. 2009',
            'Education That Inspires Invention, Not Just Usage'
        ];

        var phraseIdx  = 0;
        var charIdx    = 0;
        var deleting   = false;
        var pauseTime  = 2200;

        function tick() {
            var phrase = phrases[phraseIdx];

            if (!deleting) {
                charIdx++;
                el.textContent = phrase.slice(0, charIdx);

                if (charIdx === phrase.length) {
                    deleting = true;
                    setTimeout(tick, pauseTime);
                    return;
                }
            } else {
                charIdx--;
                el.textContent = phrase.slice(0, charIdx);

                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(tick, 400);
                    return;
                }
            }

            setTimeout(tick, deleting ? 40 : 60);
        }

        /* Start after loader */
        setTimeout(tick, 2000);
    })();

    /* =============================================
       11. ANIMATED COUNTERS
       Triggers once when the stats section enters viewport.
       ============================================= */
    function animateCounter(id, target, suffix) {
        var el = document.getElementById(id);
        if (!el) return;

        var startTime = null;
        var duration  = 1800; /* ms */

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(easeOut(progress) * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    var statsSection    = document.querySelector('.stats-section');
    var countersStarted = false;

    if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounter('statYear',     15,   '+');
                animateCounter('statPrograms', 25,   '+');
                animateCounter('statAlumni',   2000, '+');
                animateCounter('statEmploy',   95,   '%');
                statsObserver.disconnect();
            }
        }, { threshold: 0.4 });

        statsObserver.observe(statsSection);
    }

    /* =============================================
       12. PROGRAM FILTER TABS
       BUG FIX: Previously used display:'block' which broke
       Bootstrap's flexbox grid. Now uses display:'' (empty)
       to revert to Bootstrap's default display value.
       BUG FIX: aria-pressed is now updated correctly.
       ============================================= */
    (function programFilter() {
        var filterBtns    = document.querySelectorAll('.filter-btn');
        var cardWrappers  = document.querySelectorAll('.prog-col');

        if (!filterBtns.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                /* Update button states */
                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');   /* BUG FIX */
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');     /* BUG FIX */

                var filter = this.dataset.filter;

                cardWrappers.forEach(function (col) {
                    var match = filter === 'all' || col.dataset.level === filter;
                    col.style.display = match ? '' : 'none';   /* BUG FIX: '' not 'block' */

                    if (match) {
                        /* Fade-in restored cards */
                        col.style.opacity    = '0';
                        col.style.transition = 'opacity 0.35s ease';
                        requestAnimationFrame(function () {
                            col.style.opacity = '1';
                        });
                    }
                });
            });
        });
    })();

    /* =============================================
       13. COURSE SEARCH
       ============================================= */
    (function courseSearch() {
        var input = document.getElementById('courseSearch');
        if (!input) return;

        var cols = document.querySelectorAll('.course-col');

        input.addEventListener('input', function () {
            var term = this.value.toLowerCase().trim();
            var anyVisible = false;

            cols.forEach(function (col) {
                var title = (col.querySelector('h5')   || {}).textContent || '';
                var desc  = (col.querySelector('.course-body p') || {}).textContent || '';
                var match = !term || title.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
                col.style.display = match ? '' : 'none';
                if (match) anyVisible = true;
            });

            /* Show "no results" message if needed */
            var noResults = document.getElementById('courseNoResults');
            if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
        });
    })();

    /* =============================================
       14. CONTACT FORM – VALIDATION & SUBMISSION
       ============================================= */
    (function contactForm() {
        var form     = document.getElementById('contactForm');
        var alertBox = document.getElementById('formAlert');
        if (!form || !alertBox) return;

        var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function validate(field) {
            if (field.hasAttribute('required') && !field.value.trim()) return false;
            if (field.type === 'email' && !EMAIL_RE.test(field.value)) return false;
            return true;
        }

        function mark(field, valid) {
            field.classList.toggle('is-valid',   valid);
            field.classList.toggle('is-invalid', !valid);
        }

        /* Real-time validation on blur */
        form.querySelectorAll('.form-control').forEach(function (field) {
            field.addEventListener('blur', function () {
                if (this.value !== '') mark(this, validate(this));
            });
            field.addEventListener('input', function () {
                if (this.classList.contains('is-invalid')) mark(this, validate(this));
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var allValid = true;
            form.querySelectorAll('[required]').forEach(function (field) {
                var ok = validate(field);
                mark(field, ok);
                if (!ok) allValid = false;
            });

            if (!allValid) {
                showFormAlert('Please fill in all required fields correctly.', 'danger');
                return;
            }

            /* Simulate async submission */
            var btn = form.querySelector('.btn-submit');
            var origHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
            btn.disabled  = true;

            setTimeout(function () {
                showFormAlert('Message sent! Our team will respond within 24 hours.', 'success');
                form.reset();
                form.querySelectorAll('.form-control, .form-select').forEach(function (f) {
                    f.classList.remove('is-valid', 'is-invalid');
                });
                btn.innerHTML = origHtml;
                btn.disabled  = false;
                showToast('Message sent successfully!', 'success');
            }, 1600);
        });

        function showFormAlert(msg, type) {
            alertBox.className     = 'alert alert-' + type;
            alertBox.textContent   = msg;
            alertBox.style.display = 'block';
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(function () { alertBox.style.display = 'none'; }, 7000);
        }
    })();

    /* =============================================
       15. NEWSLETTER SUBSCRIPTION
       ============================================= */
    (function newsletter() {
        var form = document.getElementById('newsletterForm');
        if (!form) return;

        var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var emailEl = form.querySelector('input[type="email"]');
            var btn     = form.querySelector('button[type="submit"]');

            if (!EMAIL_RE.test(emailEl.value.trim())) {
                emailEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.3)';
                setTimeout(function () { emailEl.style.boxShadow = ''; }, 2000);
                return;
            }

            btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Subscribed!';
            btn.disabled  = true;
            showToast('Welcome! You\'re now subscribed.', 'success');

            setTimeout(function () {
                form.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Subscribe';
                btn.disabled  = false;
            }, 3500);
        });
    })();

    /* =============================================
       16. TOAST NOTIFICATION HELPER
       ============================================= */
    function showToast(message, type) {
        var container = document.getElementById('toastContainer');
        if (!container) return;

        var toast = document.createElement('div');
        toast.className  = 'toast-msg ' + (type || '');
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        container.appendChild(toast);

        setTimeout(function () {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity    = '0';
            toast.style.transform  = 'translateX(30px)';
            setTimeout(function () { toast.remove(); }, 450);
        }, 4000);
    }

    /* Make showToast accessible globally for inline usage */
    window.showToast = showToast;

    /* =============================================
       17. KEYBOARD ACCESSIBILITY
       ============================================= */
    document.addEventListener('keydown', function (e) {
        /* ESC closes the open mobile navbar */
        if (e.key === 'Escape') {
            var openNav = document.querySelector('.navbar-collapse.show');
            if (openNav) {
                var bsCol = bootstrap.Collapse.getInstance(openNav);
                if (bsCol) bsCol.hide();
            }
        }
    });

    /* =============================================
       18. DYNAMIC FOOTER YEAR
       ============================================= */
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* =============================================
       19. CONSOLE BRANDING
       ============================================= */
    console.log(
        '%c  ICU Zambia  ',
        'background:#003366;color:#FF6600;font-size:16px;font-weight:bold;' +
        'padding:8px 16px;border-radius:6px;'
    );
    console.log('%c Information and Communication University ', 'color:#FF6600;font-size:12px;');
    console.log('%c HTML  •  CSS  •  JavaScript  •  Bootstrap 5 ', 'color:#00A651;font-size:11px;');

}); /* end DOMContentLoaded */

function openChat() {
    document.getElementById("chatPanel").classList.add("show");
    document.getElementById("chatPanel").classList.remove("hidden");
    document.getElementById("chatToggle").style.display = "none";
}

function closeChat() {
    const panel = document.getElementById("chatPanel");

    panel.classList.remove("show");

    setTimeout(() => {
        panel.classList.add("hidden");
        document.getElementById("chatToggle").style.display = "flex";
    }, 200);
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim().toLowerCase();
    if (!message) return;

    chatBox.innerHTML += `<div class="msg user">You: ${message}</div>`;
    input.value = "";

    let reply = getICUResponse(message);

    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot">ICU Assistant: ${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
}

function getICUResponse(msg) {

    // GREETING
    if (msg.includes("hi") || msg.includes("hello")) {
        return "Hello 👋 Welcome to ICU Zambia Admissions Assistant. How can I help you today?";
    }

    // ADMISSIONS
    if (msg.includes("admission") || msg.includes("apply")) {
        return "To apply at ICU Zambia:\n1. Have Grade 12 Certificate\n2. Minimum 5 credits including Math & English\n3. Apply online or visit campus\nAdmissions are open for January, May, and September intakes.";
    }

    // FEES
    if (msg.includes("fee") || msg.includes("tuition")) {
        return "ICU Zambia tuition is approximately K8,500 per semester depending on the program. Payment plans are available.";
    }

    // PROGRAMS
    if (msg.includes("program") || msg.includes("courses")) {
        return "ICU offers:\n- ICT & Software Engineering\n- Network Technology\n- Cyber Security\n- Business & MBA\n- Education\n- Engineering";
    }

    // REQUIREMENTS
    if (msg.includes("requirement")) {
        return "Requirements:\n- Grade 12 Certificate\n- 5 credits minimum\n- Credit in Mathematics\n- Credit in English";
    }

    // LOCATION
    if (msg.includes("location") || msg.includes("where")) {
        return "ICU Zambia is located off Shantumbu Road, Kafue, Zambia.";
    }

    // DEFAULT
    return "Sorry, I don’t fully understand. Please ask about admissions, programs, fees, or requirements.";
}


