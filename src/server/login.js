const express = require('express');
const router = express.Router();

// Dummy user database (replace with your actual user authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Route to handle login requests
router.post('/login', (req, res) => {
    console.log('entered login')
    const { username, password } = req.body;
    console.log(username + password);
    // Check if the user exists in the dummy user database
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generate and return a JWT token 
        const token = generateToken(user);
        console.log("Good")
        res.status(200).json({ success: true, token });
    } else {
        console.log("Bad")
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    
});

// Dummy token generation function 
function generateToken(user) {
    return 'dummy_token';
}

module.exports = router;
