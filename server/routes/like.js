const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");

router.post("/posts/:id/likes", likeCtrl.likePost);
router.get("/likes/:userId", likeCtrl.getallLikes);

module.exports = router;
