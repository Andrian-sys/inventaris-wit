# 🚀 Deployment Guide - Inventaris WIT

Panduan lengkap untuk deploy aplikasi Inventaris WIT ke hosting gratis.

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/thisiskisur/inventaris-wit`
- ✅ Vercel account (gratis)
- ✅ Railway account (gratis)

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
VITE_API_URL=https://inventaris-wit-api.railway.app/api
```

### Langkah 4: Deploy
1. Klik **"Deploy"**
2. Tunggu proses build selesai
3. Frontend akan tersedia di: `https://inventaris-wit.vercel.app`

## 🔧 Backend Deployment (Railway)

### Langkah 1: Setup Railway
1. Buka [Railway.app](https://railway.app)
2. Login dengan GitHub account
3. Klik **"New Project"**
4. Pilih **"Deploy from GitHub repo"**
5. Pilih repository `inventaris-wit`

### Langkah 2: Konfigurasi Service
- **Root Directory**: `backend`
- **Build Command**: `composer install --optimize-autoloader --no-dev`
- **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

### Langkah 3: Setup Database
1. Di project Railway, klik **"New"**
2. Pilih **"Database"** → **"MySQL"**
3. Railway akan otomatis set environment variables

### Langkah 4: Environment Variables
Tambahkan environment variables berikut:

```env
APP_NAME="Inventaris WIT"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://inventaris-wit-api.railway.app

DB_CONNECTION=mysql
DB_HOST=${MYSQLHOST}
DB_PORT=${MYSQLPORT}
DB_DATABASE=${MYSQLDATABASE}
DB_USERNAME=${MYSQLUSER}
DB_PASSWORD=${MYSQLPASSWORD}

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

CORS_ALLOWED_ORIGINS=https://inventaris-wit.vercel.app
```

### Langkah 5: Deploy dan Setup Database
1. Klik **"Deploy"**
2. Setelah deploy selesai, buka **"Variables"** tab
3. Tambahkan environment variables di atas
4. Buka **"Deployments"** tab
5. Klik **"Deploy"** lagi untuk apply variables
6. Buka terminal Railway dan jalankan:
   ```bash
   php artisan migrate --seed
   php artisan key:generate
   php artisan config:cache
   php artisan route:cache
   ```

## 🔗 Update Frontend API URL

Setelah backend berhasil deploy:

1. Buka Vercel dashboard
2. Pilih project `inventaris-wit`
3. Buka **"Settings"** → **"Environment Variables"**
4. Update `VITE_API_URL` dengan URL Railway yang baru
5. Redeploy frontend

## 🌍 Domain URLs

### Production URLs
- **Frontend**: `https://inventaris-wit.vercel.app`
- **Backend API**: `https://inventaris-wit-api.railway.app`
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
1. **Database Connection**: Cek environment variables database
2. **Migration Error**: Jalankan `php artisan migrate:fresh --seed`
3. **500 Error**: Cek logs di Railway dashboard

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

### Railway Logs
- Buka Railway dashboard
- Pilih service
- Lihat **"Logs"** tab

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
1. Buka `https://inventaris-wit-api.railway.app/api/asets`
2. Pastikan response JSON valid
3. Test authentication endpoints

## 🎯 Success Checklist

- ✅ Repository di GitHub
- ✅ Frontend deployed di Vercel
- ✅ Backend deployed di Railway
- ✅ Database setup dan migrated
- ✅ Environment variables configured
- ✅ CORS settings correct
- ✅ API endpoints working
- ✅ Frontend can connect to backend
- ✅ All features tested

## 📞 Support

Jika ada masalah deployment:
1. Cek logs di Vercel/Railway dashboard
2. Pastikan environment variables benar
3. Test API endpoints secara manual
4. Contact developer jika masih bermasalah

---

**Happy Deploying! 🚀**
