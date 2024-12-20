const express = require("express");
const router = express.Router();
const { renderAccount, renderDashBoard, renderTheater, renderMovie, deleteUser, blockUser, unblockUser, getFilteredAndSortedUsers, createMovie, updateMovie, deleteMovie, getFilteredAndSortedMovies } = require("./admin.controllers");

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

// API support movie management
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);
router.get('/movies', getFilteredAndSortedMovies);

module.exports = router;