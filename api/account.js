const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let query = `SELECT * FROM users WHERE username = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sisapi_db'
    });
    connection.connect();
    connection.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else if (results.length > 0) {
            //email already exist
            res.status(500).json('Record Already exist');
        } else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                    res.status(500).json(err);
                } else {
                    const data = {
                        username: username,
                        password: hash
                    }

                    const query2 = `INSERT INTO users SET ?;`;
                    console.log(data);
                    connection.query(query2, data, (err, results) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            console.log(results);
                            const body = [data];
                            body.id = results.insertId;
                            res.status(201).json(body);
                        }
                    });
                }
            });


        }
    });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = 'SELECT * FROM users WHERE username = ?';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sisapi_db'
    });
    connection.connect();
    connection.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else if (results.length > 0) {

            // const user = results[0].username;
            const passwordHash = results[0].password;
            bcrypt.compare(password, passwordHash, (err, bcryptResults) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    if (bcryptResults) {
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
                            res.status(200).json({ payload, token });
                        });

                    } else {
                        res.status(401).json();
                    }
                }
            });

        } else {
            res.status(401).json();
        }
    });


});

router.post('/authorized', (req, res) => {

    res.json({
        authorization: true
    })
});


module.exports = router;