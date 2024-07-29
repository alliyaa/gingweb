require('dotenv').config({ path: 'f.env' });
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const process = require('process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Debugging lines to check environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: 'gmail', // Make sure the service name is lowercase
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for joining the waitlist!',
    text: 'You have been successfully added to the waitlist for The Gingy App!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New waitlist subscription',
    text: `New subscription from: ${email}`
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Admin email sent: ' + info.response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
