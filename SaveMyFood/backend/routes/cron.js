const express = require("express");
const router = express.Router();
const runPantryCleanup = require("../utils/runPantryCleanup");

router.get("/run", async (req, res) => {
  try {
    const result = await runPantryCleanup();

    res.status(200).send(
      `Cleanup complete: ${result.expiredCount} expired items removed, ${result.reminderCount} emails sent`
    );
  } catch (err) {
    console.error("Cron Error:", err.message);
    res.status(500).send("Cleanup failed");
  }
});

module.exports = router;
