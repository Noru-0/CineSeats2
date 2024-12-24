const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const { renderGeneral, renderMembership, renderSetting, renderVoucher, renderHistory, getAccountInfo, updateAccountInfo, updateProfilePicture, uploadProfilePicture } = require("./account.controllers");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../public/images/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/uploads/')); // Store files in the correct directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamp to avoid filename conflicts
    }
});
const upload = multer({ storage });

// Serve static files from the 'public' directory so they can be accessed publicly via URL
router.use("/uploads", express.static(path.join(__dirname, '../../public/images/uploads')));

// Routes for rendering pages
router.get("/general", renderGeneral);
router.get("/membership", renderMembership);
router.get("/setting", renderSetting);
router.get("/voucher", renderVoucher);
router.get("/history", renderHistory);

router.get("/info", getAccountInfo);
router.post("/update", updateAccountInfo);
router.post("/update-picture", upload.single('avatar_url'), updateProfilePicture);
router.post("/upload-picture", upload.single('avatar_url'), uploadProfilePicture);

module.exports = router;
