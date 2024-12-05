const express = require("express");
const router = express.Router();
const searchController = require("./search.controller");

// Routes for rendering pages
router.get("/", searchController.renderMovieList);
router.get("/showing", searchController.renderShowingMovieList);
router.get("/upcoming", searchController.renderUpcomingMovieList);
module.exports = router;