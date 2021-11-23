const Sequelize = require('sequelize');
require('dotenv').config()

const db = new Sequelize('socialnetwork', 'root', 'mysqlwebdopenclassroom17', 
{ 
  host: 'localhost', 
  dialect: 'mysql',
  })

db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err) )

module.exports = db;
