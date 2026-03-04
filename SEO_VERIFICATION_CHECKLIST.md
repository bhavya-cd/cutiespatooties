# SEO Verification Checklist

Use this checklist to verify your SEO implementation is complete and working correctly.

## ✅ Technical SEO

- [ ] **Sitemap Created**
  - [ ] Visit `https://yoursite.com/sitemap.xml` in browser
  - [ ] Should show XML with product URLs
  - [ ] Timestamp format is correct

- [ ] **Robots.txt**
  - [ ] Visit `https://yoursite.com/robots.txt`
  - [ ] Shows crawl directives
  - [ ] Sitemap URL is listed

- [ ] **Robots Metadata**
  - [ ] `app/robots.ts` file exists
  - [ ] Allows all crawlers to index
  - [ ] Disallows admin and private pages

- [ ] **Metadata Tags**
  - [ ] Open developer tools (F12)
  - [ ] Check Page Source or Elements tab
  - [ ] Should see:
    - [ ] `<title>` tag with content
    - [ ] `<meta name="description">` tag
    - [ ] `<meta property="og:title">` tag
    - [ ] `<meta property="og:image">` tag
    - [ ] Canonical URL meta tags

- [ ] **Structured Data**
  - [ ] Visit [Schema.org Validation Tool](https://schema.org/validator/)
  - [ ] Paste your page URL
  - [ ] Should detect:
    - [ ] Organization schema
    - [ ] Website schema
    - [ ] Product schema (on product pages)

- [ ] **Image Optimization**
  - [ ] Images load quickly
  - [ ] Check Network tab in DevTools
  - [ ] Should see WebP format if browser supports it
  - [ ] Images have alt text

- [ ] **Mobile Responsiveness**
  - [ ] Page looks good on mobile
  - [ ] Text is readable without zooming
  - [ ] Use [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

- [ ] **Page Speed**
  - [ ] Check [PageSpeed Insights](https://pagespeed.web.dev/)
  - [ ] Aim for 75+ score on mobile
  - [ ] Fix Critical issues

## 🔍 Google Search Console

- [ ] **Add Property**
  - [ ] Go to [Google Search Console](https://search.google.com/search-console)
  - [ ] Click "Add property"
  - [ ] Enter your domain

- [ ] **Verify Ownership**
  - [ ] Choose verification method:
    - [ ] Domain name provider: Add TXT record
    - [ ] HTML file: Upload to `/public/`
    - [ ] HTML tag: Add meta tag (already in code)
    - [ ] Google Analytics: Use GA property
  - [ ] Verify ownership
  - [ ] Wait for verification (can take hours)

- [ ] **Submit Sitemap**
  - [ ] Go to Sitemaps section
  - [ ] Click "Add new sitemap"
  - [ ] Enter: `sitemap.xml`
  - [ ] Wait for processing (check back in 24 hours)

- [ ] **Check Coverage**
  - [ ] Go to Coverage tab
  - [ ] Look for "Valid" pages (green)
  - [ ] No "Excluded" pages (unless intentional)
  - [ ] No "Error" pages
  - [ ] Click "Valid" to see indexed pages

- [ ] **Check Enhancements**
  - [ ] View "Enhancements" tab
  - [ ] Should show valid structured data
  - [ ] Check for errors/warnings

- [ ] **Monitor**
  - [ ] Check "Performance" tab
  - [ ] Review CTR (Click Through Rate)
  - [ ] Monitor impressions
  - [ ] Fix any issues in "Issues" tab

## 📊 Google Analytics

- [ ] **Setup**
  - [ ] Create GA4 property: [Google Analytics](https://analytics.google.com)
  - [ ] Get your Measurement ID (G-XXXXXXXXXX)
  - [ ] Add to `.env.local`:
    ```
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    ```
  - [ ] Rebuild project

- [ ] **Verify Installation**
  - [ ] Reload your site
  - [ ] Open DevTools → Network tab
  - [ ] Look for requests to `google-analytics.com`
  - [ ] Check "Realtime" in GA dashboard
  - [ ] Should see yourself as active user

- [ ] **Monitor**
  - [ ] Check "Realtime" for visitors
  - [ ] Review "Acquisition" for traffic sources
  - [ ] Check "Behavior" for page views
  - [ ] Track "Conversions" (events)

## 🌐 Domain & Hosting

- [ ] **HTTPS**
  - [ ] Check URL bar shows 🔒 lock
  - [ ] No security warnings
  - [ ] All resources load over HTTPS

- [ ] **Domain**
  - [ ] Update `NEXT_PUBLIC_SITE_URL` to your domain
  - [ ] Update canonical URLs in code
  - [ ] Update OG image URLs

- [ ] **DNS**
  - [ ] A record points to hosting
  - [ ] TXT record added for verification (if using that method)
  - [ ] DNS propagated (try `dig yoursite.com`)

- [ ] **Sitemap Robots Rule**
  - [ ] Update sitemap URL in `app/robots.ts`
  - [ ] Update in `public/robots.txt`
  - [ ] Should match your domain

## 📝 Content Optimization

- [ ] **Homepage**
  - [ ] H1 tag present and descriptive
  - [ ] Meta description 150-160 characters
  - [ ] Focus keyword in title
  - [ ] Clear value proposition
  - [ ] Internal links to products

- [ ] **Product Pages**
  - [ ] Unique title per product
  - [ ] Unique description per product
  - [ ] Product schema with:
    - [ ] Name
    - [ ] Description
    - [ ] Price
    - [ ] Image
    - [ ] Rating (if available)
  - [ ] High-quality images (1200x630px+ for OG)
  - [ ] Product details clear

- [ ] **Other Pages**
  - [ ] Footer: Added SEO footer with links
  - [ ] Navigation: Clear site structure
  - [ ] Internal links: Relevant, descriptive anchor text
  - [ ] No broken links

## 🔗 Backlinks & External

- [ ] **Local Business Listings**
  - [ ] [ ] Google My Business (if applicable)
  - [ ] [ ] Yelp
  - [ ] [ ] Yellow Pages
  - [ ] Ensure consistent name, address, phone (NAP)

- [ ] **Social Media**
  - [ ] [ ] Share products on Instagram/Twitter
  - [ ] [ ] Use OG tags for rich previews
  - [ ] [ ] Link back to website

- [ ] **Press/Mentions**
  - [ ] [ ] Get mentioned on relevant websites
  - [ ] [ ] Include link back to site

## 📱 Social & Sharing

- [ ] **Open Graph**
  - [ ] Test on [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] Paste your URL
  - [ ] Should show:
    - [ ] Title
    - [ ] Description
    - [ ] Image
    - [ ] Website name

- [ ] **Twitter**
  - [ ] Test on [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [ ] Paste your URL
  - [ ] Should show preview

- [ ] **LinkedIn**
  - [ ] Share a product link
  - [ ] Preview should show image and description
  - [ ] Title should be clear

## 🚀 Post-Launch Monitoring

- [ ] **Week 1-2**
  - [ ] Check Google Search Console daily
  - [ ] Look for "Discover" impressions
  - [ ] No indexing errors
  - [ ] Sitemap fully processed

- [ ] **Month 1**
  - [ ] Monitor rankings for keywords
  - [ ] Check traffic in Analytics
  - [ ] Review CTR in Search Console
  - [ ] Let Google Discover products

- [ ] **Ongoing**
  - [ ] Weekly: Check Search Console errors
  - [ ] Weekly: Review Analytics traffic
  - [ ] Monthly: Check page speed
  - [ ] Monthly: Review and update content
  - [ ] Quarterly: Audit backlinks and mentions

## 🎯 Keyword Tracking

Set up tracking for important keywords:

- [ ] Homepage keyword: "everyday fashion" or "cute outfits"
- [ ] Product keywords: Product names + "buy", "price", etc.
- [ ] Category keywords: "women's clothing", "affordable fashion"

Track in:
- [ ] Google Search Console (free, passive)
- [ ] Optional: SemRush, Ahrefs, or Ubersuggest (paid)

## 🐛 Common Issues & Fixes

If you see issues in Google Search Console:

1. **Indexed, though marked 'noindex'**
   - [ ] Remove `noindex` from robots config
   - [ ] Request indexing in GSC

2. **Crawling errors**
   - [ ] Check logs for actual errors
   - [ ] Fix broken pages
   - [ ] Request recrawl

3. **Excluded pages**
   - [ ] Check if intentionally blocked
   - [ ] Verify robots.txt allows crawling
   - [ ] Remove `noindex` if should be indexed

4. **Slow page speed**
   - [ ] Optimize images
   - [ ] Enable caching
   - [ ] Minimize CSS/JS
   - [ ] Use CDN

## 🎓 Learning Resources

- **Google Search Central**: https://developers.google.com/search
- **Beginner Guide**: https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Core Web Vitals**: https://developers.google.com/search/docs/appearance/core-web-vitals
- **Structured Data**: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- **Mobile SEO**: https://developers.google.com/search/mobile-sites

## ❓ Still Need Help?

1. Check the main `SEO_SETUP_GUIDE.md` file
2. Review error messages in Google Search Console
3. Use PageSpeed Insights for performance issues
4. Check Schema.org validator for structured data
5. Consult Google's SEO Starter Guide

---

**Last Updated**: 2024
**Project**: Cutiespatooties Outfits
