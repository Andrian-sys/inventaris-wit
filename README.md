# 🏢 Inventaris WIT - Asset Management System

Sistem manajemen inventaris aset untuk perusahaan WIT dengan fitur peminjaman, tracking, dan pelaporan yang komprehensif.

## 🚀 Live Demo

**Frontend (React):** [https://inventaris-wit.vercel.app](https://inventaris-wit.vercel.app)  
**Backend API:** [https://inventaris-wit-api.vercel.app](https://inventaris-wit-api.vercel.app)

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

## 👤 Default Users

### Admin
- **Email:** admin@wit.id
- **Password:** password
- **Role:** Admin

### Staff
- **Email:** staff1@wit.id
- **Password:** password
- **Role:** Staff

## 📱 Screenshots

### Dashboard Admin
![Admin Dashboard](screenshots/admin-dashboard.png)

### Dashboard Staff  
![Staff Dashboard](screenshots/staff-dashboard.png)

### Asset Management
![Asset Management](screenshots/asset-management.png)

### Mutation System
![Mutation System](screenshots/mutation-system.png)

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

### Backend (Railway/Heroku)
1. Deploy Laravel backend to Railway or Heroku
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

---

⭐ **Star this repository if you find it helpful!**
