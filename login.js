document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const email = this.email.value;
            const password = this.password.value;
            handleLogin(email, password);
            return false;
        };
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.onsubmit = function(e) {
            e.preventDefault();
            const name = this.name.value;
            const email = this.email.value;
            const password = this.password.value;
            handleSignup(name, email, password);
            return false;
        };
    }
});

function handleLogin(email, password) {
    const errorDiv = document.getElementById('loginError');
    const successDiv = document.getElementById('loginSuccess');
    
    errorDiv.classList.add('d-none');
    successDiv.classList.add('d-none');

    if (email === "test@example.com" && password === "password123") {
        successDiv.classList.remove('d-none');
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
        }, 2000);
    } else {
        errorDiv.textContent = 'Invalid email or password';
        errorDiv.classList.remove('d-none');
    }
}

function handleSignup(name, email, password) {
    const errorDiv = document.getElementById('signupError');
    const successDiv = document.getElementById('signupSuccess');

    errorDiv.classList.add('d-none');
    successDiv.classList.add('d-none');

    if (name && email && password.length >= 6) {
        successDiv.classList.remove('d-none');
        setTimeout(() => {
            const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            signupModal.hide();
            loginModal.show();
        }, 2000);
    } else {
        errorDiv.textContent = 'Please fill all fields correctly';
        errorDiv.classList.remove('d-none');
    }
}
