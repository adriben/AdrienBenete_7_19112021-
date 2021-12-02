const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');



router.post('/:id/likes', likeCtrl.likePost)

module.exports = router;