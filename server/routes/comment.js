const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/posts/:id/comment', commentCtrl.createComment);
router.get('/posts/:id/comment', commentCtrl.getComment);
router.delete('/posts/:id/comment', commentCtrl.deleteComment);


module.exports = router;