const PantryItem = require("../models/pantryItem");
const sendEmail = require("./email");
const {reminderTemplate, expiredTemplate} = require("./emailTemplate");

// Add delay between emails to avoid overwhelming the email service
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async function runPantryCleanup() {
  let expiredCount = 0;
  let reminderCount = 0;
  let emailFailures = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // More efficient query - only get items that need attention
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + 3);
    
    const items = await PantryItem.find({
      expiryDate: { $lte: cutoffDate }
    }).populate("userId");

    console.log(`Processing ${items.length} items`);

    for (const item of items) {
      if (!item.userId) continue;

      const expiry = new Date(item.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      const lastNotified = item.lastNotificationDate
        ? new Date(item.lastNotificationDate).toDateString()
        : null;

      // --- Reminder emails (3, 2, 1 days left) ---
      if (daysLeft <= 3 && daysLeft >= 0 && lastNotified !== today.toDateString()) {
        const emailResult = await sendEmail(
          item.userId.email,
          `Pantry Alert: ${item.name} expires in ${daysLeft} day(s)`,
          reminderTemplate(item.userId.name, item.name, daysLeft)
        );

        if (emailResult.success) {
          item.lastNotificationDate = today;
          await item.save();
          reminderCount++;
        } else {
          emailFailures++;
        }

        // Small delay to avoid overwhelming email service
        await delay(100);
      }

      // --- Expired items ---
      if (daysLeft < 0) {
        const emailResult = await sendEmail(
          item.userId.email,
          `Pantry Alert: ${item.name} expired`,
          expiredTemplate(item.userId.name, item.name)
        );

        if (emailResult.success) {
          await PantryItem.findByIdAndDelete(item._id);
          expiredCount++;
        } else {
          emailFailures++;
        }

        await delay(100);
      }
    }

    // Single line summary output
    const summary = { expiredCount, reminderCount, emailFailures };
    console.log(`Summary: ${JSON.stringify(summary)}`);
    
    return summary; // Only return summary, not items

  } catch (error) {
    console.error('Cleanup failed:', error.message);
    throw error;
  }
};