const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')

router.post('/', multer, postCtrl.create );
router.get('/', postCtrl.showAllPosts );
router.delete('/:id', postCtrl.deletePost);
router.put('/', postCtrl.updateOnePost);
router.get('/:id', postCtrl.showOnePost)
router.put('/:id/likes', postCtrl.likePost)

module.exports = router;