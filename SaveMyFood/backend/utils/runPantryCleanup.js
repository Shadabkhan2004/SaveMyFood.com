const PantryItem = require("../models/pantryItem");
const { sendEmail } = require("../utils/email");
const { reminderTemplate, expiredTemplate } = require("../utils/emailTemplate");

async function runPantryCleanup() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get only needed fields for performance
  const items = await PantryItem.find({}, "name expiryDate userId lastNotificationDate")
    .populate("userId", "name email");

  const expiredItems = [];
  const reminders = [];

  for (const item of items) {
    if (!item.userId) continue;

    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    const lastNotified = item.lastNotificationDate
      ? new Date(item.lastNotificationDate).toDateString()
      : null;

    // Reminder (3,2,1 days left)
    if (daysLeft <= 3 && daysLeft >= 0 && lastNotified !== today.toDateString()) {
      reminders.push({
        email: item.userId.email,
        subject: `Pantry Alert: ${item.name} expires in ${daysLeft} day(s)`,
        html: reminderTemplate(item.userId.name, item.name, daysLeft),
      });

      item.lastNotificationDate = today;
      await item.save();
    }

    // Expired items
    if (daysLeft < 0) {
      expiredItems.push(item._id);
      reminders.push({
        email: item.userId.email,
        subject: `Pantry Alert: ${item.name} expired`,
        html: expiredTemplate(item.userId.name, item.name),
      });
    }
  }

  // Delete expired items in one go
  if (expiredItems.length > 0) {
    await PantryItem.deleteMany({ _id: { $in: expiredItems } });
  }

  // Send emails asynchronously (not blocking response)
  reminders.forEach((mail) => {
    sendEmail(mail.email, mail.subject, mail.html).catch(console.error);
  });

  return {
    expiredCount: expiredItems.length,
    reminderCount: reminders.length,
  };
}

module.exports = runPantryCleanup;
