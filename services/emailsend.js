const nodemailer = require('nodemailer');
require('dotenv').config();


function sendemail(verificationCode, email, name) {


  const emailTemplate = `
  <html>
    <head>
      <style>
        /* Add your CSS styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
          margin-top: 0;
        }
        p {
          color: #666666;
        }
        .verification-code {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Hi ${name},</p>
        <p>Thank you for signing up!</p>
        <p>Your verification code is:</p>
        <p class="verification-code">${verificationCode}</p>
        <p>Please enter this code in the verification form to complete your registration.</p>
      </div>
    </body>
  </html>
`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.senderEmail, // Your Gmail address
      pass: process.env.senderEmailPassword   // Your Gmail password or App Password (see below)
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.senderEmail,     // Sender's email address
    to: email,      // Recipient's email address
    subject: 'Code for Url Shortner',  // Email subject
    html: emailTemplate
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
module.exports = { sendemail };