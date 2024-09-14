document.addEventListener('DOMContentLoaded', () => {
    loadPurchaseHistory();
    loadSaleHistory();
});

// Fungsi untuk memuat history pembelian
function loadPurchaseHistory() {
    const purchaseHistoryTable = document.getElementById('purchaseHistoryTable').getElementsByTagName('tbody')[0];
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];

    purchases.forEach(purchase => {
        const row = purchaseHistoryTable.insertRow();
        row.insertCell(0).textContent = purchase.commodity;
        row.insertCell(1).textContent = purchase.amount;
        row.insertCell(2).textContent = purchase.price;
        row.insertCell(3).textContent = purchase.total;
    });
}

// Fungsi untuk memuat history penjualan
function loadSaleHistory() {
    const saleHistoryTable = document.getElementById('saleHistoryTable').getElementsByTagName('tbody')[0];
    const sales = JSON.parse(localStorage.getItem('sales')) || [];

    sales.forEach(sale => {
        const row = saleHistoryTable.insertRow();
        row.insertCell(0).textContent = sale.recipient;
        row.insertCell(1).textContent = sale.commodity;
        row.insertCell(2).textContent = sale.amount;
        row.insertCell(3).textContent = sale.price;
        row.insertCell(4).textContent = sale.total;
    });
}
