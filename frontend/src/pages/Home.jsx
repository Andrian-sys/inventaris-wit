import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  BarChart3, 
  QrCode, 
  FileText,
  CheckCircle,
  ArrowRight,
  Building,
  Shield,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Package,
      title: 'Inventaris Aset',
      description: 'Mencatat semua aset kantor secara terstruktur dengan kode unik, kategori, lokasi, kondisi, dan penanggung jawab'
    },
    {
      icon: Users,
      title: 'Mutasi Aset',
      description: 'Monitor mutasi aset (peminjaman, pemindahan, pengembalian) dengan notifikasi jatuh tempo dan riwayat lengkap'
    },
    {
      icon: QrCode,
      title: 'Barcode Generator',
      description: 'Generate barcode unik untuk identifikasi fisik tiap barang dengan preview dan cetak PDF/label printer'
    },
    {
      icon: FileText,
      title: 'Dashboard Monitoring',
      description: 'Statistik jumlah aset per kategori, kondisi, lokasi dengan reminder barang rusak/butuh maintenance'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Database Terpusat',
      description: 'Database terpusat yang bisa diakses oleh tim GA, Finance, dan IT dengan keamanan berbasis role'
    },
    {
      icon: Clock,
      title: 'Otomatisasi Proses',
      description: 'Mengotomatisasi proses pencatatan aset, peminjaman, maintenance, dan pencetakan barcode'
    },
    {
      icon: TrendingUp,
      title: 'Akurasi & Pelacakan',
      description: 'Meningkatkan akurasi dan mempermudah pelacakan aset kantor dengan sistem yang efisien'
    },
    {
      icon: Building,
      title: 'Multi-lokasi',
      description: 'Dukungan pengelolaan aset di berbagai lokasi dan gedung dengan tracking terintegrasi'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-white font-bold text-sm sm:text-lg">WIT</span>
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">WIT.ID</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">Asset Management System</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-xl">
                <Package className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Sistem Informasi
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inventaris Digital
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Sistem inventaris berbasis web yang efisien dan mudah digunakan untuk mengelola aset kantor 
              dengan pencatatan terstruktur, monitoring mutasi, dan barcode unik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Mulai Sekarang
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-600 hover:text-white font-medium text-base sm:text-lg transition-all duration-200"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Modul Sistem Inventaris
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Sistem lengkap untuk mengelola inventaris aset kantor dengan fitur-fitur yang sesuai dengan kebutuhan operasional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 sm:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Keunggulan <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sistem</span> <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Inventaris</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Solusi terintegrasi untuk meningkatkan efisiensi pengelolaan aset kantor dengan teknologi modern.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 sm:mb-6 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja Sistem
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Proses sederhana untuk mengelola aset kantor dengan efisien dan terstruktur
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Input Data Aset
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Input data aset dengan kode unik, kategori, nama barang, lokasi, kondisi, penanggung jawab, harga, dan tanggal pembelian
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Monitor Mutasi
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Kelola peminjaman dan pengembalian dengan notifikasi jatuh tempo dan riwayat pemakaian aset per pengguna
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Generate Barcode
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Generate barcode unik untuk identifikasi fisik, preview dan cetak dalam format PDF/label printer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Mengelola Inventaris Aset Kantor?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto px-4">
            Bergabung dengan sistem inventaris digital yang efisien dan mudah digunakan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-100 font-medium text-base sm:text-lg transition-all duration-200 shadow-lg"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-600 font-medium text-base sm:text-lg transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">WIT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">WIT.ID</h3>
                  <p className="text-sm text-gray-400">Asset Management System</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Sistem inventaris aset modern untuk mengelola aset kantor dengan efisien dan aman sesuai dengan TOR proyek magang.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Modul Sistem</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Inventaris Aset</li>
                <li>Mutasi Aset</li>
                <li>Barcode Generator</li>
                <li>Dashboard Monitoring</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Keunggulan</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Database Terpusat</li>
                <li>Otomatisasi Proses</li>
                <li>Export Laporan</li>
                <li>Mobile Responsive</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  business@wit.id
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (+62) 22 2000 289
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Bandung, West Java
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                <p>&copy; 2024 WIT.ID (PT. Wahana Informasi dan Teknologi). All rights reserved.</p>
                <p className="mt-1">Developed by <span className="text-blue-400 font-medium">Rizky Surya Alfarizy dan Andrian Dwi Putra</span></p>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <a 
                  href="https://wit.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
                >
                  Visit WIT.ID
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
