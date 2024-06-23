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
         
        </head>
        <style>
        h2{
          text-align: center;
          color: blue;
        }
          .HQ{
            justify-content: center;
            align-content: center;
            display: flex;
          }
          button{
            color: white;
            background-color: green;
            border: none;
            padding: 4px 8px;
            box-shadow: 1px 1px 4px 0.5px black;
            cursor: pointer;
          }
          button:visite{
            color:yellow;
            background-color: blue;
          }
        </style>
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
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reset Your password</title>
         
        </head>
        <body>
          <h2 style="text-align:center;color:blue">Click to Reset your Password</h2>
          <div class="HQ" style="justify-content:center; align-content:center;display:flex;">
          <p style="text-align:center;"> Click the   <a href="${link}" style="background-color:green;color:white;text-decoration:none;padding:4px 10px">
                  Reset
                    </a> to Reset Your password</p> 
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

export { sendVerificationEmail, sendForgotPasswordEmail };
