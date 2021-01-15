const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let query = 'SELECT * FROM register WHERE username = ?';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query, [username], (err, results) => {
        if (err) res.status(400).json(err);
        else if (results.length > 0) {
            //email already exist
            res.status(500).json('Record Already exist');
        }
        else {
            query = `INSERT INTO register SET ?;`;

            connection.query(query, [username, password], (err, results) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    const body = data;
                    body.id = results.insertId;
                    res.status(201).json(results[0]);
                    location.href('login.html')
                }
            })
        }
    });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = 'SELECT * FROM register WHERE username = ? AND password = ?';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json(results[0]);
        if (results.length > 0) {
            const secretKey = 'farhan123';
            const payload = {
                id: results[0].id,
                username: results[0].username
            }
            const options = {
                expiresIn: 3600
            };
            jwt.sign(payload, secretKey, options, (err, token) => {
                if (err) {
                    res.status(500).json(err);
                }
                res.json({ token })
            })
        }
        else {
            res.status(404).json();
        }
    });


});


module.exports = router;