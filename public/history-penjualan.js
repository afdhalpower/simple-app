document.addEventListener('DOMContentLoaded', () => {
    fetchSales();

    // Fetch and display sales data
    function fetchSales(page = 1, startDate = '', endDate = '') {
        const url = `/api/sales?page=${page}&startDate=${startDate}&endDate=${endDate}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#salesTable tbody');
                const pagination = document.getElementById('pagination');
                const stats = document.getElementById('totalStats');
                tableBody.innerHTML = '';
                pagination.innerHTML = '';
                stats.innerHTML = '';

                data.sales.forEach(sale => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${sale.id}</td>
                        <td>${sale.recipient}</td>
                        <td>${sale.commodity}</td>
                        <td>${sale.amount}</td>
                        <td>${sale.price}</td>
                        <td>${sale.total}</td>
                        <td>${sale.created_at}</td>
                        <td>
                            <button onclick="editSale(${sale.id})">Edit</button>
                            <button onclick="deleteSale(${sale.id})">Hapus</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Pagination
                for (let i = 1; i <= data.totalPages; i++) {
                    const button = document.createElement('button');
                    button.innerText = i;
                    button.addEventListener('click', () => fetchSales(i, startDate, endDate));
                    pagination.appendChild(button);
                }

                // Stats
                stats.innerHTML = `
                    <h2>Jumlah Komoditas Penjualan</h2>
                    <ul>
                        ${data.stats.map(stat => `<li>${stat.commodity}: ${stat.totalAmount} kg</li>`).join('')}
                    </ul>
                `;
            });
    }

    // Edit sale
    window.editSale = (id) => {
        // Implement edit functionality here
        alert(`Edit penjualan ID ${id}`);
    };

    // Delete sale
    window.deleteSale = (id) => {
        fetch(`/api/sales/${id}`, { method: 'DELETE' })
            .then(() => fetchSales())
            .catch(error => console.error('Error:', error));
    };

    // Filter sales
    document.querySelector('button').addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        fetchSales(1, startDate, endDate);
    });
});
