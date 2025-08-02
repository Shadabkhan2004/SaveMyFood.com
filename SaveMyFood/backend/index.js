const express = require('express');
require('dotenv').config();
require('./connections/connection');
const cors = require('cors');
const cron = require('node-cron');

const authRouter = require('./routes/auth');
const pantryRouter = require('./routes/pantry');
const {pantryMiddleware} = require('./middlewares/pantryMiddleware');
const sendEmail = require('./utils/email');
const PantryItem = require('./models/pantryItem');
const { reminderTemplate, expiredTemplate } = require("./utils/emailTemplate");
const logger = require('./logger');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/pantry',pantryMiddleware,pantryRouter);

// Runs every day at 9 AM


cron.schedule("0 9 * * *", async () => {
  logger.info("🔔 Running daily pantry check at 9 AM...");

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

      // --- Reminder emails (3, 2, 1 days left) ---
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

      // --- Expired items ---
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
});


app.listen(process.env.PORT,() => {
  console.log(`Server is running at ${process.env.PORT}`);
})

