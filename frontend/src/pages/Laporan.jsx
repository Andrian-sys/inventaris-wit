import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  FileText, 
  Download, 
  BarChart3, 
  TrendingUp,
  Package,
  Users,
  Calendar,
  Filter,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Laporan = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    kategori: '',
    lokasi: '',
    status: '',
    tanggal_mulai: '',
    tanggal_akhir: ''
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/laporan/dashboard-stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type, reportType) => {
    try {
      const params = new URLSearchParams();
      
      if (reportType === 'aset') {
        if (filters.kategori) params.append('kategori', filters.kategori);
        if (filters.lokasi) params.append('lokasi', filters.lokasi);
        if (filters.status) params.append('status', filters.status);
      } else if (reportType === 'mutasi') {
        if (filters.status) params.append('status', filters.status);
        if (filters.tanggal_mulai) params.append('tanggal_mulai', filters.tanggal_mulai);
        if (filters.tanggal_akhir) params.append('tanggal_akhir', filters.tanggal_akhir);
      }

      const response = await api.get(`/laporan/${reportType}/${type}?${params}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-${reportType}-${type}-${new Date().toISOString().split('T')[0]}.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">Laporan & Analisis</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Generate dan download berbagai laporan inventaris dengan analisis mendalam
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Aset</p>
                <p className="text-3xl font-bold text-gray-900">{stats.aset_stats?.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Semua aset terdaftar</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <Package className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tersedia</p>
                <p className="text-3xl font-bold text-green-600">{stats.aset_stats?.tersedia || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Siap untuk dipinjam</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Dipinjam</p>
                <p className="text-3xl font-bold text-orange-600">{stats.aset_stats?.dipinjam || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Sedang dipinjam</p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Mutasi</p>
                <p className="text-3xl font-bold text-purple-600">{stats.mutasi_stats?.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Semua transaksi</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Report */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Laporan Aset</h2>
                <p className="text-gray-600 mt-1">Laporan detail inventaris aset</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={filters.kategori}
                    onChange={(e) => setFilters(prev => ({ ...prev, kategori: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Semua Kategori</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Kendaraan">Kendaraan</option>
                    <option value="Peralatan">Peralatan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                  <select
                    value={filters.lokasi}
                    onChange={(e) => setFilters(prev => ({ ...prev, lokasi: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Semua Lokasi</option>
                    <option value="Gedung A">Gedung A</option>
                    <option value="Gedung B">Gedung B</option>
                    <option value="Gedung C">Gedung C</option>
                    <option value="Gudang">Gudang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Semua Status</option>
                    <option value="tersedia">Tersedia</option>
                    <option value="dipinjam">Dipinjam</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="rusak">Rusak</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('excel', 'aset')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="h-4 w-4" />
                Export Excel
              </button>
              <button
                onClick={() => handleExport('pdf', 'aset')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Mutation Report */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Laporan Mutasi</h2>
                <p className="text-gray-600 mt-1">Laporan peminjaman dan pengembalian</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Semua Status</option>
                    <option value="pending">Tertunda</option>
                    <option value="disetujui">Disetujui</option>
                    <option value="ditolak">Ditolak</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={filters.tanggal_mulai}
                    onChange={(e) => setFilters(prev => ({ ...prev, tanggal_mulai: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
                <input
                  type="date"
                  value={filters.tanggal_akhir}
                  onChange={(e) => setFilters(prev => ({ ...prev, tanggal_akhir: e.target.value }))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('excel', 'mutasi')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="h-4 w-4" />
                Export Excel
              </button>
              <button
                onClick={() => handleExport('pdf', 'mutasi')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Charts */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Statistics */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Statistik per Kategori</h3>
              <p className="text-gray-600 mt-1">Distribusi aset berdasarkan kategori</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.kategori_stats?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.kategori}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${(item.total / stats.aset_stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 w-12 text-right">{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Statistics */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Statistik per Lokasi</h3>
              <p className="text-gray-600 mt-1">Distribusi aset berdasarkan lokasi</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.lokasi_stats?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.lokasi}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${(item.total / stats.aset_stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 w-12 text-right">{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reports */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Laporan Cepat</h3>
          <p className="text-gray-600 mt-1">Download laporan dengan pengaturan default</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleExport('excel', 'aset')}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Semua Aset</p>
                <p className="text-sm text-gray-600">Format Excel</p>
              </div>
            </button>

            <button
              onClick={() => handleExport('pdf', 'aset')}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Semua Aset</p>
                <p className="text-sm text-gray-600">Format PDF</p>
              </div>
            </button>

            <button
              onClick={() => handleExport('excel', 'mutasi')}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Semua Mutasi</p>
                <p className="text-sm text-gray-600">Format Excel</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
