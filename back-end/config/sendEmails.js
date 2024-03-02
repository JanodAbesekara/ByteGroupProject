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
      html: `Please verify your email by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`,
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
      from:  process.env.SENDeMAIL,
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
