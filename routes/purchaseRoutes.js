const express = require('express'); // Mengimpor modul Express
const router = express.Router(); // Membuat router Express

// Simpan data pembelian di memori (untuk keperluan demo)
let purchases = [];

// Rute GET untuk mendapatkan semua pembelian
router.get('/', (req, res) => {
  res.json(purchases); // Mengirim data pembelian dalam format JSON
});

// Rute POST untuk menambah pembelian
router.post('/', (req, res) => {
  const purchase = req.body; // Mengambil data dari body permintaan
  purchases.push(purchase); // Menambahkan pembelian ke array
  res.status(201).json(purchase); // Mengirimkan data pembelian dengan status 201
});

module.exports = router; // Mengekspor router
