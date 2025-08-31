# 🚀 InfinityFree Deployment Guide - Inventaris WIT

Panduan lengkap untuk deploy Laravel backend ke InfinityFree hosting.

## 📋 Prerequisites

- ✅ InfinityFree account: [infinityfree.net](https://infinityfree.net)
- ✅ GitHub repository: `https://github.com/thisiskisur/inventaris-wit`
- ✅ File manager atau FTP client

## 🔧 Step-by-Step Deployment

### **Step 1: Setup InfinityFree Account**

1. **Buka [InfinityFree.net](https://infinityfree.net)**
2. **Klik "Sign Up"** untuk buat account gratis
3. **Login ke dashboard**
4. **Klik "Create Account"** untuk buat hosting account
5. **Pilih "Free Hosting"**

### **Step 2: Setup Database**

1. **Di InfinityFree dashboard, buka "MySQL Databases"**
2. **Buat database baru:**
   - **Database Name**: `inventaris_wit`
   - **Username**: `inventaris_wit_user`
   - **Password**: `[generate strong password]`
3. **Catat credentials:**
   - **Host**: `sql.infinityfree.com`
   - **Database**: `inventaris_wit`
   - **Username**: `inventaris_wit_user`
   - **Password**: `[your password]`

### **Step 3: Download dan Prepare Files**

1. **Download project dari GitHub:**
   ```bash
   git clone https://github.com/thisiskisur/inventaris-wit.git
   cd inventaris-wit
   ```

2. **Copy backend folder:**
   ```bash
   cp -r backend/* /path/to/your/local/folder/
   ```

3. **Edit .env file:**
   ```env
   APP_NAME="Inventaris WIT"
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://inventaris-wit.infinityfreeapp.com
   
   DB_CONNECTION=mysql
   DB_HOST=sql.infinityfree.com
   DB_PORT=3306
   DB_DATABASE=inventaris_wit
   DB_USERNAME=inventaris_wit_user
   DB_PASSWORD=your_password_here
   
   CACHE_DRIVER=file
   SESSION_DRIVER=file
   QUEUE_CONNECTION=sync
   
   CORS_ALLOWED_ORIGINS=https://inventaris-wit.vercel.app,https://inventaris-a1zf6x0bq-thisiskisurs-projects.vercel.app
   ```

### **Step 4: Upload Files ke InfinityFree**

#### **Method 1: cPanel File Manager**

1. **Login ke cPanel InfinityFree**
2. **Buka "File Manager"**
3. **Navigate ke `public_html`**
4. **Upload semua file dari backend folder**
5. **Pastikan struktur seperti ini:**
   ```
   public_html/
   ├── app/
   ├── bootstrap/
   ├── config/
   ├── database/
   ├── public/
   ├── resources/
   ├── routes/
   ├── storage/
   ├── vendor/
   ├── .env
   ├── .htaccess
   └── index.php
   ```

#### **Method 2: FTP Upload**

1. **Gunakan FTP client (FileZilla, WinSCP)**
2. **Connect ke InfinityFree FTP:**
   - **Host**: `ftpupload.net`
   - **Username**: `your_username`
   - **Password**: `your_password`
   - **Port**: `21`
3. **Upload semua file ke `public_html`**

### **Step 5: Setup Laravel di InfinityFree**

#### **5.1: Install Dependencies**

1. **Buka cPanel Terminal atau SSH**
2. **Navigate ke public_html:**
   ```bash
   cd public_html
   ```

3. **Install Composer dependencies:**
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

#### **5.2: Laravel Setup Commands**

```bash
# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate --seed

# Clear and cache config
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### **Step 6: Fix File Permissions**

1. **Set storage permissions:**
   ```bash
   chmod -R 755 storage/
   chmod -R 755 bootstrap/cache/
   ```

2. **Create storage links:**
   ```bash
   php artisan storage:link
   ```

### **Step 7: Test Deployment**

#### **7.1: Test CORS Endpoint**
```bash
curl -X GET https://inventaris-wit.infinityfreeapp.com/api/cors-test
```

#### **7.2: Test Login Endpoint**
```bash
curl -X POST https://inventaris-wit.infinityfreeapp.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wit.id","password":"password"}'
```

#### **7.3: Test di Browser**
1. **Buka:** `https://inventaris-wit.infinityfreeapp.com/api/cors-test`
2. **Expected response:**
   ```json
   {
     "message": "CORS is working!",
     "timestamp": "2024-01-01T00:00:00.000000Z",
     "origin": "https://inventaris-wit.vercel.app"
   }
   ```

## 🔧 Troubleshooting

### **404 Error**
- ✅ Pastikan semua file terupload ke `public_html`
- ✅ Pastikan `.htaccess` ada di root folder
- ✅ Pastikan `index.php` ada di root folder
- ✅ Cek file permissions (755 untuk folder, 644 untuk file)

### **Database Connection Error**
- ✅ Pastikan database credentials benar di `.env`
- ✅ Pastikan database sudah dibuat di InfinityFree
- ✅ Test koneksi database via phpMyAdmin

### **CORS Error**
- ✅ Pastikan `.htaccess` terupload dengan benar
- ✅ Pastikan CORS middleware ter-register
- ✅ Test CORS endpoint: `/api/cors-test`

### **500 Internal Server Error**
- ✅ Cek error logs di cPanel
- ✅ Pastikan PHP version 8.1+
- ✅ Pastikan semua dependencies terinstall

## 📱 Common Commands

```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Regenerate caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Check Laravel status
php artisan about

# List all routes
php artisan route:list
```

## 🎯 Success Checklist

- ✅ InfinityFree account created
- ✅ Database created and configured
- ✅ All files uploaded to public_html
- ✅ .env file configured with database credentials
- ✅ Composer dependencies installed
- ✅ Laravel key generated
- ✅ Database migrated and seeded
- ✅ File permissions set correctly
- ✅ CORS test endpoint working
- ✅ Login endpoint working
- ✅ Frontend can connect to backend

## 📞 Support

Jika ada masalah:
1. **Cek error logs di cPanel**
2. **Test endpoints secara manual**
3. **Pastikan semua file terupload dengan benar**
4. **Contact developer jika masih bermasalah**

---

**Happy Deploying! 🚀**
