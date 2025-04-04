document.addEventListener('DOMContentLoaded', function() {
    const shopDropdown = document.querySelector('.nav-item.dropdown');
    if (shopDropdown) {
        shopDropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').classList.add('show');
        });
        shopDropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').classList.remove('show');
        });
    }

    document.querySelectorAll('.dropdown-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const category = this.getAttribute('href').replace('.html', '');
            if (category === 'sale') {
                console.log('Showing sale items');
            }
        });
    });
});
