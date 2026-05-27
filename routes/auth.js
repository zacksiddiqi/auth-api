const express = require('express');
const router = express.Router();
const pool = require('../db');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /auth/register

router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ error: 'Username, email and password are required'});

    try{
        //check if user already exist
        const [existing] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]            
        );
        if (existing.length > 0)
            return res.status(409).json({ error: 'Username or email is already taken'});


        const hashedPassword = await bycrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?,?,?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', id: result.insertId});
    }
    catch (err){
        res.status(500).json({ error: err.message});
    }
});

//POST /auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({error: 'Email and password are required'});
    try{
        //find the user 
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if(rows.length === 0)
            return res.status(401).json({error: 'Invalid Credentials'});

        const user = rows[0];

        //compare password with hash 
        const match = await bycrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({error: 'Invalid credentials'});

        //Generete JWT token 
        const token = jwt.sign(
            { id: user.id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );

        res.json({message: 'Login successful', token});
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;