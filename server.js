const express = require('express');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.get('/', function (req, res) {
    res.send('Hi, there.');
})

app.listen(PORT, () => {
    console.log('server is on');
})

