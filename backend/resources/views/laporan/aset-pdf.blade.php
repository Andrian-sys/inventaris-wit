<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Aset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .filters {
            margin-bottom: 20px;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .status-tersedia { color: green; }
        .status-dipinjam { color: orange; }
        .status-maintenance { color: blue; }
        .status-rusak { color: red; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Inventaris Aset</h1>
        <p>Tanggal: {{ date('d/m/Y H:i') }}</p>
    </div>
    
    @if(!empty($filters))
    <div class="filters">
        <strong>Filter:</strong>
        @if(isset($filters['kategori']))
            Kategori: {{ $filters['kategori'] }} |
        @endif
        @if(isset($filters['lokasi']))
            Lokasi: {{ $filters['lokasi'] }} |
        @endif
        @if(isset($filters['status']))
            Status: {{ $filters['status'] }}
        @endif
    </div>
    @endif
    
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Aset</th>
                <th>Kategori</th>
                <th>Nama Barang</th>
                <th>Lokasi</th>
                <th>Kondisi</th>
                <th>Penanggung Jawab</th>
                <th>Harga</th>
                <th>Tanggal Pembelian</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($asets as $index => $aset)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $aset->kode_aset }}</td>
                <td>{{ $aset->kategori }}</td>
                <td>{{ $aset->nama_barang }}</td>
                <td>{{ $aset->lokasi }}</td>
                <td>{{ $aset->kondisi }}</td>
                <td>{{ $aset->penanggung_jawab }}</td>
                <td>Rp {{ number_format($aset->harga, 0, ',', '.') }}</td>
                <td>{{ $aset->tanggal_pembelian->format('d/m/Y') }}</td>
                <td class="status-{{ $aset->status }}">{{ $aset->status }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <div style="margin-top: 20px; font-size: 12px;">
        <p><strong>Total Aset:</strong> {{ $asets->count() }}</p>
    </div>
</body>
</html>
