const express = require("express");
const router = express.Router();
const { renderAccount, renderDashBoard, renderTheater, renderMovie, deleteUser, blockUser, unblockUser, getFilteredAndSortedUsers } = require("./admin.controllers");

// Routes for rendering pages
router.get("/dashboard", renderDashBoard);
router.get("/account", renderAccount);
router.get("/theater", renderTheater);
router.get("/movie", renderMovie);

// API support account management
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/block', blockUser);
router.patch('/users/:id/unblock', unblockUser);
router.get('/users', getFilteredAndSortedUsers);

module.exports = router;