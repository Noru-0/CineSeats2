const express = require("express");
const router = express.Router();
const {renderAccount, renderDashBoard, renderTheater, renderMovie} = require("./admin.controllers");

// Routes for rendering pages
router.get("/dashboard", renderDashBoard);
router.get("/account", renderAccount);
router.get("/theater", renderTheater);
router.get("/movie", renderMovie);

module.exports = router;