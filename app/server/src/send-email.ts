const nodemailer = require("nodemailer");

const sendEmail = async (email: any, subject: any, text: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ilulmahardika@gmail.com",
        pass: "magang5andromedia",
      },
    });

    await transporter.sendMail({
      from: "ERENT <ilulmahardika@gmail.com>",
      to: email,
      subject: subject,
      html: text,
    });

    console.log("email sent sucessfully");
    return true
  } catch (error) {
    console.log(error, "email not sent");
    return false
  }
};

module.exports = sendEmail;