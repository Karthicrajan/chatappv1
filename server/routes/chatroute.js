const { accesschat, fetchChat } = require('../controllers/accesschat');

const router = require('express').Router();
module.exports = router
router.post("/accesschat",accesschat);
router.get("/fetch", fetchChat);
module.exports = router;