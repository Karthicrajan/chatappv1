const { createMsg, fetchMessage } = require('../controllers/messagecontroller');

const router = require('express').Router();
router.post("/createmessage", createMsg);
router.get("/fetchmessage", fetchMessage);
// router.get("/fetch", fetchChat);
module.exports = router;