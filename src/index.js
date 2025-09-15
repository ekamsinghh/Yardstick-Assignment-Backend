const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db_config.js');
const apiRoutes = require('./routes/index.js');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Server Configured Successfully');
});

app.use('/api', apiRoutes);

module.exports = app;