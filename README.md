# ICU Zambia — Group(4) Presentation

**IWD DL 2026**
**Group members** 

- James Luwō
- Fears Sinkalu
- Kasanga Davy
- Abraham Nyirongo
- Abigail M. Munalula
- Samuel Mo
- Ben Phiri
- Osward Mwaba
- Wamuyoo M. Ndiyoi
- Amazing Nyangu

---

## Overview

This is the official front-end website for **Information and Communications University (ICU) Zambia**, located off Shantumbu Road, Kafue, Zambia. The site presents the university's academic programmes, admissions process, news, faculty, and contact information — built as a responsive, accessible, single-page application.

**Live site:** [icu.ac.zm](https://icu.ac.zm/) | **Official admissions:** [admission.icu.ac.zm](https://admission.icu.ac.zm)

---

## Project Structure

```
Assignment/
├── index.html          # Main HTML document (single-page layout)
├── css/
│   └── style.css       # All styles — design tokens, components, dark mode
├── js/
│   └── script.js       # All interactivity — animations, filters, forms
├── images/
│   ├── favicon.ico     # Official ICU favicon
│   ├── favicon.svg     # Official ICU SVG logo (used in navbar & footer)
│   ├── apple-touch-icon.png
│   ├── images/students icu.png     # Hero background (official campus photo)
│   ├── images/students icu.png   # Additional campus images
│   ├── girl-standing.webp  # About section portrait
│   ├── news1.webp      # ICU artisanal mining certification news
│   ├── news2.webp      # ICU gold identification training news
│   ├── news3.webp      # ICU miners training & certification news
│   └── student-life-banner.webp
├── .gitignore
└── README.md
```

---

## Features

### Design & UI
- **Official ICU brand colours** — Primary Blue `#1b4f9b`, Dark Blue `#0d1b3e`, White `#ffffff`
- **CSS custom property system** — all colours, shadows, and spacing as design tokens for easy theming
- **Responsive layout** — Bootstrap 5 grid; fully functional on mobile, tablet, and desktop
- **Dark mode** — toggle with `localStorage` persistence and `prefers-color-scheme` detection
- **Smooth animations** — AOS (Animate On Scroll) library with `prefers-reduced-motion` support
- **Typewriter effect** — rotating official ICU taglines in the hero section
- **Animated statistics counters** — cubic-easing via `requestAnimationFrame`

### Sections
| Section | Description |
|---|---|
| Announcement Bar | Dismissible intake notice with localStorage state |
| Hero | Full-viewport with official campus image, stats bar, and typewriter tagline |
| Trust Bar | Accreditation badges and key institutional highlights |
| About | Official ICU history, founding story, and four schools |
| Why Choose Us | Four feature cards: Accreditation, Infrastructure, Faculty, Partnerships |
| Statistics | Animated counters — years, programmes, schools, accreditation |
| Academic Programmes | 9 real ICU programmes with filter tabs (Undergraduate / Postgraduate) |
| Popular Courses | Searchable short courses with live keyword filtering |
| Admissions | 4-step application process, entry requirements, fees, key dates |
| Faculty | Staff cards with social overlay (LinkedIn, email, research links) |
| Campus Life | Photo cards for Library, Computer Labs, Student Lounge |
| Testimonials | 3-column star-rated graduate testimonials |
| News & Events | 3 real ICU news articles with official images |
| Newsletter | Email subscription form with validation |
| Contact | Address, phones, email, embedded Google Map, contact form |
| Footer | Logo, social links, resource links, legal |

### Accessibility
- `<main id="main-content">` with skip-to-content link
- ARIA labels, `aria-required`, `aria-pressed`, `aria-live`, `aria-current`
- `:focus-visible` styles for keyboard navigation
- Semantic HTML5 — `<nav>`, `<main>`, `<article>`, `<section>`, `<address>`, `<footer>`

### Performance
- Single merged scroll listener with `requestAnimationFrame` ticking guard
- `{ passive: true }` scroll events
- `loading="lazy"` on all below-fold images
- `<link rel="preconnect">` for Google Fonts
- Official assets served locally from `/images/` (no external image CDN dependency)

---

## Technologies

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Semantic markup |
| CSS3 | — | Custom properties, animations, responsive layout |
| JavaScript (ES5/6) | — | Interactivity, filters, form validation |
| Bootstrap | 5.3.2 | Grid system, navbar, utility classes |
| Font Awesome | 6.4.0 | Icons |
| Google Fonts | — | Inter (body) + Montserrat (headings) |
| AOS | 2.3.1 | Scroll-triggered animations |

---

## Official Links

| Resource | URL |
|---|---|
| University Website | [icu.ac.zm](https://icu.ac.zm/) |
| Online Admissions | [admission.icu.ac.zm](https://admission.icu.ac.zm) |
| Student Portal (AIMS) | [aims.icuzambia.net](https://aims.icuzambia.net/) |
| Digital Library | [library.icuzambia.net](https://library.icuzambia.net) |
| Research Repository | [research.icu.ac.zm](https://research.icu.ac.zm) |
| Careers | [workspace.icu.ac.zm](https://workspace.icu.ac.zm) |
| ICU TV | [icutvzm.com](https://icutvzm.com) |
| Facebook | [facebook.com/icuzambia](http://facebook.com/icuzambia) |
| Instagram | [@icuzambia](https://www.instagram.com/icuzambia) |
| LinkedIn | [ICU Zambia](https://www.linkedin.com/school/icuzambia) |
| YouTube | [@icutvzm](https://www.youtube.com/@icutvzm) |

---

## Contact

**Information and Communications University**
Off Shantumbu Road, Kafue, Plot # 19877/M/1A/392, Zambia

| Department | Phone |
|---|---|
| General Inquiries | +260 961 532 739 / +260 779 841 694 / +260 777 020 293 |
| Registration | +260 970 406 960 / +260 971 770 875 |
| Programme Inquiries | +260 979 328 041 / +260 977 450 151 |
| ZRDC Sponsorship | +260 971 177 346 / +260 979 303 567 |
| Examinations | +260 974 202 170 / +260 977 431 107 |

**Email:** [info@icu.ac.zm](mailto:info@icu.ac.zm)
**Office Hours:** Monday – Friday, 08:00 – 17:00

