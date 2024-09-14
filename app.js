const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./aplikasi_hasil_bumi.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint untuk halaman-halaman lainnya
app.get('/pembelian.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pembelian.html'));
});

app.get('/penjualan.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'penjualan.html'));
});

app.get('/history-pembelian.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history-pembelian.html'));
});

app.get('/history-penjualan.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history-penjualan.html'));
});

// Endpoint untuk mengambil data pembelian dengan pagination dan filter tanggal
app.get('/api/purchases', (req, res) => {
    const { page = 1, startDate, endDate } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM pembelian';
    let params = [];

    if (startDate && endDate) {
        query += ' WHERE created_at BETWEEN ? AND ?';
        params = [startDate, endDate];
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Count total pages
        db.get('SELECT COUNT(*) AS total FROM pembelian', (err, countRow) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const totalItems = countRow.total;
            const totalPages = Math.ceil(totalItems / limit);

            // Fetch stats
            db.all('SELECT commodity, SUM(amount) AS totalAmount FROM pembelian GROUP BY commodity', (err, stats) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    purchases: rows,
                    totalPages,
                    stats
                });
            });
        });
    });
});

// Endpoint untuk mengambil data penjualan dengan pagination dan filter tanggal
app.get('/api/sales', (req, res) => {
    const { page = 1, startDate, endDate } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM penjualan';
    let params = [];

    if (startDate && endDate) {
        query += ' WHERE created_at BETWEEN ? AND ?';
        params = [startDate, endDate];
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Count total pages
        db.get('SELECT COUNT(*) AS total FROM penjualan', (err, countRow) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const totalItems = countRow.total;
            const totalPages = Math.ceil(totalItems / limit);

            // Fetch stats
            db.all('SELECT commodity, SUM(amount) AS totalAmount FROM penjualan GROUP BY commodity', (err, stats) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    sales: rows,
                    totalPages,
                    stats
                });
            });
        });
    });
});

// Endpoint untuk menambah pembelian
app.post('/api/purchases', (req, res) => {
    const { commodity, amount, price, total } = req.body;
    const query = 'INSERT INTO pembelian (commodity, amount, price, total) VALUES (?, ?, ?, ?)';
    const params = [commodity, amount, price, total];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint untuk mengedit pembelian
app.put('/api/purchases/:id', (req, res) => {
    const { id } = req.params;
    const { commodity, amount, price, total } = req.body;
    const query = 'UPDATE pembelian SET commodity = ?, amount = ?, price = ?, total = ? WHERE id = ?';
    const params = [commodity, amount, price, total, id];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// Endpoint untuk menghapus pembelian
app.delete('/api/purchases/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM pembelian WHERE id = ?';
    
    db.run(query, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// Endpoint untuk menambah penjualan
app.post('/api/sales', (req, res) => {
    const { recipient, commodity, amount, price, total } = req.body;
    const query = 'INSERT INTO penjualan (recipient, commodity, amount, price, total) VALUES (?, ?, ?, ?, ?)';
    const params = [recipient, commodity, amount, price, total];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint untuk mengedit penjualan
app.put('/api/sales/:id', (req, res) => {
    const { id } = req.params;
    const { recipient, commodity, amount, price, total } = req.body;
    const query = 'UPDATE penjualan SET recipient = ?, commodity = ?, amount = ?, price = ?, total = ? WHERE id = ?';
    const params = [recipient, commodity, amount, price, total, id];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// Endpoint untuk menghapus penjualan
app.delete('/api/sales/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM penjualan WHERE id = ?';
    
    db.run(query, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
