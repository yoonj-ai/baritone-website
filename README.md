# Baritone Research Website

Production-grade static website for Baritone Research (baritoneresearch.com) - Institutional investment solutions for financial advisors.

## 🎨 Design

- **Color Palette:**
  - Primary: Dark Maroon (#6B1E2E)
  - Background: Off-White (#F9F7F4)
  - Text: Deep Charcoal (#1A1A1A)

- **Typography:**
  - Headings: Figtree (Google Fonts)
  - Accent: Playfair Display (Google Fonts)
  - Body: Figtree
  - Minimum body copy: 18px

- **Features:**
  - Smooth scroll animations using Intersection Observer
  - Subtle parallax effect on hero image
  - Animated research pipeline widget
  - Tabbed strategy models section
  - Fully responsive mobile design with hamburger menu
  - Sticky navigation

## 📁 Project Structure

```
Website RENDER/
├── index.html              # Main homepage
├── privacy.html            # Privacy policy page
├── terms.html              # Terms of service page
├── styles.css              # Complete stylesheet with CSS variables
├── script.js               # JavaScript for animations and interactions
├── assets/
│   └── images/
│       ├── .gitkeep        # Image directory placeholder
│       ├── hero-mountain.jpg       # (Add your image)
│       ├── toronto-cityscape.jpg   # (Add your image)
│       ├── yoonjai-shin.jpg        # (Add your image)
│       └── ted-brown.jpg           # (Add your image)
└── README.md               # This file
```

## 🚀 Deployment to Render

### Prerequisites
1. GitHub account
2. Render account (free tier available)
3. Images added to `assets/images/` directory

### Steps to Deploy

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Baritone Research website"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it something like `baritone-research-website`
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/baritone-research-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** baritone-research
     - **Branch:** main
     - **Build Command:** (leave empty)
     - **Publish Directory:** `.` (current directory)
   - Click "Create Static Site"

5. **Custom Domain (Optional)**
   - In Render dashboard, go to your site settings
   - Click "Custom Domains"
   - Add `baritoneresearch.com` and `www.baritoneresearch.com`
   - Follow DNS configuration instructions

## ⚙️ Configuration Required

### 1. Add Images
Place the following images in `assets/images/`:
- `hero-mountain.jpg` - Hero section background
- `toronto-cityscape.jpg` - Contact section background
- `yoonjai-shin.jpg` - Leadership photo
- `ted-brown.jpg` - Leadership photo

### 2. Configure Formspree
In `index.html`, replace the Formspree endpoint:
```html
<!-- Find this line (around line 420) -->
<form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```

Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID:
1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy your form ID
5. Update the action URL

### 3. Update Legal Pages
Edit `privacy.html` and `terms.html` to replace `[INSERT CONTENT HERE]` placeholders with actual legal content.

## 🎯 Features Implemented

### Homepage Sections
- ✅ Sticky navigation with mobile hamburger menu
- ✅ Full-viewport hero with animated headline
- ✅ "What We Do" with live research pipeline widget
- ✅ "For Advisors" feature cards with scroll animations
- ✅ "Our Process" with 5-step framework + AI callout
- ✅ "Strategy Models" with tabbed interface (Equity, Income, Risk Overlays)
- ✅ "Leadership" section with full bios
- ✅ "Contact" section with working form and background image
- ✅ Footer with disclaimer and links

### Technical Features
- ✅ CSS Variables for easy theming
- ✅ Intersection Observer for scroll animations
- ✅ Smooth scroll navigation
- ✅ Parallax effect on hero
- ✅ Animated pipeline status indicators
- ✅ Tab switching with smooth transitions
- ✅ Form validation and submission handling
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Accessibility features (keyboard navigation, ARIA labels)
- ✅ Performance optimizations (lazy loading, debouncing)

## 📱 Responsive Breakpoints

- **Desktop:** 1024px and above
- **Tablet:** 768px - 1023px
- **Mobile:** 767px and below
- **Small Mobile:** 480px and below

## 🔧 Local Development

Simply open `index.html` in a web browser. For a better development experience with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📝 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #6B1E2E;
    --color-background: #F9F7F4;
    --color-text: #1A1A1A;
    /* ... */
}
```

### Fonts
Change Google Fonts in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Content
All content is in `index.html` - simply edit the HTML to update text, add sections, etc.

## 🐛 Troubleshooting

**Images not showing:**
- Ensure images are in `assets/images/` directory
- Check file names match exactly (case-sensitive)
- Verify image paths in HTML/CSS

**Form not working:**
- Confirm Formspree ID is correct
- Check browser console for errors
- Ensure form action URL is complete

**Animations not working:**
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded
- Try hard refresh (Ctrl+Shift+R)

## 📄 License

© 2025 Baritone Research. All rights reserved.

## 📧 Support

For questions or issues, contact: info@baritoneresearch.com
