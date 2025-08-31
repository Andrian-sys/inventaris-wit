import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Eye,
  Plus,
  ArrowRight,
  Calendar,
  DollarSign,
  Activity,
  QrCode,
  FileText,
  Settings,
  Bell,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [availableAssets, setAvailableAssets] = useState([]);
  const [pendingMutations, setPendingMutations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await api.get('/laporan/dashboard-stats');
      setStats(statsResponse.data.data);

      if (isAdmin) {
        // Admin: Fetch pending mutations for approval
        const mutationsResponse = await api.get('/mutasi-asets?status=pending');
        setPendingMutations(mutationsResponse.data.data.data || []);
      } else {
        // Staff: Fetch available assets for borrowing
        const assetsResponse = await api.get('/asets?status=tersedia');
        setAvailableAssets(assetsResponse.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showNotification('Gagal memuat data dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleApproveMutation = async (mutationId) => {
    try {
      await api.put(`/mutasi-asets/${mutationId}`, { status: 'disetujui' });
      showNotification('Permintaan berhasil disetujui!', 'success');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error approving mutation:', error);
      showNotification('Gagal menyetujui permintaan', 'error');
    }
  };

  const handleRejectMutation = async (mutationId) => {
    try {
      await api.put(`/mutasi-asets/${mutationId}`, { status: 'ditolak' });
      showNotification('Permintaan berhasil ditolak!', 'success');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error rejecting mutation:', error);
      showNotification('Gagal menolak permintaan', 'error');
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

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">
              Selamat datang kembali, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              {isAdmin 
                ? 'Kelola inventaris aset dan persetujui permintaan staff dengan mudah'
                : 'Jelajahi aset yang tersedia dan kelola riwayat peminjaman Anda'
              }
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
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
                <p className="text-sm font-medium text-gray-600 mb-1">Maintenance</p>
                <p className="text-3xl font-bold text-red-600">{stats.aset_stats?.maintenance || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Perlu perbaikan</p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {isAdmin && (
        <div className="space-y-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <Bell className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Persetujuan Tertunda</h2>
                    <p className="text-gray-600 mt-1">Tinjau dan persetujui permintaan peminjaman staff</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {pendingMutations.length} permintaan
                  </span>
                  {pendingMutations.length > 0 && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              {pendingMutations.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">Tidak ada permintaan persetujuan tertunda</p>
                  <p className="text-gray-400 text-sm mt-1">Semua permintaan telah diproses</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMutations.map((mutation) => (
                    <div key={mutation.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">{mutation.user.name}</p>
                              <p className="text-sm text-gray-500">{mutation.user.email}</p>
                              <p className="text-xs text-yellow-600 font-medium mt-1">
                                Menunggu persetujuan sejak {new Date(mutation.created_at).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                          <div className="ml-16">
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                  <Package className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {mutation.aset.nama_barang}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {mutation.aset.kode_aset} • {mutation.aset.kategori}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Pinjam:</span>
                                  <span className="font-medium text-gray-900 ml-2">
                                    {new Date(mutation.tanggal_pinjam).toLocaleDateString('id-ID')}
                                  </span>
                                </div>
                                {mutation.tanggal_kembali && (
                                  <div>
                                    <span className="text-gray-500">Kembali:</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                      {new Date(mutation.tanggal_kembali).toLocaleDateString('id-ID')}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {mutation.keterangan && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs text-gray-500 font-medium mb-1">Keterangan:</p>
                                  <p className="text-sm text-gray-700">{mutation.keterangan}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 ml-6">
                          <button
                            onClick={() => handleApproveMutation(mutation.id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Setujui</span>
                          </button>
                          <button
                            onClick={() => handleRejectMutation(mutation.id)}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Tolak</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/asets" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Kelola Aset</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tambah, edit, dan kelola inventaris aset dengan pelacakan komprehensif
              </p>
              <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 text-center font-semibold">
                Kelola Aset
              </div>
            </Link>

            <Link to="/laporan" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buat Laporan</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Buat laporan komprehensif untuk analisis dan pengambilan keputusan
              </p>
              <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-300 text-center font-semibold">
                Buat Laporan
              </div>
            </Link>

            <Link to="/barcode" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                  <QrCode className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cetak Barcode</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Generate dan cetak barcode untuk identifikasi aset yang mudah
              </p>
              <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300 text-center font-semibold">
                Cetak Barcode
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Staff Dashboard */}
      {!isAdmin && (
        <div className="space-y-8">
          {/* Available Assets */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Aset Tersedia</h2>
                  <p className="text-gray-600 mt-1">Jelajahi dan minta aset untuk kebutuhan Anda</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                  {availableAssets.length} tersedia
                </span>
              </div>
            </div>
            <div className="p-6">
              {availableAssets.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">Tidak ada aset tersedia untuk dipinjam</p>
                  <p className="text-gray-400 text-sm mt-1">Cek kembali nanti untuk aset baru</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableAssets.slice(0, 6).map((asset) => (
                    <div key={asset.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{asset.nama_barang}</p>
                          <p className="text-xs text-gray-500">{asset.kode_aset}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Kategori:</span>
                          <span className="font-medium">{asset.kategori}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lokasi:</span>
                          <span className="font-medium">{asset.lokasi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kondisi:</span>
                          <span className="font-medium capitalize">{asset.kondisi}</span>
                        </div>
                      </div>
                      <Link 
                        to="/mutasi" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm text-center font-semibold block shadow-lg hover:shadow-xl"
                      >
                        Pinjam Aset
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {availableAssets.length > 6 && (
                <div className="mt-8 text-center">
                  <Link 
                    to="/asets" 
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
                  >
                    <span>Lihat Semua Aset</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions for Staff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/mutasi" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Peminjaman Saya</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lihat peminjaman aset saat ini dan masa lalu dengan riwayat detail
              </p>
              <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 text-center font-semibold">
                Lihat Riwayat
              </div>
            </Link>

            <Link to="/mutasi" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Minta Aset</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ajukan permintaan peminjaman baru untuk aset yang Anda butuhkan
              </p>
              <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-300 text-center font-semibold">
                Permintaan Baru
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
