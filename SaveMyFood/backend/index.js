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
const cronRouter = require("./routes/cron");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/pantry',pantryMiddleware,pantryRouter);

app.use("/api/cron", cronRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});


