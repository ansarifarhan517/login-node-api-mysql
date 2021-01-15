const express = require('express');
const port = process.env.port || 3000;
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome To Fisrt Page')
});

app.use(auth)

app.use('/api/account', require('./api/account'))



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})