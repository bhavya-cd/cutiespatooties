# Cutiespatooties Outfits - Next.js E-commerce

A modern e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Pages**: Individual product detail pages with dynamic routing
- 🎨 **Modern Design**: Beautiful, responsive UI with smooth animations
- 📱 **Mobile-First**: Fully responsive design
- 🚀 **Performance**: Optimized with Next.js Image component
- 🔍 **SEO-Friendly**: Server-side rendering and static generation
- 💬 **WhatsApp Integration**: Direct ordering via WhatsApp

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cuties/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── products/          # Product pages
│   │   └── [slug]/       # Dynamic product routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── LookbookCarousel.tsx
├── lib/                   # Utilities
│   └── products.ts        # Product data
└── public/                # Static assets
    └── assets/
        └── images/
```

## Adding Products

Edit `lib/products.ts` to add new products. Each product needs:
- `id`: Unique identifier
- `slug`: URL-friendly name (e.g., "pink-halter-top")
- `title`: Product name
- `description`: Full description
- `price`: Price string
- `sizes`: Array of available sizes
- `image`: Path to image in `/public/assets/images/`
- `whatsappMessage`: Pre-filled WhatsApp message

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting**

For static export (if needed):
```bash
npm run build
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Next/Image** - Optimized images

## License

© 2026 Cutiespatooties Outfits

