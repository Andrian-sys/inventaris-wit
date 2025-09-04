import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Bell,
  FileText,
  Calendar,
  Package,
  User,
  ArrowRight
} from 'lucide-react';

const MutasiAset = () => {
  const { user, isAdmin } = useAuth();
  const [mutasiAsets, setMutasiAsets] = useState([]);
  const [asets, setAsets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMutasi, setEditingMutasi] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    jenis_mutasi: '',
    tanggal_mulai: '',
    tanggal_akhir: ''
  });

  useEffect(() => {
    fetchMutasiAsets();
    fetchAsets();
  }, [filters]);

  const fetchMutasiAsets = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.jenis_mutasi) params.append('jenis_mutasi', filters.jenis_mutasi);
      if (filters.tanggal_mulai) params.append('tanggal_mulai', filters.tanggal_mulai);
      if (filters.tanggal_akhir) params.append('tanggal_akhir', filters.tanggal_akhir);

      const response = await api.get(`/mutasi-asets?${params}`);
      setMutasiAsets(response.data.data);
    } catch (error) {
      console.error('Error fetching mutations:', error);
      showNotification('Gagal memuat data mutasi aset', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAsets = async () => {
    try {
      // Staff hanya bisa melihat aset yang tersedia
      const response = await api.get('/asets?status=tersedia');
      setAsets(response.data.data.data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      showNotification('Gagal memuat data aset', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingMutasi) {
        await api.put(`/mutasi-asets/${editingMutasi.id}`, formData);
        showNotification('Mutasi aset berhasil diperbarui!', 'success');
      } else {
        await api.post('/mutasi-asets', formData);
        showNotification('Permintaan peminjaman berhasil diajukan! Menunggu persetujuan admin.', 'success');
      }
      setShowForm(false);
      setEditingMutasi(null);
      fetchMutasiAsets();
      fetchAsets(); // Refresh available assets
    } catch (error) {
      console.error('Error submitting mutation:', error);
      showNotification('Gagal mengajukan permintaan. Silakan coba lagi.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus mutasi ini?')) return;
    
    try {
      await api.delete(`/mutasi-asets/${id}`);
      showNotification('Mutasi aset berhasil dihapus!', 'success');
      fetchMutasiAsets();
    } catch (error) {
      console.error('Error deleting mutation:', error);
      showNotification('Gagal menghapus mutasi aset', 'error');
    }
  };

  const handleExport = async (type) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.jenis_mutasi) params.append('jenis_mutasi', filters.jenis_mutasi);
      if (filters.tanggal_mulai) params.append('tanggal_mulai', filters.tanggal_mulai);
      if (filters.tanggal_akhir) params.append('tanggal_akhir', filters.tanggal_akhir);

      const response = await api.get(`/laporan/mutasi/${type}?${params}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-mutasi-${type}-${new Date().toISOString().split('T')[0]}.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showNotification(`Laporan berhasil diunduh dalam format ${type.toUpperCase()}!`, 'success');
    } catch (error) {
      console.error('Error exporting:', error);
      showNotification('Gagal mengunduh laporan', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'disetujui': return 'bg-green-100 text-green-800';
      case 'ditolak': return 'bg-red-100 text-red-800';
      case 'selesai': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'disetujui': return <CheckCircle className="h-4 w-4" />;
      case 'ditolak': return <XCircle className="h-4 w-4" />;
      case 'selesai': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu Persetujuan';
      case 'disetujui': return 'Disetujui';
      case 'ditolak': return 'Ditolak';
      case 'selesai': return 'Selesai';
      default: return status;
    }
  };

  const isOverdue = (tanggalKembali) => {
    if (!tanggalKembali) return false;
    return new Date(tanggalKembali) < new Date();
  };

  const pendingCount = mutasiAsets.data?.filter(m => m.status === 'pending').length || 0;
  const approvedCount = mutasiAsets.data?.filter(m => m.status === 'disetujui').length || 0;
  const rejectedCount = mutasiAsets.data?.filter(m => m.status === 'ditolak').length || 0;

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Mutasi Aset</h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed">
              {isAdmin 
                ? 'Kelola dan persetujui permintaan peminjaman aset dari staff'
                : 'Ajukan permintaan peminjaman dan lihat riwayat mutasi aset Anda'
              }
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white bg-opacity-20 rounded-2xl lg:rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Package className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl max-w-md ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            {notification.type === 'success' ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
            <p className="font-semibold">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Menunggu Persetujuan</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{pendingCount}</p>
              <p className="text-xs text-gray-500 mt-1">Permintaan tertunda</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
              <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Disetujui</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{approvedCount}</p>
              <p className="text-xs text-gray-500 mt-1">Permintaan disetujui</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
              <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Ditolak</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">{rejectedCount}</p>
              <p className="text-xs text-gray-500 mt-1">Permintaan ditolak</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
              <XCircle className="h-6 w-6 sm:h-7 sm:w-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base justify-center sm:justify-start"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              {isAdmin ? 'Tambah Mutasi' : 'Pinjam Aset'}
            </button>
            
            {!isAdmin && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-blue-200">
                <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <span>Permintaan Anda akan ditinjau oleh admin</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => handleExport('excel')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base justify-center sm:justify-start"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg sm:rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base justify-center sm:justify-start"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            >
              <option value="">Semua Status</option>
              <option value="pending">Menunggu Persetujuan</option>
              <option value="disetujui">Disetujui</option>
              <option value="ditolak">Ditolak</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Mutasi</label>
            <select
              value={filters.jenis_mutasi}
              onChange={(e) => setFilters(prev => ({ ...prev, jenis_mutasi: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            >
              <option value="">Semua Jenis</option>
              <option value="peminjaman">Peminjaman</option>
              <option value="pengembalian">Pengembalian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
            <input
              type="date"
              value={filters.tanggal_mulai}
              onChange={(e) => setFilters(prev => ({ ...prev, tanggal_mulai: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
            <input
              type="date"
              value={filters.tanggal_akhir}
              onChange={(e) => setFilters(prev => ({ ...prev, tanggal_akhir: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Daftar Mutasi Aset</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {isAdmin 
              ? 'Semua permintaan mutasi aset dari staff'
              : 'Riwayat permintaan mutasi aset Anda'
            }
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aset
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Peminjam
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Tanggal Pinjam
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Tanggal Kembali
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Keterangan
                  </th>
                  {isAdmin && (
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mutasiAsets.data?.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 7} className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                        <div>
                          <p className="text-base sm:text-lg font-medium text-gray-900">Tidak ada data mutasi</p>
                          <p className="text-sm sm:text-base text-gray-500">
                            {isAdmin 
                              ? 'Belum ada permintaan mutasi aset dari staff'
                              : 'Anda belum memiliki riwayat mutasi aset'
                            }
                          </p>
                        </div>
                        {!isAdmin && (
                          <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
                          >
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                            Pinjam Aset Pertama
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  mutasiAsets.data?.map((mutasi) => (
                    <tr key={mutasi.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-900">
                              {mutasi.aset?.kode_aset}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {mutasi.aset?.nama_barang}
                            </div>
                            <div className="text-xs text-gray-400 sm:hidden">
                              {mutasi.user?.name} • {new Date(mutasi.tanggal_pinjam).toLocaleDateString('id-ID')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {mutasi.user?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {mutasi.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
                          mutasi.jenis_mutasi === 'peminjaman' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {mutasi.jenis_mutasi === 'peminjaman' ? 'Pinjam' : 'Kembalikan'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium hidden md:table-cell">
                        {new Date(mutasi.tanggal_pinjam).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium hidden lg:table-cell">
                        {mutasi.tanggal_kembali ? (
                          <div className="flex items-center gap-2">
                            <span>{new Date(mutasi.tanggal_kembali).toLocaleDateString('id-ID')}</span>
                            {isOverdue(mutasi.tanggal_kembali) && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3" />
                                Terlambat
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(mutasi.status)}`}>
                          {getStatusIcon(mutasi.status)}
                          <span className="hidden sm:inline">{getStatusText(mutasi.status)}</span>
                          <span className="sm:hidden">{getStatusText(mutasi.status).split(' ')[0]}</span>
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                        {mutasi.keterangan || '-'}
                      </td>
                      {isAdmin && (
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              onClick={() => {
                                setEditingMutasi(mutasi);
                                setShowForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 sm:p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(mutasi.id)}
                              className="text-red-600 hover:text-red-900 p-1 sm:p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {mutasiAsets.data && mutasiAsets.data.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan {mutasiAsets.from || 0} sampai {mutasiAsets.to || 0} dari {mutasiAsets.total || 0} mutasi
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {editingMutasi ? 'Edit Mutasi Aset' : 'Pinjam Aset Baru'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMutasi(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <MutasiForm 
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingMutasi(null);
                }}
                asets={asets}
                editingMutasi={editingMutasi}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Component
const MutasiForm = ({ onSubmit, onCancel, asets, editingMutasi, isAdmin }) => {
  const [formData, setFormData] = useState({
    aset_id: editingMutasi?.aset_id || '',
    jenis_mutasi: editingMutasi?.jenis_mutasi || 'peminjaman',
    tanggal_pinjam: editingMutasi?.tanggal_pinjam ? new Date(editingMutasi.tanggal_pinjam).toISOString().split('T')[0] : '',
    tanggal_kembali: editingMutasi?.tanggal_kembali ? new Date(editingMutasi.tanggal_kembali).toISOString().split('T')[0] : '',
    keterangan: editingMutasi?.keterangan || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Aset {!isAdmin && <span className="text-red-500">*</span>}
          </label>
          <select
            value={formData.aset_id}
            onChange={(e) => setFormData(prev => ({ ...prev, aset_id: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            required={!isAdmin}
            disabled={isAdmin}
          >
            <option value="">Pilih Aset</option>
            {asets.map((aset) => (
              <option key={aset.id} value={aset.id}>
                {aset.kode_aset} - {aset.nama_barang} ({aset.kategori})
              </option>
            ))}
          </select>
          {!isAdmin && asets.length === 0 && (
            <p className="text-xs sm:text-sm text-red-500 mt-1">Tidak ada aset tersedia untuk dipinjam</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Mutasi
          </label>
          <select
            value={formData.jenis_mutasi}
            onChange={(e) => setFormData(prev => ({ ...prev, jenis_mutasi: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          >
            <option value="peminjaman">Peminjaman</option>
            <option value="pengembalian">Pengembalian</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Pinjam <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.tanggal_pinjam}
            onChange={(e) => setFormData(prev => ({ ...prev, tanggal_pinjam: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Kembali
          </label>
          <input
            type="date"
            value={formData.tanggal_kembali}
            onChange={(e) => setFormData(prev => ({ ...prev, tanggal_kembali: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keterangan
        </label>
        <textarea
          value={formData.keterangan}
          onChange={(e) => setFormData(prev => ({ ...prev, keterangan: e.target.value }))}
          rows={3}
          className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          placeholder="Masukkan keterangan tambahan (opsional)"
        />
      </div>

      {!isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-blue-900">Informasi Penting</p>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">
                Permintaan peminjaman Anda akan ditinjau oleh admin. Anda akan mendapat notifikasi 
                setelah admin menyetujui atau menolak permintaan Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-sm sm:text-base"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          {editingMutasi ? 'Update Mutasi' : 'Ajukan Permintaan'}
        </button>
      </div>
    </form>
  );
};

export default MutasiAset;
