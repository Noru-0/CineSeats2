const renderAccount = async (req, res) => {
    try {
        res.render("admin/account");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderDashBoard = async (req, res) => {
    try {
        res.render("admin/dashboard");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderTheater = async (req, res) => {
    try {
        res.render("admin/theater");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderMovie = async (req, res) => {
    try {
        res.render("admin/movie");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

module.exports = {
    renderAccount, renderDashBoard, renderTheater, renderMovie
}