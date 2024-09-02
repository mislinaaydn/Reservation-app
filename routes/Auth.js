const { register, login } = require("../controllers/Auth.js");
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
