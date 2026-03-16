import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are MISSING in .env');
        return res.status(500).json({ 
            success: false, 
            message: 'Server email configuration error. Please check your .env file.' 
        });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Gmail usually requires 'from' to be the auth user
        replyTo: email, // Set user's email as replyTo so Abhilash can reply directly
        to: 'abhilashgowda052003@gmail.com',
        subject: `[Portfolio Contact] ${subject || 'New Message'}`,
        text: `You have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4285F4;">New Portfolio Message</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <p style="white-space: pre-wrap;">${message}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to abhilashgowda052003@gmail.com');
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        let errorMsg = 'Failed to send message. Please try again later.';
        if (error.code === 'EAUTH') {
            errorMsg = 'Email authentication failed. Please check your App Password.';
        }
        res.status(500).json({ success: false, message: errorMsg });
    }
});

export default router;
