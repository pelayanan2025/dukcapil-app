const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

sequelize.sync({ alter: true })
    .then(() => console.log('Database Connected & Synced!'))
    .catch((err) => console.log('Error Database: ', err));

app.get('/', (req, res) => res.send('API DUKCAPIL Berjalan Lancar'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));