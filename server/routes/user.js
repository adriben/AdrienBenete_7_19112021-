const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/register", usersCtrl.signup);
router.get("/", usersCtrl.getall);
router.post("/login", usersCtrl.login);
router.put("/userInfo", auth, multer, usersCtrl.changeInfo);
router.get("/userInfo/:id", usersCtrl.getOneUser);
router.delete("/userInfo/:id", auth, usersCtrl.deleteAccount);

module.exports = router;
