document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');
    const saleForm = document.getElementById('saleForm');

    // Menghitung total pembelian secara otomatis
    purchaseForm?.addEventListener('input', () => {
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const price = parseFloat(document.getElementById('price').value) || 0;
        const total = amount * price;
        document.getElementById('purchaseTotal').value = total.toFixed(2);
    });

    // Menghitung total penjualan secara otomatis
    saleForm?.addEventListener('input', () => {
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const price = parseFloat(document.getElementById('price').value) || 0;
        const total = amount * price;
        document.getElementById('saleTotal').value = total.toFixed(2);
    });

    // Menangani pengiriman formulir pembelian
    purchaseForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(purchaseForm);
        const data = {
            commodity: formData.get('commodity'),
            amount: parseFloat(formData.get('amount')),
            price: parseFloat(formData.get('price')),
            total: parseFloat(document.getElementById('purchaseTotal').value)
        };

        await fetch('/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        purchaseForm.reset();
        loadPurchases(); // Muat ulang data pembelian
    });

    // Menangani pengiriman formulir penjualan
    saleForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(saleForm);
        const data = {
            recipient: formData.get('recipient'),
            commodity: formData.get('commodity'),
            amount: parseFloat(formData.get('amount')),
            price: parseFloat(formData.get('price')),
            total: parseFloat(document.getElementById('saleTotal').value)
        };

        await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        saleForm.reset();
        loadSales(); // Muat ulang data penjualan
    });

    // Fungsi untuk memuat data pembelian
    async function loadPurchases(page = 1) {
        const response = await fetch(`/api/purchases?page=${page}`);
        const data = await response.json();

        // Update UI dengan data pembelian
        // Misalnya, menampilkan data pada tabel atau list
    }

    // Fungsi untuk memuat data penjualan
    async function loadSales(page = 1) {
        const response = await fetch(`/api/sales?page=${page}`);
        const data = await response.json();

        // Update UI dengan data penjualan
        // Misalnya, menampilkan data pada tabel atau list
    }

    // Muat data awal saat halaman dimuat
    loadPurchases();
    loadSales();
});
