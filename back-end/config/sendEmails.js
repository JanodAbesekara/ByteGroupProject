import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'jaime.damore32@ethereal.email',
        pass: 'EGbq814X2FHG26ESZ2'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendVerificationEmail = async (senderAddress, link) => {
    let error = false;

    try {
        await transporter.sendMail({
            from: '"Fullyworld test account 👻" <fullyworld@gmail.com>', // sender address
            to:senderAddress, // list of receivers
            subject: "Verify Email", // Subject line
            html: `Please verify your email by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`, // html body
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
            from: '"Fullyworld test account 👻" <fullyworld@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "Reset Password", // Subject line
            html: `Please reset your password by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`, // html body
        });
    } catch (e) {
        error = true;
    }

    return error;
};

export { sendVerificationEmail, sendForgotPasswordEmail };

