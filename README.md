# 🏢 Inventaris WIT - Asset Management System

Sistem manajemen inventaris aset kantor untuk perusahaan WIT dengan fitur peminjaman, tracking, barcode generation, dan pelaporan yang komprehensif. Sistem ini dirancang khusus untuk mengelola aset kantor dengan kategori **Elektronik** dan **Non-Elektronik**.

## 🎯 **FITUR UTAMA YANG SUDAH SELESAI**

### ✅ **Sistem Inventaris Lengkap**
- **22 Aset Dummy** siap pakai (13 Elektronik + 9 Non-Elektronik)
- **Kode Aset Unik** dengan format: `ELK-XXX-001` (Elektronik) dan `NEL-XXX-001` (Non-Elektronik)
- **Kategorisasi Sempurna**: Elektronik (Laptop, Printer, Proyektor, Monitor, Smartphone, AC) dan Non-Elektronik (Meja, Kursi, Lemari, Rak, Whiteboard, Karpet)
- **Detail Kondisi**: Baik, Rusak Ringan, Rusak Berat, Maintenance
- **Status Tracking**: Tersedia, Dipinjam, Maintenance, Rusak

### ✅ **Barcode System Terintegrasi**
- **Generate Barcode** unik untuk setiap aset
- **QR Code Generation** untuk scanning cepat
- **Download PDF** barcode siap cetak dan tempel di aset
- **Template PDF** profesional dengan informasi aset lengkap

### ✅ **Authentication & Authorization**
- **Login System** yang sudah diperbaiki dan berfungsi sempurna
- **Role-based Access**: Admin dan Staff
- **Akun Default** siap pakai untuk testing

## 🚀 Local Development

### 📋 Prerequisites

- ✅ **XAMPP** (Apache + MySQL + PHP 8.1+)
- ✅ **Node.js** (v16+)
- ✅ **Composer** (PHP package manager)
- ✅ **Git**

### 🔧 Quick Start

#### **1. Clone Repository**
```bash
git clone https://github.com/thisiskisur/inventaris-wit.git
cd inventaris-wit
```

#### **2. Setup Backend (Laravel)**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --port=8001
```

**⚠️ PENTING: Pastikan XAMPP MySQL sudah running!**
- Buka XAMPP Control Panel
- Start MySQL service
- Database akan otomatis dibuat: `inventaris_wit`

#### **3. Setup Frontend (React)**
```bash
cd frontend
npm install
npm run dev
```

#### **4. Access Application**
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8001/api](http://localhost:8001/api)

## ✨ Fitur Utama

### 👥 Role-based Access Control
- **Admin**: Manajemen aset, persetujuan peminjaman, laporan
- **Staff**: Peminjaman aset, riwayat peminjaman

### 📦 Asset Management
- ✅ CRUD Aset (Create, Read, Update, Delete)
- ✅ Kategorisasi aset (Elektronik, Furniture, dll)
- ✅ Tracking lokasi dan kondisi
- ✅ Status aset (Tersedia, Dipinjam, Maintenance, Rusak)

### 🔄 Asset Mutation System
- ✅ Form peminjaman dan pengembalian
- ✅ Workflow persetujuan admin
- ✅ Notifikasi status peminjaman
- ✅ Riwayat peminjaman per user

### 📊 Reporting & Analytics
- ✅ Dashboard dengan statistik real-time
- ✅ Export laporan ke Excel & PDF
- ✅ Filter berdasarkan kategori, lokasi, status
- ✅ Grafik distribusi aset

### 🏷️ Barcode System
- ✅ Generate barcode untuk setiap aset
- ✅ QR Code generation
- ✅ Download barcode dalam format PDF
- ✅ Scan barcode untuk identifikasi cepat

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP Client
- **Lucide React** - Icons
- **Context API** - State Management

### Backend
- **Laravel 12** - PHP Framework
- **MySQL** - Database
- **Laravel Sanctum** - Authentication
- **Maatwebsite/Excel** - Excel Export
- **Barryvdh/Laravel-Dompdf** - PDF Export
- **Milon/Barcode** - Barcode Generation

## 📁 Project Structure

```
inventaris_wit/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── Exports/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── composer.json
├── README.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PHP 8.2+
- Composer
- MySQL 8.0+
- XAMPP (optional)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8001
```

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:8001/api
```

**Backend (.env)**
```env
APP_URL=http://localhost:8001
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventaris_wit
DB_USERNAME=root
DB_PASSWORD=
```

## 👤 **AKUN LOGIN DEFAULT**

### 🔑 **Admin Account**
- **Email:** `admin@wit.id`
- **Password:** `password123`
- **Role:** Admin
- **Akses:** Full access ke semua fitur

### 🔑 **Staff Account**
- **Email:** `staff@wit.id`
- **Password:** `password123`
- **Role:** Staff
- **Akses:** Lihat aset, pinjam aset, riwayat peminjaman

**💡 TIP:** Akun ini sudah tersedia di form login dengan tombol "Fill" untuk auto-fill!

## 📊 **DATA INVENTARIS TERSEDIA**

### 📱 **ELEKTRONIK (13 items)**
- **Laptop**: Dell Latitude 5420, Lenovo Thinkpad X1, HP EliteBook 840
- **Printer**: Canon G3010, HP LaserJet Pro
- **Proyektor**: Epson EB-X41, BenQ MW632ST
- **Monitor**: LG UltraWide 29", Samsung 24"
- **Smartphone**: Samsung A52, iPhone 13
- **AC**: Daikin 1.5 PK, Sharp 2 PK

### 🪑 **NON-ELEKTRONIK (9 items)**
- **Meja**: Kerja Kayu Jati, Meeting Besar
- **Kursi**: Kantor Ergonomis, Meeting 12 Set
- **Lemari**: Arsip 4 Pintu, Buku Kayu
- **Rak**: Server 42U
- **Whiteboard**: Magnetic 120x80
- **Karpet**: Kantor 3x4 meter

## 🎯 **CARA PENGGUNAAN**

1. **Login** dengan akun Admin atau Staff
2. **Lihat Inventaris** di halaman "Inventaris Aset"
3. **Filter** by kategori Elektronik/Non-Elektronik
4. **Generate Barcode** di halaman "Barcode"
5. **Download PDF** untuk dicetak dan ditempel di aset
6. **Kelola Mutasi** untuk peminjaman dan pengembalian

## 🔧 API Endpoints

### Authentication
```
POST   /api/login
POST   /api/register
POST   /api/logout
GET    /api/me
```

### Assets
```
GET    /api/asets
POST   /api/asets
GET    /api/asets/{id}
PUT    /api/asets/{id}
DELETE /api/asets/{id}
GET    /api/asets/statistics
```

### Mutations
```
GET    /api/mutasi-asets
POST   /api/mutasi-asets
GET    /api/mutasi-asets/{id}
PUT    /api/mutasi-asets/{id}
DELETE /api/mutasi-asets/{id}
GET    /api/mutasi-asets/overdue
GET    /api/mutasi-asets/user-history
```

### Reports
```
GET    /api/laporan/aset/excel
GET    /api/laporan/aset/pdf
GET    /api/laporan/mutasi/excel
GET    /api/laporan/mutasi/pdf
GET    /api/laporan/dashboard-stats
```

### Barcode
```
GET    /api/barcode/{id}/generate
GET    /api/barcode/{id}/generate-qr
GET    /api/barcode/{id}/download-pdf
POST   /api/barcode/scan
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variables

### Backend (InfinityFree)
1. Deploy Laravel backend to InfinityFree
2. Set environment variables
3. Run migrations: `php artisan migrate --seed`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developers

**Frontend & Backend Development:**
- **Rizky Surya Alfarizy** - Full Stack Developer
- **Andrian Dwi Putra** - Full Stack Developer

**Company:**
- **WIT.ID** - PT. Wahana Inti Teknologi

## 📞 Support

For support, email support@wit.id or create an issue in this repository.

## 🎉 **STATUS PROYEK**

### ✅ **COMPLETED FEATURES**
- [x] **Database Setup** - MySQL dengan 22 aset dummy
- [x] **Authentication System** - Login/Register dengan role-based access
- [x] **Asset Management** - CRUD aset dengan kategori Elektronik/Non-Elektronik
- [x] **Barcode System** - Generate barcode, QR code, dan PDF download
- [x] **Responsive Design** - Mobile dan desktop friendly
- [x] **API Endpoints** - Semua endpoint sudah berfungsi
- [x] **Data Seeding** - 22 aset kantor siap pakai
- [x] **Error Handling** - Login system sudah diperbaiki

### 🚀 **READY FOR PRODUCTION**
Sistem sudah siap digunakan dengan:
- ✅ **22 Aset Dummy** lengkap dengan detail
- ✅ **Barcode Generation** untuk setiap aset
- ✅ **PDF Download** siap cetak
- ✅ **Filter & Search** by kategori
- ✅ **Role-based Access** Admin/Staff
- ✅ **Responsive UI** untuk semua device

### 📋 **TESTING CHECKLIST**
- [x] Login dengan akun Admin/Staff
- [x] Lihat daftar aset dengan filter kategori
- [x] Generate barcode untuk aset
- [x] Download PDF barcode
- [x] Responsive design di mobile/desktop
- [x] API endpoints berfungsi normal

---

⭐ **Star this repository if you find it helpful!**

**🎯 Sistem Inventaris WIT siap digunakan untuk mengelola aset kantor dengan efisien!**
