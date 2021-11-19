const express = require('express');
const router = express();
const usersCtrl = require('../controllers/user')


router.get('/api/auth',  usersCtrl.signup);

module.exports = router;