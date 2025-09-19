import nodemailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import dotenv from 'dotenv';

dotenv.config();

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_APP_PASSWORD
    }
});

transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

// Define the email sending function
const sendEmail = async (to, subject, text, ccList = [], bccList = [], attachments = []) => {
    const mailOptions = {
        from: process.env.AUTH_USER_EMAIL,
        to: to,
        subject: subject,
        cc: ccList,
        bcc: bccList,
        html: text.replace(/<br\s*[\/]?>/gi, '\n'),
        attachments: attachments
    };
    console.log(mailOptions, "mailoptions");

    try {
        await validateEmailCredentials(process.env.AUTH_USER_EMAIL,process.env.AUTH_USER_APP_PASSWORD)
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
};

const validateEmailCredentials = async (email, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password,
        },
    });

    try {
        // Attempt to verify the connection
        await transporter.verify();
        console.log('Credentials are valid');
        return true; // Valid credentials
    } catch (error) {
        console.error('Invalid credentials:', error.message);
        return false; // Invalid credentials
    }
};



export {
    sendEmail
}