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
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const InventarisAset = () => {
  const { isAdmin } = useAuth();
  const [asets, setAsets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAset, setEditingAset] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    kategori: '',
    lokasi: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc'
  });

  useEffect(() => {
    fetchAsets();
  }, [filters, sortConfig]);

  const fetchAsets = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.kategori) params.append('kategori', filters.kategori);
      if (filters.lokasi) params.append('lokasi', filters.lokasi);
      params.append('sort_by', sortConfig.key);
      params.append('sort_order', sortConfig.direction);

      const response = await api.get(`/asets?${params}`);
      setAsets(response.data.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus aset ini?')) return;
    
    try {
      await api.delete(`/asets/${id}`);
      fetchAsets();
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleExport = async (type) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.kategori) params.append('kategori', filters.kategori);
      if (filters.lokasi) params.append('lokasi', filters.lokasi);

      const response = await api.get(`/laporan/aset/${type}?${params}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-aset-${type}-${new Date().toISOString().split('T')[0]}.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'tersedia': return 'bg-green-100 text-green-800';
      case 'dipinjam': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'rusak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKondisiColor = (kondisi) => {
    switch (kondisi) {
      case 'baik': return 'bg-green-100 text-green-800';
      case 'rusak_ringan': return 'bg-yellow-100 text-yellow-800';
      case 'rusak_berat': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventaris Aset</h1>
            <p className="text-gray-600">Kelola data aset inventaris kantor</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Tambah Aset
            </button>
          )}
          {!isAdmin && (
            <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <span className="font-medium">Staff Mode:</span> Anda hanya dapat melihat daftar aset yang tersedia
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari aset..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="tersedia">Tersedia</option>
              <option value="dipinjam">Dipinjam</option>
              <option value="maintenance">Maintenance</option>
              <option value="rusak">Rusak</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={filters.kategori}
              onChange={(e) => setFilters(prev => ({ ...prev, kategori: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Lokasi</option>
              <option value="Gedung A">Gedung A</option>
              <option value="Gedung B">Gedung B</option>
              <option value="Gedung C">Gedung C</option>
              <option value="Gudang">Gudang</option>
            </select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('kode_aset')}
                  >
                    <div className="flex items-center gap-1">
                      Kode Aset
                      {sortConfig.key === 'kode_aset' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('nama_barang')}
                  >
                    <div className="flex items-center gap-1">
                      Nama Barang
                      {sortConfig.key === 'nama_barang' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kondisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {asets.data?.map((aset) => (
                  <tr key={aset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {aset.kode_aset}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {aset.nama_barang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {aset.kategori}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {aset.lokasi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getKondisiColor(aset.kondisi)}`}>
                        {aset.kondisi.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(aset.status)}`}>
                        {aset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {Number(aset.harga).toLocaleString('id-ID')}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingAset(aset)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(aset.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {asets.data && asets.data.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan {asets.from || 0} sampai {asets.to || 0} dari {asets.total || 0} aset
          </div>
          <div className="flex gap-2">
            {asets.prev_page_url && (
              <button
                onClick={() => {
                  const url = new URL(asets.prev_page_url);
                  const page = url.searchParams.get('page');
                  // Handle pagination
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            {asets.next_page_url && (
              <button
                onClick={() => {
                  const url = new URL(asets.next_page_url);
                  const page = url.searchParams.get('page');
                  // Handle pagination
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {(showForm || editingAset) && (
        <AsetForm 
          aset={editingAset}
          onClose={() => {
            setShowForm(false);
            setEditingAset(null);
          }}
          onSuccess={() => {
            fetchAsets();
            setShowForm(false);
            setEditingAset(null);
          }}
        />
      )}
    </div>
  );
};

// Aset Form Component
const AsetForm = ({ aset, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    kode_aset: aset?.kode_aset || '',
    kategori: aset?.kategori || '',
    nama_barang: aset?.nama_barang || '',
    lokasi: aset?.lokasi || '',
    kondisi: aset?.kondisi || 'baik',
    penanggung_jawab: aset?.penanggung_jawab || '',
    harga: aset?.harga || '',
    tanggal_pembelian: aset?.tanggal_pembelian ? aset.tanggal_pembelian.split('T')[0] : '',
    status: aset?.status || 'tersedia'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (aset) {
        await api.put(`/asets/${aset.id}`, formData);
      } else {
        await api.post('/asets', formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving asset:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {aset ? 'Edit Aset' : 'Tambah Aset Baru'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Aset</label>
              <input
                type="text"
                required
                value={formData.kode_aset}
                onChange={(e) => setFormData(prev => ({ ...prev, kode_aset: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                required
                value={formData.kategori}
                onChange={(e) => setFormData(prev => ({ ...prev, kategori: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Furniture">Furniture</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Peralatan">Peralatan</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
              <input
                type="text"
                required
                value={formData.nama_barang}
                onChange={(e) => setFormData(prev => ({ ...prev, nama_barang: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <select
                required
                value={formData.lokasi}
                onChange={(e) => setFormData(prev => ({ ...prev, lokasi: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Lokasi</option>
                <option value="Gedung A">Gedung A</option>
                <option value="Gedung B">Gedung B</option>
                <option value="Gedung C">Gedung C</option>
                <option value="Gudang">Gudang</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
              <select
                required
                value={formData.kondisi}
                onChange={(e) => setFormData(prev => ({ ...prev, kondisi: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="baik">Baik</option>
                <option value="rusak_ringan">Rusak Ringan</option>
                <option value="rusak_berat">Rusak Berat</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penanggung Jawab</label>
              <input
                type="text"
                required
                value={formData.penanggung_jawab}
                onChange={(e) => setFormData(prev => ({ ...prev, penanggung_jawab: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
              <input
                type="number"
                required
                value={formData.harga}
                onChange={(e) => setFormData(prev => ({ ...prev, harga: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pembelian</label>
              <input
                type="date"
                required
                value={formData.tanggal_pembelian}
                onChange={(e) => setFormData(prev => ({ ...prev, tanggal_pembelian: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tersedia">Tersedia</option>
                <option value="dipinjam">Dipinjam</option>
                <option value="maintenance">Maintenance</option>
                <option value="rusak">Rusak</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : (aset ? 'Update' : 'Simpan')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventarisAset;
