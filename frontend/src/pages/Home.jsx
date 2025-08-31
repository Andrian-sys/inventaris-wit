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
      description: 'Kelola data aset kantor dengan sistem yang terstruktur dan mudah diakses'
    },
    {
      icon: Users,
      title: 'Mutasi Aset',
      description: 'Sistem peminjaman dan pengembalian aset dengan approval workflow'
    },
    {
      icon: QrCode,
      title: 'Barcode Generator',
      description: 'Generate barcode dan QR code untuk identifikasi aset yang cepat'
    },
    {
      icon: FileText,
      title: 'Laporan Lengkap',
      description: 'Export laporan dalam format Excel dan PDF untuk analisis data'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Keamanan Data',
      description: 'Sistem keamanan berbasis role untuk melindungi data aset perusahaan'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Pelacakan status aset secara real-time dengan notifikasi otomatis'
    },
    {
      icon: TrendingUp,
      title: 'Efisiensi Operasional',
      description: 'Meningkatkan efisiensi pengelolaan aset dan mengurangi kerugian'
    },
    {
      icon: Building,
      title: 'Multi-lokasi',
      description: 'Dukungan pengelolaan aset di berbagai lokasi dan gedung'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">WIT</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">WIT.ID</h1>
                    <p className="text-xs text-gray-500">Asset Management System</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
                <Package className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              We Navigate You to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Asset Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Platform modern untuk mengelola inventaris aset kantor dengan sistem peminjaman yang efisien, 
              tracking real-time, dan laporan yang komprehensif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Mulai Sekarang
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white font-medium text-lg transition-all duration-200"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What we do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We help our clients succeed by creating systems, digital experiences, and tech support that integrated the company, achieve business goals, and look fantastic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Good <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">System</span>, Good <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Partner with WIT. and unlock the full potential of digital transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-6 shadow-lg">
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
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja Sistem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses sederhana untuk mengelola aset dengan efisien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Daftar & Login
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Daftar sebagai staff atau admin, kemudian login ke sistem
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kelola Aset
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Staff dapat melihat aset tersedia dan mengajukan peminjaman
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Approval & Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Admin approve peminjaman dan tracking status aset real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your digital vision is our mission
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Together, we #MakeITHappen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 font-medium text-lg transition-all duration-200 shadow-lg"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 font-medium text-lg transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
              <p className="text-gray-400 leading-relaxed">
                Sistem inventaris aset modern untuk mengelola aset kantor dengan efisien dan aman.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Inventaris Aset</li>
                <li>Mutasi Aset</li>
                <li>Barcode Generator</li>
                <li>Laporan</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Keunggulan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Tracking</li>
                <li>Role-based Access</li>
                <li>Export Reports</li>
                <li>Mobile Friendly</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
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
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                <p>&copy; 2024 WIT.ID (PT. Wahana Informasi dan Teknologi). All rights reserved.</p>
                <p className="mt-1">Developed by <span className="text-blue-400 font-medium">Rizky Surya Alfarizy dan Andrian Dwi Putra</span></p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a 
                  href="https://wit.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
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
