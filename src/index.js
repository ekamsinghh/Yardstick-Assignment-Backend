const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db_config.js');
const apiRoutes = require('./routes/index.js');
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server Configured Successfully');
});

app.use('/api', apiRoutes);
app.listen(PORT, () => {
    console.log(`Server in running on Port: ${PORT}`);
    connectDB();
});