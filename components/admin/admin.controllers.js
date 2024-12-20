const { User } = require("../account/account.model");
const Movie = require("../movies/movies.model");
const mongoose = require("mongoose");

// Render Pages
// Render trang quản lý tài khoản
const renderAccount = async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng
        const filteredUsers = users.map(user => ({
            _id: user.id,
            name: user.username,
            email: user.email,
            role: user.role,
            phone: user.phone,
            status: user.status
        }));
        res.render("admin/account", { users: filteredUsers }); // Trả về trang quản lý tài khoản với danh sách người dùng
    } catch (error) {
        console.error("Error loading account management page:", error);
        res.status(500).send("Error loading account management page.");
    }
};

// Render trang dashboard
const renderDashBoard = async (req, res) => {
    try {
        res.render("admin/dashboard");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
};

// Render trang theater
const renderTheater = async (req, res) => {
    try {
        res.render("admin/theater");
    } catch (error) {
        console.error("Error loading theater page:", error);
        res.status(500).send("Error loading theater page.");
    }
};

// Render trang movie
const renderMovie = async (req, res) => {
    try {
        // Lấy tất cả phim
        const movies = await Movie.find();
        const movieData = movies.map(movie => ({
            id: movie.id,
            name: movie.name_vn,
            genre: movie.type_name_en.join(", "), // Join genres with a comma
            country: movie.country_name_en,
            price: movie.price || "N/A", // Default to "N/A" if price is not available
            totalPurchases: movie.totalPurchases || 0, // Default to 0 if totalPurchase is not available
            releasedTime: movie.release_date instanceof Date ? movie.release_date.toLocaleDateString() : "Unknown", // Release date
        }));

        res.render("admin/movie", { movies: movieData });
    } catch (error) {
        console.error("Error loading movie page:", error);
        res.status(500).send("Error loading movie page.");
    }
};


// Users management
// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get the UUID from the request parameters

        // Delete the user by the "id" field
        const result = await User.deleteOne({ id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Cấm người dùng
const blockUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get the UUID from the request parameters

        // Find the user by the "id" field
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's status to "blocked"
        user.status = 'blocked';
        await user.save();

        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mở cấm người dùng
const unblockUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get the UUID from the request parameters

        // Find the user by the "id" field
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's status to "active"
        user.status = 'active';
        await user.save();

        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
        console.error("Error unblocking user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Lấy danh sách người dùng đã lọc và sắp xếp
const getFilteredAndSortedUsers = async (req, res) => {
    try {
        const { username, email, sortBy, sortOrder, role } = req.query;

        // Build query filters
        const filter = {};
        if (username) filter.username = new RegExp(username, 'i'); // Search username
        if (email) filter.email = new RegExp(email, 'i');
        if (role && role !== "all") filter.role = role;

        // Build sorting options
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "desc" ? -1 : 1;
        }

        // Fetch users from the database
        const users = await User.find(filter).sort(sort);

        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Movies Management
// Helper function to get filtered and sorted movies
const getFilteredAndSortedMovies = async (req, res) => {
    try {
        const { name, genre, country, sortBy, sortOrder } = req.query;
        // Build filter query
        const filter = {};
        if (name) filter.name_vn = new RegExp(name, 'i'); // Case-insensitive search
        if (genre && genre !== "all") filter.type_name_en = genre;
        if (country && country !== "all") filter.country_name_en = country;

        // Build sort options
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "desc" ? -1 : 1;
        }

        // Fetch movies from the database
        const movies = await Movie.find(filter).sort(sort);

        res.status(200).json({ movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie({
            ...req.body,
            _id: new mongoose.Types.ObjectId(),
            id: new mongoose.Types.ObjectId().toString(),
        });
        await newMovie.save();
        res.status(201).json({ message: 'Movie created successfully.', movie: newMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating movie.' });
    }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id; // Lấy giá trị `id` từ request params
        // Tìm kiếm bằng trường `id`
        const movie = await Movie.findOne({ id: movieId });
        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        res.json(movie); // Trả về kết quả
    } catch (error) {
        console.error(error); // Ghi log lỗi
        res.status(500).send({ message: "Error fetching movie details" });
    }
};

// Update a movie
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findOneAndUpdate({ id: id }, req.body, { new: true }); // Sử dụng id thay vì _id
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie updated successfully.", movie: updatedMovie });
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "Error updating movie." });
    }
};

// Delete a movie
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findOneAndDelete({ id: id }); // Sử dụng id thay vì _id
        if (!deletedMovie) return res.status(404).json({ error: 'Movie not found.' });
        res.status(200).json({ message: 'Movie deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting movie.' });
    }
};

module.exports = {
    //render
    renderAccount,
    renderDashBoard,
    renderTheater,
    renderMovie,
    //user
    deleteUser,
    blockUser,
    unblockUser,
    getFilteredAndSortedUsers,
    //movie
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    getFilteredAndSortedMovies
};
