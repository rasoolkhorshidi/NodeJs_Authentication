module.exports = new (class {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    
    async login(req, res) {
        // Logic for user login
        res.send("Login successful");
    }
    
    async register(req, res) {
        // Logic for user registration
        res.send("Registration successful");
    }
})();