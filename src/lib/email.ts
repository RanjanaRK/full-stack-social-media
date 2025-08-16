import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
  heading: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;",
  url: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
};

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: `
       
         <div style="${styles.container}">
      <h1 style="${styles.heading}">${subject}</h1>
      <p style="${styles.paragraph}">${text}</p>
    
    </div>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// <p>You requested a password reset.</p>
// <p>${text}</p>
// <p>If you did not request this, please ignore this email.</p>
