const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');


router.post('/register',  usersCtrl.signup);
router.get('/', usersCtrl.getall);
router.post('/login', usersCtrl.login)

module.exports = router;