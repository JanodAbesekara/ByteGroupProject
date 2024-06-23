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
      <!DOCTYPE html>
      <html>
        <head>
          <title>Verify Your Account</title>
         
        </head>
        <body>
          <h2 style="text-align:center;color:blue">Click to Verify your Account</h2>
         
          
           <p style="text-align:center;font-size:15px">  <a href="${link}" style="background-color:green; color:white; text-decoration:none; padding:5px 10px; border-radius:20px;  box-shadow: 1px 1px 5px 0.4px black;">
           Verify</a></p> 
        </body>
      </html>
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
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reset Your password</title>
         
        </head>
        <body>
          <h2 style="text-align:center;color:blue">Click to Reset your Password</h2>
         
          <p style="text-align:center;font-size:15px"> <a href="${link}" style="background-color:green; color:white; text-decoration:none; padding:5px 10px; border-radius:20px;  box-shadow: 1px 1px 5px 0.4px black;">
                  Reset
                    </a></p> 
        
        </body>
      </html>
      `,
    });
  } catch (e) {
    error = true;
  }

  return error;
};

export { sendVerificationEmail, sendForgotPasswordEmail };
