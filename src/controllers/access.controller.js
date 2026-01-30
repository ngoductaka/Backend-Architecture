class AccessController {
    login(req, res) {
        const { username, password } = req.body;
        // Here you would normally validate the username and password
        if (username === 'testuser' && password === 'testpassword') {
            return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    signUp(req, res) {
        const { username, password } = req.body;
        // Here you would normally validate the username and password
        if (username === 'testuser' && password === 'testpassword') {
            return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

module.exports = new AccessController();