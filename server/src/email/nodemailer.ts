import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.NODE_MAILER_SP,
  auth: {
    user: process.env.NODE_MAILER_USERNAME,
    pass: process.env.NODE_MAILER_PW,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  message: string
) => {
  try {
    const mailOptions = {
      from: process.env.NODE_MAILER_USERNAME,
      to,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
