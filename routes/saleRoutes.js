const express = require('express'); // Mengimpor modul Express
const router = express.Router(); // Membuat router Express

// Simpan data penjualan di memori (untuk keperluan demo)
let sales = [];

// Rute GET untuk mendapatkan semua penjualan
router.get('/', (req, res) => {
  res.json(sales); // Mengirim data penjualan dalam format JSON
});

// Rute POST untuk menambah penjualan
router.post('/', (req, res) => {
  const sale = req.body; // Mengambil data dari body permintaan
  sales.push(sale); // Menambahkan penjualan ke array
  res.status(201).json(sale); // Mengirimkan data penjualan dengan status 201
});

module.exports = router; // Mengekspor router
