const express = require("express");
const runPantryCleanup = require("../utils/runPantryCleanup");
const router = express.Router();

// Manual trigger: GET /api/cron/run
router.get("/run", async (req, res) => {
  await runPantryCleanup();
  res.json({ success: true, message: "Cron job executed manually." });
});

module.exports = router;
