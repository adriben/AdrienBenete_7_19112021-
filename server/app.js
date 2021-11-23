const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user')


const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

//db conection
require('./database/connection');

app.use('/api/auth', userRoutes);

app.listen(5000, () => {
    console.log('connected on port 5000');
})
