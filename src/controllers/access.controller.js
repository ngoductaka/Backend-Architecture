const AccessService = require('../services/access.service');

class AccessController {
    login(req, res) {
        const { name, email, password } = req.body;
        // Here you would normally validate the username and password
        if (username === 'testuser' && password === 'testpassword') {
            return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    signUp(req, res) {
        const { name, email, password } = req.body;
        // Here you would normally validate the username and password
        AccessService.signUp({ name, email, password })
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            });
    }
}

module.exports = new AccessController();