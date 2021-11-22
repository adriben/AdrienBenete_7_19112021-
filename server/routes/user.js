const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user')


router.get('/api/auth',  usersCtrl.signup);

module.exports = router;