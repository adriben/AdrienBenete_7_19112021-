const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')

router.post('/register',  usersCtrl.signup);
router.get('/', usersCtrl.getall);
router.post('/login', usersCtrl.login);
router.put('/userInfo', multer, usersCtrl.changeInfo);
router.get('/userInfo/:id', usersCtrl.getOneUser);
router.delete('/userInfo/:id', usersCtrl.deleteAccount)

module.exports = router;