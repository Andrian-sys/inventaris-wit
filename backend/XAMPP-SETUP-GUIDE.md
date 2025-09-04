# 🚀 Panduan Setup XAMPP MySQL untuk Inventaris WIT

## 📋 Langkah-langkah Setup:

### 1. **Jalankan XAMPP Control Panel**
- Buka XAMPP Control Panel
- Klik **Start** pada **MySQL**
- Pastikan status MySQL berubah menjadi **Running** (hijau)

### 2. **Verifikasi MySQL Berjalan**
- Buka browser
- Akses: `http://localhost/phpmyadmin`
- Login dengan:
  - Username: `root`
  - Password: (kosong)

### 3. **Buat Database (jika belum ada)**
- Di phpMyAdmin, klik **New** di sidebar kiri
- Nama database: `inventaris_wit`
- Collation: `utf8mb4_unicode_ci`
- Klik **Create**

### 4. **Test Koneksi**
Jalankan command berikut di terminal backend:
```bash
php test-mysql-connection.php
```

### 5. **Jalankan Migration**
Setelah MySQL berjalan, jalankan:
```bash
php artisan migrate:fresh --seed
```

## 🔧 Troubleshooting:

### Jika MySQL tidak bisa start:
1. **Port 3306 sudah digunakan:**
   - Buka XAMPP Control Panel
   - Klik **Config** → **my.ini**
   - Ubah port dari 3306 ke 3307
   - Update .env: `DB_PORT=3307`

2. **Permission error:**
   - Jalankan XAMPP sebagai Administrator
   - Restart XAMPP Control Panel

3. **MySQL service conflict:**
   - Stop semua MySQL service di Windows Services
   - Restart XAMPP

## 📊 Database Configuration:
- **Host:** 127.0.0.1
- **Port:** 3306 (default)
- **Database:** inventaris_wit
- **Username:** root
- **Password:** (kosong)

## ✅ Setelah Setup Selesai:
1. Database akan berisi tabel-tabel Laravel
2. User default akan dibuat:
   - Admin: admin@wit.id / password123
   - Staff: staff@wit.id / password123
3. Login/Register akan berfungsi dengan MySQL
