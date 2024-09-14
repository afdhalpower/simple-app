const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Menentukan lokasi file database
const dbPath = path.resolve(__dirname, 'database.db');

// Membuat koneksi ke SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Membuat tabel jika belum ada
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS pembelian (id INTEGER PRIMARY KEY AUTOINCREMENT, commodity TEXT, amount REAL, price REAL, total REAL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
    db.run('CREATE TABLE IF NOT EXISTS penjualan (id INTEGER PRIMARY KEY AUTOINCREMENT, recipient TEXT, commodity TEXT, amount REAL, price REAL, total REAL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
});

module.exports = db;
