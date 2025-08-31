# 🚀 Deployment Guide - Inventaris WIT

Panduan lengkap untuk deploy aplikasi Inventaris WIT ke hosting gratis.

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/thisiskisur/inventaris-wit`
- ✅ Vercel account (gratis)
- ✅ InfinityFree account (gratis)

## 🌐 Frontend Deployment (Vercel)

### Langkah 1: Setup Vercel
1. Buka [Vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik **"New Project"**
4. Import repository `inventaris-wit`

### Langkah 2: Konfigurasi Project
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Langkah 3: Environment Variables
Tambahkan environment variable:
```
VITE_API_URL=https://inventaris-wit.infinityfreeapp.com/api
```

### Langkah 4: Deploy
1. Klik **"Deploy"**
2. Tunggu proses build selesai
3. Frontend akan tersedia di: `https://inventaris-wit.vercel.app`

## 🔧 Backend Deployment (InfinityFree)

### Langkah 1: Setup InfinityFree
1. Buka [InfinityFree.net](https://infinityfree.net)
2. Klik **"Sign Up"** untuk buat account gratis
3. Login ke dashboard
4. Klik **"Create Account"** untuk buat hosting account
5. Pilih **"Free Hosting"**

### Langkah 2: Konfigurasi Hosting
- **Domain**: `inventaris-wit.infinityfreeapp.com` (gratis)
- **PHP Version**: `8.1` (otomatis)
- **MySQL**: `inventaris_wit` (gratis)
- **cPanel**: Tersedia untuk upload file
- **SSL**: Otomatis aktif

### Langkah 3: Setup Database
1. Di InfinityFree dashboard, buka **"MySQL Databases"**
2. Buat database baru dengan nama: `inventaris_wit`
3. Catat **Database Name**, **Username**, **Password**, dan **Host**
4. Database akan otomatis tersedia

### Langkah 4: Environment Variables
Tambahkan environment variables berikut:

```env
APP_NAME="Inventaris WIT"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://inventaris-wit.infinityfreeapp.com

DB_CONNECTION=mysql
DB_HOST=sql.infinityfree.com
DB_PORT=3306
DB_DATABASE=inventaris_wit
DB_USERNAME=your_username
DB_PASSWORD=your_password

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

CORS_ALLOWED_ORIGINS=https://inventaris-wit.vercel.app
```

### Langkah 5: Upload dan Setup Laravel
1. Download project dari GitHub
2. Extract folder `backend` ke local
3. Edit file `.env` dengan database credentials
4. Upload semua file ke **public_html** via cPanel File Manager
5. Buka terminal via cPanel atau SSH dan jalankan:
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan key:generate
   php artisan migrate --seed
   php artisan config:cache
   php artisan route:cache
   ```

## 🔗 Update Frontend API URL

Setelah backend berhasil deploy:

1. Buka Vercel dashboard
2. Pilih project `inventaris-wit`
3. Buka **"Settings"** → **"Environment Variables"**
4. Update `VITE_API_URL` dengan URL Render yang baru
5. Redeploy frontend

## 🌍 Domain URLs

### Production URLs
- **Frontend**: `https://inventaris-wit.vercel.app`
- **Backend API**: `https://inventaris-wit.infinityfreeapp.com`
- **GitHub**: `https://github.com/thisiskisur/inventaris-wit`

### Development URLs
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8001`

## 🔧 Troubleshooting

### Frontend Issues
1. **Build Error**: Pastikan semua dependencies terinstall
2. **API Connection**: Cek environment variable `VITE_API_URL`
3. **CORS Error**: Pastikan backend CORS settings benar

### Backend Issues
1. **Database Connection**: Cek database credentials di `.env`
2. **Migration Error**: Jalankan `php artisan migrate:fresh --seed`
3. **500 Error**: Cek error logs di cPanel

### Common Commands
```bash
# Frontend
npm install
npm run build
npm run dev

# Backend
composer install
php artisan migrate --seed
php artisan serve --port=8001
```

## 📊 Monitoring

### Vercel Analytics
- Buka Vercel dashboard
- Pilih project
- Lihat **"Analytics"** tab

### InfinityFree Logs
- Buka cPanel
- Pilih **"Error Logs"**
- Lihat error terbaru

## 🔐 Security

### Environment Variables
- Jangan commit `.env` files
- Gunakan environment variables di hosting
- Rotate secrets secara berkala

### CORS Settings
- Set `CORS_ALLOWED_ORIGINS` ke domain frontend
- Jangan set `*` untuk production

## 📱 Testing Deployment

### Test Frontend
1. Buka `https://inventaris-wit.vercel.app`
2. Test login dengan user default
3. Test semua fitur utama

### Test Backend API
1. Buka `https://inventaris-wit.infinityfreeapp.com/api/asets`
2. Pastikan response JSON valid
3. Test authentication endpoints

## 🎯 Success Checklist

- ✅ Repository di GitHub
- ✅ Frontend deployed di Vercel
- ✅ Backend deployed di InfinityFree
- ✅ Database setup dan migrated
- ✅ Environment variables configured
- ✅ CORS settings correct
- ✅ API endpoints working
- ✅ Frontend can connect to backend
- ✅ All features tested

## 📞 Support

Jika ada masalah deployment:
1. Cek logs di Vercel dashboard dan cPanel
2. Pastikan environment variables benar
3. Test API endpoints secara manual
4. Contact developer jika masih bermasalah

---

**Happy Deploying! 🚀**
