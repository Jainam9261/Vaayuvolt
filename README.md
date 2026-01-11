# VaayuVolt - Renewable Energy Solutions Website

A modern, responsive Angular website for VaayuVolt, a leading provider of renewable energy solutions including solar panels, wind turbines, inverters, and battery storage systems.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19 or higher)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   ng serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200/`

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/          # Core services (API, Contact)
│   ├── shared/
│   │   ├── components/        # Reusable components
│   │   │   ├── topbar/       # Top info bar
│   │   │   ├── navbar/       # Main navigation
│   │   │   ├── hero-carousel/ # Hero carousel with Swiper
│   │   │   ├── footer/       # Site footer
│   │   │   ├── whatsapp-fab/ # WhatsApp floating button
│   │   │   ├── product-card/ # Product card component
│   │   │   └── quote-modal/  # Quote request modal
│   │   └── directives/        # Custom directives
│   │       └── reveal-on-scroll.directive.ts
│   └── pages/
│       ├── home/             # Home page
│       ├── products/          # Products listing
│       ├── gallery/           # Gallery page
│       ├── about/             # About Us page
│       └── contact/           # Contact/Quote form
└── assets/
    ├── images/                # Logo, favicon, etc.
    ├── dummy/                 # Dummy images (replace with real)
    ├── gallery/               # Gallery images
    └── docs/                  # PDF documents
```

## 🎨 Brand Colors & Customization

### Brand Colors

The brand colors are defined in `src/styles.scss` as CSS variables:

```scss
:root {
  --brand-primary: #135282;   /* deep teal (logo) */
  --brand-accent:  #20B7C7;   /* lighter teal / turquoise */
  --brand-warm:    #F2A541;   /* warm orange/gold accent */
  --neutral-900:   #0A0A0A;   /* dark text */
  --neutral-100:   #F7FBFC;   /* light background */
  --muted:         #6B7C85;   /* muted text */
}
```

**To change colors:** Edit the CSS variables in `src/styles.scss`.

### Typography

- **Headings:** Poppins (loaded from Google Fonts)
- **Body:** Inter (loaded from Google Fonts)

Fonts are loaded in `src/index.html`. To change fonts, update the Google Fonts link in `index.html` and the CSS variables in `styles.scss`.

## 📸 Assets & Images

### Required Assets

Place the following assets in the specified locations:

1. **Logo & Favicon:**
   - `/src/assets/images/logo.png` - Main brand logo (used in navbar)
   - `/src/assets/images/favicon.png` - Favicon for the site
   - `/public/favicon.ico` - Browser favicon

2. **Hero Carousel Images:**
   - `/src/assets/dummy/hero-1.jpg`
   - `/src/assets/dummy/hero-2.jpg`
   - `/src/assets/dummy/hero-3.jpg`

3. **Product Images:**
   - `/src/assets/dummy/product-1.jpg` through `product-6.jpg`

4. **Gallery Images:**
   - `/src/assets/gallery/gallery-1.jpg` through `gallery-9.jpg`

5. **Other Images:**
   - `/src/assets/dummy/about-preview.jpg` - About section image

6. **Documents:**
   - Place PDFs in `/src/assets/docs/` (referenced in content)

### Replacing Dummy Images

1. Replace images in `/src/assets/dummy/` and `/src/assets/gallery/` with your actual images
2. Maintain the same file names or update references in component files
3. Recommended image sizes:
   - Hero images: 1920x600px
   - Product images: 800x600px
   - Gallery images: 1200x900px

## 🔧 Configuration

### Contact Information

Update contact details in the following files:

1. **Topbar & Footer:**
   - `src/app/shared/components/topbar/topbar.component.ts`
   - `src/app/shared/components/footer/footer.component.ts`

2. **Contact Page:**
   - `src/app/pages/contact/contact.component.html`

3. **WhatsApp Number:**
   - `src/app/shared/components/whatsapp-fab/whatsapp-fab.component.ts`
   - Format: `91123456789` (country code + number without +)

### API Endpoint

The contact form submission endpoint is configured in:
- `src/app/core/services/contact.service.ts`

Currently set to `/api/contact` (placeholder). Update when backend is ready.

## 🛠️ Development

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Code Scaffolding

Generate new components:
```bash
ng generate component component-name
```

### Running Tests

```bash
ng test
```

## 📱 Responsive Breakpoints

The site is designed with mobile-first approach:

- **Small:** ≤640px (mobile phones)
- **Medium:** 641–1024px (tablets)
- **Large:** ≥1025px (laptops, desktops)

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for images
- Screen reader friendly
- Focus indicators

## 🎯 Key Features

- ✅ Angular 19 with standalone components
- ✅ Angular Signals for state management
- ✅ Reactive Forms with validation
- ✅ SwiperJS carousel integration
- ✅ Scroll reveal animations
- ✅ Responsive design (mobile-first)
- ✅ Lazy-loaded routes
- ✅ SEO-friendly meta tags
- ✅ WhatsApp quick contact
- ✅ Product filtering and modal views
- ✅ Gallery lightbox
- ✅ Contact/Quote form with validation

## 📝 Notes

- All routes are lazy-loaded for optimal performance
- Images use `NgOptimizedImage` for better performance
- Forms include honeypot field for spam prevention
- Contact service currently simulates API calls (update when backend is ready)

## 🐛 Troubleshooting

### Images not loading
- Ensure images are placed in the correct `/src/assets/` directories
- Check file names match component references
- Verify image paths in component templates

### Swiper not working
- Ensure Swiper is installed: `npm install swiper`
- Check browser console for errors
- Verify Swiper registration in component files

### Styles not applying
- Clear browser cache
- Restart development server
- Check SCSS compilation errors

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For questions or issues, contact:
- Email: viralindustriesdd13@gmail.com
- Phone: +91 98250 58387

---

**Built with Angular 19** | **VaayuVolt © 2024**
