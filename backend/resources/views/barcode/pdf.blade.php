<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Barcode - {{ $aset->nama_barang }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .barcode-container {
            border: 2px solid #333;
            padding: 20px;
            margin: 20px auto;
            max-width: 400px;
            background: white;
        }
        .asset-info {
            margin-bottom: 20px;
        }
        .asset-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .asset-code {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
        }
        .barcode-image {
            margin: 20px 0;
        }
        .barcode-image img {
            max-width: 100%;
            height: auto;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="barcode-container">
        <div class="asset-info">
            <div class="asset-name">{{ $aset->nama_barang }}</div>
            <div class="asset-code">Kode: {{ $aset->kode_aset }}</div>
            <div>Kategori: {{ $aset->kategori }}</div>
            <div>Lokasi: {{ $aset->lokasi }}</div>
        </div>
        
        <div class="barcode-image">
            <img src="{{ $barcodeImage }}" alt="Barcode {{ $aset->kode_aset }}">
        </div>
        
        <div class="footer">
            <p>Inventaris WIT - {{ date('d/m/Y H:i') }}</p>
        </div>
    </div>
</body>
</html>