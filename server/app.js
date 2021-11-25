const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment')
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
//path to the folder where to stock files entering the application
app.use('/images', express.static(path.join(__dirname, 'images'))); 
//db conection
require('./database/connection');
//ROUTES
app.use('/api/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comment', commentRoutes);

module.exports = app;
