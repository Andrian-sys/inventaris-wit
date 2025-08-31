<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Mutasi Aset</title>
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
        .status-pending { color: orange; }
        .status-disetujui { color: green; }
        .status-ditolak { color: red; }
        .status-selesai { color: blue; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Mutasi Aset</h1>
        <p>Tanggal: {{ date('d/m/Y H:i') }}</p>
    </div>
    
    @if(!empty($filters))
    <div class="filters">
        <strong>Filter:</strong>
        @if(isset($filters['status']))
            Status: {{ $filters['status'] }} |
        @endif
        @if(isset($filters['jenis_mutasi']))
            Jenis Mutasi: {{ $filters['jenis_mutasi'] }} |
        @endif
        @if(isset($filters['tanggal_mulai']))
            Tanggal Mulai: {{ $filters['tanggal_mulai'] }} |
        @endif
        @if(isset($filters['tanggal_akhir']))
            Tanggal Akhir: {{ $filters['tanggal_akhir'] }}
        @endif
    </div>
    @endif
    
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Aset</th>
                <th>Nama Barang</th>
                <th>Peminjam</th>
                <th>Jenis Mutasi</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Kembali</th>
                <th>Status</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($mutasiAsets as $index => $mutasi)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $mutasi->aset->kode_aset }}</td>
                <td>{{ $mutasi->aset->nama_barang }}</td>
                <td>{{ $mutasi->user->name }}</td>
                <td>{{ $mutasi->jenis_mutasi }}</td>
                <td>{{ $mutasi->tanggal_pinjam->format('d/m/Y') }}</td>
                <td>{{ $mutasi->tanggal_kembali ? $mutasi->tanggal_kembali->format('d/m/Y') : '-' }}</td>
                <td class="status-{{ $mutasi->status }}">{{ $mutasi->status }}</td>
                <td>{{ $mutasi->keterangan ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <div style="margin-top: 20px; font-size: 12px;">
        <p><strong>Total Mutasi:</strong> {{ $mutasiAsets->count() }}</p>
    </div>
</body>
</html>
