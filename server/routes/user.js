const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');


router.post('/register',  usersCtrl.signup);
router.get('/', usersCtrl.getall);
router.get('/login', usersCtrl.login)

module.exports = router;