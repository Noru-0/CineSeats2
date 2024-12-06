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

module.exports = {
    renderGeneral, renderMembership, renderVoucher, renderSetting, renderHistory
}