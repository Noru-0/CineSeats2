const express = require("express");
const router = express.Router();
const homeController = require("./controller");

// Routes for rendering pages
router.get("/", homeController.renderMovieList);

module.exports = router;