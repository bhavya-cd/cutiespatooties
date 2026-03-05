# Admin Setup & Management Guide

## 🔑 Resetting Admin Credentials

### Method 1: Using the Setup Script (Recommended)

If you've forgotten your admin credentials, use the provided setup script:

```bash
# Make sure you're in the project root directory
node scripts/setup-admin.js
```

The script will prompt you to:
1. Enter your desired admin email
2. Enter your desired admin password

**Requirements:**
- Must have `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local` file
- Get this key from: https://app.supabase.com/projects → Your Project → Settings → API

### Method 2: Manual Setup via Supabase Console

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Create new user**
5. Enter:
   - Email: Your admin email
   - Password: Your strong admin password
   - Confirm password
6. Click **Create user**

---

## 🎯 Admin Page Features

### Dashboard Overview
- **Stats Cards**: View total products, active listings, and last update date
- **Product Table**: See all products in a clean, organized table format
- **Quick Actions**: Edit or delete products with single clicks
- **Responsive Design**: Works on desktop and mobile devices

### Admin Navigation
- **Add Product Button** (➕): Create new products quickly
- **Logout Button**: Securely log out from the admin panel
- **Back to Dashboard**: Navigate easily between pages

---

## 📦 Product Management

### Adding a New Product

1. Click the **➕ Add Product** button on the dashboard
2. Fill in the product details:
   - **Product Title**: Name of the product
   - **URL Slug**: URL-friendly version (e.g., `blue-denim-jacket`)
   - **Brand**: Manufacturer or brand name
   - **Price**: Product price in rupees
   - **Short Description**: Brief product summary
   - **Full Description**: Detailed product information

3. **Upload Product Images**:
   - Upload new images via the file picker
   - Or paste image URLs (comma-separated)
   - Preview images before saving

4. **Manage Sizes**:
   - **All Available Sizes**: List all possible sizes (e.g., XS, S, M, L, XL)
   - **Currently Available Sizes**: Which sizes are in stock

5. **WhatsApp Integration**:
   - Set a custom message for WhatsApp orders
   - Customers will see this when they contact via WhatsApp

6. Click **➕ Create Product** to save

### Editing a Product

1. From the dashboard, find the product you want to edit
2. Click the **Edit** button
3. Modify any fields as needed
4. Click **✅ Save Changes**

### Deleting a Product

1. From the dashboard, find the product to delete
2. Click the **🗑️ Delete** button
3. Confirm the deletion (⚠️ This action cannot be undone)

---

## 🎨 Admin Dashboard Features

### Stats Overview
- **Total Products**: Count of all products in your catalog
- **Active Listings**: Number of currently visible products
- **Last Updated**: Date of the most recently modified product

### Product Table Columns
- **Product**: Product image and title
- **Brand**: Product brand name
- **Price**: Product price
- **Created**: Date the product was added
- **Actions**: Edit and Delete buttons

### Search & Filter
*(Coming in future versions)*
- Search products by name or brand
- Filter by price range, brand, or category

---

## 👤 Account Management

### Changing Admin Password

1. **Via Supabase Dashboard**:
   - Go to https://app.supabase.com/projects
   - Select your project
   - Go to **Authentication** → **Users**
   - Find your admin user
   - Click the menu (⋯) and select **Reset password**

2. **Via Supabase CLI**:
   ```bash
   supabase link
   supabase db reset
   ```

### Security Tips
- ✅ Use a strong, unique password
- ✅ Don't share your admin credentials
- ✅ Log out after each session if using a shared device
- ✅ Regularly change your password

---

## 🚀 Environment Setup

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For Admin Setup Script
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Getting Your Keys

1. Go to https://app.supabase.com/projects
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the required keys:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `Service Role Key` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 📱 Responsive Design

The admin dashboard and product forms are fully responsive:
- **Desktop**: Full table view with all details
- **Tablet**: Adapted layout with optimized spacing
- **Mobile**: Touch-friendly buttons and stacked forms

---

## 🔒 Admin Authentication Flow

1. User navigates to `/admin/login`
2. Enters email and password
3. System verifies credentials with Supabase
4. On success: Redirected to `/admin` dashboard
5. On failure: Error message displayed on login page
6. Sessions managed securely with Supabase Auth

---

## 📊 Product Database Schema

Products are stored with these fields:

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique product identifier |
| title | String | Product name |
| slug | String | URL-friendly identifier |
| price | String | Product price |
| brand | String | Brand/manufacturer |
| short_description | String | Brief description |
| description | String | Full product details |
| images | Array | URLs of product images |
| sizes | Array | All available sizes |
| available_sizes | Array | Currently in-stock sizes |
| whatsapp_message | String | Custom WhatsApp message |
| created_at | Timestamp | When product was created |
| updated_at | Timestamp | Last modification time |

---

## ❓ Troubleshooting

### Can't Log In

- ✅ Check if admin email exists in Supabase
- ✅ Verify database connection
- ✅ Reset password using the setup script

### Images Not Uploading

- ✅ Check image file size (max 10MB)
- ✅ Ensure Supabase storage bucket is accessible
- ✅ Check browser console for error messages

### Products Not Saving

- ✅ Fill in all required fields (marked with *)
- ✅ Check Supabase database permissions
- ✅ Verify network connection

### Forgot Admin Credentials

- ✅ Use the `node scripts/setup-admin.js` command
- ✅ Or reset manually via Supabase console

---

## 📞 Support

For issues or questions:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review error messages in browser console
3. Check project logs in Supabase dashboard
4. Verify environment variables are correctly set

---

Last Updated: March 5, 2026
