const nodemailer = require('nodemailer');
require('dotenv').config();

// Fix: use createTransport, not createTransporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Reduce connection logging
  logger: false,
  debug: false,
});

async function sendEmail(to, subject, html) {
  try {
    const text = html.replace(/<[^>]*>?/gm, '');

    const result = await transporter.sendMail({
      from: `"Pantry App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    // Only return essential info, don't log the full result
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    // Log only essential error info
    console.error(`Email failed to ${to}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;