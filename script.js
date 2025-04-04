document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD
    let expenses = [];
    let totalAmount = 0;

    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const addBtn = document.getElementById('add-btn');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');

    function updateTotalAmount() {
        totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountCell.textContent = totalAmount;
    }

    addBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        const amount = Number(amountInput.value);
        const date = dateInput.value;

        if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
            alert("Please enter valid details");
            return;
        }

        const expense = { category, amount, date };
        expenses.push(expense);

        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = category;
        amountCell.textContent = amount;
        dateCell.textContent = date;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            const newCategory = prompt("Enter new category", categoryCell.textContent);
            const newAmount = Number(prompt("Enter new amount", amountCell.textContent));
            const newDate = prompt("Enter new date", dateCell.textContent);

            if (!newCategory || isNaN(newAmount) || newAmount <= 0 || !newDate) {
                alert("Invalid input");
                return;
            }
            
            totalAmount -= expense.amount;
            expense.category = newCategory;
            expense.amount = newAmount;
            expense.date = newDate;
            totalAmount += newAmount;

            categoryCell.textContent = newCategory;
            amountCell.textContent = newAmount;
            dateCell.textContent = newDate;
            updateTotalAmount();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(expenses.indexOf(expense), 1);
            newRow.remove();
            updateTotalAmount();
        });

        editCell.appendChild(editBtn);
        deleteCell.appendChild(deleteBtn);
        updateTotalAmount();
    });
});
=======
    const auth = new AuthService();
    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
    const cartBadge = document.querySelector('.badge.bg-danger');

    function updateUI() {
        if (auth.isLoggedIn()) {
            loginBtn.innerHTML = `<i class="bi bi-person-circle me-1"></i> ${auth.currentUser.name}`;
            loginBtn.setAttribute('data-bs-target', '#profileDropdown');
        } else {
            loginBtn.innerHTML = `<i class="bi bi-person-circle me-1"></i> Login`;
            loginBtn.setAttribute('data-bs-target', '#loginModal');
        }
    }

    const loginForm = document.getElementById('loginForm');
    const loginModal = document.getElementById('loginModal');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginError = document.createElement('div');
    loginError.className = 'alert alert-danger mt-3 d-none';
    loginForm.insertAdjacentElement('beforebegin', loginError);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;

        try {
            const user = window.authService.login(email, password);
            loginError.classList.add('d-none');
            loginSuccess.classList.remove('d-none');
            
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                document.getElementById('loginButton').innerHTML = `
                    <i class="bi bi-person-circle me-1"></i> ${user.name}
                `;
            }, 1500);
        } catch (error) {
            loginError.textContent = error.message;
            loginError.classList.remove('d-none');
        }
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.textContent = message;
        const modalBody = loginForm.closest('.modal-body');
        modalBody.insertBefore(errorDiv, modalBody.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginBtn.innerHTML = `<i class="bi bi-person-circle me-1"></i> Welcome`;
        loginBtn.setAttribute('data-bs-toggle', 'dropdown');
        loginBtn.setAttribute('data-bs-target', '#profileDropdown');
    }

    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const name = e.target.querySelector('input[type="text"]').value;
            const email = e.target.querySelector('input[type="email"]').value;
            const password = e.target.querySelector('input[type="password"]').value;
            auth.signup(name, email, password);
            bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
            alert('Signup successful! Please login.');
        } catch (err) {
            alert(err.message);
        }
    });

    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchResults = document.getElementById('searchResults');

    const products = [
        {
            name: 'Casual Women White Jacket',
            description: 'Comfortable and stylish jacket',
            image: 'images/business-woman-posing-street.jpg',
            price: '1499'
        },
        {
            name: 'Denim Blue Jacket',
            description: 'Classic denim style',
            image: 'images/portrait-happy-smiling-young-asian-man-using-smartphone-sitting-chair.jpg',
            price: '999'
        },
        {
            name: 'Fashion Jacket',
            description: 'Trendy winter wear',
            image: 'images/sexy-fashion-beauty-person-smile.jpg',
            price: '1999'
        }
    ];

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            
            displaySearchResults(filteredProducts);
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = results.length > 0 
            ? results.map(product => `
                <div class="d-flex align-items-center gap-2 p-2 border-bottom search-item">
                    <img src="${product.image}" alt="${product.name}" width="50" height="50" style="object-fit: cover; border-radius: 5px;">
                    <div>
                        <strong>${product.name}</strong><br>
                        <small>${product.description}</small>
                        <div class="text-primary">RS.${product.price}/-</div>
                    </div>
                </div>
            `).join('')
            : '<div class="p-2 text-center text-muted">No results found</div>';
    }

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });

    searchResults.addEventListener('click', (e) => {
        const searchItem = e.target.closest('.search-item');
        if (searchItem) {
            console.log('Selected product:', searchItem.querySelector('strong').textContent);
            searchDropdown.classList.remove('show');
            searchInput.value = '';
        }
    });

    updateUI();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;

        try {
            window.auth.signup(name, email, password);
            alert('Signup successful! Please login.');
            bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).show();
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;

        try {
            const user = window.auth.login(email, password);
            document.getElementById('loginSuccess').classList.remove('d-none');
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                document.getElementById('loginButton').innerHTML = `
                    <i class="bi bi-person-circle me-1"></i> ${user.name}
                `;
            }, 1500);
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        window.auth.logout();
        document.getElementById('loginButton').innerHTML = `
            <i class="bi bi-person-circle me-1"></i> Login
        `;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        try {
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            
            window.auth.signup(name, email, password);
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            modal.hide();
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();
            
            alert('Signup successful! Please login.');
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        try {
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            
            const user = window.auth.login(email, password);
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();
            
            document.getElementById('loginButton').innerHTML = `
                <i class="bi bi-person-circle me-1"></i> ${user.name}
            `;
        } catch (error) {
            alert(error.message);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');

    function renderSearchResults(results) {
        searchDropdown.innerHTML = results.map(product => `
            <div class="search-item d-flex align-items-center gap-2 p-2 border-bottom">
                <img src="${product.image}" alt="${product.name}" width="50" height="50" 
                     style="object-fit: cover; border-radius: 5px;">
                <div>
                    <strong>${product.name}</strong><br>
                    <small>${product.price}</small>
                </div>
            </div>
        `).join('');
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            const results = window.products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
            renderSearchResults(results);
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });

    var dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function(event) {
            event.preventDefault();
            var dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle')) {
            var dropdowns = document.querySelectorAll('.dropdown-menu.show');
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('show');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            const filteredProducts = searchProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            
            searchDropdown.innerHTML = filteredProducts.map(product => `
                <a href="#" class="search-item d-flex align-items-center gap-2 p-2 border-bottom text-decoration-none text-dark">
                    <img src="${product.image}" alt="${product.name}" width="50" height="50" 
                         style="object-fit: cover; border-radius: 5px;">
                    <div>
                        <strong>${product.name}</strong><br>
                        <small class="text-muted">${product.price}</small>
                    </div>
                </a>
            `).join('');
            
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            searchDropdown.classList.add('show');
        }
    });
    
    function showProductDetails(product) {
        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = product.price;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productCategory').textContent = product.category;
        
        productModal.show();
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            const filteredProducts = searchProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            
            searchDropdown.innerHTML = filteredProducts.map(product => `
                <a href="#" class="search-item d-flex align-items-center gap-2 p-2 border-bottom text-decoration-none text-dark"
                   onclick="showProductDetails(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <img src="${product.image}" alt="${product.name}" width="50" height="50" 
                         style="object-fit: cover; border-radius: 5px;">
                    <div>
                        <strong>${product.name}</strong><br>
                        <small class="text-muted">${product.price}</small>
                    </div>
                </a>
            `).join('');
            
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const priceListDropdown = document.getElementById('priceListDropdown');
    if (priceListDropdown) {
        new bootstrap.Dropdown(priceListDropdown);
    }
});

let cart = [];
let cartTotal = 0;

function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    cartTotal = 0;

    cart.forEach((item, index) => {
        cartTotal += parseFloat(item.price);
        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="mb-0">RS.${item.price}/-</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    });

    cartTotalElement.textContent = `RS.${cartTotal.toFixed(2)}/-`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                name: e.target.dataset.name,
                price: e.target.dataset.price,
                image: e.target.dataset.image
            };
            addToCart(product);
        });
    });

    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Proceeding to checkout...');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        new bootstrap.Dropdown(dropdown);
    });
});

>>>>>>> c292e13 (Initial commit)
