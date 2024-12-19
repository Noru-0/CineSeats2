const express = require("express");
const router = express.Router();
const { renderGeneral, renderDetail, renderMembership, renderSetting, renderVoucher, renderHistory, getAccountInfo } = require("./account.controllers");

// Routes for rendering pages
router.get("/profile", getAccountInfo);
router.get("/general", renderGeneral);
router.get("/membership", renderMembership);
router.get("/setting", renderSetting);
router.get("/voucher", renderVoucher);
router.get("/history", renderHistory);

module.exports = router;
