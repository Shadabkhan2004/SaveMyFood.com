const express = require('express');
require('dotenv').config();
require('./connections/connection');
const cors = require('cors');

const authRouter = require('./routes/auth');
const pantryRouter = require('./routes/pantry');
const { pantryMiddleware } = require('./middlewares/pantryMiddleware');
const cronRouter = require('./routes/cron');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/pantry', pantryMiddleware, pantryRouter);
app.use('/api/cron', cronRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
