const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");


const emailSubPaid = async (emailToSend:string) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Next Game Commerce",
        link: `${process.env.EMAIL_MAIL_URL}`,
        logo: "https://res.cloudinary.com/dbgj9uwjp/image/upload/v1700372458/beanCollectorLogo_3_zwztfr.png",
        logoHeight: "200px",
      },
    });

    // end of action btn

    const email = {
      body: {
        name: "Mr Successs" ,
        intro: `Your subscription (ID: "XXX") is paid! Visit our website, log in, and check 'Dashboard' -> 'My Subscription' for details.`,
        outro: [
          "Need help, or have questions? just reply to this email, we'd love to help you up.",
        ],
        action: {
          instructions: "",
          button: {
            color: "#48cfad",
            text: "Visit Website",
            link: process.env.EMAIL_MAIN_URL,
          },
        },
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: emailToSend,
      subject: `Subscription ID: "XXX" payment successful!-- Game Commerce site.`,
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};

// module.exports = {
//   emailSubPaid,
// };

export default emailSubPaid;