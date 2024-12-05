const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller");

router.get("/", profileController.renderProfile);
module.exports = router;