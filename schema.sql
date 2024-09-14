-- Hapus database jika ada
DROP TABLE IF EXISTS pembelian;
DROP TABLE IF EXISTS penjualan;

-- Buat tabel pembelian
CREATE TABLE pembelian (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commodity TEXT NOT NULL,
    amount REAL NOT NULL,
    price REAL NOT NULL,
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel penjualan
CREATE TABLE penjualan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient TEXT NOT NULL,
    commodity TEXT NOT NULL,
    amount REAL NOT NULL,
    price REAL NOT NULL,
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
