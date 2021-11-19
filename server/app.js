const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const db = require('./models');
const userRoutes = require('./routes/user')

dotenv.config()
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());


db.sequelize.sync().then((req))

app.get('/api/auth', userRoutes);

app.listen(5000, () => {
    console.log('connected on port 5000');
})
