# Mohammad Javed – Portfolio Website

A modern, responsive single-page portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive design** – works on all screen sizes (mobile, tablet, desktop)
- **Dark theme** – stylish dark colour palette with purple/pink gradient accents
- **Animated hero** – typewriter effect, floating cards, spinning avatar ring
- **Smooth scroll & active nav** – highlights the current section in the navbar
- **Scroll-reveal animations** – sections fade in as you scroll
- **Animated counters** – statistics in the About section count up on scroll
- **Projects showcase** – six sample projects with tech-stack tags
- **Skills grid** – categorised by Frontend, Backend, Database, and Tools
- **Contact form** – with client-side validation and simulated submission
- **Back-to-top button** – appears after scrolling down

## Sections

| Section  | Description                                  |
|----------|----------------------------------------------|
| Hero     | Name, animated role, CTA buttons, social links |
| About    | Bio, statistics, personal info card           |
| Skills   | Technology tags grouped by category           |
| Projects | Six project cards with links and stack tags   |
| Contact  | Info items + contact form                     |
| Footer   | Logo, tagline, social links, copyright        |

## Getting Started

Open `index.html` directly in any modern browser – no build step required.

```bash
# Or serve with any static server, e.g.:
npx serve .
```

## Customisation

Update the placeholder content in `index.html`:

- Replace **name**, **email**, **LinkedIn URL** with your real details
- Add real **project links** (GitHub repo & live demo) inside the `<article class="project-card">` elements
- Swap placeholder project descriptions with real ones
- Adjust skills tags to match your actual skill set
- Replace the avatar initials with a real photo (swap `<span>MJ</span>` with an `<img>` tag)

Colour variables live at the top of `style.css` under `:root { … }` – easy to re-theme.

## File Structure

```
portfolio/
├── index.html   # Main HTML page
├── style.css    # All styles (CSS custom properties, responsive)
├── script.js    # Navbar scroll, typed animation, counters, form
└── README.md    # This file
```
