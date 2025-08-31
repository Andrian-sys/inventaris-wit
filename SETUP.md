# Quick Setup Guide - Inventaris WIT

## 🚀 Cara Menjalankan Proyek

### Prerequisites
- XAMPP (Apache + MySQL)
- PHP 8.2+
- Composer
- Node.js 18+

### 1. Start XAMPP
- Buka XAMPP Control Panel
- Start Apache dan MySQL
- Buat database `inventaris_wit` di phpMyAdmin

### 2. Setup Backend (Laravel)
```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate key
php artisan key:generate

# Update database config di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventaris_wit
DB_USERNAME=root
DB_PASSWORD=

# Run migrations & seed
php artisan migrate
php artisan db:seed

# Start server
php artisan serve --host=127.0.0.1 --port=8001
```

### 3. Setup Frontend (React)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Akses Aplikasi
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001/api

### 5. Login Credentials
- **Admin**: admin@wit.com / password
- **Staff**: staff1@wit.com / password

## 📁 Struktur Proyek
```
inventaris_wit/
├── backend/          # Laravel 12 API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── resources/
└── frontend/         # React + TailwindCSS
    ├── src/
    ├── public/
    └── package.json
```

## 🔧 Troubleshooting

### Backend Issues
- Pastikan XAMPP MySQL berjalan
- Check database connection di `.env`
- Clear cache: `php artisan config:clear`

### Frontend Issues
- Check API URL di `src/services/api.js`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📞 Support
Jika ada masalah, cek:
1. XAMPP services running
2. Database connection
3. Port availability (8001, 5173)
4. Node.js dan PHP versions
