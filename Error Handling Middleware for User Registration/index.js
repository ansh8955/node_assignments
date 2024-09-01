const express = require('express');
const app = express();
const port = 3000;

 
app.use(express.json());


function validateNames(req, res, next) {
    const { firstName, lastName } = req.body;
    console.log(req.body);
    
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First Name and Last Name are required.' });
    }
    const nameRegex = /^[A-Z][a-z]*$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).json({ error: 'First Name and Last Name must start with an uppercase letter.' });
    }
    next();
}

function validatePassword(req, res, next) {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long, with at least one uppercase letter, one numeric character, and one special character.' });
    }
    next();
}

function validateEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }
    next();
}

function validatePhoneNumber(req, res, next) {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone Number is required.' });
    }
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ error: 'Phone Number must be at least 10 digits long.' });
    }
    next();
}
app.use(validateNames);
app.use(validatePassword);
app.use(validateEmail);
app.use(validatePhoneNumber);
 
app.post('/register', (req, res) => {
    const { firstName, lastName, password, email, phoneNumber } = req.body;
    res.status(200).json({
        message: 'Registration successful',
        user: {
            firstName,
            lastName,
            email,
            phoneNumber,
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});