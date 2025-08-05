const PantryItem = require("../models/pantryItem");
const sendEmail = require("./email");
const {reminderTemplate,expiredTemplate} = require("./emailTemplate");

module.exports = async function runPantryCleanup() {
  let expiredCount = 0;
  let reminderCount = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = await PantryItem.find().populate("userId");

  for (const item of items) {
    if (!item.userId) continue;

    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    const lastNotified = item.lastNotificationDate
      ? new Date(item.lastNotificationDate).toDateString()
      : null;

    // --- Reminder emails (3, 2, 1 days left) ---
    if (
      daysLeft <= 3 &&
      daysLeft >= 0 &&
      lastNotified !== today.toDateString()
    ) {
      await sendEmail(
        item.userId.email,
        `Pantry Alert: ${item.name} expires in ${daysLeft} day(s)`,
        reminderTemplate(item.userId.name, item.name, daysLeft)
      );

      item.lastNotificationDate = today;
      await item.save();
      reminderCount++;
    }

    // --- Expired items ---
    if (daysLeft < 0) {
      await sendEmail(
        item.userId.email,
        `Pantry Alert: ${item.name} expired`,
        expiredTemplate(item.userId.name, item.name)
      );

      await PantryItem.findByIdAndDelete(item._id);
      expiredCount++;
    }
  }

  return { expiredCount, reminderCount };
};
