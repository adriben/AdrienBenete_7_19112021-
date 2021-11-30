const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')

router.post('/', multer, postCtrl.create );
router.get('/', postCtrl.showAllPosts );
router.delete('/', postCtrl.deletePost);
router.put('/', postCtrl.updateOnePost);
router.get('/:id', postCtrl.showOnePost)

module.exports = router;