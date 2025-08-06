const express = require("express");
const router = express.Router();
const runPantryCleanup = require("../utils/runPantryCleanup");

router.get("/run", async (req, res) => {
  try {
    const result = await runPantryCleanup();
    // Only send a concise summary
    res.status(200).json({
      success: true,
      message: "Cleanup complete",
      expiredItemsRemoved: result.expiredCount,
      reminderEmailsSent: result.reminderCount,
      emailFailures: result.emailFailures // add this for completeness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error executing cleanup job",
      error: error.message
    });
  }
});

module.exports = router;
