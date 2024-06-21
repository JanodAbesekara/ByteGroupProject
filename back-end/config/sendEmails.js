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
      <title>Verify Email!</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
        }
    
        h2 {
          text-align: center;
          color: blue;
        }
    
        .HQ {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
    
        button {
          color: white;
          background-color: green;
          border: none;
          padding: 10px 20px;
          box-shadow: 1px 1px 4px 0.5px black;
          cursor: pointer;
          font-size: 16px;
          text-decoration: none;
        }
    
        a:visited button {
          color: yellow;
          background-color: blue;
        }
      </style>
    </head>
    <body>
      <h2>Click the button to Verify your account</h2>
      <div class="HQ">
      <a href="${link}"> <button>Verify</button></a>
      </div>
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
      html: `Please reset your password by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`,
    });
  } catch (e) {
    error = true;
  }

  return error;
};

export { sendVerificationEmail, sendForgotPasswordEmail };
