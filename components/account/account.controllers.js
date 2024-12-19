const { getUserData } = require('./account.model');

const renderGeneral = async (req, res) => {
    try {
        res.render("account/general");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderMembership = async (req, res) => {
    try {
        res.render("account/membership");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderSetting = async (req, res) => {
    try {
        res.render("account/setting");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderVoucher = async (req, res) => {
    try {
        res.render("account/voucher");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const renderHistory = async (req, res) => {
    try {
        res.render("account/history");
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard.");
    }
}

const getAccountInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await getUserData(userId);
        res.render('general', { user: userData });
    } catch (error) {
        res.status(500).send('Error fetching user data');
    }
};


module.exports = {
    renderGeneral, renderMembership, renderVoucher, renderSetting, renderHistory, getAccountInfo
}