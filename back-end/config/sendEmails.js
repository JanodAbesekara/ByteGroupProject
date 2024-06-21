import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.EMAILPORT,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.SENDeMAIL,
    pass: process.env.SENDMAILPASSWORD,
  },
});

const sendVerificationEmail = async (senderAddress, link) => {
  let error = false;

  try {
    await transporter.sendMail({
      from: process.env.SENDeMAIL,
      to: senderAddress,
      subject: "Verify Email",
      html: `
      
  <p>Click the link below to verify your email address.</p>
    <a href="${link}"> <img src="https://p7.hiclipart.com/preview/867/950/447/computer-icons-email-icloud-email.jpg"/> </a>
   
      `,
    });
  } catch (e) {
    error = true;
  }

  return error;
};

const sendForgotPasswordEmail = async (senderAddress, link) => {
  let error = false;

  try {
    await transporter.sendMail({
      from: process.env.SENDeMAIL,
      to: senderAddress,
      subject: "Reset Password",
      html: `Please reset your password by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`,
    });
  } catch (e) {
    error = true;
  }

  return error;
};

export { sendVerificationEmail, sendForgotPasswordEmail };
