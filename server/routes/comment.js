const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/posts/:id/comment", auth, commentCtrl.createComment);
router.get("/posts/:id/comment", commentCtrl.getComment);
router.delete("/posts/:id/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
