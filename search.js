document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchResults = document.getElementById('searchResults');

    const products = [
        { name: 'Casual Women White Jacket', price: '1499', category: 'Women' },
        { name: 'Denim Blue Jacket', price: '999', category: 'Men' },
        { name: 'Fashion Jacket', price: '1999', category: 'Women' }
    ];

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            
            displayResults(filteredProducts);
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    });

    function displayResults(results) {
        searchResults.innerHTML = results.length ? results.map(product => `
            <div class="search-result-item">
                <img src="${product.image}" alt="${product.name}" class="search-result-image">
                <div class="search-result-info">
                    <div class="fw-bold">${product.name}</div>
                    <div class="text-primary">RS.${product.price}/-</div>
                    <small class="text-muted">${product.category}</small>
                </div>
            </div>
        `).join('') : '<div class="p-3 text-center">No results found</div>';
    }

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });
});
