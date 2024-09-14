document.addEventListener('DOMContentLoaded', () => {
    fetchPurchases();

    // Fetch and display purchases data
    function fetchPurchases(page = 1, startDate = '', endDate = '') {
        const url = `/api/purchases?page=${page}&startDate=${startDate}&endDate=${endDate}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#purchasesTable tbody');
                const pagination = document.getElementById('pagination');
                const stats = document.getElementById('totalStats');
                tableBody.innerHTML = '';
                pagination.innerHTML = '';
                stats.innerHTML = '';

                data.purchases.forEach(purchase => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${purchase.id}</td>
                        <td>${purchase.commodity}</td>
                        <td>${purchase.amount}</td>
                        <td>${purchase.price}</td>
                        <td>${purchase.total}</td>
                        <td>${purchase.created_at}</td>
                        <td>
                            <button onclick="editPurchase(${purchase.id})">Edit</button>
                            <button onclick="deletePurchase(${purchase.id})">Hapus</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Pagination
                for (let i = 1; i <= data.totalPages; i++) {
                    const button = document.createElement('button');
                    button.innerText = i;
                    button.addEventListener('click', () => fetchPurchases(i, startDate, endDate));
                    pagination.appendChild(button);
                }

                // Stats
                stats.innerHTML = `
                    <h2>Jumlah Komoditas Pembelian</h2>
                    <ul>
                        ${data.stats.map(stat => `<li>${stat.commodity}: ${stat.totalAmount} kg</li>`).join('')}
                    </ul>
                `;
            })
            .catch(error => console.error('Error fetching purchases:', error));
    }

    // Edit purchase
    window.editPurchase = (id) => {
        alert(`Edit pembelian ID ${id}`);
    };

    // Delete purchase
    window.deletePurchase = (id) => {
        fetch(`/api/purchases/${id}`, { method: 'DELETE' })
            .then(() => fetchPurchases())
            .catch(error => console.error('Error:', error));
    };

    // Filter purchases
    document.getElementById('filterButton').addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        fetchPurchases(1, startDate, endDate);
    });
});
