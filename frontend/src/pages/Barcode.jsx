import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  QrCode, 
  Download, 
  Search, 
  Printer,
  Eye,
  FileText
} from 'lucide-react';

const Barcode = () => {
  const { isAdmin } = useAuth();
  const [asets, setAsets] = useState([]);
  const [selectedAset, setSelectedAset] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAsets();
  }, []);

  const fetchAsets = async () => {
    try {
      const response = await api.get('/asets');
      setAsets(response.data.data.data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const generateBarcode = async (asetId) => {
    setLoading(true);
    try {
      const response = await api.get(`/barcode/${asetId}/generate`);
      setBarcodeData(response.data.data);
    } catch (error) {
      console.error('Error generating barcode:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQR = async (asetId) => {
    setLoading(true);
    try {
      const response = await api.get(`/barcode/${asetId}/generate-qr`);
      setQrData(response.data.data);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (asetId) => {
    try {
      const response = await api.get(`/barcode/${asetId}/download-pdf`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `barcode-${selectedAset?.kode_aset}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const filteredAsets = asets.filter(aset =>
    aset.kode_aset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aset.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Barcode Generator</h1>
        <p className="text-gray-600">Generate dan download barcode untuk aset</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Selection */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pilih Aset</h2>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari aset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredAsets.map((aset) => (
              <div
                key={aset.id}
                onClick={() => setSelectedAset(aset)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAset?.id === aset.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{aset.kode_aset}</h3>
                    <p className="text-sm text-gray-600">{aset.nama_barang}</p>
                    <p className="text-xs text-gray-500">{aset.kategori} • {aset.lokasi}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    aset.status === 'tersedia' ? 'bg-green-100 text-green-800' :
                    aset.status === 'dipinjam' ? 'bg-blue-100 text-blue-800' :
                    aset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {aset.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Barcode Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview Barcode</h2>
          
          {selectedAset ? (
            <div className="space-y-6">
              {/* Asset Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Informasi Aset</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Kode:</span>
                    <span className="ml-2 font-medium">{selectedAset.kode_aset}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Nama:</span>
                    <span className="ml-2 font-medium">{selectedAset.nama_barang}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Kategori:</span>
                    <span className="ml-2 font-medium">{selectedAset.kategori}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Lokasi:</span>
                    <span className="ml-2 font-medium">{selectedAset.lokasi}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => generateBarcode(selectedAset.id)}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <QrCode className="h-4 w-4" />
                  Generate Barcode
                </button>
                
                <button
                  onClick={() => generateQR(selectedAset.id)}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <QrCode className="h-4 w-4" />
                  Generate QR Code
                </button>
                
                <button
                  onClick={() => downloadPDF(selectedAset.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>

              {/* Barcode Display */}
              {barcodeData && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Barcode 1D</h3>
                  <div className="text-center">
                    <img 
                      src={barcodeData.barcode_image} 
                      alt="Barcode" 
                      className="mx-auto max-w-full h-auto"
                    />
                    <p className="mt-2 text-sm text-gray-600 font-mono">{barcodeData.barcode_data}</p>
                  </div>
                </div>
              )}

              {/* QR Code Display */}
              {qrData && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">QR Code 2D</h3>
                  <div className="text-center">
                    <img 
                      src={qrData.qr_image} 
                      alt="QR Code" 
                      className="mx-auto max-w-full h-auto max-w-xs"
                    />
                    <p className="mt-2 text-sm text-gray-600 font-mono">{qrData.qr_data}</p>
                  </div>
                </div>
              )}

              {/* Print Button */}
              {(barcodeData || qrData) && (
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full justify-center"
                >
                  <Printer className="h-4 w-4" />
                  Print Barcode
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Pilih aset untuk generate barcode</p>
            </div>
          )}
        </div>
      </div>

      {/* Barcode Scanner Section */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Barcode</h2>
        <div className="text-center py-8">
          <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">Fitur scan barcode akan tersedia di versi selanjutnya</p>
          <p className="text-sm text-gray-400">
            Gunakan kamera untuk scan barcode dan QR code aset
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Barcode;
