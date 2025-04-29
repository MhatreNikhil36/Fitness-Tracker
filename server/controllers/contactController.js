import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please complete all required fields before submitting.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FitTrack Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      html: `<h2>New Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({
      message:
        "Your message has been sent successfully. We will get back to you soon.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Unable to send your message at the moment. Please try again later.",
    });
  }
};
