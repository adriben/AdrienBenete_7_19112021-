const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.post('/', postCtrl.create );
router.get('/', postCtrl.showAllPosts );
router.delete('/', postCtrl.deletePost);
router.put('/', postCtrl.updateOnePost);
router.get('/:id', postCtrl.showOnePost)

module.exports = router;