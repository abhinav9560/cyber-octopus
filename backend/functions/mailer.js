const nodemailer = require("nodemailer");

const mailSend = async function (data) {
  const emailAccount = {
    name: process.env.emailName,
    email: process.env.emailEmail,
    password: process.env.emailPassword,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailAccount.email,
      pass: emailAccount.password,
    },
  });
  const mailOptions = {
    from: emailAccount.name + emailAccount.email,
    to: data.email,
    subject: data.subject,
    html: data.html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailSend;
