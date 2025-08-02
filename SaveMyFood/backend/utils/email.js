const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

async function sendEmail(to, subject, html) {
  const text = html.replace(/<[^>]*>?/gm, ''); 

  await transporter.sendMail({
    from: `"Pantry App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text, // fallback
    html, // main content
  });
}

module.exports = sendEmail;
