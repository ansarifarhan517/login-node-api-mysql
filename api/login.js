const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.post('/', (req, res) => {
    const userName = req.body.username;
    // const passWord = req.body.password;

    const query = `SELECT * FROM register WHERE username = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query,userName, (err, results) => {
        if (err) res.status(400).json(err);
        else if (results.length > 0) {
            res.status(500).json('Record Already exist');
        }
        else {
            const query2 = `INSERT INTO register SET ?;`;
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'mysql_node_farhan'
            });
            connection.connect();
            connection.query(query2,req.body, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    res.json(results[0]);
                }
            })
        }
    })
})


module.exports = router;