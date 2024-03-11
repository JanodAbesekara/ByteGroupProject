import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
        user: 'dreamlearnacdemt@gmail.com',
        pass: 'winceryyoqorlguy'
    }
});

const sendVerificationEmail = async (senderAddress, link) => {
    let error = false;

    try {
        await transporter.sendMail({
            from: 'dreamlearnacdemt@gmail.com',
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
            from: 'dreamlearnacdemt@gmail.com',
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
