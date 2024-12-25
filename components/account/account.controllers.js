const { getUserData, updateUserData } = require('./account.model');

const renderGeneral = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    res.render("account/general");
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Error loading dashboard.");
  }
}

const renderMembership = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    res.render("account/membership");
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Error loading dashboard.");
  }
}

const renderSetting = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    res.render("account/setting");
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Error loading dashboard.");
  }
}

const renderVoucher = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    res.render("account/voucher");
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Error loading dashboard.");
  }
}

const renderHistory = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    res.render("account/history");
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Error loading dashboard.");
  }
}

// Get user account info
const getAccountInfo = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    const userId = req.user._id;
    const userData = await getUserData(userId);
    res.json(userData);
  } catch (error) {
    res.status(500).send('Error fetching user data');
  }
};

// Update user account info
const updateAccountInfo = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    const userId = req.user._id;
    const updatedData = req.body;

    // Update user data in the database
    const updatedUser = await updateUserData(userId, updatedData);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Error updating user data" });
  }
};

// Update profile picture
const updateProfilePicture = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    const userId = req.user._id;
    const avatar_url = req.file.path; // Assuming middleware like multer is handling file upload
    console.log("Profile picture uploaded:", avatar_url);

    // Update profile picture in the database
    const updatedUser = await updateUserData(userId, { avatar_url });
    console.log("Profile picture updated:", updatedUser.avatar_url);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Error updating profile picture" });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    // Retrieve the uploaded file's URL from Cloudinary
    const avatarUrl = req.file.path;

    // Update the user's avatar URL in your database
    const updatedUser = await updateUserData(req.user._id, { avatar_url: avatarUrl });

    res.json({ avatar_url: updatedUser.avatar_url });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
};

module.exports = {
  renderGeneral, renderMembership, renderVoucher, renderSetting, renderHistory, getAccountInfo, updateAccountInfo, updateProfilePicture, uploadProfilePicture
}
