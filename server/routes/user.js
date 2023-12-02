const router = require('express').Router();
const { registerUser, loginUser, allUser } = require('../controllers/usercontroller');
const { protect } = require('../middlerware/authMiddleware');
const User = require("../model/user");
const bcrypt = require("bcrypt")
const saltRounds = 10;

router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/", protect, allUser);
module.exports = router