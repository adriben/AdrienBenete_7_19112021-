const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like')
const commentRoutes = require('./routes/comment')
// const commentRoutes = require('./routes/comment')
const db = require('./models')
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
//path to the folder where to stock files entering the application
app.use('/images', express.static(path.join(__dirname, 'images'))); 
// db conection
db.sequelize
	.authenticate()
	.then(() => {
		console.log("Successfully Connected to DB");
	})
	.catch((error) => {
		console.log("Unable to connect to DB: ", error);
	});
//ROUTES
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);


module.exports = app;

