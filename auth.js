class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = null;
    }

    signup(name, email, password) {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        if (this.users.find(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        const user = {
            id: Date.now(),
            name,
            email,
            password
        };

        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        return user;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}

window.auth = new Auth();
