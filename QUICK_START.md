# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Run Development Server
```bash
npm run dev
```

## Step 3: Open Your Browser
Visit: **http://localhost:3000**

---

## ✨ What's New?

### ✅ Individual Product Pages
- Click any product → Opens dedicated page (`/products/[slug]`)
- Better SEO and shareable URLs
- Full product details with images

### ✅ Backend Ready
- API routes available at `/api/products`
- Easy to add database, authentication, etc.

### ✅ Modern Stack
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)

---

## 📝 Next Steps

1. **Update WhatsApp Number**: Edit `lib/products.ts` and replace `91XXXXXXXXXX` with your actual number

2. **Add More Products**: Edit `lib/products.ts` to add new items

3. **Customize**: Modify components in `/components` folder

4. **Deploy**: Push to GitHub and deploy on Vercel (free!)

---

## 🆘 Troubleshooting

**Images not showing?**
- Make sure `assets` folder is in `/public/assets/`
- Check image paths in `lib/products.ts`

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Type errors?**
- Make sure all dependencies are installed
- Run `npm install` again

---

## 📚 Learn More

- Full migration guide: See `MIGRATION_GUIDE.md`
- Next.js docs: https://nextjs.org/docs
- Project README: See `README.md`

