import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
         <div style="max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;background-color:#ffffff;font-family:Arial,sans-serif;">
          <h1 style="font-size:20px;color:#333333;margin-bottom:15px;">${subject}</h1>
          <p style="font-size:16px;color:#555555;line-height:1.5;margin-bottom:15px;">${text}</p>
          <p style="font-size:14px;color:#888888;line-height:1.5;margin-bottom:20px;">
            If you did not request this, please ignore this email.
          </p>     
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
