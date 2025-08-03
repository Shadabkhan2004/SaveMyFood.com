// utils/runCron.js
const PantryItem = require("../models/pantryItem");
const sendEmail = require("../utils/email");
const { reminderTemplate, expiredTemplate } = require("../utils/emailTemplate");
const logger = require("../logger");

async function runPantryCleanup() {
  logger.info("🔔 Running pantry check via manual trigger...");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const items = await PantryItem.find().populate("userId");

    for (const item of items) {
      if (!item.userId) {
        logger.warn(`Item "${item.name}" has no user attached, skipping`);
        continue;
      }

      const expiry = new Date(item.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      const lastNotified = item.lastNotificationDate
        ? new Date(item.lastNotificationDate).toDateString()
        : null;

      logger.info(
        `🔹 Checking "${item.name}" for ${item.userId.name} | Days left: ${daysLeft} | Last notified: ${lastNotified}`
      );

      // Reminder emails (3, 2, 1 days left)
      if (daysLeft <= 3 && daysLeft >= 0 && lastNotified !== today.toDateString()) {
        await sendEmail(
          item.userId.email,
          `Pantry Alert: ${item.name} expires in ${daysLeft} day(s)`,
          reminderTemplate(item.userId.name, item.name, daysLeft)
        );

        logger.info(`✅ Reminder email sent to ${item.userId.email} for "${item.name}"`);
        item.lastNotificationDate = today;
        await item.save();
      }

      // Expired items
      if (daysLeft < 0) {
        await sendEmail(
          item.userId.email,
          `Pantry Alert: ${item.name} expired`,
          expiredTemplate(item.userId.name, item.name)
        );

        logger.info(`❌ "${item.name}" expired and removed from DB`);
        await PantryItem.findByIdAndDelete(item._id);
      }
    }
  } catch (err) {
    logger.error(`❌ Error in cron job: ${err.message}`);
  }
}

module.exports = runPantryCleanup;
