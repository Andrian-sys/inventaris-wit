<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Barcode - {{ $aset->kode_aset }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
        }
        .barcode {
            margin: 20px 0;
        }
        .info {
            margin: 20px 0;
            text-align: left;
        }
        .info table {
            width: 100%;
            border-collapse: collapse;
        }
        .info td {
            padding: 5px;
            border-bottom: 1px solid #ddd;
        }
        .info td:first-child {
            font-weight: bold;
            width: 40%;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Barcode Aset</h2>
        
        <div class="barcode">
            <img src="{{ $barcodeImage }}" alt="Barcode">
            <p><strong>{{ $aset->kode_aset }}</strong></p>
        </div>
        
        <div class="info">
            <table>
                <tr>
                    <td>Kode Aset:</td>
                    <td>{{ $aset->kode_aset }}</td>
                </tr>
                <tr>
                    <td>Nama Barang:</td>
                    <td>{{ $aset->nama_barang }}</td>
                </tr>
                <tr>
                    <td>Kategori:</td>
                    <td>{{ $aset->kategori }}</td>
                </tr>
                <tr>
                    <td>Lokasi:</td>
                    <td>{{ $aset->lokasi }}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>{{ $aset->status }}</td>
                </tr>
                <tr>
                    <td>Tanggal Dibuat:</td>
                    <td>{{ $aset->created_at->format('d/m/Y H:i') }}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
